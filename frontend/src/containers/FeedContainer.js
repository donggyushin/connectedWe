import React, { Component } from "react";
import Feed from "components/Feed";
import { connect } from "react-redux";

class FeedContainer extends Component {
  render() {
    return (
      <div>
        <Feed />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
