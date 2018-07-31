import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const UserListItem = ({ id, creator, is_following }) => (
  <div className={cx("container")}>
    <div className={cx("profile_photo")}>profile_photo</div>
    <div className={cx("information")}>
      <span className={cx("username")}>username</span>
      <span className={cx("name")}>name</span>
    </div>
    <div className={cx("follow")}>
      <div className={cx("button")}>follow</div>
    </div>
  </div>
);

export default UserListItem;
