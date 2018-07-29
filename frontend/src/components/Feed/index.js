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

const cx = classNames.bind(styles);

const Feed = ({ loading }) => {
  if (loading) {
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
        <div className={cx("inner_container")}>
          <div>
            <FeedHeader />
          </div>
          <div>
            <FeedBody />
          </div>
          <div>
            <FeedAction />
          </div>
          <div>
            <FeedComment />
          </div>
          <div>
            <FeedLikeList />
          </div>
        </div>
      </div>
    );
  }
};

const FeedHeader = () => <div>FeedHeader</div>;

const FeedBody = () => <div>feed body</div>;

const FeedAction = () => <div>feed action</div>;

const FeedComment = () => <div>comment</div>;

const FeedLikeList = () => <div>like list</div>;

export default Feed;
