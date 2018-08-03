import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ImageUploader = ({
  clickXButton,
  handleInputChange,
  handleSubmit,
  location,
  caption,
  hashtags
}) => (
  <div className={cx("container")}>
    <div className={cx("box")}>
      <div className={cx("header")}>
        <span role="img" onClick={clickXButton}>
          ❌
        </span>
      </div>
      <div className={cx("body")}>
        <form className={cx("form")} onSubmit={handleSubmit}>
          <div className={cx("row")}>
            <span className={cx("title")}>Add Image</span>
          </div>
          <div className={cx("row")}>
            <span className={cx("description")}>File</span>
            <input type="file" onChange={handleInputChange} name="file" />
          </div>
          <div className={cx("row")}>
            <span className={cx("description")}>Location</span>
            <input
              type="text"
              onChange={handleInputChange}
              value={location}
              name="location"
            />
          </div>
          <div className={cx("row")}>
            <span className={cx("description")}>Caption</span>
            <textarea
              className={cx("caption")}
              type="text"
              onChange={handleInputChange}
              name="caption"
              value={caption}
            />
          </div>
          <div className={cx("row")}>
            <span className={cx("description")}>Hashtags</span>
            <div className={cx("column")}>
              <input
                type="text"
                onChange={handleInputChange}
                value={hashtags}
                name="hashtags"
              />
              <span>A comma-separated list of tags.</span>
            </div>
          </div>
          <div className={cx("button_container")}>
            <button type="submit">SAVE</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ImageUploader;
