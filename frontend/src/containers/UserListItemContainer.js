import React, { Component } from "react";
import { connect } from "react-redux";
import UserListItem from "components/UserListItem";
import * as feedActions from "store/modules/feed";

class UserListItemContainer extends Component {
  _clickFollowButton = () => {
    const { followUser } = this.props;
    followUser();
  };

  _clickUnfollowButton = () => {
    const { unfollowUser } = this.props;
    unfollowUser();
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
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  followUser: () => dispatch(feedActions.followUserApi(ownProps.creator.id)),
  unfollowUser: () => dispatch(feedActions.unfollowUserApi(ownProps.creator.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListItemContainer);
