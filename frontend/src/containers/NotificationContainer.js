import React, { Component } from "react";
import { connect } from "react-redux";
import * as notificationActions from "store/modules/notification";
import Notification from "components/Notification/Notification";

class NotificationContainer extends Component {
  state = {
    loading: true
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.notifications && nextProps.notifications) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  _clickCloseButton = () => {
    const { notificationDown, deleteAllInState } = this.props;
    notificationDown();
    deleteAllInState();
  };

  _clickDeleteButton = () => {
    const { deleteAll } = this.props;
    deleteAll();
  };
  render() {
    const { loading } = this.state;
    const { notifications } = this.props;
    return (
      <Notification
        loading={loading}
        clickCloseButton={this._clickCloseButton}
        notifications={notifications}
        clickDeleteButton={this._clickDeleteButton}
      />
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  notificationDown: () => dispatch(notificationActions.notificationDown()),
  getNotifications: () => dispatch(notificationActions.notifications()),
  deleteAll: () => dispatch(notificationActions.deleteNotifications()),
  deleteAllInState: () => dispatch(notificationActions.deleteAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
