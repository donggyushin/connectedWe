import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import Loading from "components/Loading/Loading";
const cx = classNames.bind(styles);

const UserProfile = ({
  loading,
  id,
  username,
  name,
  bio,
  website,
  profile_image,
  image_set,
  following_count,
  followers_count,
  images_count
}) => {
  if (loading) {
    return (
      <div className={cx("Loading")}>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className={cx("container")}>
        <div className={cx("header")}>
          <div className={cx("upper")}>
            <div className={cx("profile")}>profile_image</div>
            <div className={cx("info")}>
              <span>username</span>
              <span>name</span>
              <span>bio</span>
              <span>website</span>
            </div>
          </div>
          <div className={cx("lower")}>
            <span>imagecount images</span>
            <span>following: following count</span>
            <span>followers: followers count</span>
          </div>
        </div>
        <hr />
        <div className={cx("body")}>body</div>
      </div>
    );
  }
};
export default UserProfile;
