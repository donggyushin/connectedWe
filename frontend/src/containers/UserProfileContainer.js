import React, { Component } from "react";
import { connect } from "react-redux";
import UserProfile from "components/UserProfile/UserProfile";
import * as userActions from "store/modules/user";

const data = new FormData();

class UserProfileContainer extends Component {
  state = {
    loading: true,
    edit: false,

    bio: "",
    website: ""
  };

  _handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value);
    console.log(name);
    if (name === "bio") {
      this.setState({
        ...this.state,
        bio: value
      });
    } else if (e.target.name === "profile_image") {
      data.append("profile_image", e.target.files[0]);
    } else if (name === "website") {
      this.setState({
        ...this.state,
        website: value
      });
    }
  };

  _toggleEditState = nextState => {
    const { bio, website } = this.state;
    const { edit_profile, myid } = this.props;

    if (this.state.edit && !nextState.edit) {
      data.append("bio", bio);
      data.append("website", website);

      edit_profile(data, myid);
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
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }
  render() {
    const { loading, edit, bio, website } = this.state;
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
  edit_profile: (data, id) => dispatch(userActions.edit_profile(data, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
