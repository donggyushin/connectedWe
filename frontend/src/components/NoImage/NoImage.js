import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NoImage = () => (
  <div className={cx("container")}>
    <span>No Image :(</span>
  </div>
);

export default NoImage;
