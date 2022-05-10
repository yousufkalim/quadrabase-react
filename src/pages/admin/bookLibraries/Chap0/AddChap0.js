import React from "react";

import TextInput from "../../../../components/TextInput";
import RichTextEditor from "../../../..//components/RichTextEditor";
import SelectField from "../../../../components/SelectField";

export default function AddExpense(props) {
  const { translate, formik, text, setText, options, setFamily, family } =
    props;

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

        <div className="  -mx-3 mb-2">
          <div className="w-full  px-6 mb-3">
            <SelectField
              name="subscription"
              label={translate("Select Family")}
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              translate={translate}
              options={options}
            />
          </div>
        </div>

        <div className="w-full  px-3">
          <RichTextEditor value={text} setValue={setText} />
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
