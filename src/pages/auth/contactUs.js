import React, { useState } from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Border from './spc/assets/images/border.svg';
import Contactsvg from './spc/assets/images/Contact.svg';
import api from '../../api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const handleSubmit = () => {
    if(values.name==""){
      return toast.error(t("Please Enter Name")); 

    }
    if(values.phone==""){
      return toast.error(t("Please Enter Contact")); 

    }
    if(values.email==""){
      return toast.error(t("Please Enter Email")); 

    }
     if(values.message==""){
      return toast.error(t("Please Enter Message")); 

    }
    // Using global api to post data on server and handling the response
    api('post', '/Contact', values).then((response) => {
      toast.success(t(response.data.message));
      setValues({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    });
  };

  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Contact</Typography>
        </div>
      </div>
      <form>
        <Grid
          container
          spacing={1}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: '5% !important',
          }}
        >
          <Grid xs={12} sm={12} md={6}>
            <img src={Border} className="borderimg"></img>

            <div className="contactform">
              <input
                type="text"
                placeholder="Nom"
                name="name"
                className="inputfield"
                value={values.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <input
                type="text"
                name="phone"
                placeholder="Numéro de contact"
                className="inputfield"
                value={values.phone}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <input
                type="text"
                name="email"
                placeholder="Adresse e-mail"
                className="inputfield"
                value={values.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Votre message?"
                name="message"
                className="textarea"
                value={values.message}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </div>
            <div style={{ paddingLeft: '25%', paddingTop: '7%' }} className="contactbuttondiv">
              <Button variant="contained" className="Contactusbutton" onClick={handleSubmit}>
                Envoyer
              </Button>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={6} sx={{ paddingTop: '10% !important' }}>
            <img src={Contactsvg} className="contactsvg"></img>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Contact;
