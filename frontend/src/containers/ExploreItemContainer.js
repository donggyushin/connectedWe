import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import ExploreItem from "components/ExploreItem";

class ExploreItemContainer extends Component {
  _clickFollowButton = () => {
    const { follow } = this.props;
    follow();
  };

  _clickUnfollowButton = () => {
    const { unfollow } = this.props;
    unfollow();
  };

  render() {
    return (
      <ExploreItem
        {...this.props}
        clickFollowButton={this._clickFollowButton}
        clickUnfollowButton={this._clickUnfollowButton}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  follow: () => dispatch(userActions.api_follow(ownProps.id)),
  unfollow: () => dispatch(userActions.api_unfollow(ownProps.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreItemContainer);
