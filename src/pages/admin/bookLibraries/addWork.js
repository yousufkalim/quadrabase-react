import React, { useEffect } from "react";
import { useFormik } from "formik";
import { WORK_STATE } from "../../../components/formik/initialValues";
import { WORK_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import SelectField from "../../../components/SelectField";

import { red, green } from "@mui/material/colors";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { TabPanel, a11yProps } from "../../../components/CCTPTabs";

import RichTextEditor from "../../../components/RichTextEditor";
export default function AddExpense(props) {
  const token = getToken();
  const { translate } = props;
  const [isLoading, setisLoading] = React.useState(false);
  const [cctp_text1, setcctp_text1] = React.useState("");
  const [cctp_text2, setcctp_text2] = React.useState("");
  const [cctp_text3, setcctp_text3] = React.useState("");
  const [cctp_text4, setcctp_text4] = React.useState("");
  const [bpu_text, setbpu_text] = React.useState("");

  const [UnitOptions, setUnitOptions] = React.useState([]);
  const [ProviderDataArr, setProviderDataArr] = React.useState([]);

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  // states to manage provider list
  const [ProviderOptions, setProviderOptions] = React.useState([]);
  const [associatedProviders, setAssociatedProviders] = React.useState([]);
  const [selectedProvider, setSelectedProvider] = React.useState("");
  const [selectedAssociatedProvider, setSelectedAssociatedProvider] =
    React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [documents, setDocuments] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  const formik = useFormik({
    initialValues: WORK_STATE,
    validationSchema: WORK_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      values.categoryId = props.categoryId;
      let cctp_text = [];

      cctp_text.push(cctp_text1);
      cctp_text.push(cctp_text2);
      cctp_text.push(cctp_text3);
      cctp_text.push(cctp_text4);
      values.bpu_text = [bpu_text];
      values.cctp_text = cctp_text;
      if (documents.length !== 0) {
        let tempProvider = [];
        ProviderDataArr.map((item) => {
          let obj = {
            provider: item.provider,
            documents: documents,
          };
          tempProvider.push(obj);
        });
        values.providers = tempProvider;
      } else {
        values.providers = ProviderDataArr;
      }

      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/BookLibraries/addWork`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        setisLoading(false);
        props.getLevel3(props.categoryId);
        props.handleClose();

        formik.resetForm();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  const getAllUnits = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Units`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnitOptions(response.data.units.sort((a, b) => a.ranking - b.ranking));
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };
  const getAllProviders = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Providers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProviderOptions(response.data.providers);
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };
  useEffect(() => {
    getAllUnits();
    getAllProviders();
  }, []);

  // functions for provider list
  const handleAddPriovider = () => {
    let flag = associatedProviders.some(
      (item) => item._id === selectedProvider._id
    );
    if (!flag) {
      let obj = {
        provider: selectedProvider._id,
        document: [],
      };
      setProviderDataArr([...ProviderDataArr, obj]);
      setAssociatedProviders([...associatedProviders, selectedProvider]);
    }
  };

  const handleRemoveProvider = () => {
    let filteredData = associatedProviders.filter(
      (item) => item._id !== selectedAssociatedProvider._id
    );
    setAssociatedProviders(filteredData);
    let filteredProviderData = ProviderDataArr.filter(
      (item) => item.provider !== selectedAssociatedProvider._id
    );
    setProviderDataArr(filteredProviderData);
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    let form_data = new FormData();

    for (let i = 0; i < files.length; i++) {
      form_data.append(`file`, files[i]);
    }
    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/fileUploader`,
        data: form_data,
      });
      let documents = response.data.files;
      setFileName(files[0].name);
      setDocuments(documents);
    } catch (error) {
      if (error.response) {
        Notifier(error.response.data.message, "error");
      }
      console.log(error?.response?.data?.message, "error ");
    }
  };

  return (
    <form className="w-full  pt-1">
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <TextInput
            type="text"
            label={translate("Name")}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <small className="text-red-600 ">
            {formik.touched.name && formik.errors.name ? (
              <small>{formik.errors.name}</small>
            ) : null}
          </small>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <TextInput
            type="number"
            label={translate("PU HT")}
            name="unit_price"
            onChange={formik.handleChange}
            value={formik.values.unit_price}
          />
          <small className="text-red-600 ">
            {formik.touched.unit_price && formik.errors.unit_price ? (
              <small>{formik.errors.unit_price}</small>
            ) : null}
          </small>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="unit"
            label={translate("Select Unit")}
            value={formik.values.unit}
            onChange={formik.handleChange}
            options={UnitOptions}
          />
          <small className="text-red-600 ">
            {formik.touched.unit && formik.errors.unit ? (
              <small>{formik.errors.unit}</small>
            ) : null}
          </small>
        </div>
      </div>

      {/* CCTP Tab View */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "#f2f2f2" }}>
          <Tabs
            value={selectedTabIndex}
            onChange={handleTabChange}
            aria-label="CCTPs"
          >
            <Tab label="CCTP1" {...a11yProps(0)} />
            <Tab label="CCTP2" {...a11yProps(1)} />
            <Tab label="CCTP3" {...a11yProps(2)} />
            <Tab label="CCTP4" {...a11yProps(3)} />
            <Tab label="BPU" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTabIndex} index={0}>
          <RichTextEditor setValue={setcctp_text1} value={cctp_text1} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          <RichTextEditor setValue={setcctp_text2} value={cctp_text2} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={2}>
          <RichTextEditor setValue={setcctp_text3} value={cctp_text3} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={3}>
          <RichTextEditor setValue={setcctp_text4} value={cctp_text4} />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={4}>
          <RichTextEditor setValue={setbpu_text} value={bpu_text} />
        </TabPanel>
      </Box>

      <div className="flex justify-between w-full">
        <div style={{ width: "49%" }}>
          <div
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2 flex justify-between items-center"
            htmlFor="grid-first-name"
          >
            {translate("Provider List")}
            <Button
              onClick={handleAddPriovider}
              disabled={!selectedProvider}
              label={translate("Add")}
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
            {ProviderOptions?.map((item) => (
              <h3
                onClick={() => setSelectedProvider(item)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedProvider._id == item._id && "lightgray",
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
            {translate("Associated Provider")}
            <Button
              onClick={handleRemoveProvider}
              label={translate("Remove")}
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
                  backgroundColor:
                    selectedAssociatedProvider._id == item._id && "lightgray",
                }}
              >
                {item.name}
              </h3>
            ))}
          </div>
        </div>
      </div>

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
            }}
          >
            <label style={{ cursor: "pointer" }}>
              {translate("Choose file")} -{" "}
              {fileName ? fileName : translate("no file chosen")}
              <TextInput
                type="file"
                placeholder="Document"
                name="document"
                onChange={handleFileChange}
                multiple={true}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <Button
              onClick={() => props.handleClose()}
              label={translate("Close")}
              backgroundColor={red}
              default={false}
            />
          </div>
          <div className=" ml-3">
            <Button
              onClick={formik.handleSubmit}
              disabled={isLoading}
              label={translate("Create")}
              default={true}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
