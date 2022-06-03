import React from "react";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";

export default function AddExpense(props) {
  const { translate, formik } = props;

  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (dat === "duration") {
          formik.setFieldValue("durationMonths", editData[dat].months);
          formik.setFieldValue("durationprice", editData[dat].price);
        } else if (dat === "projectsPack") {
          formik.setFieldValue("projectsPack", editData[dat].projects);
          formik.setFieldValue("projectPrice", editData[dat].price);
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
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            placeholder="Type"
            label="Type"
            name="type"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          <div className="text-red-600 ">
            {formik.touched.type && formik.errors.type ? <small>{formik.errors.type}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="number"
            placeholder="Duration"
            label="Duration"
            name="durationMonths"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.durationMonths}
          />
          <div className="text-red-600 ">
            {formik.touched.durationMonths && formik.errors.durationMonths ? <small>{formik.errors.durationMonths}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Duration Price"
            label="Duration Price"
            name="durationprice"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.durationprice}
          />
          <div className="text-red-600 ">
            {formik.touched.durationprice && formik.errors.durationprice ? <small>{formik.errors.durationprice}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Projects"
            label="Number of Projects in Pack"
            name="projectsPack"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.projectsPack}
          />
          <div className="text-red-600 ">
            {formik.touched.projectsPack && formik.errors.projectsPack ? <small>{formik.errors.projectsPack}</small> : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Pack Price"
            label="Pack Price"
            name="projectPrice"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.projectPrice}
          />
          <div className="text-red-600 ">
            {formik.touched.projectPrice && formik.errors.projectPrice ? <small>{formik.errors.projectPrice}</small> : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Credit"
            label="Credit"
            name="credit"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.credit}
          />
          <div className="text-red-600 ">
            {formik.touched.credit && formik.errors.credit ? <small>{formik.errors.credit}</small> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
