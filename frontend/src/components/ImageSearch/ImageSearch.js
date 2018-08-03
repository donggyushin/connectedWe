import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import SingleImage from "components/SingleImage/SingleImage";

const cx = classNames.bind(styles);

const ImageSearch = ({ imageList }) => (
  <div className={cx("container")}>
    <div className={cx("ImageSearch")}>
      {imageList.map(image => {
        return <SingleImage key={image.id} {...image} />;
      })}
    </div>
  </div>
);

export default ImageSearch;
