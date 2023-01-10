import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
import Axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Notifier from '../../utils/Notifier';
import { baseUrl } from '../../utils/BaseUrl';
import FontAwesomeIcon from '../FontAwesomeIcon';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import Modal from '../../components/Modal';
import AddFabricant from '../../pages/admin/fabricantLibrary/Addfabricant';
import EditFabricant from '../../pages/admin/fabricantLibrary/EditFabricant';

import EditFabricantLibrary from '../../pages/admin/fabricantLibrary/EditLibrary';

import DeleteModal from '../../components/DeleteModal';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const primaryCol = '#7E7B75';

export default function Collapsible(props) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    url: ''
  });
  const { name, url } = formData;

  const {
    avatartitle,
    text,
    expandComponent,
    data,
    token,
    fabloading,
    setFabLoading,
    setLibraryData
  } = props;
  const [modal, setModal] = React.useState(false);

  const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(270deg)' : 'rotate(360deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  const handleModal = () => setModal(!modal);

  const [expanded, setExpanded] = React.useState(false);
  const [editlibrarymodal, setEditLibraryModal] = React.useState(false);
  const [library, setNewLibrary] = React.useState('');
  const [libraryId, setlibraryId] = React.useState('');

  const [flag, setFlag] = React.useState(false);
  const handleFlag = () => setFlag(!flag);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmit = async () => {
    try {
      console.log('data?.fabricants.length', data?.fabricants.length);
      if (!name) {
        return Notifier('Veuillez entrer le nom du fabricant', 'error', t);
      }
      if (!url) {
        return Notifier("Veuillez saisir l'URL du fabricant", 'error', t);
      }
      setFabLoading(true);

      // post fabricant to library
      let response = await Axios({
        method: 'post',
        url: `${baseUrl}/fabricant/addFabricant`,
        data: { ...formData, libraryId: data?._id, ranking: data?.fabricants.length },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFabLoading(false);

      Notifier(response.data.message, 'success', t);
      console.log('formdata', formData);
      console.log('handlesubmit', data?._id);
      setFormData('');
      handleModal();
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };

  const [anchorEl, setanchorEl] = React.useState(null);

  const handleClick = event => {
    setanchorEl(event.currentTarget);
    console.log('library id', event);
  };
  console.log('libraryId', libraryId);
  const handleClose = event => {
    setanchorEl(null);
  };
  const handleEditLibraryModal = () => setEditLibraryModal(!editlibrarymodal);
  const handleUpdateLibrary = async () => {
    console.log('update library', library, props?.data?._id);
    let id = props?.data?._id;
    try {
      // setFabLoading(true);
      // update fabricant
      let response = await Axios({
        method: 'put',
        url: `${baseUrl}/fabricant/${id}`,
        data: { library },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('response', response.data);

      setLibraryData(response?.data?.fabricants);

      // setFabLoading(false);

      Notifier(response.data.message, 'success', t);
      handleEditLibraryModal();
      // setFabLoading(false)
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };

  return (
    <>
      <Grid
        xs={12}
        sm={12}
        md={12}
        sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            width: '80%',
            background: ' #FFFFFF',
            boxShadow: ' 0px 5px 19px rgba(0, 0, 0, 0.05)',
            borderRadius: '10px'
          }}>
          <div style={{ display: 'flex', padding: '12px 12px' }}>
            <Avatar aria-label="recipe" className={` ${expanded ? 'spc_active' : 'spc_nonactive'}`}>
              {props.avatartitle}
            </Avatar>

            <Typography className="spc_title">{props.text}</Typography>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
            {props.token ? (
              <IconButton>
                <MoreVertIcon
                  onClick={t => {
                    handleClick(t);
                    setlibraryId(props?.text);
                  }}
                />
              </IconButton>
            ) : (
              ''
            )}
          </div>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleEditLibraryModal();
                handleClose();
              }}
              disableRipple>
              <FontAwesomeIcon sx={{ fontSize: '1rem' }} icon={faEdit} />
              {t('Edit')}
            </MenuItem>
            <MenuItem onClick={() => handleModal()}>Ajouter un fabricant</MenuItem>
          </Menu>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ background: '#F5F6F8', paddingLeft: '2%' }}>
              <SingleData
                data={data}
                token={token}
                t={t}
                setFabLoading={setFabLoading}
                setLibraryData={setLibraryData}
              />

              {/* {expandComponent} */}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
      <Modal
        title={'Modifier la bibliothèque'}
        open={editlibrarymodal}
        onClose={handleEditLibraryModal}
        translate={t}
        buttonLabel="Update"
        onSubmit={handleUpdateLibrary}
        component={
          <EditFabricantLibrary
            translate={t}
            setNewLibrary={setNewLibrary}
            library={library}
            text={props.text}
          />
        }
      />
      <Modal
        title={'Ajouter un fabricant'}
        open={modal}
        onClose={handleModal}
        translate={t}
        buttonLabel="Create"
        onSubmit={handleSubmit}
        component={
          <AddFabricant
            translate={t}
            text={props.text}
            setFormData={setFormData}
            formData={formData}
          />
        }
      />
    </>
  );
}

