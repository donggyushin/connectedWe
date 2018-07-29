import React, { Component } from "react";
import Feed from "components/Feed";
import { connect } from "react-redux";

class FeedContainer extends Component {
  state = {
    loading: true
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <Feed loading={loading} />
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
