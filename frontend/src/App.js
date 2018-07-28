import React, { Component } from "react";
import styles from "styles/utils.scss";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Route } from "react-router-dom";

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
      <Router>
        <div>App</div>
      </Router>
    );
  }
}

export default App;