function SingleData({ data, token, t, setFabLoading, setLibraryData }) {
  const [deletemodal, setDeleteModal] = React.useState(false);
  const [editmodal, setEditModal] = React.useState(false);
  const [fab, setId] = React.useState('');
  const [newfabricant, setNewFabricant] = React.useState('');
  const handleDeleteModal = () => setDeleteModal(!deletemodal);
  const handleEditModal = () => setEditModal(!editmodal);
  const a = [
    {
      text: 'ARCADIAS GROUPE',
      url: 'https://www.groupearcadias.com/'
    },
    {
      text: 'BATISEC SAS',
      url: 'https://batisec.fr/'
    },
    {
      text: 'FORNELLS',
      url: 'https://fornells.fr/chantier/'
    },
    {
      text: 'HERAS Sarl',
      url: 'https://www.cloture-mobile.fr/'
    },
    {
      text: 'ISOSIGN',
      url: 'https://isosign.fr/'
    },
    {
      text: 'LACROIX CITY',
      url: 'https://www.lacroix-city.fr/'
    },
    {
      text: 'NADIA SIGNALISATION',
      url: 'http://www.nadia-europ.com/'
    },
    {
      text: 'SIGNATURE GROUPE',
      url: 'https://www.groupe-signature.com/fr/'
    },
    {
      text: 'SIGNAUX GIROD',
      url: 'https://www.girod-signalisation.com/fr'
    }
  ];

  const handleDelete = async () => {
    try {
      setFabLoading(true);
      // delete fabricant
      let response = await Axios({
        method: 'delete',
        url: `${baseUrl}/fabricant/${fab?._id}`,
        data: { libraryId: data?._id },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Notifier(response.data.message, 'success', t);
      setFabLoading(false);
      // handleDeleteModal();
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('data fabricnat', fab, newfabricant);

      // setFabLoading(true);
      // update fabricant
      let response = await Axios({
        method: 'put',
        url: `${baseUrl}/fabricant/${fab?._id}`,
        data: { ...newfabricant },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('update', response?.data?.data);
      setLibraryData(response?.data?.data);

      // setFabLoading(false);

      Notifier(response.data.message, 'success', t);
      setNewFabricant('');
      handleEditModal();
      // setFabLoading(false)
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };

  const handleFabricantDown = async () => {
    try {
      let filteredIndex = data?.fabricants?.findIndex(dt => dt._id == fab?._id);
      console.log('filteredIndex', filteredIndex);
      console.log('data?.fabricants', data?.fabricants);
      console.log('ab?.id', fab?._id);

      if (filteredIndex !== data?.fabricants.length - 1) {
        let tempArr = [...data?.fabricants];
        let prevIndex = filteredIndex + 1;
        let prev = tempArr[prevIndex];
        console.log('prevIndex', prevIndex);

        await Axios({
          method: 'put',
          url: `${baseUrl}/fabricant/${fab?._id}`,
          data: { ranking: prevIndex },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/fabricant/${prev?._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('update', response?.data?.data);
        setLibraryData(response?.data?.data);
      }
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };
  const handleFabricantUp = async () => {
    try {
      let filteredIndex = data?.fabricants?.findIndex(dt => dt._id == fab?._id);

      if (filteredIndex !== 0) {
        let tempArr = [...data?.fabricants];
        let prevIndex = filteredIndex - 1;
        let prev = tempArr[prevIndex];
        console.log('prevIndex', prevIndex);

        await Axios({
          method: 'put',
          url: `${baseUrl}/fabricant/${fab?._id}`,
          data: { ranking: prevIndex },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/fabricant/${prev?._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('update', response?.data?.data);
        setLibraryData(response?.data?.data);
      }
    } catch (error) {
      Notifier(error.response.data.message, 'error', t);
    }
  };
  const alphaSorting = array => {
    const myData = array.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    let data1 = array.sort((a, b) => a.ranking - b.ranking);

    return array;
  };
  const [anchorEl, setanchorEl] = React.useState(null);

  const handleClick = event => {
    setanchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setanchorEl(null);
  };

  const StyledMenu = styled(props => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'tp',
        horizontal: 'left'
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.00) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.00) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0'
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5)
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
        }
      }
    }
  }));

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: '5px' }}>
          {alphaSorting(data?.fabricants)?.map(e => (
            <div
              className={`${token ? 'fabrow' : ''}`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href={e.url} target="_blank">
                <div
                  style={{
                    marginLeft: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <ListItemIcon sx={{ minWidth: '16px' }}>
                    <FiberManualRecordIcon sx={{ height: '7px', width: '7px' }} />
                  </ListItemIcon>
                  <Typography
                    align="left"
                    sx={{ fontWeight: 600, fontSize: '14px', color: primaryCol }}>
                    {e.name}
                  </Typography>
                </div>
              </a>
              {token ? (
                <>
                  <div>
                    <IconButton>
                      <MoreVertIcon
                        onClick={t => {
                          handleClick(t);
                          setId(e);
                        }}
                      />
                    </IconButton>
                  </div>
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <MenuItem
                      onClick={() => {
                        handleEditModal();
                        handleClose();
                      }}
                      disableRipple>
                      <FontAwesomeIcon sx={{ fontSize: '1rem' }} icon={faEdit} />
                      {t('Edit')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleDeleteModal();

                        handleClose();
                      }}
                      disableRipple>
                      <FontAwesomeIcon sx={{ fontSize: '1rem' }} icon={faTrash} />
                      {t('Delete')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFabricantUp();
                        handleClose();
                      }}
                      disableRipple>
                      <FontAwesomeIcon sx={{ fontSize: '1rem' }} icon="" />
                      {t('Up')}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFabricantDown();
                        handleClose();
                      }}
                      disableRipple>
                      <FontAwesomeIcon sx={{ fontSize: '1rem' }} icon="" />
                      {t('Down')}
                    </MenuItem>
                  </StyledMenu>
                </>
              ) : (
                ''
              )}
            </div>
          ))}
        </List>
      </div>
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        height="40%"
        delete={true}
        component={
          <DeleteModal translate={t} handleClose={handleDeleteModal} handleDelete={handleDelete} />
        }
      />
      <Modal
        title={'Modifier Fabricant'}
        open={editmodal}
        onClose={handleEditModal}
        translate={t}
        buttonLabel="Update"
        onSubmit={handleUpdate}
        component={
          <EditFabricant
            translate={t}
            fabricant={fab}
            setFormData={setNewFabricant}
            formData={newfabricant}
          />
        }
      />
    </>
  );
}
