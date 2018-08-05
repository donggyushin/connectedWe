import React, { Component } from "react";
import { connect } from "react-redux";
import UserListItem from "components/UserListItem";
import * as feedActions from "store/modules/feed";
import * as userActions from "store/modules/user";

class UserListItemContainer extends Component {
  _clickFollowButton = () => {
    const { followUser } = this.props;
    followUser();
  };

  _clickUnfollowButton = () => {
    const { unfollowUser } = this.props;
    unfollowUser();
  };

  _clickUsername = user_id => {
    const { getProfileView } = this.props;
    getProfileView(user_id);
  };

  render() {
    const { id, creator, is_following } = this.props;
    return (
      <UserListItem
        id={id}
        creator={creator}
        is_following={is_following}
        clickFollowButton={this._clickFollowButton}
        clickUnfollowButton={this._clickUnfollowButton}
        clickUsername={this._clickUsername}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  followUser: () => dispatch(feedActions.followUserApi(ownProps.creator.id)),
  unfollowUser: () =>
    dispatch(feedActions.unfollowUserApi(ownProps.creator.id)),
  getProfileView: user_id => dispatch(userActions.apiProfileView(user_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListItemContainer);
