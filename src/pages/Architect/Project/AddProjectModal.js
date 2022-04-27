import React, { useEffect, useState } from "react";
import InputWithLabel from "../../../components/Architect/InputWithLabel";
import { useStyles } from "../../../css/home";
import { Grid, Button, Typography } from "@mui/material";
import api from "../../../api";
import RowRadioButtonsGroup from "./component/RadioGroup";
import InputDropdown from "../../../components/Architect/InputDropdown";
import Autocomplete from "../../../components/Architect/Autocomplete";
import DatePicker from "../../../components/Architect/DatePicker";
import { Store, UpdateStore } from "../../../StoreContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";

const TOC = [
  {
    value: "Simple",
    label: "Simple",
  },
  {
    value: "Trades",
    label: "Trades",
  },
  {
    value: "TradesAndTranches",
    label: "Trades And Tranches",
  },
  {
    value: "PurchaseOrder",
    label: "Purchase Order",
  },
];

const TOP = [
  {
    value: "DQEAndBPU",
    label: "DQE & BPU",
  },
  {
    value: "DPGF",
    label: "DPGF",
  },
];

const AddProjectModal = ({ handleAddProjectModal }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = Store();
  const updateStore = UpdateStore();

  //  States
  const [values, setValues] = useState({
    name: "",
    prescriber: "",
    vat: "",
    market_type: "Simple",
    structure: "DQEAndBPU",
    date: moment().format("YYYY-MM-DD"),
  });
  const [options, setOptions] = useState([]);

  const [stakeholderText, setStakeholderText] = useState("");
  const [stakeholderByType1, setStakeholderByType1] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState("");

  const [stakeholderText2, setStakeholderText2] = useState("");
  const [stakeholderByType2, setStakeholderByType2] = useState([]);
  const [selectedStakeholder2, setSelectedStakeholder2] = useState("");

  //   useEffect to get vat
  useEffect(() => {
    getVat();
  }, []);

  //
  useEffect(() => {
    getStakeholders();
  }, []);

  //   func to get vat
  const getVat = async () => {
    const result = await api("get", `/VAT/getAll`);
    setOptions(result?.data?.vat?.sort((a, b) => a.ranking - b.ranking));
    result &&
      setValues((prev) => {
        prev.vat = result?.data?.vat[0]?._id;
        return { ...prev };
      });
  };

  //   func to get stakeholders
  const getStakeholders = async () => {
    const result = await api(
      "get",
      `/Stakeholders/getByTypeName/Maitre d'Ouvrage`
    );
    setStakeholderByType1(result.data.stakeholders);
    const result2 = await api(
      "get",
      `/Stakeholders/getByTypeName/Maitre d'Oeuvre`
    );
    setStakeholderByType2(result2.data.stakeholders);
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = values;
    data.architect = store.user._id;
    if (selectedStakeholder) {
      data.client = selectedStakeholder;
    } else {
      const result = await api(
        "post",
        `/stakeholders/byproject/create/Maitre d'Ouvrage`,
        {
          name: stakeholderText,
          email: "",
          contact_no: "",
          entity: "",
          service: "",
          city: "",
          address1: "",
          address2: "",
          zipcode: "",
          type: "",
          ranking: 0,
        },
        t
      );
      data.client = result.data.stakeholder._id;
    }
    if (selectedStakeholder2) {
      data.prescriber = selectedStakeholder2;
    } else {
      const result = await api(
        "post",
        `/stakeholders/byproject/create/Maitre d'Oeuvre`,
        {
          name: stakeholderText2,
          email: "",
          contact_no: "",
          entity: "",
          service: "",
          city: "",
          address1: "",
          address2: "",
          zipcode: "",
          type: "",
          ranking: 0,
        },
        t
      );
      data.prescriber = result.data.stakeholder._id;
    }
    const result = await api("post", `/project/create`, data, t);
    toast.success(t(result.data.message));
    handleAddProjectModal();
    const response = await api("get", "/Architects/current/loggedIn");
    if (response.data.user) {
      updateStore({ loggedIn: true, user: response.data.user });
    }
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputWithLabel
          label={t("Name")}
          required={true}
          name="name"
          type="text"
          value={values.name}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <Autocomplete
          label="Maitre d'Ouvrage"
          options={stakeholderByType1}
          setValue={setSelectedStakeholder}
          textValue={stakeholderText}
          setTextValue={setStakeholderText}
          required={true}
        />
        <br />

        <Autocomplete
          label="Maitre d'Oeuvre"
          options={stakeholderByType2}
          setValue={setSelectedStakeholder2}
          textValue={stakeholderText2}
          setTextValue={setStakeholderText2}
          required={true}
        />
        <br />
        <Grid container spacing={2}>
          <Grid item zeroMinWidth xs>
            <DatePicker
              label={t("Project Date")}
              name="date"
              value={values.date}
              onChange={(e) => {
                handleChange("date", moment(e).format("YYYY-MM-DD"));
              }}
              width="100% !important"
            />
          </Grid>
          <Grid item zeroMinWidth xs>
            <InputDropdown
              label={t("VAT")}
              required={true}
              name="vat"
              value={values.vat}
              options={options}
              type="text"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <RowRadioButtonsGroup
          row={true}
          label={t("Type Of Contract")}
          data={TOC}
          value={values.market_type}
          name="market_type"
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <br />
        <RowRadioButtonsGroup
          row={true}
          label={t("Type Of Project")}
          data={TOP}
          value={values.structure}
          name="structure"
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <div>
          <Typography>* Mentions obligatoires</Typography>
        </div>

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
            onClick={handleAddProjectModal}
          >
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
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
            type="submit"
          >
            {t("Create")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectModal;
