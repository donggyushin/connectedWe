import React, { Component } from "react";
import MessageModal from "components/MessageModal";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";

class MessageModalContainer extends Component {
  render() {
    const { errorMessage, clear_error } = this.props;
    return <MessageModal message={errorMessage} clear_error={clear_error} />;
  }
}

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  clear_error: () => dispatch(userActions.clear_error())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageModalContainer);
