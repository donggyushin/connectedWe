import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import * as FontAwesome from "react-icons/lib/fa";

const cx = classNames.bind(styles);

const NoFeed = () => (
  <div className={cx("mom")}>
    <div className={cx("arrow")}>
      <FontAwesome.FaLongArrowRight className={cx("icon")} />
      <span>To follow someone</span>
    </div>
    <div className={cx("container")}>
      <div className={cx("character")}>
        <img
          src={require("media/firstVisit.png")}
          className={cx("image")}
          alt="lattatui"
        />
      </div>
      <div className={cx("hello_text")}>
        <span className={cx("upper")}>
          This is your fisrt time on connectedWe?
        </span>
        <span className={cx("lower")}>
          Upload your new photo or follow someone to start!
        </span>
      </div>
    </div>
    <div className={cx("firstButton")}>launch your first feed</div>
  </div>
);

export default NoFeed;
