import React, { Component } from "react";
import Login from "components/Login";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";

class LoginContainer extends Component {
  state = {
    username: "",
    password: ""
  };
  _onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    {
      name === "username"
        ? this.setState({
            ...this.state,
            username: value
          })
        : this.setState({
            ...this.state,
            password: value
          });
    }
  };

  _handleSubmit = e => {
    e.preventDefault();
    const { username_login } = this.props;
    const { username, password } = this.state;
    username_login(username, password);
    this.setState({
      username: "",
      password: ""
    });
  };

  _responseFacebook = response => {
    console.log(response);
    const { loginwithfacebook } = this.props;
    loginwithfacebook(response.accessToken);
  };

  render() {
    const { username, password } = this.state;
    const { errorMessage } = this.props;
    return (
      <Login
        onChange={this._onChange}
        handleSubmit={this._handleSubmit}
        username={username}
        password={password}
        errorMessage={errorMessage}
        responseFacebook={this._responseFacebook}
      />
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  username_login: (username, password) =>
    dispatch(userActions.username_login(username, password)),
  loginwithfacebook: access_token =>
    dispatch(userActions.loginwithfacebook(access_token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
