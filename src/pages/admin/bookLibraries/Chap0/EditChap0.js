import React from "react";

import TextInput from "../../../../components/TextInput";
import RichTextEditor from "../../../..//components/RichTextEditor";

export default function AddExpense(props) {
  const { translate, formik, setEditText } = props;

  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;
    setEditText(editData.text);

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
      <div className=" -mx-3 mb-2">
        <div className="w-full  px-3 mb-3 ">
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
        <div className="w-full   px-3">
          <RichTextEditor value={props.editData.text} setValue={setEditText} />
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
