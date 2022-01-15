import React from "react";
import { Redirect, Route, Switch, withRouter } from "react-router";

import jwt from "jwt-decode";
import moment from "moment";
import Login from "../pages/Login";
import AppLayout from "../components/layout";
import Cookies from "js-cookie";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    </Switch>
  );
}

function auth() {
  // const token: any = Cookies.get("token");
  // if (token) {
  //   const user: any = jwt(token);
  //   const isExpired = moment.unix(user.exp).diff(moment(), "seconds");
  //   if (isExpired > 0) {
  //     return true;
  //   }
  // }
  // return false;
  return true;
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
