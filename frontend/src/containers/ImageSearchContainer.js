import React, { Component } from "react";
import { connect } from "react-redux";
import ImageSearch from "components/ImageSearch/ImageSearch";

class ImageSearchContainer extends Component {
  render() {
    const { imageList } = this.props;
    return <ImageSearch imageList={imageList} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageSearchContainer);
