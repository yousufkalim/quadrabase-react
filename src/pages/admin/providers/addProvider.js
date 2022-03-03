import React from "react";
import TextInput from "../../../components/TextInput";
import TextArea from "../../../components/TextArea";
import { useTranslation } from "react-i18next";
export default function AddExpense(props) {
  const { translate, formik } = props;
  const { t } = useTranslation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["telephone_no", "contact_no", "zipcode"].includes(name)) {
      formik.setFieldValue(name, value.replace(/\D/g, ""));
    } else {
      formik.setFieldValue(name, value);
    }
  };
  return (
    <form
      className="w-full pt-9"
      style={{
        position: "relative",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Establishment"
            label="Establishment"
            name="establishment"
            onChange={formik.handleChange}
            value={formik.values.establishment}
            translate={translate}
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
          <TextArea
            type="text"
            placeholder="Address 1"
            label="Address 1"
            name="address1"
            translate={translate}
            rows={6}
            onChange={formik.handleChange}
            value={formik.values.address1}
          />
          <div className="text-red-600 ">
            {formik.touched.address1 && formik.errors.address1 ? (
              <small>{formik.errors.address1}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextArea
            type="text"
            placeholder="Address 2"
            label="Address 2"
            name="address2"
            translate={translate}
            rows={6}
            onChange={formik.handleChange}
            value={formik.values.address2}
          />
          <div className="text-red-600 ">
            {formik.touched.address2 && formik.errors.address2 ? (
              <small>{formik.errors.address2}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="PO Box"
            label="PO Box"
            name="po_box"
            onChange={formik.handleChange}
            value={formik.values.po_box}
            translate={translate}
          />
          <div className="text-red-600 ">
            {formik.touched.po_box && formik.errors.po_box ? (
              <small>{formik.errors.po_box}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="ZipCode"
            label="ZipCode"
            name="zipcode"
            translate={translate}
            onChange={handleChange}
            value={formik.values.zipcode}
          />
          <div className="text-red-600 ">
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <small>{t(formik.errors.zipcode)}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="City"
            label="City"
            name="city"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <div className="text-red-600 ">
            {formik.touched.city && formik.errors.city ? (
              <small>{formik.errors.city}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Name"
            label="Name"
            name="name"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="text-red-600 ">
            {formik.touched.name && formik.errors.name ? (
              <small>{t(formik.errors.name)}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Telephone No"
            label="Telephone No"
            name="telephone_no"
            translate={translate}
            onChange={handleChange}
            value={formik.values.telephone_no}
          />
          <div className="text-red-600 ">
            {formik.touched.telephone_no && formik.errors.telephone_no ? (
              <small>{formik.errors.telephone_no}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="text-red-600 ">
            {formik.touched.email && formik.errors.email ? (
              <small>{t(formik.errors.email)}</small>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Url"
            label="Url"
            name="url"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.url}
          />
          <div className="text-red-600 ">
            {formik.touched.url && formik.errors.url ? (
              <small>{formik.errors.url}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Logo"
            label="Logo"
            name="logo"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.logo}
          />
          <div className="text-red-600 ">
            {formik.touched.logo && formik.errors.logo ? (
              <small>{formik.errors.logo}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
