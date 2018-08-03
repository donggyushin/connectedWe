import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "components/Search/Search";
import * as userActions from "store/modules/user";

class SearchContainer extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const term = params["searchTerm"];
    const { searchByTerm } = this.props;
    searchByTerm(term);
  }

  componentWillUpdate(nextProps, nextState) {
    const { searchByTerm } = this.props;
    const currentTerm = this.props.match.params["searchTerm"];
    const nextTerm = nextProps.match.params["searchTerm"];
    if (currentTerm !== nextTerm) {
      searchByTerm(nextTerm);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userList && nextProps.imageList) {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return <Search {...this.state} {...this.props} />;
  }
}

const mapStateToProps = state => ({
  userList: state.user.userList,
  imageList: state.user.imageList
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  searchByTerm: term => dispatch(userActions.searchByTerm(term))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
