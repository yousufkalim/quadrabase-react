import React from "react";

import TextInput from "../../../../components/TextInput";

export default function AddExpense(props) {
  const { translate, formik } = props;

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full  px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Value"
            label="Value"
            name="value"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.value}
          />
          <div className="text-red-600 ">
            {formik.touched.value && formik.errors.value ? (
              <small>{formik.errors.value}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
