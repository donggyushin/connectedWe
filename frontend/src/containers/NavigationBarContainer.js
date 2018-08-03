import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import * as feedActions from "store/modules/feed";
import NavigationBar from "components/NavigationBar";
import { withRouter } from "react-router-dom";

class NavigationBarContainer extends Component {
  state = {
    term: ""
  };

  _handleInput = e => {
    this.setState({
      term: e.target.value
    });
  };

  _handleSubmit = e => {
    const { term } = this.state;
    if (e.key === "Enter") {
      this.props.history.push(`/search/${term}`);
      this.setState({ term: "" });
    }
  };

  _clickLogoutButton = () => {
    const { logoutAction, history } = this.props;
    logoutAction();
    history.push("/");
  };

  _clickCameraIcon = () => {
    const { image_upload_on } = this.props;
    image_upload_on();
  };

  _clickUserButton = () => {
    const { apiProfileView, my_id } = this.props;
    apiProfileView(my_id);
  };
  render() {
    const { isLoggedIn } = this.props;
    const { term } = this.state;
    return (
      <NavigationBar
        clickLogoutButton={this._clickLogoutButton}
        isLoggedIn={isLoggedIn}
        handleInput={this._handleInput}
        handleSubmit={this._handleSubmit}
        value={term}
        clickCameraIcon={this._clickCameraIcon}
        clickUserButton={this._clickUserButton}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  my_id: state.user.my_id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logoutAction: () => dispatch(userActions.logoutApiAction()),
  image_upload_on: () => dispatch(feedActions.image_upload_on()),
  apiProfileView: id => dispatch(userActions.apiProfileView(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavigationBarContainer));
