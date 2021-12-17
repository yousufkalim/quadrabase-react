import React from "react";
import { useFormik } from "formik";
import { VAT_STATE } from "../../../../components/formik/initialValues";
import { VAT_YUP } from "../../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken } from "../../../../utils/Auth";
import Notifier from "../../../../utils/Notifier";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { red } from "@mui/material/colors";

export default function AddExpense(props) {
  const { translate } = props;
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: VAT_STATE,
    validationSchema: VAT_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      console.log(values, "values");
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/VAT/${props.adminId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        setisLoading(false);
        props.handleModal();
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, "error", translate);

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
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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

      <div className="flex pb-2 justify-end ">
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
