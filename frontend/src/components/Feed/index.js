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
import MessageModalContainer from "containers/MessageModalContainer";

const cx = classNames.bind(styles);

const Feed = ({ loading, feeds, no_feed, errorMessage }) => {
  if (no_feed) {
    return (
      <div>
        <NoFeedContainer />
      </div>
    );
  } else if (loading) {
    return (
      <div className={cx("container")}>
        <div className={cx("inner_container")}>
          <Circle />
        </div>
      </div>
    );
  } else {
    return (
      <div className={cx("container")}>
        {feeds.map(feed => <FeedPhotoContainer {...feed} key={feed.id} />)}
        <div className={cx("modal")}>
          {errorMessage !== "" && <MessageModalContainer />}
        </div>
      </div>
    );
  }
};

export default Feed;
