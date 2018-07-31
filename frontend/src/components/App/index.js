import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginContainer from "containers/LoginContainer";
import SignUpContainer from "containers/SignUpContainer";
import FeedContainer from "containers/FeedContainer";
import NavigationBarContainer from "containers/NavigationBarContainer";

const cx = classNames.bind(styles);

const App = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return (
    <div className={cx("container")}>
      {isLoggedIn ? <PrivateComponent /> : <PublicComponent />}
    </div>
  );
};

const PublicComponent = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/signup" component={SignUpContainer} />
        </Switch>
      </div>
    </Router>
  );
};

const PrivateComponent = () => {
  return (
    <Router>
      <div className={cx("private_container")}>
        <NavigationBarContainer />
        <Switch className={cx("switchContainer")}>
          <Route exact path="/" component={FeedContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;