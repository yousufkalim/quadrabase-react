import React from "react";

import TextInput from "../../../../components/TextInput";

export default function AddExpense(props) {
  const { translate, formik } = props;

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="text"
            label={translate("Name")}
            labelUpperCase={true}
            name="name"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="text-red-600 ">
            {formik.touched.name && formik.errors.name ? (
              <small>{formik.errors.name}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Title"
            label="Title"
            labelUpperCase={true}
            name="type"
            translate={translate}
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
    </form>
  );
}
