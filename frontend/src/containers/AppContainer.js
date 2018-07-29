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
    const { isLoggedIn } = this.props;
    return (
      <div>
        <App isLoggedIn={isLoggedIn} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  handle_loggedIn: () => dispatch(userActions.handle_isLoggedIn())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
