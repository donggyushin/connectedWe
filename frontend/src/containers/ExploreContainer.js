import React, { Component } from "react";
import { connect } from "react-redux";
import Explore from "components/Explore";

class ExploreContainer extends Component {
  render() {
    return <Explore />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreContainer);
