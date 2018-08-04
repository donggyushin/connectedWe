import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import Loading from "components/Loading/Loading";
import SinglePhotoContainer from "containers/SinglePhotoContainer";
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
  images_count,
  myid,
  edit,
  toggleEditState,
  handleInputChange,

  value_bio,
  value_website
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
            <div className={cx("profile")}>
              {edit ? (
                <input
                  type="file"
                  name="profile_image"
                  onChange={handleInputChange}
                />
              ) : (
                <img src={profile_image || require("media/nobody.png")} />
              )}
            </div>
            <div className={cx("info")}>
              <span className={cx("username")}>{username}</span>
              <span className={cx("name")}>
                {name || "name"}

                {myid === id && edit ? (
                  <div onClick={toggleEditState} className={cx("Edit")}>
                    Submit
                  </div>
                ) : (
                  <div onClick={toggleEditState} className={cx("Edit")}>
                    Edit
                  </div>
                )}
              </span>
              <span className={cx("bio")}>
                {edit ? (
                  <input
                    onChange={handleInputChange}
                    name="bio"
                    placeholder={bio}
                    value={value_bio}
                  />
                ) : (
                  bio || "bio"
                )}
              </span>

              <span className={cx("website")}>
                {edit ? (
                  <input
                    name="website"
                    onChange={handleInputChange}
                    placeholder={website}
                    value={value_website}
                  />
                ) : (
                  <a href={website}>{website}</a> || "website"
                )}
              </span>
            </div>
          </div>
          <hr />
          <div className={cx("lower")}>
            <span>{images_count ? images_count : "0"} images</span>
            <span>following: {following_count ? following_count : "0"}</span>
            <span>followers: {followers_count ? followers_count : "0"}</span>
          </div>
        </div>
        <hr />
        <div className={cx("body")}>
          {image_set.map(photo => (
            <SinglePhotoContainer key={photo.id} {...photo} />
          ))}
        </div>
      </div>
    );
  }
};
export default UserProfile;
