import React, { Component } from "react";
import App from "components/App";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";

class AppContainer extends Component {
  componentDidMount() {
    const { handle_loggedIn } = this.props;
    handle_loggedIn();
  }

  render() {
    const { isLoggedIn, errorMessage } = this.props;
    return (
      <div>
        <App isLoggedIn={isLoggedIn} errorMessage={errorMessage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch => ({
  handle_loggedIn: () => dispatch(userActions.handle_isLoggedIn())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
