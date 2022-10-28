import React, { useEffect } from 'react';
import Button from '../../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../../components/Modal';

import Notifier from '../../../utils/Notifier';

import { baseUrl } from '../../../utils/BaseUrl';
import { getToken } from '../../../utils/Auth';
import ListMenu from '../../../components/LibrariesList/listMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Axios from 'axios';

import { useTranslation } from 'react-i18next';

import CollapseFabricants from '../../auth/spc/components/CollapseFabricants';
import AddLibrary from './AddLibrary';

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [fabloading, setFabLoading] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);

  const [library, setLibrary] = React.useState('');
  const [libraryData, setLibraryData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const handleModal = () => setModal(!modal);

  console.log('token', token);
  useEffect(() => {
    getFabricant();
  }, [modal, fabloading]);

  // add subscription
  const handleSubmit = async () => {
    try {
      if (!library) {
        return Notifier('Veuillez entrer dans la bibliothèque', 'error', translate);
      }
      // call post api
      let response = await Axios({
        method: 'post',
        url: `${baseUrl}/fabricant/create`,
        data: { library },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Notifier(response.data.message, 'success', translate);
      console.log('library', library);
      setLibrary('');
      handleModal();
    } catch (error) {
      Notifier(error.response.data.message, 'error', translate);
    }
  };

  const getFabricant = async () => {
    try {
      setLoading(true);
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/fabricant/library`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let data = response.data.fabricants;
      console.log('get fabricant data', data);
      setLoading(false);
      setLibraryData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
    }
    //}
  };

  return (
    <>
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3" t>
            <h1 className="text-2xl font-bold">{translate('Fabricant')}</h1>
            <Button
              translate={translate}
              variant="outlined"
              label="Ajouter une Bibliothèque"
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>

          <CollapseFabricants
            token={token}
            libraryData={libraryData}
            loading={loading}
            setFabLoading={setFabLoading}
            fabloading={fabloading}
          />
        </div>
      </div>
      <Modal
        title={translate('Ajouter une Bibliothèque')}
        open={modal}
        onClose={handleModal}
        translate={translate}
        buttonLabel="Create"
        onSubmit={handleSubmit}
        component={<AddLibrary translate={translate} setLibrary={setLibrary} library={library} />}
      />
    </>
  );
}
