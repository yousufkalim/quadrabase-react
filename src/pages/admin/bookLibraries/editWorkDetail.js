import React, { useEffect } from "react";
import { useFormik } from "formik";
import { WORK_DETAIL_STATE } from "../../../components/formik/initialValues";
import { WORK_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";
import SelectField from "../../../components/SelectField";

export default function AddExpense(props) {
  const token = getToken();
  const { translate } = props;
  const [options, setOptions] = React.useState([]);

  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: WORK_DETAIL_STATE,
    validationSchema: WORK_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/BookLibraries/editWorkDetail/${props.libraryId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        props.getLevel4(props.editData.work);
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
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [props.editmodal]);
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
      <div className=" -mx-3 mb-2">
        <div className="w-full  px-3 mb-3">
          <TextInput
            type="text"
            label={translate("Name")}
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
        <div className="w-full  px-3 mb-3">
          <TextInput
            type="number"
            label={translate("PU HT")}
            name="unit_price"
            onChange={formik.handleChange}
            value={formik.values.unit_price}
          />
          <div className="text-red-600 ">
            {formik.touched.unit_price && formik.errors.unit_price ? (
              <small>{formik.errors.unit_price}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full  px-3 mb-3">
          <SelectField
            name="unit"
            label={translate("Select Unit")}
            value={formik.values.unit}
            onChange={formik.handleChange}
            options={options}
          />
        </div>
      </div>
      <div className="flex pb-2 justify-end ">
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
            label={isLoading ? "Updating" : "Update"}
            default={true}
          />
        </div>
      </div>
    </form>
  );
}
