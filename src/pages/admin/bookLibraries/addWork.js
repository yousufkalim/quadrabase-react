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
import AddMemoizedProvider from "./addMemoizedProvider";
import AddMemoizedProviders from "./addMemoizedProviders";

import { red } from "@mui/material/colors";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { TabPanel, a11yProps } from "../../../components/CCTPTabs";

import RichTextEditor from "../../../components/RichTextEditor";
import DocViewer from "../../../components/DocViewer";
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
  const [ProviderOptions, setProviderOptions] = React.useState([]);
  const [ProviderDataArr, setProviderDataArr] = React.useState([]);

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

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
      values.cctp_text = cctp_text;
      values.providers = ProviderDataArr;
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
      setUnitOptions(response.data.units);
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
  const handleDelete = async (id) => {
    let filteredData = ProviderDataArr.filter((dt) => dt.provider !== id);
    setProviderDataArr(filteredData);
  };
  const handleAdd = (obj) => {
    setProviderDataArr([...ProviderDataArr, obj]);
  };
  const handleUpdate = (obj) => {
    let filteredIndex = ProviderDataArr.findIndex(
      (dt) => dt.provider !== obj.provider
    );
    ProviderDataArr[filteredIndex] = obj;
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
          <RichTextEditor
            height="260px"
            onChange={(value) => setcctp_text1(value)}
            value={cctp_text1}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          <RichTextEditor
            height="260px"
            onChange={(value) => setcctp_text2(value)}
            value={cctp_text2}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={2}>
          <RichTextEditor
            height="260px"
            onChange={(value) => setcctp_text3(value)}
            value={cctp_text3}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={3}>
          <RichTextEditor
            height="260px"
            onChange={(value) => setcctp_text4(value)}
            value={cctp_text4}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={4}>
          <RichTextEditor
            height="260px"
            onChange={(value) => setbpu_text(value)}
            value={bpu_text}
          />
        </TabPanel>
      </Box>

      <div className="w-full   mb-3 ">
        <div className="w-full px-2 mb-3">
          <AddMemoizedProvider
            ProviderOptions={ProviderOptions}
            onAdd={handleAdd}
            translate={translate}
          />
        </div>
        <div className="w-full   ">
          {ProviderDataArr && ProviderDataArr.length > 0 ? (
            <>
              <div className="h-80 overflow-y-auto border px-10 py-1">
                {ProviderDataArr &&
                  ProviderDataArr.map(({ documents, provider }, index) => (
                    <div key={index} className="mt-2">
                      <AddMemoizedProviders
                        _id={index}
                        name={provider}
                        documents={documents}
                        ProviderOptions={ProviderOptions}
                        onDelete={() => handleDelete(provider)}
                        handleUpdate={handleUpdate}
                        translate={translate}
                      />
                      <div>
                        <DocViewer documents={documents} height="200" />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex  pt-2  self-end	items-end justify-end  ">
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
