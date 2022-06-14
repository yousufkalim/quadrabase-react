// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import { useStyles } from "../../../../css/projectLibraries";
import { Button, Grid } from "@mui/material";
import TextEditor from "../../../../components/Architect/TextEditor";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import CustomButton from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { red, green } from "@mui/material/colors";
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
const EditWorkModal = ({ handleOpenEditWorkModal, work }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  // states
  const [values, setValues] = useState({
    name: "",
    unit: "",
    unit_price: "",
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
  const [filteredOptions, setFilteredOptions] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  // useEffect to set intial data
  useEffect(() => {
    work &&
      setValues((prev) => {
        prev.name = work.name;
        prev.unit = work.unit;
        prev.unit_price = formatNumber(parseFloat(work.unit_price).toFixed(2).toString(), ".");
        prev.cctp_text = [];
        prev.bpu_text = [];
        return { ...prev };
      });
    work.cctp_text[0] && setcctp_text1(work.cctp_text[0]);
    work.cctp_text[1] && setcctp_text2(work.cctp_text[1]);
    work.cctp_text[2] && setcctp_text3(work.cctp_text[2]);
    work.cctp_text[3] && setcctp_text4(work.cctp_text[3]);
    work.bpu_text[0] && setbpu_text1(work.bpu_text[0]);
  }, [work]);
  // useEffect to get all units
  useEffect(() => {
    getUnits();
    getAllProviders();
  }, []);

  useEffect(() => {
    if (work.providers.length > 0) {
      setProviderDataArr(work.providers);
      let temp = [];
      let tempFilter = [];
      ProviderOptions?.map((item) => {
        work.providers?.map((item2) => {
          if (item2?.provider === item?._id) {
            temp.push(item);
          }
        });
      });
      tempFilter = ProviderOptions.filter((item) => {
        return !temp.includes(item);
      });

      setFilteredOptions(tempFilter);
      setAssociatedProviders(temp);
      setFileName(work.providers[0]?.documents[0]?.uri.split("/").pop());
      setDocuments(work.providers[0]?.documents);
    } else {
      setFilteredOptions(ProviderOptions);
    }
  }, [work, ProviderOptions]);

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
    const result = await api("put", `/BookLibraries/edit/Work/${work._id}`, data, t);
    toast.success(t(result.data.message));
    handleOpenEditWorkModal();
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
      temp = filteredOptions.filter((item) => item._id !== selectedProvider._id);
      setFilteredOptions(temp);
    }
  };

  const handleRemoveProvider = () => {
    let filteredData = associatedProviders.filter((item) => item._id !== selectedAssociatedProvider._id);
    setAssociatedProviders(filteredData);
    let filteredProviderData = ProviderDataArr.filter((item) => item.provider !== selectedAssociatedProvider._id);
    setProviderDataArr(filteredProviderData);
    setFilteredOptions([...filteredOptions, selectedAssociatedProvider]);
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
      <Grid container spacing={2}>
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
          />
        </Grid>
      </Grid>

      {/* CCTP Tab View */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#f2f2f2" }}>
          <Tabs value={selectedTabIndex} onChange={handleTabChange} aria-label="CCTPs">
            <Tab label="CCTP1" {...a11yProps(0)} />
            <Tab label="CCTP2" {...a11yProps(1)} />
            <Tab label="CCTP3" {...a11yProps(2)} />
            <Tab label="CCTP4" {...a11yProps(2)} />
            <Tab label="BPU" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTabIndex} index={0}>
          <TextEditor setValue={setcctp_text1} value={cctp_text1} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          <TextEditor setValue={setcctp_text2} value={cctp_text2} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={2}>
          <TextEditor setValue={setcctp_text3} value={cctp_text3} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={3}>
          <TextEditor setValue={setcctp_text4} value={cctp_text4} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={4}>
          <TextEditor setValue={setbpu_text1} value={bpu_text1} />
        </TabPanel>
      </Box>
      <div className="flex justify-between w-full">
        <div style={{ width: "49%" }}>
          <div
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2 flex justify-between items-center"
            htmlFor="grid-first-name"
          >
            {t("Provider List")}
            <CustomButton
              onClick={handleAddPriovider}
              disabled={!selectedProvider}
              label={t("Add")}
              backgroundColor={green}
              default={false}
            />
          </div>
          <div
            style={{
              height: 180,
              border: "1px solid black",
              overflow: "auto",
            }}
          >
            {filteredOptions?.map((item) => (
              <h3
                onClick={() => setSelectedProvider(item)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedProvider._id == item._id && "lightgray",
                }}
              >
                {item.name}
              </h3>
            ))}
          </div>
        </div>
        <div style={{ width: "49%" }}>
          <div
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2 flex justify-between items-center"
            htmlFor="grid-first-name"
          >
            {t("Associated Provider")}
            <CustomButton
              onClick={handleRemoveProvider}
              label={t("Remove")}
              disabled={!selectedAssociatedProvider}
              backgroundColor={red}
              default={false}
            />
          </div>
          <div
            style={{
              height: 180,
              border: "1px solid black",
              overflow: "auto",
            }}
          >
            {associatedProviders?.map((item) => (
              <h3
                onClick={() => setSelectedAssociatedProvider(item)}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedAssociatedProvider._id == item._id && "lightgray",
                }}
              >
                {item.name}
              </h3>
            ))}
          </div>
        </div>
      </div>
      <br />
      {/* create button */}
      <div
        style={{
          marginTop: 10,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ width: "49%" }}>
          <div
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2 flex justify-between items-center"
            htmlFor="grid-first-name"
          >
            Document
          </div>
          <div
            style={{
              border: "1px solid gray",
              height: 35,
              padding: 4,
              borderRadius: 4,
              backgroundColor: associatedProviders.length === 0 && "lightgray",
            }}
          >
            <label style={{ cursor: "pointer" }}>
              {t("Choose file")} - {fileName ? fileName : t("no file chosen")}
              <TextInput
                type="file"
                placeholder="Document"
                name="document"
                onChange={handleFileChange}
                multiple={true}
                style={{ display: "none" }}
                disabled={associatedProviders.length === 0}
              />
            </label>
          </div>
        </div>
        <div>
          <Button variant="contained" className={classes.btn} onClick={() => handleOpenEditWorkModal()}>
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" className={classes.btn} type="submit">
            {t("Update")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditWorkModal;
