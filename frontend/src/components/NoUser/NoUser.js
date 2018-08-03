import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const NoUser = () => (
  <div className={cx("container")}>
    <span>No User :)</span>
  </div>
);

export default NoUser;
