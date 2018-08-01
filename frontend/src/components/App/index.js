import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginContainer from "containers/LoginContainer";
import SignUpContainer from "containers/SignUpContainer";
import FeedContainer from "containers/FeedContainer";
import NavigationBarContainer from "containers/NavigationBarContainer";
import ExploreContainer from "containers/ExploreContainer";
import MessageModalContainer from "containers/MessageModalContainer";

const cx = classNames.bind(styles);

const App = ({ isLoggedIn, errorMessage }) => {
  return (
    <div className={cx("container")}>
      {isLoggedIn ? <PrivateComponent /> : <PublicComponent />}
      {errorMessage && (
        <div className={cx("errorMessage")}>
          <MessageModalContainer />
        </div>
      )}
    </div>
  );
};

const PublicComponent = () => {
  return (
    <Router>
      <div className={cx("public_container")}>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/signup" component={SignUpContainer} />
          <Route component={LoginContainer} />
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
          <Route path="/explore" component={ExploreContainer} />
          <Route component={FeedContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
