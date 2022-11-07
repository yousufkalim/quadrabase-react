import React, { useEffect, useState } from 'react';
import ArchitectsTable from '../../../components/Table';
import Button from '../../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../../components/Modal';
import DeleteModal from '../../../components/DeleteModal';
import Notifier from '../../../utils/Notifier';
import { useFormik } from 'formik';
import { PROVIDER_STATE } from '../../../components/formik/initialValues';
import { PROVIDER_YUP } from '../../../components/formik/validations';
import AddProvider from './addProvider';
import EditProvider from './editProvider';
import SubscriptionModal from './SubscriptionModal';
import ListOfWork from './listOfWork';

import { ProviderheadCells } from '../../../utils/tableHeads';
import Axios from 'axios';
import { baseUrl } from '../../../utils/BaseUrl';
import { getToken } from '../../../utils/Auth';
import moment from 'moment';

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [providerModal, setproviderModal] = React.useState(false);
  const [provider, setprovider] = useState([]);
  const [values, setValues] = useState([]);
  const [logoUrl, setLogoUrl] = useState('');

  const [headCells, setheadCells] = React.useState('');

  const [providerId, setproviderId] = React.useState('');

  const [providerDeleteId, setproviderDeleteId] = React.useState('');

  const [providersData, setprovidersData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);

  // states for subscription
  const [subscriptionModal, setSubscriptionModal] = React.useState(false);
  const [selectedSubscription, setSelectedSubscription] = React.useState('');
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = id => {
    if (id) {
      setproviderDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: 'delete',
        url: `${baseUrl}/Providers/${providerDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Notifier(response.data.message, 'success', translate);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, 'error ', translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async id => {
    if (id) {
      setproviderId(id);
      let filteredData = providersData.find(data => data._id == id);
      seteditData(filteredData);
    }
    seteditModal(!editmodal);
  };
  const handleProvider = async id => {
    if (id) {
      try {
        let response = await Axios({
          method: 'get',
          url: `${baseUrl}/Providers/works/${id}`,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        let data = response.data.works;
        if (data && data.length == 0) {
          alert(translate('No works found for this provider.'));
          return;
        }
        setprovider(data);
      } catch (error) {
        if (error.response) console.log(error.response.data.message, 'error ');
      }
    }
    setproviderModal(!providerModal);
  };

  const handleSubmit = async () => {
    try {
      let response = await Axios({
        method: 'put',
        url: `${baseUrl}/Providers/addsubscription/${providerId}`,
        data: {
          subscriptionId: selectedSubscription,
          start_date: startDate,
          end_date: endDate
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Notifier(response.data.message, 'success', translate);
      handleSubscriptionModal();
      getProviders();
    } catch (error) {
      console.log(error);
      if (error.response) console.log(error.response.data.message, 'error ');
    }
  };

  // Subscription Modal
  const handleSubscriptionModal = row => {
    if (row?._id) {
      setproviderId(row._id);
      if (row.subscription?.name) {
        setSelectedSubscription(row?.subscription?.id?._id);
        setStartDate(moment(row.subscription.start_date)._i);
        setEndDate(moment(row.subscription.end_date)._i);
      }
    } else {
      setSelectedSubscription('');
      setStartDate();
      setEndDate();
    }
    setSubscriptionModal(!subscriptionModal);
  };

  const getProviders = async () => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/Providers/`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data = response.data.providers;
      setprovidersData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
    }
    //}
  };

  const getAllLogos = async e => {
    // call api
    let response = await Axios({
      method: 'get',
      url: `${baseUrl}/fabricant/alllogo`
    });
    let data = response.data;
    var alllogos = []; // //debugger;
    for (var i = 0; i < data?.length; i++) {
      alllogos.push({
        id: i,
        label: data[i],
        value: data[i]
      });
    }
    if (alllogos.length === data?.length) {
      setValues(alllogos);
    }
  };
  useEffect(() => {
    getAllLogos();
  }, []);

  useEffect(() => {
    getProviders();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    ProviderheadCells.slice(0, ProviderheadCells.length - 1).map(cell => array.push(cell.id));
    setheadCells(array);
  }, []);
  //create provider
  const formik = useFormik({
    initialValues: PROVIDER_STATE,
    validationSchema: PROVIDER_YUP,
    onSubmit: async values => {
      try {
        console.log('values formik', values, logoUrl);
        let response = await Axios({
          method: 'post',
          url: `${baseUrl}/Providers/create`,
          data: { ...values, logo: logoUrl },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Notifier(response.data.message, 'success', translate);
        handleModal();
        setLogoUrl('');

        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, 'error', translate);

        console.log('Errror->>>', err);
      }
    }
  });
  // edit peovider
  const edit_formik = useFormik({
    initialValues: PROVIDER_STATE,
    validationSchema: PROVIDER_YUP,
    onSubmit: async values => {
      try {
        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/Providers/${providerId}`,
          data: { ...values, logo: logoUrl },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        Notifier(response.data.message, 'success', translate);
        handleEditModal();
      } catch (err) {
        Notifier(err.response.data.message, 'error', translate);

        console.log('Errror->>>', err);
      }
    }
  });
  return (
    <>
      <Modal
        title="Add Provider"
        open={modal}
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        onClose={handleModal}
        translate={translate}
        component={
          <AddProvider
            translate={translate}
            formik={formik}
            setLogoUrl={setLogoUrl}
            logoUrl={logoUrl}
            values={values}
          />
        }
      />
      <Modal
        title="List Of Works"
        open={providerModal}
        width={'70%'}
        onClose={handleProvider}
        translate={translate}
        component={<ListOfWork translate={translate} provider={provider} />}
      />
      <Modal
        title="Edit Provider"
        open={editmodal}
        buttonLabel="Update"
        onSubmit={edit_formik.handleSubmit}
        onClose={handleEditModal}
        translate={translate}
        component={
          <EditProvider
            translate={translate}
            editData={editData}
            formik={edit_formik}
            editmodal={editmodal}
            setLogoUrl={setLogoUrl}
            logoUrl={logoUrl}
            values={values}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        height="40%"
        delete={true}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
      <Modal
        title={translate('Provider Subscription')}
        open={subscriptionModal}
        onClose={handleSubscriptionModal}
        width="35%"
        translate={translate}
        onSubmit={handleSubmit}
        buttonLabel="Save"
        component={
          <SubscriptionModal
            translate={translate}
            selectedSubscription={selectedSubscription}
            setSelectedSubscription={setSelectedSubscription}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">{translate('Providers')}</h1>
            <Button
              variant="outlined"
              label="Add Provider"
              onClick={handleModal}
              translate={translate}
              startIcon={<AddIcon />}
            />
          </div>

          <ArchitectsTable
            headCells={ProviderheadCells}
            data={providersData}
            translate={translate}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
            provider={true}
            handleProvider={handleProvider}
            handleSubscription={handleSubscriptionModal}
          />
        </div>
      </div>
    </>
  );
}
