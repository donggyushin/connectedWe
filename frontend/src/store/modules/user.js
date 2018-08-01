//import
import * as feedActions from "./feed";

const headers = token => ({
  Authorization: `JWT ${token}`,
  "Content-Type": "application/json"
});

//actions
const SAVE_TOKEN = "user/SAVE_TOKEN";
const HANDLE_ISLOGGEDIN = "user/HANDLE_ISLOGGEDIN";
const ERROR = "user/ERROR";
const CLEARERROR = "user/CLEARERROR";
const LOGOUT = "user/LOGOUT";
const SETUSEREXPLORE = "user/SETUSEREXPLORE";
const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "user/UNFOLLOW";

//action creators

export const follow = user_id => ({
  type: FOLLOW,
  user_id
});

export const unfollow = user_id => ({
  type: UNFOLLOW,
  user_id
});

export const set_user_explore = userList => ({
  type: SETUSEREXPLORE,
  userList
});

export const save_token = token => ({
  type: SAVE_TOKEN,
  token: token
});

export const handle_isLoggedIn = () => ({
  type: HANDLE_ISLOGGEDIN
});

export const set_error_message = text => ({
  type: ERROR,
  errorMessage: text
});

export const clear_error = () => ({
  type: CLEARERROR
});

export const logout = () => ({
  type: LOGOUT
});
//API actions

export function api_follow(user_id) {
  return (dispatch, getState) => {
    dispatch(follow(user_id));
    const {
      user: { token }
    } = getState();
    fetch(`users/${user_id}/follow/`, {
      method: "POST",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(set_error_message("fail to follow user"));
          dispatch(unfollow(user_id));
        }
      })
      .catch(err => console.log(err));
  };
}

export function api_unfollow(user_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    dispatch(unfollow(user_id));
    fetch(`users/${user_id}/unfollow/`, {
      method: "DELETE",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(set_error_message("fail to unfollow!"));
          dispatch(follow(user_id));
        }
      })
      .catch(err => console.log(err));
  };
}

export function username_login(username, password) {
  return dispatch => {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(set_error_message("wrong information"));
        }

        return response.json();
      })
      .then(json => {
        if (json.token) {
          dispatch(save_token(json.token));
          dispatch(handle_isLoggedIn());
        }
      })
      .catch(err => console.log(err));
  };
}

export function register(username, password1, password2, email) {
  return dispatch => {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1,
        password2,
        email
      })
    })
      .then(response => {
        if (response.status === 400) {
          dispatch(
            set_error_message("wrong information, maybe already using username")
          );
        }
        return response.json();
      })
      .then(json => {
        if (json.token) {
          dispatch(save_token(json.token));
          dispatch(handle_isLoggedIn());
        }
      })
      .catch(err => console.log(err));
  };
}

export function loginwithfacebook(access_token) {
  return dispatch => {
    fetch("/rest-auth/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(save_token(json.token));
          dispatch(handle_isLoggedIn());
        }
      })
      .catch(err => console.log(err));
  };
}

export function logoutApiAction() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch("/rest-auth/logout/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        dispatch(logout());
        dispatch(feedActions.clear_state());
        localStorage.removeItem("jwt");
      })
      .catch(err => console.log(err));
  };
}

export function apiSetUserExplore() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`users/explore/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(set_error_message("fail to load data"));
        }
        return response.json();
      })
      .then(json => dispatch(set_user_explore(json)))
      .catch(err => console.log(err));
  };
}

//initialState
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  errorMessage: "",
  userList: null
};

//reducer

export default function reducer(state = initialState, action, getState) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySaveToken(state, action);

    case HANDLE_ISLOGGEDIN:
      return applyHandleIsLoggedIn(state, action);

    case ERROR:
      return applyError(state, action);

    case CLEARERROR:
      return applyClearError(state, action);

    case LOGOUT:
      return applyLogout(state, action, getState);

    case SETUSEREXPLORE:
      return applySetUserList(state, action);

    case FOLLOW:
      return applyFollow(state, action);
    case UNFOLLOW:
      return applyUnfollow(state, action);

    default:
      return state;
  }
}

//reducer functions

function applyFollow(state, action) {
  const { user_id } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === user_id) {
      return {
        ...user,
        is_following: true
      };
    }
    return user;
  });
  return {
    ...state,
    userList: updatedUserList
  };
}

function applyUnfollow(state, action) {
  const { user_id } = action;
  const { userList } = state;
  const updatedUserList = userList.map(user => {
    if (user.id === user_id) {
      return {
        ...user,
        is_following: false
      };
    }
    return user;
  });
  return {
    ...state,
    userList: updatedUserList
  };
}

function applySetUserList(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList: userList
  };
}

function applyLogout(state, action, getState) {
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
}
function applyClearError(state, action) {
  return {
    ...state,
    errorMessage: ""
  };
}
function applyError(state, action) {
  return {
    ...state,
    errorMessage: action.errorMessage
  };
}

function applySaveToken(state, action) {
  localStorage.setItem("jwt", action.token);
  return {
    ...state,
    token: action.token
  };
}

function applyHandleIsLoggedIn(state, action) {
  return {
    ...state,
    isLoggedIn: localStorage.getItem("jwt") ? true : false
  };
}
