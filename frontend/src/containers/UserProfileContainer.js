import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "components/UserProfile/UserProfile";

class UserProfileContainer extends Component {
  state = {
    loading: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_view) {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    const { loading } = this.state;
    const { profile_view } = this.props;

    return <UserProfile loading={loading} profile_view={profile_view} />;
  }
}

const mapStateToProps = state => ({
  profile_view: state.user.profile_view
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
