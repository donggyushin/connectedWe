import React, { Component } from "react";
import { connect } from "react-redux";
import Explore from "components/Explore";
import * as userActions from "store/modules/user";

class ExploreContainer extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { apiSetUserExplore, userList } = this.props;
    apiSetUserExplore();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userList) {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    const { userList, errorMessage } = this.props;
    const { loading } = this.state;
    return (
      <Explore
        userList={userList}
        errorMessage={errorMessage}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  userList: state.user.userList,
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  apiSetUserExplore: () => dispatch(userActions.apiSetUserExplore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreContainer);
