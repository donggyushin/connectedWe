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
const SETIMAGELIST = "user/SETIMAGELIST";
const SETUSERLIST = "user/SETUSERLIST";
const GETMYID = "user/GETMYID";
const PROFILEVIEW = "user/PROFILEVIEW";
const EDITPROFILE = "user/EDITPROFILE";
const EDITNAME = "user/EDITNAME";

//action creators

export const edit_name = (first_name, last_name) => ({
  type: EDITNAME,
  first_name,
  last_name
});

export const editProfileAction = (bio, website, profile_image, id) => ({
  type: EDITPROFILE,

  bio,
  website,
  profile_image,
  id
});

export const profile_view = profile => ({
  type: PROFILEVIEW,
  profile
});

export const get_my_id = (id, username) => ({
  type: GETMYID,
  id,
  username
});

export const set_user_list = userList => ({
  type: SETUSERLIST,
  userList
});

export const set_image_list = imageList => ({
  type: SETIMAGELIST,
  imageList
});

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

export function searchByTerm(searchTerm) {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const userList = await api_searchByUsername(searchTerm, token);
    const imageList = await api_searchByHashtags(searchTerm, token);

    if (userList === 400 || imageList === 400) {
      dispatch(set_error_message("fail to get list"));
      return;
    }
    dispatch(set_user_explore(userList));
    dispatch(set_image_list(imageList));
  };
}

export function api_searchByHashtags(hashtags, token) {
  return fetch(`/images/search/?hashtags=${hashtags}`, {
    method: "GET",
    headers: headers(token)
  })
    .then(response => {
      if (!response.ok) {
        return 400;
      }

      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => console.log(err));
}

export function api_searchByUsername(username, token) {
  return fetch(`/users/search/?username=${username}`, {
    method: "GET",
    headers: headers(token)
  })
    .then(response => {
      if (!response.ok) {
        return 400;
      }

      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(err => console.log(err));
}

export function api_follow(user_id) {
  return (dispatch, getState) => {
    dispatch(follow(user_id));
    const {
      user: { token }
    } = getState();
    fetch(`/users/${user_id}/follow/`, {
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
    fetch(`/users/${user_id}/unfollow/`, {
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
          dispatch(apiGetMyId());
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
          dispatch(apiGetMyId());
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
    fetch(`/users/explore/`, {
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

export function apiGetMyId() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/id/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(set_error_message("fail to get my id"));
        }
        return response.json();
      })
      .then(json => dispatch(get_my_id(json.id, json.username)))
      .catch(err => console.log(err));
  };
}

export function apiProfileView(user_id) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/${user_id}/profile/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(set_error_message("fail to get profile"));
        }
        return response.json();
      })
      .then(json => dispatch(profile_view(json)))
      .catch(err => console.log(err));
  };
}

export function edit_profile_api(
  data,
  user_id,
  first_name,
  last_name,
  username
) {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const updatedName = await edit_name_api(
      username,
      first_name,
      last_name,
      token
    );
    const updatedProfile = await edit_profile(data, user_id, token);
    if (updatedName === 400 || updatedProfile === 400) {
      dispatch(
        set_error_message(
          "fail to edit profile, Please check wheather your website url is valid or not."
        )
      );
    }

    console.log(updatedProfile);
    dispatch(edit_name(updatedName.first_name, updatedName.last_name));
    dispatch(
      editProfileAction(
        updatedProfile.bio,
        updatedProfile.website,
        updatedProfile.profile_image,
        updatedProfile.id
      )
    );
  };
}

export function edit_profile(data, user_id, token) {
  return fetch(`/users/${user_id}/edit/`, {
    method: "PUT",
    headers: {
      Authorization: `JWT ${token}`
    },
    body: data
  })
    .then(response => {
      if (!response.ok) {
        return 400;
      }
      return response.json();
    })
    .then(json => json)
    .catch(err => console.log(err));
}

export function edit_name_api(username, first_name, last_name, token) {
  return fetch(`/rest-auth/user/`, {
    method: "PUT",
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      first_name: first_name,
      last_name: last_name
    })
  })
    .then(response => {
      if (!response.ok) {
        return 400;
      }
      return response.json();
    })
    .then(json => json)
    .catch(err => console.log(err));
}

//initialState
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  errorMessage: "",
  userList: null,
  imageList: null,
  my_id: null,
  my_username: null,
  profile_view: null
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
    case SETIMAGELIST:
      return applySetImageList(state, action);
    case SETUSERLIST:
      return applySetUserList2(state, action);
    case GETMYID:
      return applyGetMyId(state, action);
    case PROFILEVIEW:
      return applyProfileView(state, action);

    case EDITPROFILE:
      return applyEditProfile(state, action);

    case EDITNAME:
      return applyEditName(state, action);

    default:
      return state;
  }
}

//reducer functions

function applyEditName(state, action) {
  const { first_name, last_name } = action;
  return {
    ...state,
    profile_view: {
      ...state.profile_view,
      first_name,
      last_name
    }
  };
}

function applyEditProfile(state, action) {
  const { bio, website, profile_image } = action;

  return {
    ...state,
    profile_view: {
      ...state.profile_view,

      bio,
      website,
      profile_image
    }
  };
}

function applyProfileView(state, action) {
  const { profile } = action;
  return {
    ...state,
    profile_view: profile
  };
}

function applyGetMyId(state, action) {
  const { id, username } = action;
  return {
    ...state,
    my_id: id,
    my_username: username
  };
}

function applySetUserList2(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList: userList
  };
}

function applySetImageList(state, action) {
  const { imageList } = action;
  return {
    ...state,
    imageList: imageList
  };
}

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
