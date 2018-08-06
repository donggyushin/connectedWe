import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import * as feedActions from "store/modules/feed";
import * as notificationActions from "store/modules/notification";
import NavigationBar from "components/NavigationBar";
import { withRouter } from "react-router-dom";

class NavigationBarContainer extends Component {
  state = {
    term: ""
  };

  _handleInput = e => {
    this.setState({
      term: e.target.value
    });
  };

  _handleSubmit = e => {
    const { term } = this.state;
    if (e.key === "Enter") {
      this.props.history.push(`/search/${term}`);
      this.setState({ term: "" });
    }
  };

  _clickLogoutButton = () => {
    const { logoutAction, history } = this.props;
    logoutAction();
    history.push("/");
  };

  _clickCameraIcon = () => {
    const { image_upload_on } = this.props;
    image_upload_on();
  };

  _clickHeartIcon = () => {
    const { notification_on, getNotifications } = this.props;
    notification_on();
    getNotifications();
  };

  componentDidMount() {
    const { get_notification_count } = this.props;
    get_notification_count();
  }

  render() {
    const { isLoggedIn, notification_count } = this.props;
    const { term } = this.state;
    return (
      <NavigationBar
        clickLogoutButton={this._clickLogoutButton}
        isLoggedIn={isLoggedIn}
        handleInput={this._handleInput}
        handleSubmit={this._handleSubmit}
        value={term}
        clickCameraIcon={this._clickCameraIcon}
        notification_count={notification_count}
        clickHeartIcon={this._clickHeartIcon}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  my_id: state.user.my_id,
  notification_count: state.notification.notification_count
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logoutAction: () => dispatch(userActions.logoutApiAction()),
  image_upload_on: () => dispatch(feedActions.image_upload_on()),
  get_notification_count: () =>
    dispatch(notificationActions.api_getNotification()),
  notification_on: () => dispatch(notificationActions.notificationOn()),
  getNotifications: () => dispatch(notificationActions.notifications())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationBarContainer));
