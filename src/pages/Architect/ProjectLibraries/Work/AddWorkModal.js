// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import { Store } from "../../../../StoreContext";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import { useStyles } from "../../../../css/projectLibraries";
import { Button, Grid } from "@mui/material";
import CustomButton from "../../../../components/Button";
import TextEditor from "../../../../components/Architect/TextEditor";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import TextInput from "../../../../components/TextInput";
import { red, green } from "@mui/material/colors";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatNumber } from "../../../../utils/markThousand";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// component
const AddWorkModal = ({ handleOpenAddWorkModal, workData, category }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // states
  const [values, setValues] = useState({
    name: "",
    unit: "",
    unit_price: 0,
    cctp_text: [],
    bpu_text: [],
  });
  const [options, setOptions] = useState([]);
  const [ProviderOptions, setProviderOptions] = React.useState([]);
  const [cctp_text1, setcctp_text1] = useState("");
  const [cctp_text2, setcctp_text2] = useState("");
  const [cctp_text3, setcctp_text3] = useState("");
  const [cctp_text4, setcctp_text4] = useState("");
  const [bpu_text1, setbpu_text1] = useState("");
  const [ProviderDataArr, setProviderDataArr] = React.useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [associatedProviders, setAssociatedProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState("");
  const [selectedAssociatedProvider, setSelectedAssociatedProvider] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [documents, setDocuments] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  // useEffect to get all units
  useEffect(() => {
    getUnits();
    getAllProviders();
  }, []);

  // func to getAll Units
  const getUnits = async () => {
    const result = await api("get", `/Units/get`);
    setOptions(result.data.units.sort((a, b) => a.ranking - b.ranking));
  };

  // func to getAll Providers
  const getAllProviders = async () => {
    const result = await api("get", `/Providers/get/all`);
    setProviderOptions(result.data.providers);
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const handleAdd = (obj) => {
    setProviderDataArr([...ProviderDataArr, obj]);
  };

  const handleDelete = async (id) => {
    let filteredData = ProviderDataArr.filter((dt) => dt.provider !== id);
    setProviderDataArr(filteredData);
  };

  const handleUpdate = (obj) => {
    let filteredIndex = ProviderDataArr.findIndex((dt) => dt.provider == obj.currentProvider);
    setProviderDataArr((prev) => {
      prev[filteredIndex] = obj.data;
      return [...prev];
    });
  };

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = values;
    data.cctp_text = [];
    data.bpu_text = [];
    cctp_text1 && data.cctp_text.push(cctp_text1);
    cctp_text2 && data.cctp_text.push(cctp_text2);
    cctp_text3 && data.cctp_text.push(cctp_text3);
    cctp_text4 && data.cctp_text.push(cctp_text4);
    bpu_text1 && data.bpu_text.push(bpu_text1);
    data.categoryId = category;
    data.ranking = workData ? workData.length : 0;
    data.unit_price = values.unit_price.replace(/\s/g, "").split(",").join(".");
    if (documents.length !== 0) {
      let tempProvider = [];
      ProviderDataArr.map((item) => {
        let obj = {
          provider: item.provider,
          documents: documents,
        };
        tempProvider.push(obj);
      });
      data.providers = tempProvider;
    } else {
      data.providers = ProviderDataArr;
    }
    const result = await api("post", `/BookLibraries/add/Work`, data, t);
    toast.success(t(result.data.message));
    handleOpenAddWorkModal();
  };

  // functions for provider list
  const handleAddPriovider = () => {
    let flag = associatedProviders.some((item) => item._id === selectedProvider._id);
    if (!flag) {
      let obj = {
        provider: selectedProvider._id,
        document: [],
      };
      setProviderDataArr([...ProviderDataArr, obj]);
      setAssociatedProviders([...associatedProviders, selectedProvider]);
      let temp = [];
      temp = ProviderOptions.filter((item) => item._id !== selectedProvider._id);
      setProviderOptions(temp);
    }
  };

  const handleRemoveProvider = () => {
    let filteredData = associatedProviders.filter((item) => item._id !== selectedAssociatedProvider._id);
    setAssociatedProviders(filteredData);
    let filteredProviderData = ProviderDataArr.filter((item) => item.provider !== selectedAssociatedProvider._id);
    setProviderDataArr(filteredProviderData);
    setProviderOptions([...ProviderOptions, selectedAssociatedProvider]);
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    let form_data = new FormData();

    for (let i = 0; i < files.length; i++) {
      form_data.append(`file`, files[i]);
    }

    const response = await api("post", `/fileUploader/`, form_data, t);
    let documents = response.data.files;
    setFileName(files[0].name);
    setDocuments(documents);
  };

  // jsx
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {/* All fields */}
      <br />
      <Grid item zeroMinWidth xs>
        <InputWithLabel
          label={t("Name")}
          required={true}
          name="name"
          type="text"
          value={values.name}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item zeroMinWidth xs>
          <InputWithLabel
            name="unit_price"
            label="PU HT"
            value={values.unit_price}
            handleChange={(e) => handleChange(e.target.name, e.target.value)}
            required={true}
            onBlur={() => {
              let temp = values.unit_price.replace(/\s/g, "").split(",").join(".");
              setValues((prev) => {
                prev["unit_price"] = formatNumber(parseFloat(temp).toFixed(2).toString(), ".");
                return { ...prev };
              });
            }}
            onFocus={() => {
              let temp = values.unit_price.replace(/\s/g, "").split(",").join(".");
              setValues((prev) => {
                prev["unit_price"] = formatNumber(parseFloat(temp).toFixed(2).toString(), ".");
                return { ...prev };
              });
            }}
          />
        </Grid>
        <Grid item zeroMinWidth xs>
          <InputDropdown
            name="unit"
            label={t("Unit")}
            value={values.unit}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            options={options}
            required={true}
          />
        </Grid>
      </Grid>

      {/* CCTP Tab View */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#f2f2f2" }}>
          <Tabs value={selectedTabIndex} onChange={handleTabChange} aria-label="CCTPs">
            <Tab label="BPU" {...a11yProps(0)} />
            <Tab label="CCTP1" {...a11yProps(1)} />
            <Tab label="CCTP2" {...a11yProps(2)} />
            <Tab label="CCTP3" {...a11yProps(3)} />
            <Tab label="CCTP4" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTabIndex} index={0}>
          <TextEditor setValue={setbpu_text1} value={bpu_text1} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          <TextEditor setValue={setcctp_text1} value={cctp_text1} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={2}>
          <TextEditor setValue={setcctp_text2} value={cctp_text2} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={3}>
          <TextEditor setValue={setcctp_text3} value={cctp_text3} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={4}>
          <TextEditor setValue={setcctp_text4} value={cctp_text4} />
        </TabPanel>
      </Box>

      {/* create button */}
      <div
        style={{
          marginTop: 10,
          width: "100%",
          textAlign: "right",
        }}
      >
        <div>
          <Button variant="contained" className={classes.btn} onClick={() => handleOpenAddWorkModal()}>
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" className={classes.btn} type="submit">
            {t("Create")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddWorkModal;
