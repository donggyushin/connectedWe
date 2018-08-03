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
import SearchContainer from "containers/SearchContainer";
import ImageUploaderContainer from "containers/ImageUploaderContainer";
import UserProfileContainer from "containers/UserProfileContainer";

// Create an enhanced history that syncs navigation events with the store

const cx = classNames.bind(styles);

const App = ({ isLoggedIn, errorMessage, image_upload }) => {
  return (
    <div className={cx("container")}>
      {isLoggedIn ? (
        <PrivateComponent image_upload={image_upload} />
      ) : (
        <PublicComponent />
      )}
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

const PrivateComponent = ({ image_upload }) => {
  return (
    <Router>
      <div className={cx("private_container")}>
        <NavigationBarContainer />
        {image_upload && <ImageUploaderContainer />}
        <Switch className={cx("switchContainer")}>
          <Route exact path="/" component={FeedContainer} />
          <Route path="/explore" component={ExploreContainer} />
          <Route path="/search/:searchTerm" component={SearchContainer} />
          <Route path="/profile" component={UserProfileContainer} />
          <Route component={FeedContainer} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
