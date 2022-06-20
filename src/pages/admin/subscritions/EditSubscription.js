import React from "react";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import SelectField from "../../../components/SelectField";
import { formatNumber } from "../../../utils/markThousand";

const typeOptions = [
  {
    _id: "Prescribers",
    name: "Prescripteurs",
  },
  { _id: "Manufacturers", name: "Fabricants" },
];

const referenceOptions1 = [
  {
    _id: "Quadrabase subscription",
    name: "70600100 - Abonnement Quadrabase",
  },
  {
    _id: "Pack 5 Projects",
    name: "70600200 - Pack 5 Projets",
  },
];

const referenceOptions2 = [
  {
    _id: "Referencing subscription",
    name: "70600300 - Abonnement Référencement",
  },
  {
    _id: "Alert Subscription",
    name: "70600400 - Abonnement Alerte",
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
        } else if (dat == "price") {
          formik.setFieldValue("price", formatNumber(parseFloat(editData[dat]).toFixed(2).toString(), "."));
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
            disabled={true}
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
            onBlur={() => {
              let temp = formik.values.price.toString().replace(/\s/g, "").split(",").join(".");
              formik.setFieldValue("price", formatNumber(parseFloat(temp).toFixed(2).toString(), "."));
            }}
            onFocus={() => {
              let temp = formik.values.price.toString().replace(/\s/g, "").split(",").join(".");
              formik.setFieldValue("price", formatNumber(parseFloat(temp).toFixed(2).toString(), "."));
            }}
          />
          <div className="text-red-600 ">
            {formik.touched.price && formik.errors.price ? <small>{formik.errors.price}</small> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
