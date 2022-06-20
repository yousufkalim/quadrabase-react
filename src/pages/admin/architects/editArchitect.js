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
        if (Object.keys(initialValues).includes(dat) && dat !== "password" && dat !== "confirm_password") {
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
            placeholder="Establishment"
            label="Establishment"
            name="establishment"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.establishment}
          />
          <div className="text-red-600 ">
            {formik.touched.establishment && formik.errors.establishment ? <small>{formik.errors.establishment}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Service"
            label="Service"
            name="service"
            onChange={formik.handleChange}
            value={formik.values.service}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.service && formik.errors.service ? <small>{formik.errors.service}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Address 1"
            label="Address 1"
            name="address_1"
            onChange={formik.handleChange}
            value={formik.values.address_1}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.address_1 && formik.errors.address_1 ? <small>{formik.errors.address_1}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Address 2"
            label="Address 2"
            name="address_2"
            onChange={formik.handleChange}
            value={formik.values.address_2}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.address_2 && formik.errors.address_2 ? <small>{formik.errors.address_2}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="12345"
            label="PO Box"
            name="po_box"
            onChange={formik.handleChange}
            value={formik.values.po_box}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.po_box && formik.errors.po_box ? <small>{formik.errors.po_box}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="123456"
            label="Postal Code"
            name="postal_code"
            onChange={formik.handleChange}
            value={formik.values.postal_code}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.postal_code && formik.errors.postal_code ? <small>{formik.errors.postal_code}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="City"
            label="City"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.city && formik.errors.city ? <small>{formik.errors.city}</small> : null}
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
            {formik.touched.last_name && formik.errors.last_name ? <small>{formik.errors.last_name}</small> : null}
          </div>
        </div>
      </div>
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
            {formik.touched.first_name && formik.errors.first_name ? <small>{formik.errors.first_name}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Phone"
            label="Phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.phone && formik.errors.phone ? <small>{formik.errors.phone}</small> : null}
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
            {formik.touched.email && formik.errors.email ? <small>{formik.errors.email}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Client Code"
            label="Client Code"
            name="client_code"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.client_code}
          />
          <div className="text-red-600 ">
            {formik.touched.client_code && formik.errors.client_code ? <small>{formik.errors.client_code}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <RadioButton
            label="Authorize"
            name="authorized"
            onChange={formik.handleChange}
            value={formik.values.authorized}
            options={["Yes", "No"]}
            translate={translate}
          />
        </div>
      </div>
    </form>
  );
}
