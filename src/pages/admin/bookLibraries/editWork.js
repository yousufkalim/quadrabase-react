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
import DocViewer from "../../../components/DocViewer";

import { red } from "@mui/material/colors";
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
  const [ProviderOptions, setProviderOptions] = React.useState([]);
  const [ProviderDataArr, setProviderDataArr] = React.useState([]);

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
          method: "put",
          url: `${baseUrl}/BookLibraries/editWork/${props.libraryId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        setisLoading(false);
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
  const handleDeleteDocument = async (id) => {
    let filteredData = ProviderDataArr.filter((dt) => dt.provider !== id);
    setProviderDataArr(filteredData);
  };
  const handleAdd = (obj) => {
    setProviderDataArr([...ProviderDataArr, obj]);
  };
  const handleUpdate = (obj) => {
    console.log(obj, "obj");
    let filteredIndex = ProviderDataArr.findIndex(
      (dt) => dt.provider == obj.provider
    );
    ProviderDataArr[filteredIndex] = obj;
    setProviderDataArr(ProviderDataArr);
  };
  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (Object.keys(initialValues).includes(dat)) {
          if (dat == "cctp_text") {
            setcctp_text1(editData[dat][0] ?? "");
            setcctp_text2(editData[dat][1] ?? "");
            setcctp_text3(editData[dat][2] ?? "");
            setcctp_text4(editData[dat][3] ?? "");
          } else if (dat == "providers") {
            setProviderDataArr(editData[dat]);
          } else {
            formik.setFieldValue(dat, editData[dat]);
          }
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full  pt-1">
      <div className="flex no-wrap  -mx-3 mb-3">
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
            options={UnitOptions}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
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
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text3(value)}
            value={cctp_text3}
            label={"CCTP 3"}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-1">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text4(value)}
            value={cctp_text4}
            label={"CCTP 4"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setbpu_text(value)}
            value={bpu_text}
            label={"BPU"}
          />
        </div>
      </div>
      <div className="w-full mb-3 ">
        <div className="w-full px-2 mb-3">
          <AddMemoizedProvider
            ProviderOptions={ProviderOptions}
            onAdd={handleAdd}
          />
        </div>
        <div className="w-full   ">
          {ProviderDataArr && ProviderDataArr.length > 0 ? (
            <>
              <div className="h-72 overflow-y-auto border px-10 py-3">
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
        <div className="flex pb-2 pt-6  self-end	items-end justify-end  ">
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
              label={isLoading ? "Updating..." : "Update"}
              default={true}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
