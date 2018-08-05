import * as userActions from "./user";

const headers = token => ({
  Authentication: `JWT ${token}`,
  "Content-Type": "application/json"
});

//actions
const GET_NOTIFICATION_COUNT = "notification/GET_NOTIFICATION_COUNT";
//action creators
export const getNotificationCount = count => ({
  type: GET_NOTIFICATION_COUNT,
  count
});

//api actions

export function api_getNotification() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`users/notifications/`, {
      method: "GET",
      headers: headers(token)
    })
      .then(response => {
        if (!response.ok) {
          dispatch(
            userActions.set_error_message("fail to get notification count")
          );
        }
        return response.json;
      })
      .then(json => dispatch(getNotificationCount(json.notification_count)))
      .catch(err => console.log(err));
  };
}

//initialState

const initialState = {
  notification_count: 0
};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATION_COUNT:
      return applyGetNotificationCount(state, action);

    default:
      return state;
  }
}

function applyGetNotificationCount(state, action) {
  const { count } = action;
  return {
    ...state,
    notification_count: count
  };
}

//reducer actions
