import React from "react";
import classNames from "classnames/bind";
import styles from "./style.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as FontAwesome from "react-icons/lib/fa";

const cx = classNames.bind(styles);

const NavigationBar = ({ clickLogoutButton, isLoggedIn }) => (
  <div className={cx("container")}>
    <div className={cx("column")}>
      <div>
        <FontAwesome.FaLinux />
        <span className={cx("line")}>|</span>
        <span className={cx("logo")}>connected We</span>
      </div>
    </div>
    <div className={cx("column")}>
      <input placeholder="search" name="search" />
    </div>
    <div className={cx("column")}>
      <div className={cx("icons")}>
        <FontAwesome.FaSearch />
        <FontAwesome.FaHeart className={cx("center")} />
        <FontAwesome.FaUser />
        {isLoggedIn && <span onClick={clickLogoutButton}>logout</span>}
      </div>
    </div>
  </div>
);

export default NavigationBar;
