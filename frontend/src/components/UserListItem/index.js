import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const UserListItem = ({
  id,
  creator: { username, name, profile_image },
  is_following,
  clickFollowButton,
  clickUnfollowButton,
  clickUsername,
  creator
}) => (
  <div className={cx("container")}>
    <div className={cx("profile_photo")}>
      <img
        className={cx("image")}
        alt="profile_image"
        src={profile_image || require("media/nobody.png")}
      />
    </div>
    <div className={cx("information")}>
      <Link to="/other/profile" style={{ textDecoration: "none" }}>
        <span
          className={cx("username")}
          onClick={() => clickUsername(creator.id)}
        >
          {username}
        </span>
      </Link>
      <span className={cx("name")}>{name || "secret"}</span>
    </div>
    <div className={cx("follow")}>
      {is_following ? (
        <div className={cx("button")} onClick={clickUnfollowButton}>
          Unfollow
        </div>
      ) : (
        <div className={cx("button")} onClick={clickFollowButton}>
          Follow
        </div>
      )}
    </div>
  </div>
);

export default UserListItem;
