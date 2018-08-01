import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Circle } from "better-react-spinkit";
import UserListItemContainer from "containers/UserListItemContainer";

const cx = classNames.bind(styles);

const UserList = ({ clikcCloseButton, like_list, loading }) => (
  <div className={cx("container")}>
    <div className={cx("box")}>
      <div className={cx("header")}>
        <span onClick={clikcCloseButton}>❌</span>
      </div>
      {loading ? (
        <div className={cx("loading")}>
          <Circle />
        </div>
      ) : (
        <div className={cx("body")}>
          {like_list.map(like => (
            <UserListItemContainer key={like.id} {...like} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default UserList;
