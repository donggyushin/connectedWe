import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SinglePhoto = ({ id, file }) => (
  <div className={cx("container")}>
    <img src={file} alt={id} />
  </div>
);

export default SinglePhoto;
