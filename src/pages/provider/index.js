// Init
import React, { useState, useEffect } from 'react';
import { ProviderSubscriptionheadCells } from '../../utils/tableHeads';
import { Store } from '../../StoreContext';
import api from '../../api';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../css/home.css';
import noSubcription from '../../assets/noSubcription.png';
import { UpdateStore } from '../../StoreContext';
import moment from 'moment';

// Importing Components
import { Button } from '@mui/material';
import Table from '../../components/Architect/Tabel';
import Modal from '../../components/Architect/Modal';
import BuyProductModal from './Subscription/BuyProductModal';

const Home = () => {
  const { t } = useTranslation();
  const store = Store();
  const history = useHistory();
  const updateStore = UpdateStore();
  // states
  const [subscriptionHeadCells, setSubscriptionHeadCells] = useState('');
  const [subscription, setSubscription] = useState({});
  const [buySubModal, setBuySubModal] = useState(false);

  useEffect(async () => {
    const response = await api('get', `/Subscriptions/${store?.user.subscription.id}`);
    setSubscription(response.data.subscription);
  }, []);

  useEffect(() => {
    let temp = [];
    ProviderSubscriptionheadCells.slice(0, ProviderSubscriptionheadCells.length).map((cell) =>
      temp.push(cell.id)
    );
    setSubscriptionHeadCells(temp);
  }, []);

  const handleNoSub = () => {
    localStorage.setItem('provId', store?.user._id);
    localStorage.setItem('step', 2);
    localStorage.removeItem('token');
    updateStore({ loggedIn: false, user: {} });
    history.push('/auth/register');
  };

  const handleBuySubModal = () => setBuySubModal(!buySubModal);

  return store?.user?.authorized.toUpperCase() === 'YES' ? (
    <div className="home-container">
      <Modal
        open={buySubModal}
        onClose={handleBuySubModal}
        component={<BuyProductModal handleBuySubModal={handleBuySubModal} user={store?.user} />}
      />
      <div className="home-right-container">
        <Table
          headCells={ProviderSubscriptionheadCells}
          data={
            subscriptionHeadCells
              ? [
                  {
                    name: subscription?.name ? subscription.name : 'N/A',
                    start_date: store?.user
                      ? moment(store?.user.subscription.start_date).format('DD/MM/YYYY')
                      : 'N/A',
                    end_date: store?.user
                      ? moment(store?.user.subscription.end_date).format('DD/MM/YYYY')
                      : 'N/A',
                    authorize: store?.user?.authorized,
                  },
                ]
              : []
          }
          noActions={true}
          noArrows={true}
          rows={subscriptionHeadCells}
          headerText={t('Subscription')}
          buttonText={t('Buy Subscription')}
          buttonAction={handleBuySubModal}
        />
      </div>
    </div>
  ) : (
    <div className="no-subscription">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <img src={noSubcription} />
        <span className="no-subscription-text">
          {t('To use the Quadrabase application')}, <br />
          {t('you must subscribe')}
        </span>
        <Button
          variant="contained"
          style={{
            textTransform: 'none',
            backgroundColor: '#8C1244',
            borderRadius: 8,
            marginTop: 35,
          }}
          onClick={handleNoSub}
        >
          {t('Subscribe to Quadrabase')}
        </Button>
      </div>
    </div>
  );
};

export default Home;
