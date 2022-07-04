import React from "react";

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

export default function AddExpense(props) {
  const { translate, formik } = props;

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectField
            name="type"
            label={translate("Type")}
            value={formik.values.type}
            onChange={(e) => {
              if (e.target.value === "Manufacturers") formik.setFieldValue("projects", 0);
              formik.setFieldValue("type", e.target.value);
            }}
            translate={translate}
            options={typeOptions}
            type="provider"
          />
          <div className="text-red-600 ">
            {formik.touched.type && formik.errors.type ? <small>{formik.errors.type}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Reference"
            label="Reference"
            name="reference"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.reference}
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
          />
          <div className="text-red-600 ">
            {formik.touched.duration && formik.errors.duration ? <small>{formik.errors.duration}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="number"
            placeholder="Projects"
            label="Projects"
            name="projects"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.projects}
            disabled={formik.values.type === "Manufacturers"}
          />
          <div className="text-red-600 ">
            {formik.touched.projects && formik.errors.projects ? <small>{formik.errors.projects}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Rate"
            label="Price excl. VAT"
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
