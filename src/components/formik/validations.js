import * as Yup from "yup";

export const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
  password: Yup.string().min(8, "Doit contenir 8 caractères").Obligatoire("Ce champ est requis"),
});
export const ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().Obligatoire("Obligatoire"),
  last_name: Yup.string().Obligatoire("Obligatoire"),

  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
  password: Yup.string().min(8, "Doit contenir 8 caractères").Obligatoire("Ce champ est requis"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Les deux mots de passe doivent être identiques"),
    })
    .min(8, "Doit contenir 8 caractères")
    .Obligatoire("Obligatoire"),
});
export const EDIT_ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().Obligatoire("Obligatoire"),
  last_name: Yup.string().Obligatoire("Obligatoire"),
  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
});
export const ADMIN_YUP = Yup.object({
  first_name: Yup.string().Obligatoire("Obligatoire"),
  last_name: Yup.string().Obligatoire("Obligatoire"),

  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
  password: Yup.string().min(8, "Doit contenir 8 caractères").Obligatoire("Ce champ est requis"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Les deux mots de passe doivent être identiques"),
    })
    .min(8, "Doit contenir 8 caractères")
    .Obligatoire("Obligatoire"),
});

export const PRODUCT_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
  type: Yup.string().Obligatoire("Obligatoire"),
  durationMonths: Yup.number().Obligatoire("Obligatoire"),
  durationprice: Yup.number().Obligatoire("Obligatoire"),
  credit: Yup.string().Obligatoire("Obligatoire"),
  projectsPack: Yup.number().Obligatoire("Obligatoire"),
  projectPrice: Yup.number().Obligatoire("Obligatoire"),
});

export const EDIT_ADMIN_YUP = Yup.object({
  first_name: Yup.string().Obligatoire("Obligatoire"),
  last_name: Yup.string().Obligatoire("Obligatoire"),
  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
});
export const LIBRARY_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
});
export const CATEGORY_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
});
export const WORK_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
  unit_price: Yup.number().Obligatoire("Obligatoire"),
  unit: Yup.string().Obligatoire("Obligatoire"),
});
export const PROVIDER_YUP = Yup.object({
  firstname: Yup.string().Obligatoire("Obligatoire"),
  name: Yup.string().Obligatoire("Obligatoire"),
  email: Yup.string().email("Adresse e-mail invalide").Obligatoire("Obligatoire"),
  zipcode: Yup.number().test(
    "len",
    "Doit contenir exactement 5 caractères",
    (val) => val?.toString().length >= 4 && val?.toString().length <= 5
  ),
  telephone_no: Yup.number().test("len", "Doit contenir exactement 10 caractères", (val) => val?.toString().length == 10),
});
export const UNIT_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
  symbol: Yup.string().Obligatoire("Obligatoire"),
});
export const STAKEHOLDER_YUP = Yup.object({
  text: Yup.string().Obligatoire("Obligatoire"),
});
export const VAT_YUP = Yup.object({
  value: Yup.string().Obligatoire("Obligatoire"),
});

export const CCTP_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
  type: Yup.string().Obligatoire("Obligatoire"),
});

export const FAMILIES_YUP = Yup.object({
  name: Yup.string().Obligatoire("Obligatoire"),
});

export const CHAP0_YUP = Yup.object({
  title: Yup.string().Obligatoire("Obligatoire"),
});
