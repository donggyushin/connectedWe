import React, { Component } from "react";
import App from "components/App";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";

class AppContainer extends Component {
  componentDidMount() {
    const { handle_loggedIn, getMyId } = this.props;
    handle_loggedIn();
    getMyId();
  }

  render() {
    const {
      isLoggedIn,
      errorMessage,
      image_upload,
      notification_on
    } = this.props;
    return (
      <div>
        <App
          isLoggedIn={isLoggedIn}
          errorMessage={errorMessage}
          image_upload={image_upload}
          notification_on={notification_on}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  errorMessage: state.user.errorMessage,
  image_upload: state.feed.image_upload,
  notification_on: state.notification.notification_on
});

const mapDispatchToProps = dispatch => ({
  handle_loggedIn: () => dispatch(userActions.handle_isLoggedIn()),
  getMyId: () => dispatch(userActions.apiGetMyId())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
