import React, { Component } from "react";
import { connect } from "react-redux";
import FeedPhoto from "components/FeedPhoto";

class FeedPhotoContainer extends Component {
  render() {
    console.log(this.props);

    return <FeedPhoto {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedPhotoContainer);
