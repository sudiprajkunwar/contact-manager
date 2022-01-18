import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";

import moment from "moment";
import jwt from "jwt-decode";
import Cookies from "js-cookie";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AppLayout } from "../components/layout";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Register} />

      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    </Switch>
  );
}

function auth() {
  const token = Cookies.get("token");
  if (token) {
    const userDetail: any = jwt(token);
    const isExpired = moment.unix(userDetail.exp).diff(moment(), "seconds");
    if (isExpired > 0) {
      return true;
    }
  }
  return false;
}

function PrivateRoute({ children, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default withRouter(Routes);
