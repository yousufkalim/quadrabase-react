import React from "react";

import TextInput from "../../../../components/TextInput";

export default function AddExpense(props) {

  const { translate, formik } = props;

  return (
    <form className="w-full pt-9">
      <div className=" -mx-3 mb-2">
        <div className="w-full px-3 mb-6">
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
        <div className="w-full px-3 mb-6">
          <TextInput
            type="text"
            placeholder="Symbol"
            label="Symbol"
            name="symbol"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.symbol}
          />
          <div className="text-red-600 ">
            {formik.touched.symbol && formik.errors.symbol ? (
              <small>{formik.errors.symbol}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
