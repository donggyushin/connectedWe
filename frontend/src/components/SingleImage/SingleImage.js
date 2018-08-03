import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SingleImage = ({ file }) => (
  <div className={cx("container")}>
    <img src={file} />
  </div>
);

export default SingleImage;
