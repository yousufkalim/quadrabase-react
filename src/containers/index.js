import React, { useEffect } from "react";
// Import layouts
import AdminLayout from "../containers/admin";
import AuthLayout from "../containers/auth";
import { getToken } from "../utils/Auth";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { focusHandling } from "cruip-js-toolkit";
import "../charts/ChartjsConfig";
import { isExpired } from "react-jwt";
export default function Index() {
  const token = getToken();
  const location = useLocation();
  const isMyTokenExpired = isExpired(token);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change
  return (
    <Switch>
      {token && isMyTokenExpired == false ? (
        <>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </>
      ) : (
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      )}
      <Redirect from="/" to="/auth/index" />
    </Switch>
  );
}
