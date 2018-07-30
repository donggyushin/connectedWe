import React, { Component } from "react";
import { connect } from "react-redux";
import * as feedActions from "store/modules/feed";
import NoFeed from "components/NoFeed";

class NoFeedContainer extends Component {
  render() {
    return <NoFeed />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoFeedContainer);
