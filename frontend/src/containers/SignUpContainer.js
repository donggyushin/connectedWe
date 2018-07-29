import React, { Component } from "react";
import SignUp from "components/SignUp";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";

class SignUpContainer extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    email: ""
  };

  _handleInput = e => {
    const type = e.target.name;
    const value = e.target.value;

    {
      type === "username" &&
        this.setState({
          ...this.state,
          username: value
        });
    }

    {
      type === "password1" &&
        this.setState({
          ...this.state,
          password1: value
        });
    }

    {
      type === "password2" &&
        this.setState({
          ...this.state,
          password2: value
        });
    }

    {
      type === "email" &&
        this.setState({
          ...this.state,
          email: value
        });
    }
  };

  _handleSubmit = e => {
    e.preventDefault();
    const { register } = this.props;
    const { username, password1, password2, email } = this.state;
    register(username, password1, password2, email);
  };

  render() {
    const { username, password1, password2, email } = this.state;
    const { errorMessage } = this.props;

    return (
      <div>
        <SignUp
          handleInput={this._handleInput}
          username={username}
          password1={password1}
          password2={password2}
          email={email}
          handleSubmit={this._handleSubmit}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  register: (username, password1, password2, email) =>
    dispatch(userActions.register(username, password1, password2, email))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
