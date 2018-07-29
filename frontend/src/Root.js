import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppContainer from "containers/AppContainer";

const Root = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default Root;
