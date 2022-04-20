import React, { useEffect, useState } from "react";
import routes from "../../routes.js";
import { Switch, Redirect, Route } from "react-router-dom";
import axios from "axios";
import { UpdateStore, Store } from "../../StoreContext";
import Drawer from "../../components/ArchitectDrawer";

function Dashboard(props) {
  const { translate, i18n } = props;
  const updateStore = UpdateStore();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await axios.get(
          `${process.env.REACT_APP_API_URL}/Architects/current/loggedIn`
        );
        // settin user value in store if logged in
        if (result.data.user) {
          updateStore({ loggedIn: true, user: result.data.user });
          setUser(result.data.user);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/architect") {
        let Component = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
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
    !loading && (
      <Drawer routes={routes} user={user}>
        <div
          className="flex h-screen overflow-hidden"
          style={{ backgroundColor: "#eeeeee" }}
        >
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Switch>
              {getRoutes(routes)}
              <Redirect from="*" to="/architect/index" />
            </Switch>
          </div>
        </div>
      </Drawer>
    )
  );
}

export default Dashboard;
