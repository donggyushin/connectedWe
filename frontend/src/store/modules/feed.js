//import

//actions
const SAVE_FEEDS = "feed/SAVE_FEEDS";

//action creators

export const save_feeds = feeds => ({
  type: SAVE_FEEDS,
  feeds: feeds
});

//api action creators

export function getFeeds() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    console.log(token);
    fetch("/images/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          console.log("logout");
        }
        return response.json();
      })
      .then(json => {
        dispatch(save_feeds(json));
      })
      .catch(err => console.log(err));
  };
}

//initialState

const initialState = {
  feeds: null
};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_FEEDS:
      return {
        ...state,
        feeds: action.feeds
      };
    default:
      return state;
  }
}
