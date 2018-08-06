import * as userActions from "./user";

const headers = token => ({
  Authorization: `JWT ${token}`,
  "Content-Type": "application/json"
});

//actions
const GET_NOTIFICATION_COUNT = "notification/GET_NOTIFICATION_COUNT";
const NOTIFICATION_ON = "notification/NOTIFICATION_ON";
const NOTIFICATION_DOWN = "notification/NOTIFICATION_DOWN";
const SETNOTIFICATIONS = "notification/SETNOTIFICATIONS";
const DELETEALL = "notification/DELETEALL";

//action creators

export const deleteAll = () => ({
  type: DELETEALL
});

export const setNotifications = notifications => ({
  type: SETNOTIFICATIONS,
  notifications
});

export const notificationDown = () => ({
  type: NOTIFICATION_DOWN
});

export const notificationOn = () => ({
  type: NOTIFICATION_ON
});

export const getNotificationCount = count => ({
  type: GET_NOTIFICATION_COUNT,
  count
});

//api actions

export function deleteNotifications() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/notifications/delete/`, {
      method: "DELETE",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(userActions.set_error_message("fail delete notifications"));
        } else {
          dispatch(deleteAll());
          dispatch(api_getNotification());
        }
      })
      .catch(err => console.log(err));
  };
}

export function notifications() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/notifications/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(userActions.set_error_message("fail to get notifications!"));
        }
        return response.json();
      })
      .then(json => dispatch(setNotifications(json)))
      .catch(err => console.log(err));
  };
}

export function api_getNotification() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/notifications/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(
            userActions.set_error_message("fail to get notification count")
          );
        }

        console.log(response);

        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(getNotificationCount(json.notification_count));
      })
      .catch(err => console.log(err));
  };
}

//initialState

const initialState = {
  notification_count: 0,
  notification_on: false,
  notifications: null
};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_COUNT:
      return applyGetNotificationCount(state, action);

    case NOTIFICATION_ON:
      return applyNotificationOn(state, action);

    case NOTIFICATION_DOWN:
      return applyNotificationDown(state, action);

    case SETNOTIFICATIONS:
      return applySetNotifications(state, action);

    case DELETEALL:
      return applyDeleteAll(state, action);

    default:
      return state;
  }
}

function applyDeleteAll(state, action) {
  return {
    ...state,
    notifications: null
  };
}

function applySetNotifications(state, action) {
  const { notifications } = action;
  return {
    ...state,
    notifications: notifications
  };
}

function applyNotificationDown(state, action) {
  return {
    ...state,
    notification_on: false
  };
}

function applyNotificationOn(state, action) {
  return {
    ...state,
    notification_on: true
  };
}

function applyGetNotificationCount(state, action) {
  const { count } = action;
  return {
    ...state,
    notification_count: count
  };
}

//reducer actions
