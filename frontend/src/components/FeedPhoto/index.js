import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import Feed from "components/Feed";

const cx = classNames.bind(styles);

const FeedPhoto = props => {
  const {
    caption,
    comment_count,
    comment_set,
    creator,
    file,
    hashtags,
    id,
    like_count,
    location,
    naturalTime,
    updated_at
  } = props;
  return (
    <div>
      <PhotoHeader
        file={creator.profile_image}
        naturalTime={naturalTime}
        username={creator.username}
        name={creator.name}
      />
    </div>
  );
};

const PhotoHeader = ({ file, naturalTime, username, name }) => {
  return (
    <div className={cx("header_container")}>
      <div className={cx("photo")}>
        <img src={file || require("media/nobody.png")} />
      </div>
      <div className={cx("username_name_naturaltime")}>
        <div className={cx("row")}>{username}</div>
        <div className={cx("row")}>{name}</div>
        <div className={cx("row")}>{naturalTime}</div>
      </div>
    </div>
  );
};

export default FeedPhoto;
