import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ExploreItem = ({
  username,
  name,
  id,
  is_following,
  profile_image,
  clickFollowButton,
  clickUnfollowButton
}) => (
  <div className={cx("container")}>
    <div className={cx("image")}>
      <img src={profile_image || require("media/nobody.png")} />
    </div>
    <div className={cx("info")}>
      <span className={cx("username")}>{username}</span>
      <span className={cx("name")}>{name || "name"}</span>
    </div>
    <div className={cx("button")}>
      {is_following ? (
        <div className={cx("follow")} onClick={clickUnfollowButton}>
          Unfollow
        </div>
      ) : (
        <div className={cx("follow")} onClick={clickFollowButton}>
          Follow
        </div>
      )}
    </div>
  </div>
);

export default ExploreItem;
