import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import Loading from "components/Loading/Loading";
import NotificationItemContainer from "containers/NotificationItemContainer";

const cx = classNames.bind(styles);

const Notification = ({
  loading,
  clickCloseButton,
  notifications,
  clickDeleteButton
}) => (
  <div className={cx("container")}>
    <div className={cx("box")}>
      <div className={cx("header")}>
        <span onClick={clickCloseButton}>❌</span>
      </div>
      <div className={cx("button")}>
        <span onClick={clickDeleteButton}>delete All</span>
      </div>
      <div className={cx("body")}>
        {loading && (
          <div className={cx("loading")}>
            <Loading />
          </div>
        )}
        {!loading && (
          <div className={cx("notification")}>
            {notifications &&
              notifications.map(notification => (
                <NotificationItemContainer
                  key={notification.id}
                  {...notification}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Notification;
