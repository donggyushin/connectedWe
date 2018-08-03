import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import ImageSearchContainer from "containers/ImageSearchContainer";
import Loading from "components/Loading/Loading";
import ExploreItemContainer from "containers/ExploreItemContainer";
import NoUser from "components/NoUser/NoUser";
import NoImage from "components/NoImage/NoImage";

const cx = classNames.bind(styles);

const Search = ({ loading, userList, imageList }) => {
  if (loading) {
    return (
      <div className={cx("loading")}>
        <Loading />
      </div>
    );
  }
  console.log(userList);

  return (
    <div className={cx("container")}>
      <div className={cx("User")}>
        {userList.length === 0 && <NoUser />}
        {userList.map(user => {
          return <ExploreItemContainer key={user.id} {...user} />;
        })}
      </div>
      <hr />
      {imageList.length === 0 && <NoImage />}
      <div className={cx("Image")}>
        <ImageSearchContainer imageList={imageList} />
      </div>
    </div>
  );
};
export default Search;
