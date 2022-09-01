import React, { useEffect, useState } from 'react';
import routes from '../../routes.js';
import { Switch, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import { UpdateStore, Store } from '../../StoreContext';
import { getUser } from '../../utils/Auth';
import Drawer from '../../components/ProviderDrawer';
import { baseUrl } from '../../config';

function Dashboard(props) {
  const { translate, i18n } = props;
  const updateStore = UpdateStore();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch();
    // eslint-disable-next-line
  }, []);

  const fetch = async () => {
    try {
      let tempUser = getUser();
      const token = localStorage.getItem('token');

      if (token && tempUser) {
        axios.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await axios.get(`${baseUrl}/Providers/${tempUser._id}`);
        // settin user value in store if logged in
        if (result.data.provider) {
          updateStore({ loggedIn: true, user: result.data.provider });
          setUser(result.data.provider);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/provider') {
        let Component = prop.component;
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={(props) => <Component translate={translate} i18n={i18n} {...props} />}
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
          className='flex overflow-hidden'
          style={{
            backgroundColor: '#eeeeee',
            minHeight: `calc(100vh - 64px)`,
          }}
        >
          {/* Content area */}
          <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            {/*  Site header */}
            <Switch>
              {getRoutes(routes)}
              <Redirect from='*' to='/provider/index' />
            </Switch>
          </div>
        </div>
      </Drawer>
    )
  );
}

export default Dashboard;
