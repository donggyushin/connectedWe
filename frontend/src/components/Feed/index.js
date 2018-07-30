import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
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
import FeedPhotoContainer from "containers/FeedPhotoContainer";
import NoFeedContainer from "containers/NoFeedContainer";

const cx = classNames.bind(styles);

const Feed = ({ loading, feeds, no_feed }) => {
  if (loading) {
    return (
      <div className={cx("container")}>
        <div className={cx("inner_container")}>
          <Circle />
        </div>
      </div>
    );
  } else if (no_feed) {
    return (
      <div>
        <NoFeedContainer />
      </div>
    );
  } else {
    return (
      <div className={cx("container")}>
        {feeds.map(feed => <FeedPhotoContainer {...feed} key={feed.id} />)}
      </div>
    );
  }
};

export default Feed;
