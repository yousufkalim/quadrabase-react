import React, { useEffect } from "react";

import TextInput from "../../../../components/TextInput";

export default function AddExpense(props) {
  const { translate, formik, editData } = props;

  useEffect(() => {
    formik.setFieldValue("name", editData.name);
  }, []);

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full px-3 mb-6 md:mb-0">
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
      </div>
    </form>
  );
}
