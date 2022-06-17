import React from "react";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import SelectField from "../../../components/SelectField";

const typeOptions = [
  {
    _id: "Prescribers",
    name: "Prescribers",
  },
  { _id: "Manufacturers", name: "Manufacturers" },
];

const referenceOptions1 = [
  {
    _id: "Quadrabase initial",
    name: "Quadrabase initial",
  },
  {
    _id: "Quadrabase subscription",
    name: "Quadrabase subscription",
  },
  {
    _id: "Pack 5 Projects",
    name: "Pack 5 Projects",
  },
];

const referenceOptions2 = [
  {
    _id: "Referencing subscription",
    name: "Referencing subscription",
  },
  {
    _id: "Alert Subscription",
    name: "Alert Subscription",
  },
];

export default function AddExpense(props) {
  const { translate, formik } = props;

  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (dat === "reference") {
          formik.setFieldValue("reference", editData[dat].title);
        } else if (Object.keys(initialValues).includes(dat)) {
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="type"
            label={translate("Type")}
            value={formik.values.type}
            onChange={(e) => formik.setFieldValue("type", e.target.value)}
            translate={translate}
            options={typeOptions}
            type="provider"
          />
          <div className="text-red-600 ">
            {formik.touched.type && formik.errors.type ? <small>{formik.errors.type}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="reference"
            label={translate("Reference")}
            value={formik.values.reference}
            onChange={(e) => {
              if (e.target.value === "Pack 5 Projects") formik.setFieldValue("duration", 0);
              formik.setFieldValue("reference", e.target.value);
            }}
            translate={translate}
            options={formik.values.type === "Prescribers" ? referenceOptions1 : referenceOptions2}
            type="provider"
            disabled={true}
          />
          <div className="text-red-600 ">
            {formik.touched.reference && formik.errors.reference ? <small>{formik.errors.reference}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
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
            {formik.touched.name && formik.errors.name ? <small>{formik.errors.name}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="number"
            placeholder="Duration"
            label="Duration"
            name="duration"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.duration}
            disabled={formik.values.reference === "Pack 5 Projects"}
          />
          <div className="text-red-600 ">
            {formik.touched.duration && formik.errors.duration ? <small>{formik.errors.duration}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Rate"
            label="Rate"
            name="price"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          <div className="text-red-600 ">
            {formik.touched.price && formik.errors.price ? <small>{formik.errors.price}</small> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
