import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Feed = () => (
  <div>
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
);

const FeedHeader = () => <div>FeedHeader</div>;

const FeedBody = () => <div>feed body</div>;

const FeedAction = () => <div>feed action</div>;

const FeedComment = () => <div>comment</div>;

const FeedLikeList = () => <div>like list</div>;

export default Feed;
