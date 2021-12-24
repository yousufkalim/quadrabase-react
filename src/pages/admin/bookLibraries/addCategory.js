import React from "react";
import { useFormik } from "formik";
import { CATEGORY_STATE } from "../../../components/formik/initialValues";
import { CATEGORY_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";
import RichTextEditor from "../../../components/RichTextEditor";

export default function AddExpense(props) {
  const token = getToken();
  const { translate } = props;
  const [isLoading, setisLoading] = React.useState(false);
  const [cctp_text1, setcctp_text1] = React.useState("");
  const [cctp_text2, setcctp_text2] = React.useState("");
  const [cctp_text3, setcctp_text3] = React.useState("");
  const [cctp_text4, setcctp_text4] = React.useState("");

  const formik = useFormik({
    initialValues: CATEGORY_STATE,
    validationSchema: CATEGORY_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      let cctp_text = [];
      cctp_text.push(cctp_text1);
      cctp_text.push(cctp_text2);
      cctp_text.push(cctp_text3);
      cctp_text.push(cctp_text4);
      values.cctp_text = cctp_text;

      values.libraryId = props.BookLibraryId;
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/BookLibraries/addCategory`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        setisLoading(false);
        props.handleClose();

        formik.resetForm();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  return (
    <form className="w-full  pt-9">
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full  px-3 mb-6 md:mb-0 ">
          <TextInput
            type="text"
            placeholder="Name"
            label="Name"
            name="name"
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
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text1(value)}
            value={cctp_text1}
            label={"CCTP 1"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text2(value)}
            value={cctp_text2}
            label={"CCTP 2"}
          />
        </div>
      </div>
      <div className="flex no-wrap  -mx-3 mb-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text3(value)}
            value={cctp_text3}
            label={"CCTP 3"}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
          <RichTextEditor
            onChange={(value) => setcctp_text4(value)}
            value={cctp_text4}
            label={"CCTP 4"}
          />
        </div>
      </div>

      <div className="flex pb-2 justify-end ">
        <div className="">
          <Button
            onClick={() => props.handleClose()}
            label="Close"
            backgroundColor={red}
            default={false}
          />
        </div>
        <div className=" ml-3">
          <Button
            onClick={formik.handleSubmit}
            disabled={isLoading}
            label={isLoading ? "Creating" : "Create"}
            default={true}
          />
        </div>
      </div>
    </form>
  );
}
