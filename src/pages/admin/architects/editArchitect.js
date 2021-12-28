import React from "react";

import TextInput from "../../../components/TextInput";
import RadioButton from "../../../components/RadioButton";
export default function AddExpense(props) {
  const { translate, formik } = props;
  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;
    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (
          Object.keys(initialValues).includes(dat) &&
          dat !== "password" &&
          dat !== "confirm_password"
        ) {
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="First Name"
            label="First Name"
            name="first_name"
            translate={translate}
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
            translate={translate}
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
            disabled={true}
            name="email"
            translate={translate}
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
            type="text"
            placeholder="Establishment"
            label="Establishment"
            name="establishment"
            translate={translate}
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
            placeholder="Service"
            label="Service"
            name="service"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.service}
          />
          <div className="text-red-600 ">
            {formik.touched.service && formik.errors.service ? (
              <small>{formik.errors.service}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <RadioButton
            label="Authorize"
            name="authorized"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.authorized}
            options={["Yes", "No"]}
            lowercase={true}
          />
        </div>
      </div>
    </form>
  );
}
