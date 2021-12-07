import React from "react";
import { useFormik } from "formik";
import { LIBRARY_STATE } from "../../../components/formik/initialValues";
import { LIBRARY_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";
import actionTypes from "./actionTypes";

export default function AddExpense(props) {
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: LIBRARY_STATE,
    validationSchema: LIBRARY_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/BookLibraries/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success");
        setisLoading(false);
        props.handleClose(actionTypes.ADD_LIBRARY);
        formik.resetForm();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error");

        console.log("Errror->>>", err);
      }
    },
  });

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
          <TextInput
            type="text"
            placeholder="Type"
            label="Type"
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          <div className="text-red-600 ">
            {formik.touched.type && formik.errors.type ? (
              <small>{formik.errors.type}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            min="0"
            placeholder="Ranking"
            label="Ranking"
            name="ranking"
            onChange={formik.handleChange}
            value={formik.values.ranking}
          />
          <div className="text-red-600 ">
            {formik.touched.ranking && formik.errors.ranking ? (
              <small>{formik.errors.ranking}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={() => props.handleClose(actionTypes.ADD_LIBRARY)}
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
