import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import TransactionPage from "./Auth.js/TransactionPage";
import Register from "./Auth.js/Register";
import SignIn from "./Auth.js/SignIn";
import SignOut from "./Auth.js/SignOut";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/transaction" exact component={TransactionPage} />
          <Route path="/register" exact component={Register} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signout" exact component={SignOut} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
