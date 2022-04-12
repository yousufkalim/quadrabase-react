import React, { useEffect } from "react";
// Import layouts
import AdminLayout from "../containers/admin";
import AuthLayout from "../containers/auth";
import ArchitectLayout from "../containers/Architect";
import { getToken, handleLogout, getUser } from "../utils/Auth";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { focusHandling } from "cruip-js-toolkit";
import "../charts/ChartjsConfig";
import { withTranslation } from "react-i18next";

import { isExpired } from "react-jwt";
function Index(props) {
  const { t, i18n } = props;

  const token = getToken();
  const user = getUser();
  const location = useLocation();
  const isMyTokenExpired = isExpired(token);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
    if (isMyTokenExpired) {
      handleLogout();
    }
  }, [location.pathname]); // triggered on route change
  return token && isMyTokenExpired == false ? (
    user?.role === "admin" ? (
      <>
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <AdminLayout {...props} i18n={i18n} translate={t} />
            )}
          />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      </>
    ) : (
      <>
        <Switch>
          <Route
            path="/architect"
            render={(props) => (
              <ArchitectLayout {...props} i18n={i18n} translate={t} />
            )}
          />
          <Redirect from="/" to="/architect/index" />
        </Switch>
      </>
    )
  ) : (
    <>
      <Switch>
        <Route
          path="/auth"
          render={(props) => (
            <AuthLayout {...props} i18n={i18n} translate={t} />
          )}
        />
        <Redirect from="/" to="/auth/home" />
      </Switch>
    </>
  );
}
export default withTranslation()(Index);
