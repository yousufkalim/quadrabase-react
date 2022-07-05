import * as Yup from 'yup';

export const LOGIN_YUP = Yup.object({
  email: Yup.string().email('Adresse e-mail invalide').required('Obligatoire'),
  password: Yup.string().min(8, 'Doit contenir 8 caractères').required('Ce champ est requis'),
});
export const ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().required('Obligatoire'),
  last_name: Yup.string().required('Obligatoire'),
  postal_code: Yup.number().test(
    'len',
    'Doit contenir exactement 5 caractères',
    (val) => val?.toString().length >= 4 && val?.toString().length <= 5
  ),
  phone: Yup.number().test(
    'len',
    'Doit contenir exactement 10 caractères',
    (val) => val?.toString().length >= 9 && val?.toString().length <= 10
  ),

  email: Yup.string().email('Adresse e-mail invalide').required('Obligatoire'),
  password: Yup.string().min(8, 'Doit contenir 8 caractères').required('Ce champ est requis'),
  confirm_password: Yup.string()
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Les deux mots de passe doivent être identiques'
      ),
    })
    .min(8, 'Doit contenir 8 caractères')
    .required('Obligatoire'),
});
export const EDIT_ARCHITECT_YUP = Yup.object({
  first_name: Yup.string().required('Obligatoire'),
  last_name: Yup.string().required('Obligatoire'),
  email: Yup.string().email('Adresse e-mail invalide').required('Obligatoire'),
});
export const ADMIN_YUP = Yup.object({
  first_name: Yup.string().required('Obligatoire'),
  last_name: Yup.string().required('Obligatoire'),

  email: Yup.string().email('Adresse e-mail invalide').required('Obligatoire'),
  password: Yup.string().min(8, 'Doit contenir 8 caractères').required('Ce champ est requis'),
  confirm_password: Yup.string()
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Les deux mots de passe doivent être identiques'
      ),
    })
    .min(8, 'Doit contenir 8 caractères')
    .required('Obligatoire'),
});

export const PRODUCT_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
  type: Yup.string().required('Obligatoire'),
  duration: Yup.number().required('Obligatoire'),
  projects: Yup.number().required('Obligatoire'),
  price: Yup.number().required('Obligatoire'),
  reference: Yup.string().required('Obligatoire'),
});

export const FOLDER_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
});

export const EDIT_ADMIN_YUP = Yup.object({
  first_name: Yup.string().required('Obligatoire'),
  last_name: Yup.string().required('Obligatoire'),
  email: Yup.string().email('Adresse e-mail invalide').required('Obligatoire'),
});
export const LIBRARY_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
});
export const CATEGORY_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
});
export const WORK_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
  unit_price: Yup.number().required('Obligatoire'),
  unit: Yup.string().required('Obligatoire'),
});
export const PROVIDER_YUP = Yup.object({
  establishment: Yup.string().required('Obligatoire'),
  address1: Yup.string().required('Obligatoire'),
  city: Yup.string().required('Obligatoire'),
  zipcode: Yup.number().test(
    'len',
    'Doit contenir exactement 5 caractères',
    (val) => val?.toString().length >= 4 && val?.toString().length <= 5
  ),
  telephone_no: Yup.string().test('len', 'Doit contenir exactement 10 caractères', (val) => {
    return val?.toString().length == 10;
  }),
});
export const UNIT_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
  symbol: Yup.string().required('Obligatoire'),
});
export const STAKEHOLDER_YUP = Yup.object({
  text: Yup.string().required('Obligatoire'),
});
export const VAT_YUP = Yup.object({
  value: Yup.string().required('Obligatoire'),
});

export const CCTP_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
  type: Yup.string().required('Obligatoire'),
});

export const FAMILIES_YUP = Yup.object({
  name: Yup.string().required('Obligatoire'),
});

export const CHAP0_YUP = Yup.object({
  title: Yup.string().required('Obligatoire'),
});
