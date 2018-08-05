import { combineReducers } from "redux";
import user from "./user";
import feed from "./feed";
import notification from "./notification";
import { routerReducer } from "react-router-redux";
export default combineReducers({
  user,
  feed,
  notification,
  routing: routerReducer
});
