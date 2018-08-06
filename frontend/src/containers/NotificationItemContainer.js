import React, { Component } from "react";
import { connect } from "react-redux";
import * as notificationActions from "store/modules/notification";
import NotificationItem from "components/NotificationItem/NotificationItem";

class NotificationItemContainer extends Component {
  componentDidMount() {
    const { image } = this.props;
  }
  render() {
    return <NotificationItem {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationItemContainer);
