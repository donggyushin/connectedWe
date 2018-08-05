import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "components/UserProfile/UserProfile";
import * as userActions from "store/modules/user";

const data = new FormData();

class UserProfileContainer extends Component {
  state = {
    loading: true,
    edit: false,
    first_name: "",
    last_name: "",
    bio: "",
    website: ""
  };

  _handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "bio") {
      this.setState({
        ...this.state,
        bio: value
      });
      data.append("bio", value);
    } else if (e.target.name === "profile_image") {
      data.append("profile_image", e.target.files[0]);
    } else if (name === "website") {
      this.setState({
        ...this.state,
        website: value
      });
      data.append("website", value);
    } else if (name === "last_name") {
      this.setState({
        ...this.state,
        last_name: value
      });
    } else if (name === "first_name") {
      this.setState({
        ...this.state,
        first_name: value
      });
    }
  };

  _toggleEditState = nextState => {
    const { first_name, last_name } = this.state;
    const {
      edit_profile_api,
      myid,
      profile_view: { username }
    } = this.props;

    if (this.state.edit && !nextState.edit) {
      edit_profile_api(data, myid, first_name, last_name, username);
    }

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
      const {
        profile_view: { bio, first_name, last_name, website }
      } = nextProps;
      this.setState({
        ...this.state,
        loading: false,
        bio,
        first_name,
        last_name,
        website
      });
    }
  }
  render() {
    const { loading, edit, bio, website, first_name, last_name } = this.state;
    const { profile_view, myid } = this.props;

    return (
      <UserProfile
        loading={loading}
        edit={edit}
        myid={myid}
        {...profile_view}
        toggleEditState={this._toggleEditState}
        handleInputChange={this._handleInputChange}
        value_bio={bio}
        value_website={website}
        value_firstname={first_name}
        value_lastname={last_name}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile_view: state.user.profile_view,
  myid: state.user.my_id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getProfileView: id => dispatch(userActions.apiProfileView(id)),
  edit_profile_api: (data, user_id, first_name, last_name, username) =>
    dispatch(
      userActions.edit_profile_api(
        data,
        user_id,
        first_name,
        last_name,
        username
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
