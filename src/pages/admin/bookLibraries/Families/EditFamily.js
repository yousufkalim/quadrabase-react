import React from "react";

import TextInput from "../../../../components/TextInput";

export default function AddExpense(props) {
  const { translate, formik } = props;

  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (Object.keys(initialValues).includes(dat)) {
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full pt-9">
      <div className=" -mx-3 mb-2">
        <div className="w-full px-3 mb-6">
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
      </div>
    </form>
  );
}
