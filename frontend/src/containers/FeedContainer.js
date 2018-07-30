import React, { Component } from "react";
import Feed from "components/Feed";
import { connect } from "react-redux";
import * as feedActions from "store/modules/feed";
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave
} from "better-react-spinkit";

class FeedContainer extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { getFeeds, feeds } = this.props;
    if (feeds === null) {
      getFeeds();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.no_feed || !nextProps.no_feed) {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const { loading } = this.state;
    const { feeds, no_feed } = this.props;

    return (
      <div>
        <Feed feeds={feeds} no_feed={no_feed} loading={loading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feeds: state.feed.feeds,
  no_feed: state.feed.no_feed
});

const mapDispatchToProps = dispatch => ({
  getFeeds: () => dispatch(feedActions.getFeeds())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
