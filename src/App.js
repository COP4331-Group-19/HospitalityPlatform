import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SigninPage from "./pages/signin";
import AdminPage from "./pages/admin";
import EmployeePage from "./pages/employee";
import GuestPage from './pages/guest';
import AboutGuestPage from './pages/aboutguest';
import MyProfileGuestPage from './pages/myprofileguest';
import PasswordResetPage from './pages/resetpassword';
import EditAccountGuestPage from "./pages/editaccountguest";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/admin" component={AdminPage} exact />
        <Route path="/employee" component={EmployeePage} exact />
        <Route path='/resetpassword' component={PasswordResetPage} exact />
        <Route path="/guest" component={GuestPage} exact />
        <Route path="/aboutguest" component={AboutGuestPage} exact />
        <Route path="/myprofileguest" component={MyProfileGuestPage} exact />
          <Route
          path="/editaccountguest"
          component={EditAccountGuestPage}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
