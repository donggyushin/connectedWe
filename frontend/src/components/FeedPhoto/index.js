import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import * as FontAwesome from "react-icons/lib/fa";

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
    handleInput
  } = props;
  return (
    <div className={cx("container")}>
      <PhotoHeader
        file={creator.profile_image}
        naturalTime={naturalTime}
        username={creator.username}
        name={creator.name}
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
      />
      {comment_visiable && (
        <CommentContainer
          comments={comment_set}
          comment_value={comment_value}
          handleInput={handleInput}
        />
      )}
    </div>
  );
};

const PhotoHeader = ({ file, naturalTime, username, name }) => {
  return (
    <div className={cx("header_container")}>
      <div className={cx("photo")}>
        <img src={file || require("media/nobody.png")} />
      </div>
      <div className={cx("username_name_naturaltime")}>
        <div className={cx("row")}>{username}</div>
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

const PhotoActionVar = ({ comment_count, like_count, clickCommentIcon }) => (
  <div className={cx("action_container")}>
    <FontAwesome.FaHeart />
    <div className={cx("counter")}>
      {like_count === 0 ? "" : `${like_count} likes`}
    </div>
    <FontAwesome.FaComment cursor="pointer" onClick={clickCommentIcon} />
    <div className={cx("counter")}>
      {comment_count === 0 ? "" : `${comment_count}`}
    </div>
  </div>
);

const CommentContainer = ({ comments, comment_value, handleInput }) => (
  <div className={cx("comment_container")}>
    <input
      placeholder="Leave a comment!"
      value={comment_value}
      onChange={handleInput}
    />
    {comments.map(comment => (
      <Comment
        username={comment.creator.username}
        key={comment.id}
        message={comment.message}
      />
    ))}
  </div>
);

const Comment = ({ username, message }) => (
  <div className={cx("comment")}>
    <span className={cx("username")}>{username}</span>
    <span className={cx("message")}>{message}</span>
  </div>
);

const Hashtags = ({ hashtag }) => `#${hashtag} `;

export default FeedPhoto;
