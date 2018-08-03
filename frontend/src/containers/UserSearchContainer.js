import React, { Component } from "react";
import { connect } from "react-redux";
import UserSearch from "components/UserSearch/UserSearch";

class UserSearchContainer extends Component {
  render() {
    return <UserSearch />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSearchContainer);
