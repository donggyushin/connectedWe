import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import NavigationBar from "components/NavigationBar";

class NavigationBarContainer extends Component {
  _clickLogoutButton = () => {
    const { logoutAction } = this.props;
    logoutAction();
  };
  render() {
    const { isLoggedIn } = this.props;
    return (
      <NavigationBar
        clickLogoutButton={this._clickLogoutButton}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(userActions.logoutApiAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarContainer);
