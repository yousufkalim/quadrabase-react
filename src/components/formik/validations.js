import * as Yup from "yup";

export const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters long")
    .required("This field is required"),
});
export const ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters long")
    .required("This field is required"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .min(8, "Must be 8 characters long")
    .required("Required"),
});
export const EDIT_ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});
export const ADMIN_YUP = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters long")
    .required("This field is required"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .min(8, "Must be 8 characters long")
    .required("Required"),
});
export const EDIT_ADMIN_YUP = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});
export const LIBRARY_YUP = Yup.object({
  name: Yup.string().required("Required"),
});
export const CATEGORY_YUP = Yup.object({
  name: Yup.string().required("Required"),
});
export const WORK_YUP = Yup.object({
  name: Yup.string().required("Required"),
  unit_price: Yup.number().required("Required"),
});
export const PROVIDER_YUP = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  zipcode: Yup.number().test(
    "len",
    "Must be exactly 5 characters",
    (val) => val?.toString().length === 5
  ),
});
export const UNIT_YUP = Yup.object({
  name: Yup.string().required("Required"),
  symbol: Yup.string().required("Required"),
});
export const STAKEHOLDER_YUP = Yup.object({
  text: Yup.string().required("Required"),
});
export const VAT_YUP = Yup.object({
  value: Yup.string().required("Required"),
});

export const CCTP_YUP = Yup.object({
  name: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
});

export const FAMILIES_YUP = Yup.object({
  name: Yup.string().required("Required"),
});

export const CHAP0_YUP = Yup.object({
  title: Yup.string().required("Required"),
});
