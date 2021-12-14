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

import { red } from "@mui/material/colors";
import RichTextEditor from "../../../components/RichTextEditor";

export default function AddExpense(props) {
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const [cctp_text1, setcctp_text1] = React.useState("");
  const [cctp_text2, setcctp_text2] = React.useState("");
  const [cctp_text3, setcctp_text3] = React.useState("");
  const [cctp_text4, setcctp_text4] = React.useState("");
  const [bpu_text, setbpu_text] = React.useState("");

  const [options, setOptions] = React.useState([]);

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
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/BookLibraries/addWork`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success");
        setisLoading(false);
        props.handleClose();

        formik.resetForm();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error");

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
      setOptions(response.data.units);
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
  };
  useEffect(() => {
    getAllUnits();
  }, []);

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
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
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="unit"
            label="Select Unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
            options={options}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text1(value)}
            value={cctp_text1}
            label={"CCTP 1"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text2(value)}
            value={cctp_text2}
            label={"CCTP 2"}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text3(value)}
            value={cctp_text3}
            label={"CCTP 3"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text4(value)}
            value={cctp_text4}
            label={"CCTP 4"}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setbpu_text(value)}
            value={bpu_text}
            label={"BPU"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="unit"
            label="Select Provider"
            value={formik.values.provider}
            onChange={formik.handleChange}
            options={options}
          />
          <div className="text-red-600 ">
            {formik.touched.unit && formik.errors.unit ? (
              <small>{formik.errors.unit}</small>
            ) : null}
          </div>
        </div>
      </div>
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
            label={isLoading ? "Creating" : "Create"}
            default={true}
          />
        </div>
      </div>
    </form>
  );
}
