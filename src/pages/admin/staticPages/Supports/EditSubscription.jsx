import React from 'react';

import TextInput from '../../../../components/TextInput';
import RichTextEditor from '../../../../components/RichTextEditor';

export default function AddExpense(props) {
  const { translate, formik } = props;

  React.useEffect(() => {
    let editData = props.editData;
    let initialValues = formik.initialValues;

    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (dat == 'text') {
          props.setText(editData[dat]);
        } else if (Object.keys(initialValues).includes(dat)) {
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [props.editmodal]);
  return (
    <form className="w-full  pt-9">
      <div className="w-full  px-3 mb-6 md:mb-0">
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
          {formik.touched.type && formik.errors.type ? <small>{formik.errors.type}</small> : null}
        </div>
      </div>
      <br />
      <div className="w-full px-3 mb-6 md:mb-0">
        <RichTextEditor setValue={props.setText} value={props.text} />
        <div className="text-red-600 ">
          {formik.touched.reference && formik.errors.reference ? (
            <small>{formik.errors.reference}</small>
          ) : null}
        </div>
      </div>
      <br />
    </form>
  );
}
