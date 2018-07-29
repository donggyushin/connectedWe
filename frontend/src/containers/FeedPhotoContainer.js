import React, { Component } from "react";
import { connect } from "react-redux";
import FeedPhoto from "components/FeedPhoto";

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

  render() {
    const { comment_visiable, comment_value } = this.state;
    return (
      <FeedPhoto
        {...this.props}
        comment_visiable={comment_visiable}
        clickCommentIcon={this._clickCommentIcon}
        comment_value={comment_value}
        handleInput={this._handleInput}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPhotoContainer);
