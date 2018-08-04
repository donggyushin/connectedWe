import React, { Component } from "react";
import { connect } from "react-redux";
import SinglePhoto from "components/SinglePhoto/SinglePhoto";

class SinglePhotoContainer extends Component {
  render() {
    return <SinglePhoto {...this.props} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePhotoContainer);
