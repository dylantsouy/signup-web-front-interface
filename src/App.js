import React from "react";
import Login from "./containers/Login";
import Verify from "./containers/Verify";
import ForgetPassword from "./containers/ForgetPassword";
import Register from "./containers/Register";
import PrivateRoute from "./hoc/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./auths/Auth";
import Common from "./components/layout/Common";

function App() {
  return (
    <Auth>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/verify" exact component={Verify} />
          <Route path="/forgetPassword" exact component={ForgetPassword} />
          <Common>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
          </Common>
        </Switch>
      </BrowserRouter>
    </Auth>
  );
}

export default App;
