import React, { useEffect } from 'react';
import SupportsTable from '../../../../components/Table';
import Button from '../../../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../../../components/Modal';
import DeleteModal from '../../../../components/DeleteModal';
import Notifier from '../../../../utils/Notifier';
import { useFormik } from 'formik';
import { SUPPORT_STATE } from '../../../../components/formik/initialValues';
import { SUPPORT_YUP } from '../../../../components/formik/validations';
import AddSubscription from './AddSubscription';
import EditSubscription from './EditSubscription';

import { SupportheadCells } from '../../../../utils/tableHeads';
import Axios from 'axios';
import { baseUrl } from '../../../../utils/BaseUrl';
import { getToken } from '../../../../utils/Auth';
import { useTranslation } from 'react-i18next';

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState('');

  const [supportId, setSupportId] = React.useState('');

  const [docId, setDocId] = React.useState('');
  const [supportData, setSupportData] = React.useState([]);
  const [text, setText] = React.useState('');
  const [editData, seteditData] = React.useState([]);
  const { t } = useTranslation();
  const handleModal = () => {
    setModal(!modal);
    formik.resetForm();
    setText('');
  };
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setSupportId(id);
    }
    setdeleteModal(!deletemodal);
  };

  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: 'delete',
        url: `${baseUrl}/StaticPages/deleteSupport/${docId}/${supportId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier(response.data.message, 'success', translate);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, 'error ', translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async (id) => {
    if (id) {
      setSupportId(id);
      try {
        let filteredData = supportData.find((data) => data._id == id);
        seteditData(filteredData);
      } catch (error) {
        if (error.response) Notifier(error.response.data.message, 'error ', translate);
      }
    }
    seteditModal(!editmodal);
    setText('');
  };

  const getSupports = async () => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/StaticPages/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.data.supports;
      setDocId(response.data.data._id);
      setSupportData(data);
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, 'error ', translate);
    }
    //}
  };

  useEffect(() => {
    getSupports();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    SupportheadCells.slice(0, SupportheadCells.length - 1).map((cell) => array.push(cell.id));
    setheadCells(array);
  }, []);

  const formik = useFormik({
    initialValues: SUPPORT_STATE,
    validationSchema: SUPPORT_YUP,
    onSubmit: async (values) => {
      try {
        const data = {
          title: values.title,
          text: text,
        };
        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/StaticPages/addSupport/${docId}`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, 'success', translate);
        handleModal();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, 'error', translate);

        console.log('Errror->>>', err);
      }
    },
  });
  const edit_formik = useFormik({
    initialValues: SUPPORT_STATE,
    validationSchema: SUPPORT_YUP,
    onSubmit: async (values) => {
      try {
        const data = {
          title: values.title,
          text: text,
        };
        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/StaticPages/editSupport/${docId}/${supportId}`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, 'success', translate);
        handleEditModal();
        edit_formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, 'error', translate);

        console.log('Errror->>>', err);
      }
    },
  });

  return (
    <>
      <Modal
        title="Ajouter un  Supports pédagogique"
        open={modal}
        translate={translate}
        onClose={handleModal}
        width="45%"
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        component={
          <AddSubscription translate={translate} formik={formik} setText={setText} text={text} />
        }
      />
      <Modal
        title="Edit Product"
        open={editmodal}
        translate={translate}
        width="35%"
        onClose={handleEditModal}
        buttonLabel={t('Update')}
        onSubmit={edit_formik.handleSubmit}
        component={
          <EditSubscription
            editData={editData}
            editmodal={editmodal}
            formik={edit_formik}
            translate={translate}
            setText={setText}
            text={text}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        delete={true}
        component={
          <DeleteModal
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
            translate={translate}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">{translate('Supports pédagogiques')}</h1>
            <Button
              variant="outlined"
              label="Ajouter un  Supports pédagogique"
              onClick={handleModal}
              translate={translate}
              startIcon={<AddIcon />}
            />
          </div>
          <SupportsTable
            headCells={SupportheadCells}
            translate={translate}
            data={supportData}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
          />
        </div>
      </div>
    </>
  );
}
