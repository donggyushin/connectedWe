import React, { Component } from "react";
import { connect } from "react-redux";
import FeedPhoto from "components/FeedPhoto";
import * as feedActions from "store/modules/feed";

class FeedPhotoContainer extends Component {
  state = {
    comment_visiable: false,
    comment_value: ""
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

  render() {
    const { comment_visiable, comment_value } = this.state;
    return (
      <FeedPhoto
        {...this.props}
        comment_visiable={comment_visiable}
        clickCommentIcon={this._clickCommentIcon}
        comment_value={comment_value}
        handleInput={this._handleInput}
        likePhoto={this._likePhoto}
        unlike_photo={this._unlike_photo}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  like_photo: () => dispatch(feedActions.like_photo(ownProps.id)),
  unlike_photo: () => dispatch(feedActions.unlike_photo(ownProps.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPhotoContainer);
