import React from "react";
import { useFormik } from "formik";
import { PROVIDER_STATE } from "../../../components/formik/initialValues";
import { PROVIDER_YUP } from "../../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import Notifier from "../../../utils/Notifier";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { red } from "@mui/material/colors";
import TextArea from "../../../components/TextArea";

export default function AddExpense(props) {
  const { translate } = props;
  const token = getToken();
  const [isLoading, setisLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: PROVIDER_STATE,
    validationSchema: PROVIDER_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Providers/${props.providerId}`,
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
            type="email"
            placeholder="Email"
            label="Email"
            name="email"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="text-red-600 ">
            {formik.touched.email && formik.errors.email ? (
              <small>{formik.errors.email}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Telephone No"
            label="Telephone No"
            name="telephone_no"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.telephone_no}
          />
          <div className="text-red-600 ">
            {formik.touched.telephone_no && formik.errors.telephone_no ? (
              <small>{formik.errors.telephone_no}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Contact No"
            label="Contact No"
            name="contact_no"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.contact_no}
          />
          <div className="text-red-600 ">
            {formik.touched.contact_no && formik.errors.contact_no ? (
              <small>{formik.errors.contact_no}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="City"
            label="City"
            name="city"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <div className="text-red-600 ">
            {formik.touched.city && formik.errors.city ? (
              <small>{formik.errors.city}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="ZipCode"
            label="ZipCode"
            name="zipcode"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.zipcode}
          />
          <div className="text-red-600 ">
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <small>{formik.errors.zipcode}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextArea
            type="text"
            placeholder="Address1"
            label="Address1"
            name="address1"
            translate={translate}
            rows={6}
            onChange={formik.handleChange}
            value={formik.values.address1}
          />
          <div className="text-red-600 ">
            {formik.touched.address1 && formik.errors.address1 ? (
              <small>{formik.errors.address1}</small>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextArea
            type="text"
            placeholder="Address2"
            label="Address2"
            name="address2"
            translate={translate}
            rows={6}
            onChange={formik.handleChange}
            value={formik.values.address2}
          />
          <div className="text-red-600 ">
            {formik.touched.address2 && formik.errors.address2 ? (
              <small>{formik.errors.address2}</small>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex no-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2  px-3">
          <TextInput
            type="text"
            placeholder="Url"
            label="Url"
            name="url"
            translate={translate}
            onChange={formik.handleChange}
            value={formik.values.url}
          />
          <div className="text-red-600 ">
            {formik.touched.url && formik.errors.url ? (
              <small>{formik.errors.url}</small>
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
