//import
import * as feedActions from "./feed";

//actions
const SAVE_TOKEN = "user/SAVE_TOKEN";
const HANDLE_ISLOGGEDIN = "user/HANDLE_ISLOGGEDIN";
const ERROR = "user/ERROR";
const CLEARERROR = "user/CLEARERROR";
const LOGOUT = "user/LOGOUT";

//action creators

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

//initialState
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  errorMessage: ""
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

    default:
      return state;
  }
}

//reducer functions
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
