import React, { Component } from "react";
import { connect } from "react-redux";
import UserListItem from "components/UserListItem";

class UserListItemContainer extends Component {
  render() {
    const { id, creator, is_following } = this.props;
    return (
      <UserListItem id={id} creator={creator} is_following={is_following} />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListItemContainer);
