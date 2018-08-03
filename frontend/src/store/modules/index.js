import { combineReducers } from "redux";
import user from "./user";
import feed from "./feed";
import { routerReducer } from "react-router-redux";
export default combineReducers({
  user,
  feed,
  routing: routerReducer
});
