import React from "react";

import TextInput from "../../../../components/TextInput";
import TextArea from "../../../../components/TextArea";

export default function AddExpense(props) {
  const { translate, formik } = props;

  return (
    <form className="w-full  pt-9">
      <div className="  -mx-3 mb-2">
        <div className="w-full  px-3 mb-3">
          <TextInput
            type="text"
            placeholder="Title"
            label="Title"
            name="title"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <div className="text-red-600 ">
            {formik.touched.title && formik.errors.title ? (
              <small>{formik.errors.title}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full  px-3">
          <TextInput
            type="text"
            placeholder="Text"
            label="Text"
            name="text"
            translate={translate}
            rows={3}
            onChange={formik.handleChange}
            value={formik.values.text}
          />
          <div className="text-red-600 ">
            {formik.touched.text && formik.errors.text ? (
              <small>{formik.errors.text}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
