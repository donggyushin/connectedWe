import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import * as FontAwesome from "react-icons/lib/fa";

const cx = classNames.bind(styles);

const MessageModal = ({ message, clear_error }) => (
  <div className={cx("container")}>
    <div className={cx("row")}>
      <FontAwesome.FaTimesCircle className={cx("timesCircle")} />
    </div>
    <div className={cx("oops")}>Oops!</div>
    <div className={cx("message")}>{message}</div>
    <div className={cx("button")} onClick={clear_error}>
      ok
    </div>
  </div>
);

export default MessageModal;
