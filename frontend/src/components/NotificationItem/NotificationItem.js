import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NotificationItem = ({ id, creator, to, image, notification_types }) => (
  <div className={cx("container")}>
    <div className={cx("creator")}>{creator.username}</div>
    <div className={cx("type")}>{notification_types}</div>
    <span>you</span>

    <div className={cx("image")}>{image && <img src={image.file} />}</div>
  </div>
);

export default NotificationItem;
