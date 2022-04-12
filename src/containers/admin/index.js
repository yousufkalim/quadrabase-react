import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import routes from "../../routes.js";

import { Switch, Redirect, Route } from "react-router-dom";
function Dashboard(props) {
  const { translate, i18n } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        let Component = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <Component translate={translate} i18n={i18n} {...props} />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        {...props}
        translate={translate}
        i18n={i18n}
        routes={routes}
      />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header
          {...props}
          sidebarOpen={sidebarOpen}
          translate={translate}
          i18n={i18n}
          setSidebarOpen={setSidebarOpen}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
