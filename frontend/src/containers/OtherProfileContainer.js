import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "store/modules/user";
import UserProfile from "components/UserProfile/UserProfile";

class OtherProfileContainer extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { clear_profile } = this.props;
    clear_profile();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.profile_view && nextProps.profile_view) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { myid } = this.props;
    return (
      <UserProfile myid={myid} {...this.state} {...this.props.profile_view} />
    );
  }
}

const mapStateToProps = state => ({
  profile_view: state.user.profile_view,
  myid: state.user.my_id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clear_profile: () => dispatch(userActions.clear_profile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherProfileContainer);
