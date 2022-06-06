// init
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStyles } from "../../../../css/projectView";
import api from "../../../../api";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

// components
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import RowRadioButtonsGroup from "../component/RadioGroup";
import InputWithOptions from "../../../../components/Architect/InputWithOptions";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "../../../../components/Architect/Autocomplete";
import EditStakholder from "./EditStakholder";
import Modal from "../../../../components/Architect/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Textarea = styled.textarea`
  margin-right: 4rem;
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 3px;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  &:focus {
    border: 2px solid #1a76d2;
    color: black;
    &::-webkit-input-placeholder {
      transition: opacity 250ms ease;
      opacity: 0;
    }
    &::-moz-placeholder {
      transition: opacity 250ms ease;
      opacity: 0;
    }
    &:-ms-placeholder {
      transition: opacity 250ms ease;
      opacity: 0;
    }
  }
`;

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
const PropertiesModal = ({ handleOpenPropertiesModal, currentProject, getProject, familyOptions }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  //  States
  const [values, setValues] = useState({
    name: "",
    prescriber: "",
    vat: "",
    reference: "",
    description: "",
    chap0part2: "",
    architectStakeholder: [],
  });

  const [values2, setValues2] = useState({
    market_type: "Simple",
    structure: "DQEAndBPU",
  });
  const [values3, setValues3] = useState({
    stakeholders: [],
  });

  const [options, setOptions] = useState([]);
  const [chapOptions, setChapOptions] = useState([]);
  const [selectedFam, setSelectedFam] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [typeValue, setTypeValue] = useState("");
  const [stakeholderOptions, setStakeholderOptions] = useState([]);
  const [allStakeholderOptions, setAllStakeholderOptions] = useState([]);
  const [value, setValue] = useState(0);
  const [editStakeholderModal, setEditStakeholderModal] = useState(false);
  const [editStakeholder, setEditStakeholder] = useState({});

  const [stakeholderText, setStakeholderText] = useState("");
  const [stakeholderByType1, setStakeholderByType1] = useState([]);
  const [selectedStakeholder, setSelectedStakeholder] = useState("");

  const [stakeholderText2, setStakeholderText2] = useState("");
  const [stakeholderByType2, setStakeholderByType2] = useState([]);
  const [selectedStakeholder2, setSelectedStakeholder2] = useState("");

  const [loading, setLoading] = useState(true);

  const [step3Values, setStep3Values] = useState([]);

  useEffect(() => {
    if (value === 2) {
      let temp = [];
      allStakeholderOptions?.map((row) =>
        values3?.stakeholders?.map((row2) => {
          if (row2.toString() == row._id.toString()) {
            temp.push(row);
          }
        })
      );
      setStep3Values(temp);
    }
  }, [value, values3, allStakeholderOptions]);

  //   useEffect to get vat
  useEffect(() => {
    if (currentProject) {
      setValues((prev) => {
        prev.name = currentProject?.name;
        prev.prescriber = currentProject?.prescriber;
        prev.vat = currentProject?.vat?._id;
        prev.reference = currentProject?.reference ? currentProject?.reference : "";
        prev.description = currentProject?.description ? currentProject?.description : "";
        prev.chap0part2 = currentProject?.chap0part2 ? currentProject?.chap0part2?.id?._id : "";
        return { ...prev };
      });
      setValues2((prev) => {
        prev.market_type = currentProject?.market_type;
        prev.structure = currentProject?.structure;
        return { ...prev };
      });
      setValues3((prev) => {
        prev.stakeholders = currentProject?.stakeholders;
        return { ...prev };
      });
      setSelectedStakeholder(currentProject?.client);
      setSelectedStakeholder2(currentProject?.prescriber);
    }

    getVat();
    getChap0Part2();
    getTypes();
    currentProject?.stakeholders[0] && getCurrentType();
    setLoading(false);
  }, [currentProject]);

  useEffect(() => {
    getStakeholders();
  }, [typeValue]);
  useEffect(() => {
    getStakeholders2();
  }, []);

  useEffect(() => {
    getAllStakeholders();
  }, [editStakeholderModal]);

  const getCurrentType = async () => {
    const result = await api("get", `/StakeholderTypes/getByStakeholder/${currentProject?.stakeholders[0]}`);
    setTypeValue(result.data.type._id);
  };

  // func to getAll Units
  const getTypes = async () => {
    const result = await api("get", `/StakeholderTypes/`);
    const data = result.data.stakeholderTypes.sort((a, b) => a.ranking - b.ranking);
    setTypeOptions(data);
    setTypeValue(data[0]._id);
  };

  //   func to get stakeholders
  const getStakeholders = async () => {
    if (typeValue) {
      const result = await api("get", `/Stakeholders/getByType/${typeValue}`);
      setStakeholderOptions(result.data.stakeholder.sort((a, b) => a.ranking - b.ranking));
    }
  };

  //   func to get stakeholders
  const getStakeholders2 = async () => {
    const result = await api("get", `/Stakeholders/getByTypeName/Maitre d'Ouvrage`);
    setStakeholderByType1(result.data.stakeholders);
    const result2 = await api("get", `/Stakeholders/getByTypeName/Maitre d'Oeuvre`);
    setStakeholderByType2(result2.data.stakeholders);
  };

  //   func to get stakeholders
  const getAllStakeholders = async () => {
    const result = await api("get", `/Stakeholders/`);
    let data = result.data.stakeholders.sort((a, b) => a.ranking - b.ranking);
    setAllStakeholderOptions(data);
  };

  //   func to get vat
  const getVat = async () => {
    const result = await api("get", `/VAT/getAll`);
    setOptions(result?.data?.vat.sort((a, b) => a.ranking - b.ranking));
  };

  //   func to get Chap0Part2Data
  const getChap0Part2 = async () => {
    const result = await api("get", `/ArchitectsChap0/current/getByProject`);
    setChapOptions(result.data.data);
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle change function
  const handleChange2 = (name, value) => {
    setValues2((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle change for stakeholders
  const handleStakeholdersChange = (event) => {
    const {
      target: { value },
    } = event;
    let temp = typeof value === "string" ? value.split(",") : value;
    setValues3((prev) => {
      prev.stakeholders = temp;
      return { ...prev };
    });
  };

  const removeStakeholder = (id) => {
    let temp = [];
    temp = values3.stakeholders.filter((item) => item !== id);
    setValues3((prev) => {
      prev.stakeholders = temp;
      return { ...prev };
    });
    handleClose();
  };

  //   handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = values;
    !values.reference && delete data.reference;
    !values.description && delete data.description;
    values.client = selectedStakeholder && selectedStakeholder;
    if (!values.chap0part2 || (currentProject.chap0part2 && currentProject.chap0part2.id._id == data.chap0part2)) {
      delete data.chap0part2;
    } else {
      chapOptions?.architectsChap0?.map((item) => {
        if (item._id == data.chap0part2) {
          data.chap0part2 = { id: values.chap0part2, status: "selected" };
        }
      });
      if (!data.chap0part2.status) {
        data.chap0part2 = { id: values.chap0part2, status: "modified" };
      }
    }
    const result = await api("put", `/project/${currentProject._id}`, data, t);
    toast.success(t(result.data.message));
    handleOpenPropertiesModal();
    getProject();
  };

  //   handle submit
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const result = await api("put", `/project/${currentProject._id}`, values2, t);
    toast.success(t(result.data.message));
    handleOpenPropertiesModal();
    getProject();
  };
  //   handle submit
  const handleSubmit3 = async () => {
    const result = await api("put", `/project/${currentProject._id}`, values3, t);
    toast.success(t(result.data.message));
    handleOpenPropertiesModal();
    getProject();
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle edit stakeholder modal
  const handleEditStakeholderModal = () => {
    setEditStakeholderModal(!editStakeholderModal);
    handleClose();
  };

  // for dropdown menu

  const [anchorEl, setAnchorEl] = useState(null);
  const [stakeId, setStakeId] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event, row, id) => {
    setEditStakeholder(row);
    setStakeId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Work Up
  const handleStakeholderUp = async (id) => {
    let filteredIndex = step3Values.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...step3Values];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      api("put", `/stakeholders/${id}`, {
        workId: id,
        ranking: prevIndex,
      }).then(() => {
        api("put", `/stakeholders/${step3Values[prevIndex]._id}`, {
          workId: prev._id,
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = step3Values[filteredIndex - 1];
          tempArr[filteredIndex - 1] = step3Values[filteredIndex];
          handleClose();
          setStep3Values(tempArr);
        });
      });
    }
  };

  //Work Down
  const handleStakeholderDown = async (id) => {
    let filteredIndex = step3Values.findIndex((dt) => dt._id == id);

    if (filteredIndex !== step3Values.length - 1) {
      let tempArr = [...step3Values];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      api("put", `/stakeholders/${id}`, {
        workId: id,
        ranking: nextIndex,
      }).then(() => {
        api("put", `/stakeholders/${step3Values[nextIndex]._id}`, {
          workId: prev._id,
          ranking: filteredIndex,
        }).then(() => {
          tempArr[filteredIndex] = step3Values[nextIndex];
          tempArr[nextIndex] = step3Values[filteredIndex];
          handleClose();
          setAllStakeholderOptions(tempArr);
        });
      });
    }
  };

  return (
    !loading && (
      <Box sx={{ width: "60vw", maxHeight: "80vh", overflow: "auto" }}>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ mt: 2.5 }}
        >
          <MenuItem
            style={{ width: 150 }}
            onClick={() => {
              handleEditStakeholderModal();
            }}
          >
            {t("Edit")}
          </MenuItem>
          <MenuItem onClick={() => removeStakeholder(stakeId)}>{t("Delete")}</MenuItem>
          <MenuItem onClick={() => handleStakeholderUp(stakeId)}>{t("Up")}</MenuItem>
          <MenuItem onClick={() => handleStakeholderDown(stakeId)}>{t("Down")}</MenuItem>
        </Menu>
        <Modal
          title={t("Edit Stakeholder")}
          open={editStakeholderModal}
          onClose={handleEditStakeholderModal}
          component={
            <EditStakholder
              stakeholder={editStakeholder}
              handleEditStakeholderModal={handleEditStakeholderModal}
              getAllStakeholders={getAllStakeholders}
            />
          }
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange}>
            <Tab label={t("Project References")} {...a11yProps(0)} />
            <Tab label={t("Market Type / Structure")} {...a11yProps(1)} />
            <Tab label={t("Stakeholders")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <form className={classes.form} onSubmit={handleSubmit}>
            {/* All fields */}
            <InputWithLabel
              label={t("Project Name")}
              name="name"
              type="text"
              value={values.name}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <br />
            <Autocomplete
              label="Maitre d'Ouvrage"
              options={stakeholderByType1}
              setValue={setSelectedStakeholder}
              textValue={stakeholderText}
              setTextValue={setStakeholderText}
              required={true}
              defaultValue={selectedStakeholder}
            />
            <br />

            <Grid container spacing={2}>
              <Grid item zeroMinWidth xs={8}>
                <Autocomplete
                  label="Maitre d'Oeuvre"
                  options={stakeholderByType2}
                  setValue={setSelectedStakeholder2}
                  textValue={stakeholderText2}
                  setTextValue={setStakeholderText2}
                  required={true}
                  defaultValue={selectedStakeholder2}
                />
              </Grid>
              <Grid item zeroMinWidth xs={4}>
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
            <InputWithLabel
              label={t("Reference")}
              name="reference"
              type="text"
              value={values.reference}
              handleChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <br />
            <label htmlFor="grid-first-name" style={{ color: "gray" }}>
              {t("Description")}
            </label>
            <Textarea
              name="description"
              type="text"
              value={values.description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <br />
            <br />
            <InputDropdown
              label={t("Chap. 0 part 2")}
              name="chap0part2"
              value={selectedFam}
              options={familyOptions}
              type="text"
              onChange={(e) => {
                setSelectedFam(e.target.value);
                let tempFam = familyOptions.find((item) => item._id === e.target.value);
                let famName = tempFam.name.toUpperCase();
                if (famName === "PRESCRIPTEUR") {
                  let chap = chapOptions.architectsChap0.find((item) => {
                    return item.type === "private";
                  });
                  if (chap) {
                    handleChange("chap0part2", chap._id);
                  } else {
                    toast.error("This family does not have a Chap. 0 part 2");
                  }
                } else {
                  let chap = chapOptions.chap0.find((item) => {
                    return item.family && item.family === e.target.value;
                  });
                  if (chap) {
                    handleChange("chap0part2", chap._id);
                  } else {
                    toast.error("This family does not have a Chap. 0 part 2");
                  }
                }
              }}
            />
            <br />
            <div>
              <Typography>* Mentions obligatoires</Typography>
            </div>
            {/* register button */}
            <div style={{ width: "100%", textAlign: "right" }}>
              <Button variant="contained" className={classes.btn} onClick={handleOpenPropertiesModal}>
                {t("Close")}
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#3b373c",
                  height: "35px",
                }}
                type="submit"
              >
                {t("Update")}
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <form className={classes.form} onSubmit={handleSubmit2}>
            {/* All fields */}
            <RowRadioButtonsGroup
              row={true}
              label={t("Type Of Contract")}
              data={TOC}
              value={values2.market_type}
              name="market_type"
              handleChange={(e) => handleChange2(e.target.name, e.target.value)}
              disabled={true}
            />
            <br />
            <RowRadioButtonsGroup
              row={true}
              label={t("Type Of Project")}
              data={TOP}
              value={values2.structure}
              name="structure"
              handleChange={(e) => handleChange2(e.target.name, e.target.value)}
            />
            {/* register button */}
            <div style={{ width: "100%", textAlign: "right" }}>
              <Button variant="contained" className={classes.btn} onClick={handleOpenPropertiesModal}>
                {t("Close")}
              </Button>
              <Button variant="contained" className={classes.btn} type="submit">
                {t("Update")}
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={2}>
            <Grid item zeroMinWidth xs>
              <InputDropdown
                name="type"
                label={t("Select a type of stakeholder")}
                value={typeValue}
                onChange={(e) => setTypeValue(e.target.value)}
                options={typeOptions}
                required={true}
              />
            </Grid>
            <Grid item zeroMinWidth xs>
              <InputWithOptions
                label={t("Select Stakeholder")}
                required={true}
                name="family"
                value={values3.stakeholders}
                handleChange={(e) => handleStakeholdersChange(e)}
                options={stakeholderOptions}
              />
            </Grid>
          </Grid>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#3b373c" }}>
                <TableRow sx={{ whiteSpace: "nowrap" }}>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 140,
                    }}
                  >
                    {t("Type of stakeholder")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 160,
                    }}
                  >
                    {t("Name of stakeholder")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 140,
                    }}
                  >
                    {t("Address 1")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 140,
                    }}
                  >
                    {t("Address 2")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 140,
                    }}
                  >
                    {t("Zipcode")}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      color: "white",
                      fontWeight: 900,
                      fontSize: 12,
                      width: 140,
                    }}
                  >
                    {t("City")}
                  </TableCell>

                  <TableCell align="left" sx={{ color: "white", fontWeight: 900 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {step3Values?.map((row) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        whiteSpace: "nowrap",
                      }}
                    >
                      <TableCell align="left">{row.type.text}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.address1.substring(0, 20)}
                        {row.address1.length > 40 && "..."}
                      </TableCell>
                      <TableCell align="left">
                        {row.address2 ? (
                          <>
                            {row.address2.substring(0, 20)}
                            {row.address2.length > 40 && "..."}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell align="left">{row.zipcode}</TableCell>
                      <TableCell align="left">{row.city}</TableCell>
                      <TableCell align="left">
                        <IconButton
                          id="demo-positioned-button"
                          aria-controls={open ? "demo-positioned-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e, row, row._id)}
                        >
                          <MoreVertIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          {/* register button */}
          <div style={{ width: "100%", textAlign: "right" }}>
            <Button variant="contained" className={classes.btn} onClick={handleOpenPropertiesModal}>
              {t("Close")}
            </Button>
            <Button variant="contained" className={classes.btn} onClick={handleSubmit3}>
              {t("Update")}
            </Button>
          </div>
        </TabPanel>
      </Box>
    )
  );
};

export default PropertiesModal;
