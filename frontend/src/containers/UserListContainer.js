import React, { Component } from "react";
import { connect } from "react-redux";
import UserList from "components/UserList";
import * as feedActions from "store/modules/feed";

class UserListContainer extends Component {
  state = {
    loading: true
  };
  _clickCloseButton = () => {
    const { toggleUserListBoolean, remove_like_list } = this.props;
    toggleUserListBoolean();
    remove_like_list();
  };

  componentDidMount() {
    const { like_list } = this.props;
    if (!like_list) {
      this.props.getLikeListApi();
    } else {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.like_list) {
      this.setState({
        ...this.state,
        loading: false
      });
    }
  }

  render() {
    const { like_list } = this.props;
    const { loading } = this.state;
    return (
      <UserList
        clikcCloseButton={this._clickCloseButton}
        like_list={like_list}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  like_list: state.feed.like_list
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove_like_list: () => dispatch(feedActions.remove_like_list()),
  getLikeListApi: () => dispatch(feedActions.getLikeListApi(ownProps.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListContainer);
