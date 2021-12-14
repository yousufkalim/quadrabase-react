import React, { useState } from "react";
import routes from "../../routes.js";
import Header from "../../components/authNavbar";
import { Switch, Redirect, Route } from "react-router-dom";
function Dashboard(props) {
  const { translate, i18n } = props;

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        let Component = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            key={key}
            render={(props) => (
              <Component translate={translate} i18n={i18n} {...props} />
            )}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
