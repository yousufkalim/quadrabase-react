import React from "react";
import { useFormik } from "formik";
import { ARCHITECT_STATE } from "../../../components/formik/initialValues";
import { ARCHITECT_YUP } from "../../../components/formik/validations";
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
    initialValues: ARCHITECT_STATE,
    validationSchema: ARCHITECT_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Architects/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success");
        setisLoading(false);
        props.handleModal();
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
            placeholder="Full Name"
            label="Full Name"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          <div className="text-red-600 ">
            {formik.touched.first_name && formik.errors.first_name ? (
              <small>{formik.errors.first_name}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Last Name"
            label="Last Name"
            name="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
          <div className="text-red-600 ">
            {formik.touched.last_name && formik.errors.last_name ? (
              <small>{formik.errors.last_name}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3">
          <TextInput
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="text-red-600 ">
            {formik.touched.email && formik.errors.email ? (
              <small>{formik.errors.email}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="text-red-600 ">
            {formik.touched.password && formik.errors.password ? (
              <small>{formik.errors.password}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            name="confirm_password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
          />
          <div className="text-red-600 ">
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <small>{formik.errors.confirm_password}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Establishment"
            label="Establishment"
            name="establishment"
            onChange={formik.handleChange}
            value={formik.values.establishment}
          />
          <div className="text-red-600 ">
            {formik.touched.establishment && formik.errors.establishment ? (
              <small>{formik.errors.establishment}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="service"
            label="service"
            name="service"
            onChange={formik.handleChange}
            value={formik.values.service}
          />
          <div className="text-red-600 ">
            {formik.touched.service && formik.errors.service ? (
              <small>{formik.errors.service}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={props.handleModal}
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
