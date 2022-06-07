// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { Button, Grid } from "@mui/material";
import { Store } from "../../../../StoreContext";
import { toast } from "react-toastify";
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import { useStyles } from "../../../../css/addStakeholder";
import { useTranslation } from "react-i18next";

// component
const AddStakholder = ({ handleAddStakeholderModal, stakeholdersData }) => {
  const { t } = useTranslation();
  const store = Store();
  const classes = useStyles();
  // states
  const [values, setValues] = useState({
    type: "",
    establishment: "",
    service: "",
    address1: "",
    address2: "",
    po_box: "",
    zipcode: "",
    lastname: "",
    firstname: "",
    email: "",
    contact_no: "",
    entity: "",
    city: "",
    ranking: 0,
  });
  const [options, setOptions] = useState([]);

  // useEffect to get all types
  useEffect(() => {
    getTypes();
  }, []);

  // func to getAll Units
  const getTypes = async () => {
    const result = await api("get", `/StakeholderTypes/`);
    setOptions(result.data.stakeholderTypes);
    const selected = result.data.stakeholderTypes.find((item) => item.text.toUpperCase() === "MAITRE D'OUVRAGE");
    setValues({ ...values, type: selected._id });
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    let maxRanking = Math.max.apply(
      Math,
      stakeholdersData.map((item) => {
        return item.ranking;
      })
    );
    values.ranking = maxRanking > 0 ? maxRanking + 1 : 0;
    const result = await api("post", `/stakeholders/create/${store.user._id}`, values, t);
    handleAddStakeholderModal();
    toast.success(t(result.data.message));
  };

  // jsx
  return (
    <>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* All fields */}
          <br />
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputDropdown
                name="type"
                label={t("Type")}
                value={values.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                options={options}
                disabled
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Establishment")}
                required={true}
                name="establishment"
                type="text"
                value={values.establishment}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Service")}
                required={true}
                name="service"
                type="text"
                value={values.service}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Address 1")}
                required={true}
                name="address1"
                type="text"
                value={values.address1}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Address 2")}
                name="address2"
                type="text"
                value={values.address2}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs={3}>
              <InputWithLabel
                label={t("BP/CS")}
                required={true}
                name="po_box"
                type="text"
                value={values.po_box}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs={3}>
              <InputWithLabel
                label={t("CP")}
                required={true}
                name="zipcode"
                type="number"
                value={values.zipcode}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs={6}>
              <InputWithLabel
                label={t("City")}
                required={true}
                name="city"
                type="text"
                value={values.city}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Lastname")}
                required={true}
                name="lastname"
                type="text"
                value={values.lastname}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Firstname")}
                required={true}
                name="firstname"
                type="text"
                value={values.firstname}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Email")}
                required={true}
                name="email"
                type="email"
                value={values.email}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item zeroMinWidth xs>
              <InputWithLabel
                label={t("Telephone No")}
                required={true}
                name="contact_no"
                type="number"
                value={values.contact_no}
                handleChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>
          {/* register button */}
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 2,
                whiteSpace: "nowrap",
                ":hover": {
                  backgroundColor: "#8C1244",
                },
              }}
              onClick={handleAddStakeholderModal}
            >
              {t("Close")}
            </Button>
            &nbsp;
            <Button
              variant="contained"
              type="submit"
              sx={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 2,
                whiteSpace: "nowrap",
                hover: "none",
                ":hover": {
                  backgroundColor: "#8C1244",
                },
              }}
            >
              {t("Create")}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStakholder;
