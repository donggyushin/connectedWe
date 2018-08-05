import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import * as FontAwesome from "react-icons/lib/fa";
import UserListContainer from "containers/UserListContainer";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const FeedPhoto = props => {
  const {
    caption,
    comment_count,
    comment_set,
    creator,
    file,
    hashtags,
    id,
    like_count,
    location,
    naturalTime,
    updated_at,
    comment_visiable,
    clickCommentIcon,
    comment_value,
    handleInput,
    is_liked,
    likePhoto,
    unlike_photo,
    press_enter,
    userListBoolean,
    toggleUserListBoolean,
    clickUsername
  } = props;
  return (
    <div className={cx("container")}>
      <PhotoHeader
        file={creator.profile_image}
        naturalTime={naturalTime}
        username={creator.username}
        name={creator.name}
        clickUsername={clickUsername}
        id={creator.id}
      />
      <PhotoImage
        file={file}
        caption={caption}
        location={location}
        hashtags={hashtags}
      />
      <PhotoActionVar
        comment_count={comment_count}
        like_count={like_count}
        clickCommentIcon={clickCommentIcon}
        is_liked={is_liked}
        id={id}
        likePhoto={likePhoto}
        unlike_photo={unlike_photo}
        userListBoolean={userListBoolean}
        toggleUserListBoolean={toggleUserListBoolean}
      />
      {comment_visiable && (
        <CommentContainer
          comments={comment_set}
          comment_value={comment_value}
          handleInput={handleInput}
          id={id}
          press_enter={press_enter}
          clickUsername={clickUsername}
        />
      )}
    </div>
  );
};

const PhotoHeader = ({
  file,
  naturalTime,
  username,
  name,
  clickUsername,
  id
}) => {
  return (
    <div className={cx("header_container")}>
      <div className={cx("photo")}>
        <img src={file || require("media/nobody.png")} />
      </div>
      <div className={cx("username_name_naturaltime")}>
        <Link to="/other/profile" style={{ textDecoration: "none" }}>
          <div className={cx("row")} onClick={() => clickUsername(id)}>
            {username}
          </div>
        </Link>
        <div className={cx("row2")}>{name || "name"}</div>
        <div className={cx("row2")}>{naturalTime}</div>
      </div>
    </div>
  );
};

const PhotoImage = ({ file, location, caption, hashtags }) => (
  <div className={cx("image_container")}>
    <img src={file} />
    <div className={cx("location")}>{location}</div>
    <div className={cx("caption")}>{caption}</div>
    <div className={cx("hashtags")}>
      {hashtags.map(hashtag => <Hashtags hashtag={hashtag} />)}
    </div>
  </div>
);

const PhotoActionVar = ({
  comment_count,
  like_count,
  clickCommentIcon,
  is_liked,
  likePhoto,
  unlike_photo,
  userListBoolean,
  toggleUserListBoolean,
  id
}) => (
  <div className={cx("action_container")}>
    {is_liked ? (
      <FontAwesome.FaHeart
        cursor="pointer"
        className={cx("liked")}
        onClick={unlike_photo}
      />
    ) : (
      <FontAwesome.FaHeart
        cursor="pointer"
        className={cx("icon")}
        onClick={likePhoto}
      />
    )}

    <div
      className={cx("counter", "likecounter")}
      onClick={toggleUserListBoolean}
    >
      {like_count === 0 ? "" : `${like_count} likes`}
    </div>
    <FontAwesome.FaComment
      className={cx("icon")}
      cursor="pointer"
      onClick={clickCommentIcon}
    />
    <div className={cx("counter")}>
      {comment_count === 0 ? "" : `${comment_count}`}
    </div>
    <div className={cx("UserListContainer")}>
      {userListBoolean && (
        <UserListContainer
          toggleUserListBoolean={toggleUserListBoolean}
          id={id}
        />
      )}
    </div>
  </div>
);

const CommentContainer = ({
  comments,
  comment_value,
  handleInput,
  press_enter,
  clickUsername
}) => (
  <div className={cx("comment_container")}>
    <input
      placeholder="Leave a comment!"
      value={comment_value}
      onChange={handleInput}
      onKeyPress={press_enter}
    />
    {comments.map(comment => (
      <Comment
        username={comment.creator.username}
        key={comment.id}
        id={comment.creator.id}
        message={comment.message}
        clickUsername={clickUsername}
      />
    ))}
  </div>
);

const Comment = ({ username, message, clickUsername, id }) => (
  <div className={cx("comment")}>
    <Link to="/other/profile" style={{ textDecoration: "none" }}>
      <span className={cx("username")} onClick={() => clickUsername(id)}>
        {username}
      </span>
    </Link>
    <span className={cx("message")}>{message}</span>
  </div>
);

const Hashtags = ({ hashtag }) => `#${hashtag} `;

export default FeedPhoto;
