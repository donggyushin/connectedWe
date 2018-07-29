import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import MessageModalContainer from "containers/MessageModalContainer";
import FacebookLogin from "react-facebook-login";

const cx = classNames.bind(styles);

const Login = ({
  username,
  password,
  onChange,
  handleSubmit,
  errorMessage,
  responseFacebook
}) => (
  <div className={cx("container")}>
    <div className={cx("textlog")}>connected We</div>
    <div className={cx("loginformcontainer")}>
      <form className={cx("loginform")} onSubmit={handleSubmit}>
        <input
          placeholder="Id"
          value={username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          value={password}
          name="password"
          type="password"
          onChange={onChange}
        />
        <input type="submit" className={cx("button")} value="submit" />
      </form>
    </div>
    <Link to="/signup" className={cx("newAccount")}>
      Don't you have account?
    </Link>
    <FacebookLogin
      appId="293515351211880"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass={cx("facebookLink")}
    />
    {errorMessage !== "" && (
      <div className={cx("message")}>
        <MessageModalContainer />
      </div>
    )}
  </div>
);

export default Login;
