//import
import * as userActions from "./user";

//actions
const SAVE_FEEDS = "feed/SAVE_FEEDS";
const SET_FEED_TRUE = "feed/SET_FEED_TRUE";
const SET_FEED_FALSE = "feed/SET_FEED_FALSE";
const DOLIKEPHOTO = "feed/DOLIKEPHOTO";
const DOUNLIKEPHOTO = "feed/DOUNLIKEPHOTO";
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

export const do_like_photo = photoId => ({
  type: DOLIKEPHOTO,
  photoId
});

export const do_unlike_photo = photoId => ({
  type: DOUNLIKEPHOTO,
  photoId
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

export function like_photo(image_id) {
  return (dispatch, getState) => {
    dispatch(do_like_photo(image_id));
    const {
      user: { token }
    } = getState();
    fetch(`/images/${image_id}/like/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log("success");
        } else {
          dispatch(do_unlike_photo(image_id));
          dispatch(userActions.set_error_message("fail to like"));
        }
      })
      .catch(err => console.log(err));
  };
}

export function unlike_photo(image_id) {
  return (dispatch, getState) => {
    dispatch(do_unlike_photo(image_id));
    const {
      user: { token }
    } = getState();
    fetch(`images/${image_id}/unlike/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("success");
        } else {
          dispatch(do_like_photo(image_id));
          dispatch(userActions.set_error_message("fail to unlike"));
        }
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
    case DOLIKEPHOTO:
      return applyLike(state, action);
    case DOUNLIKEPHOTO:
      return applyUnLike(state, action);
    default:
      return state;
  }
}

function applyLike(state, action) {
  const { photoId } = action;
  const { feeds } = state;
  const updatedFeeds = feeds.map(feed => {
    console.log(photoId);
    console.log(feed.id);
    if (feed.id === photoId) {
      console.log("i'm in");
      return {
        ...feed,
        is_liked: true,
        like_count: feed.like_count + 1
      };
    }
    return feed;
  });
  return {
    ...state,
    feeds: updatedFeeds
  };
}

function applyUnLike(state, action) {
  const { photoId } = action;
  const { feeds } = state;
  const updatedFeeds = feeds.map(feed => {
    console.log(photoId);
    if (feed.id === photoId) {
      return {
        ...feed,
        is_liked: false,
        like_count: feed.like_count - 1
      };
    }
    return feed;
  });
  return {
    ...state,
    feeds: updatedFeeds
  };
}
