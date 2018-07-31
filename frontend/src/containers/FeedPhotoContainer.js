import React, { Component } from "react";
import { connect } from "react-redux";
import FeedPhoto from "components/FeedPhoto";
import * as feedActions from "store/modules/feed";

class FeedPhotoContainer extends Component {
  state = {
    comment_visiable: false,
    comment_value: "",
    userListBoolean: false
  };

  _toggleUserListBoolean = () => {
    const { userListBoolean } = this.state;
    this.setState({
      ...this.state,
      userListBoolean: !userListBoolean
    });
  };

  _handleInput = e => {
    const value = e.target.value;

    this.setState({
      comment_value: value
    });
  };

  _clickCommentIcon = () => {
    const { comment_visiable } = this.state;
    this.setState({
      comment_visiable: !comment_visiable
    });
  };

  _likePhoto = () => {
    const { like_photo } = this.props;
    like_photo();
  };

  _unlike_photo = () => {
    const { unlike_photo } = this.props;
    unlike_photo();
  };

  _press_enter = e => {
    const { add_comment_api } = this.props;
    const { comment_value } = this.state;
    const key = e.key;
    if (key === "Enter") {
      add_comment_api(comment_value);
      this.setState({
        ...this.state,
        comment_value: ""
      });
    }
  };

  render() {
    const { comment_visiable, comment_value, userListBoolean } = this.state;
    return (
      <FeedPhoto
        {...this.props}
        comment_visiable={comment_visiable}
        clickCommentIcon={this._clickCommentIcon}
        comment_value={comment_value}
        handleInput={this._handleInput}
        likePhoto={this._likePhoto}
        unlike_photo={this._unlike_photo}
        press_enter={this._press_enter}
        userListBoolean={userListBoolean}
        toggleUserListBoolean={this._toggleUserListBoolean}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  like_photo: () => dispatch(feedActions.like_photo(ownProps.id)),
  unlike_photo: () => dispatch(feedActions.unlike_photo(ownProps.id)),
  add_comment_api: message =>
    dispatch(feedActions.add_comment_api(ownProps.id, message)),
  getLikeListApi: () => dispatch(feedActions.getLikeListApi())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPhotoContainer);
