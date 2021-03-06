import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "./assets/scss/material-kit-pro-react.scss?v=1.8.0";

import HomePage from "./pages/Home/Home.js";
import SignupPage from "./pages/Signup/Signup.js";
import LearnPage from "./pages/Learn/Learn.js";
import LoginPage from "./pages/Login/Login.js";
import AccountPage from "./pages/Account/Account.js";

var hist = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/learn" component={LearnPage} />
          <Route path="/enroll" component={SignupPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
