import React from "react";
import { useFormik } from "formik";
import { CATEGORY_STATE } from "../../../components/formik/initialValues";
import { CATEGORY_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";
import RichTextEditor from "../../../components/RichTextEditor";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { TabPanel, a11yProps } from "../../../components/CCTPTabs";

export default function AddExpense(props) {
  const token = getToken();
  const { translate } = props;
  const [isLoading, setisLoading] = React.useState(false);
  const [cctp_text1, setcctp_text1] = React.useState("");
  const [cctp_text2, setcctp_text2] = React.useState("");
  const [cctp_text3, setcctp_text3] = React.useState("");
  const [cctp_text4, setcctp_text4] = React.useState("");

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTabIndex(newValue);
  };

  const formik = useFormik({
    initialValues: CATEGORY_STATE,
    validationSchema: CATEGORY_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      let cctp_text = [];

      cctp_text.push(cctp_text1);
      cctp_text.push(cctp_text2);
      cctp_text.push(cctp_text3);
      cctp_text.push(cctp_text4);
      values.cctp_text = cctp_text;
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/BookLibraries/editCategory/${props.libraryId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        setisLoading(false);
        props.handleClose();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (Object.keys(initialValues).includes(dat)) {
          if (dat == "cctp_text") {
            setcctp_text1(editData[dat][0]);
            setcctp_text2(editData[dat][1]);
            setcctp_text3(editData[dat][2]);
            setcctp_text4(editData[dat][3]);
          } else {
            formik.setFieldValue(dat, editData[dat]);
          }
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="text"
            placeholder="Name"
            label="Name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="text-red-600 ">
            {formik.touched.name && formik.errors.name ? (
              <small>{formik.errors.name}</small>
            ) : null}
          </div>
        </div>
      </div>

      {/* CCTP Tab View */}
      <Box sx={{ width: "100%", }}>
        <Box sx={{ borderBottom: 1, borderColor: '#f2f2f2' }}>
          <Tabs value={selectedTabIndex} onChange={handleTabChange} aria-label="CCTPs">
            <Tab label="CCTP1" {...a11yProps(0)} />
            <Tab label="CCTP2" {...a11yProps(1)} />
            <Tab label="CCTP3" {...a11yProps(2)} />
            <Tab label="CCTP4" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={selectedTabIndex} index={0}>
          <RichTextEditor
            height="300px"
            onChange={(value) => setcctp_text1(value)}
            value={cctp_text1}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={1}>
          <RichTextEditor
            height="300px"
            onChange={(value) => setcctp_text2(value)}
            value={cctp_text2}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={2}>
          <RichTextEditor
            height="300px"
            onChange={(value) => setcctp_text3(value)}
            value={cctp_text3}
          />
        </TabPanel>
        <TabPanel value={selectedTabIndex} index={3}>
          <RichTextEditor
            height="300px"
            onChange={(value) => setcctp_text4(value)}
            value={cctp_text4}
          />
        </TabPanel>
      </Box>

      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={() => props.handleClose()}
            label="Close"
            backgroundColor={red}
            default={false}
          />
        </div>
        <div className=" ml-3">
          <Button
            onClick={formik.handleSubmit}
            disabled={isLoading}
            label={isLoading ? "Updating" : "Update"}
            default={true}
          />
        </div>
      </div>
    </form>
  );
}
