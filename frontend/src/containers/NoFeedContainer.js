import React, { Component } from "react";
import { connect } from "react-redux";
import * as feedActions from "store/modules/feed";
import NoFeed from "components/NoFeed";

class NoFeedContainer extends Component {
  _clickNewLunch = () => {
    const { image_upload_on } = this.props;
    image_upload_on();
  };

  render() {
    return (
      <NoFeed
        turn_on_uploader={this._clickNewLunch}
        imageUploader={this.props.image_upload}
      />
    );
  }
}

const mapStateToProps = state => ({
  image_upload: state.feed.image_upload
});

const mapDispatchToProps = dispatch => ({
  image_upload_on: () => dispatch(feedActions.image_upload_on())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoFeedContainer);
