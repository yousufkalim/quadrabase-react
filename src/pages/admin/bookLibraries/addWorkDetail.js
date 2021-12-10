import React from "react";
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

export default function AddExpense(props) {
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: WORK_DETAIL_STATE,
    validationSchema: WORK_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      values.workId = props.workId;
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/BookLibraries/addWorkDetail`,
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
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Unit"
            label="Unit"
            name="unit"
            onChange={formik.handleChange}
            value={formik.values.unit}
          />
          <div className="text-red-600 ">
            {formik.touched.unit && formik.errors.unit ? (
              <small>{formik.errors.unit}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            min="0"
            placeholder="Unit Price"
            label="Unit Price"
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
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            min="0"
            placeholder="Quantity"
            label="Quantity"
            name="quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          <div className="text-red-600 ">
            {formik.touched.quantity && formik.errors.quantity ? (
              <small>{formik.errors.quantity}</small>
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
