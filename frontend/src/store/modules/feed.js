//import

//actions
const SAVE_FEEDS = "feed/SAVE_FEEDS";
const SET_FEED_TRUE = "feed/SET_FEED_TRUE";
const SET_FEED_FALSE = "feed/SET_FEED_FALSE";
//action creators

export const save_feeds = feeds => ({
  type: SAVE_FEEDS,
  feeds: feeds
});

export const set_feed_true = () => ({
  type: SET_FEED_TRUE
});

export const set_feed_false = () => ({
  type: SET_FEED_FALSE
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
        if (response.status === 204) {
          dispatch(set_feed_true());
        } else {
          dispatch(set_feed_false());
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
  feeds: null,
  no_feed: false
};

//reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_FEEDS:
      return {
        ...state,
        feeds: action.feeds
      };
    case SET_FEED_FALSE:
      return {
        ...state,
        no_feed: false
      };
    case SET_FEED_TRUE:
      return {
        ...state,
        no_feed: true
      };
    default:
      return state;
  }
}
