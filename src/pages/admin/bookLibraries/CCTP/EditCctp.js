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
            {formik.touched.name && formik.errors.name ? (
              <small>{formik.errors.name}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
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
            {formik.touched.type && formik.errors.type ? (
              <small>{formik.errors.type}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            type="number"
            placeholder="Ranking"
            label="Ranking"
            name="ranking"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.ranking}
          />
          <div className="text-red-600 ">
            {formik.touched.ranking && formik.errors.ranking ? (
              <small>{formik.errors.ranking}</small>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
}
