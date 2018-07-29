import React from "react";
import styles from "./style.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import MessageModalContainer from "containers/MessageModalContainer";
const cx = classNames.bind(styles);

const SignUp = ({
  handleInput,
  username,
  password1,
  password2,
  email,
  handleSubmit,
  errorMessage
}) => (
  <div className={cx("container")}>
    <div className={cx("textlog")}>connected We</div>
    <div className={cx("loginformcontainer")}>
      <form className={cx("loginform")} onSubmit={handleSubmit}>
        <input
          placeholder="Id"
          name="username"
          value={username}
          onChange={handleInput}
        />
        <input
          placeholder="password"
          name="password1"
          type="password"
          value={password1}
          onChange={handleInput}
        />
        <input
          placeholder="check password"
          name="password2"
          type="password"
          value={password2}
          onChange={handleInput}
        />
        <input
          placeholder="input@your_email"
          name="email"
          type="email"
          value={email}
          onChange={handleInput}
        />
        <input className={cx("button")} type="submit" value="submit" />
      </form>
    </div>
    <Link to="/" className={cx("newAccount")}>
      Already have account?
    </Link>
    {errorMessage !== "" && (
      <div className={cx("message")}>
        <MessageModalContainer />
      </div>
    )}
  </div>
);

export default SignUp;
