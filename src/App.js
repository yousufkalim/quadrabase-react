import React, { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import "./css/style.scss";
import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";
import { getToken } from "./utils/Auth";
// Import layouts
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";

function App() {
  const location = useLocation();
  const token = getToken();
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <BrowserRouter>
      <Switch>
        {token ? (
          <>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/" to="/admin/index" />
          </>
        ) : (
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        )}
        <Redirect from="/" to="/auth/index" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
