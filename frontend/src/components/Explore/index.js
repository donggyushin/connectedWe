import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import ExploreItemContainer from "containers/ExploreItemContainer";
import { Circle } from "better-react-spinkit";
import { changeExt } from "upath";
import MessageModalContainer from "containers/MessageModalContainer";

const cx = classNames.bind(styles);

const Explore = ({ userList, loading, errorMessage }) => {
  if (loading) {
    return (
      <div>
        <Circle />
      </div>
    );
  } else {
    return (
      <div>
        {userList.map(user => {
          return <ExploreItemContainer key={user.id} {...user} />;
        })}
        {errorMessage && (
          <div className={cx("errorMessage")}>
            <MessageModalContainer />
          </div>
        )}
      </div>
    );
  }
};

export default Explore;
