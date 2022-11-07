import React, { useState } from 'react';
import TextInput from '../../../components/TextInput';
import TextArea from '../../../components/TextArea';
import { makeStyles } from '@mui/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, TextField } from '@mui/material';
import Axios from 'axios';
import { baseUrl, url } from '../../../utils/BaseUrl';

import { useTranslation } from 'react-i18next';
export default function AddExpense(props) {
  const { logoUrl, setLogoUrl, values } = props;

  const useStyles = makeStyles({
    customTextField: {
      '& input::placeholder': {
        color: 'white',
        '@media (max-width: 780px)': {
          paddingLeft: '-2px'
        }
      }
    },
    customTextFieldestablish: {
      '& input::placeholder': {
        color: 'black',
        fontSize: '13px',
        '@media (max-width: 780px)': {
          fontSize: '12px',
          paddingLeft: '-2px'
        }
      }
    },
    option: {
      background: 'white ',
      color: 'black',
      '&:hover': {
        backgroundColor: 'black !important',
        color: 'white !important'
      }
    },

    select: {
      background: 'orange',
      color: 'pink',
      '&:before': {
        borderColor: 'black'
      },
      '&:after': {
        borderColor: 'purple'
      }
    }
  });
  const classes = useStyles();

  const { translate, formik } = props;
  const { t } = useTranslation();
  const handleChange = e => {
    const { name, value } = e.target;
    if (['telephone_no', 'contact_no', 'zipcode'].includes(name)) {
      formik.setFieldValue(name, value.replace(/\D/g, ''));
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const handleChangeUrl = async item => {
    if (item.target.textContent) {
      // console.log('onselect', url + '/uploads/images/' + item.target.textContent);
      setLogoUrl(url + '/uploads/images/' + item.target.textContent);
    }
  };
  const onChangeUrl = async e => {
    // console.log('e', e.target.value);
    setLogoUrl(e.target.value);
  };
  console.log('logoUrl', logoUrl);
  return (
    <form
      className="w-full pt-9"
      style={{
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Establishment"
            label="Establishment"
            name="establishment"
            onChange={formik.handleChange}
            value={formik.values.establishment}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.establishment && formik.errors.establishment ? (
              <small>{formik.errors.establishment}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Address 1"
            label="Address 1"
            name="address1"
            onChange={formik.handleChange}
            value={formik.values.address1}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.address1 && formik.errors.address1 ? (
              <small>{formik.errors.address1}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Address 2"
            label="Address 2"
            name="address2"
            onChange={formik.handleChange}
            value={formik.values.address2}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.address2 && formik.errors.address2 ? (
              <small>{formik.errors.address2}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="PO Box"
            label="PO Box"
            name="po_box"
            onChange={formik.handleChange}
            value={formik.values.po_box}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.po_box && formik.errors.po_box ? (
              <small>{formik.errors.po_box}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="ZipCode"
            label="ZipCode"
            name="zipcode"
            translate={translate}
            onChange={handleChange}
            value={formik.values.zipcode}
          />
          <div className="text-red-600 ">
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <small>{t(formik.errors.zipcode)}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="City"
            label="City"
            name="city"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <div className="text-red-600 ">
            {formik.touched.city && formik.errors.city ? <small>{formik.errors.city}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Email Address (Client)"
            label="Email Address (Client)"
            name="email_address_client"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.email_address_client}
          />
          <div className="text-red-600 ">
            {formik.touched.email_address_client && formik.errors.email_address_client ? (
              <small>{formik.errors.email_address_client}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Name"
            label="Name"
            name="name"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="text-red-600 ">
            {formik.touched.name && formik.errors.name ? (
              <small>{t(formik.errors.name)}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Firstname"
            label="Firstname"
            name="firstname"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
          <div className="text-red-600 ">
            {formik.touched.firstname && formik.errors.firstname ? (
              <small>{t(formik.errors.firstname)}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Telephone No"
            label="Telephone No"
            name="telephone_no"
            translate={translate}
            onChange={handleChange}
            value={formik.values.telephone_no}
          />
          <div className="text-red-600 ">
            {formik.touched.telephone_no && formik.errors.telephone_no ? (
              <small>{formik.errors.telephone_no}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="text-red-600 ">
            {formik.touched.email && formik.errors.email ? (
              <small>{t(formik.errors.email)}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Url"
            label="Url"
            name="url"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.url}
          />
          <div className="text-red-600 ">
            {formik.touched.url && formik.errors.url ? <small>{formik.errors.url}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <span style={{ fontSize: '13px', fontWeight: 900 }}>Logo</span>

          <Autocomplete
            classes={{
              option: classes.option
            }}
            className="autocomplte"
            PaperComponent={({ children }) => (
              <Paper style={{ background: 'white' }}>{children}</Paper>
            )}
            options={values}
            freeSolo
            getOptionLabel={option => option.label}
            onChange={handleChangeUrl}
            style={{
              marginTop: '0px'
            }}
            renderInput={params => (
              <TextField
                classes={{ root: classes.customTextFieldestablish }}
                className="establish"
                {...params}
                placeholder="Logo"
                // label="Logo"
                variant="outlined"
                value={logoUrl}
                name="logo"
                onChange={onChangeUrl}
              />
            )}
            // value={!education_level && ""}
          />
          {/* <TextInput
            type="text"
            placeholder="Logo"
            label="Logo"
            name="logo"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.logo}
          /> */}
          <div className="text-red-600 ">
            {formik.touched.logo && formik.errors.logo ? <small>{formik.errors.logo}</small> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
