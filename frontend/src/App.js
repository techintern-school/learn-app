import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import './App.css';
import "./assets/scss/material-kit-pro-react.scss?v=1.8.0";

import HomePage from "./pages/Home/Home.js";
import SignupPage from "./pages/Signup/Signup.js";

var hist = createBrowserHistory();

class App extends React.Component {
  render() {
     return (
      <Router history={hist}>
        <Switch>
          <Route path="/enroll" component={SignupPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
     );
  }
}

export default App;