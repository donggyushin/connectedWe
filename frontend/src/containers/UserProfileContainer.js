import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "components/UserProfile/UserProfile";
import * as userActions from "store/modules/user";

class UserProfileContainer extends Component {
  state = {
    loading: true,
    edit: false
  };

  _toggleEditState = () => {
    this.setState({
      ...this.state,
      edit: !this.state.edit
    });
  };

  componentDidMount() {
    const { getProfileView, myid, profile_view } = this.props;
    if (!profile_view) {
      getProfileView(myid);
    } else {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_view) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }
  render() {
    const { loading, edit } = this.state;
    const { profile_view, myid } = this.props;

    return (
      <UserProfile
        loading={loading}
        edit={edit}
        myid={myid}
        {...profile_view}
        toggleEditState={this._toggleEditState}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile_view: state.user.profile_view,
  myid: state.user.my_id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProfileView: id => dispatch(userActions.apiProfileView(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
