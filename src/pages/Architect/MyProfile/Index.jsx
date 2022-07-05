// init
import React, { useState, useEffect } from 'react';
import { useStyles } from '../../../css/myProfile';
import { Store, UpdateStore } from '../../../StoreContext';
import moment from 'moment';
import api from '../../../api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'moment/locale/fr'; // without this line it didn't work

// Importing Components
import { Grid, Button, Avatar, Typography } from '@mui/material';
import InputWithLabel from '../../../components/Architect/InputWithLabel';
import TextInput from '../../../components/TextInput';

moment.locale('fr');
// component
const Index = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = Store();
  const updateStore = UpdateStore();
  // states
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    oldPassword: 'old',
    newPassword: 'new',
    establishment: '',
    service: '',
    address_1: '',
    address_2: '',
    po_box: '',
    postal_code: '',
    city: '',
    profile_pic: '',
  });

  // useEffect to set values
  useEffect(() => {
    setValues({
      first_name: store.user.first_name,
      last_name: store.user.last_name,
      email: store.user.email,
      phone: store.user.phone,
      oldPassword: '',
      newPassword: '',
      establishment: store.user.establishment,
      service: store.user.service,
      address_1: store.user.address_1,
      address_2: store.user.address_2,
      po_box: store.user.po_box,
      postal_code: store.user.postal_code,
      city: store.user.city,
      profile_pic: store.user.profile_pic,
    });
  }, [store.user]);

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await api('put', `/Architects/update/${store.user._id}`, values, t);
    updateStore({ loggedIn: true, user: result.data.architect });
    toast.success(t(result.data.message));
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    let form_data = new FormData();
    form_data.append(`file`, files[0]);
    const response = await api('post', `/fileUploader/`, form_data, t);
    setValues({
      ...values,
      profile_pic: response.data.files[0].uri,
    });
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
        <div className={classes.left_container}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label className="profile-label">
              <Avatar
                style={{ height: 100, width: 100 }}
                src={values.profile_pic && values.profile_pic}
              />
              <TextInput
                type="file"
                placeholder="Document"
                name="document"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <Button
                variant="contained"
                className="remove-pic"
                onClick={() =>
                  setValues({
                    ...values,
                    profile_pic: '',
                  })
                }
              >
                {t("Remove")}
              </Button>
            </label>

            <br />
            <Typography className={classes.name} variant="h4">
              {store.user.first_name} {store.user.last_name}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {t('Member Since')}: {moment(store.user.createdAt).format('DD MMMM YYYY')}
            </Typography>
          </div>
        </div>
        <div className={classes.right_container} onSubmit={handleSubmit}>
          <h1 style={{ width: '100vw', color: 'black' }}>{t('My Profile')}</h1>
          <form className={classes.form} autoComplete="off">
            {/* All fields */}
            <br />

            <Grid container spacing={2}>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('Lastname')}
                  required={true}
                  name="last_name"
                  type="text"
                  value={values.last_name}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('Firstname')}
                  required={true}
                  name="first_name"
                  type="text"
                  value={values.first_name}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label="Email"
                  required={true}
                  disabled={true}
                  name="email"
                  type="email"
                  value={values.email}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('Phone')}
                  required={true}
                  name="phone"
                  type="text"
                  value={values.phone}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('Old Password')}
                  name="oldPassword"
                  type="password"
                  value={values.oldPassword}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('New Password')}
                  name="newPassword"
                  type="password"
                  value={values.newPassword}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>
            <InputWithLabel
              label={t('Establishment')}
              required={true}
              disabled={true}
              name="establishment"
              type="text"
              value={values.establishment}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />

            <InputWithLabel
              label={t('Service')}
              required={true}
              disabled={true}
              name="service"
              type="text"
              value={values.service}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <InputWithLabel
              label={t('Address 1')}
              required={true}
              name="address_1"
              type="text"
              value={values.address_1}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <InputWithLabel
              label={t('Address 2')}
              name="address_2"
              type="text"
              value={values.address_2}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />

            <Grid container spacing={2}>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('CS/BP')}
                  name="po_box"
                  type="text"
                  value={values.po_box}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
              <Grid item zeroMinWidth xs>
                <InputWithLabel
                  label={t('CP')}
                  required={true}
                  name="postal_code"
                  type="text"
                  value={values.postal_code}
                  handleChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </Grid>
            </Grid>

            <InputWithLabel
              label={t('City')}
              required={true}
              name="city"
              type="text"
              value={values.city}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />

            {/* register button */}
            <div style={{ width: '100%', textAlign: 'right' }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#8C1244',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                  ':hover': {
                    backgroundColor: '#8C1244',
                  },
                }}
                type="submit"
              >
                {t('Update')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
