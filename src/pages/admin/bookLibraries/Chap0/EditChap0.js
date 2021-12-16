import React from "react";
import { useFormik } from "formik";
import { CHAP0_STATE } from "../../../../components/formik/initialValues";
import { CHAP0_YUP } from "../../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken } from "../../../../utils/Auth";
import Notifier from "../../../../utils/Notifier";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { red } from "@mui/material/colors";

export default function AddExpense(props) {
  const {translate} = props;
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: CHAP0_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      console.log(values, "values");
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Chap0/${props.adminId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success");
        setisLoading(false);
        props.handleModal();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error");

        console.log("Errror->>>", err);
      }
    },
  });
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
          <TextInput
            type="text"
            placeholder="Text"
            label="Text"
            name="text"
            translate={translate}
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

      <div className="flex pt-5 justify-end ">
        <div className="">
          <Button
            onClick={props.handleModal}
            label="Close"
            translate={translate}
            backgroundColor={red}
            default={false}
          />
        </div>
        <div className=" ml-3">
          <Button
            onClick={formik.handleSubmit}
            disabled={isLoading}
            translate={translate}
            label={isLoading ? "Updating" : "Update"}
            default={true}
          />
        </div>
      </div>
    </form>
  );
}
