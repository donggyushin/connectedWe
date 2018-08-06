import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import * as FontAwesome from "react-icons/lib/fa";

const cx = classNames.bind(styles);

const NavigationBar = ({
  clickLogoutButton,
  isLoggedIn,
  handleInput,
  handleSubmit,
  value,
  clickCameraIcon,
  notification_count,
  clickHeartIcon
}) => (
  <div className={cx("container")}>
    <div className={cx("header")} />
    <div className={cx("lower")}>
      <div className={cx("column")}>
        <div>
          <Link className={cx("Link")} to="/">
            <FontAwesome.FaLinux className={cx("pet")} />
            <span className={cx("line")}>|</span>
            <span className={cx("logo")}>connected We</span>
          </Link>
        </div>
      </div>
      <div className={cx("column")}>
        <input
          placeholder="search"
          name="search"
          onChange={handleInput}
          onKeyPress={handleSubmit}
          value={value}
        />
      </div>
      <div className={cx("column", "right")}>
        {notification_count === 0 ? (
          ""
        ) : (
          <div className={cx("counter")}>{notification_count}</div>
        )}

        <div className={cx("icons")}>
          <FontAwesome.FaCameraRetro
            className={cx("icon", "camera")}
            onClick={clickCameraIcon}
          />
          <Link className={cx("Link")} to="/explore">
            <FontAwesome.FaSearch className={cx("icon")} />
          </Link>

          <FontAwesome.FaHeart
            onClick={clickHeartIcon}
            className={cx("center", "icon")}
          />

          <Link className={cx("Link")} to="/profile">
            <FontAwesome.FaUser className={cx("icon", "user")} />
          </Link>
          {isLoggedIn && <span onClick={clickLogoutButton}>logout</span>}
        </div>
      </div>
    </div>
  </div>
);

export default NavigationBar;
