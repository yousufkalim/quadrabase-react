import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { UPDATE_PROFILE_STATE } from '../../../components/formik/initialValues';
import { EDIT_ADMIN_YUP } from '../../../components/formik/validations';
import Axios from 'axios';
import { baseUrl } from '../../../utils/BaseUrl';
import { getToken, getUser, setUser } from '../../../utils/Auth';
import Notifier from '../../../utils/Notifier';
import Button from '../../../components/Button';
import TextInput from '../../../components/TextInput';
import { useTranslation } from 'react-i18next';

export default function AddExpense(props) {
  const { t } = useTranslation();
  const token = getToken();
  const USER = getUser();

  const [isLoading, setisLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: UPDATE_PROFILE_STATE,
    validationSchema: EDIT_ADMIN_YUP,
    onSubmit: async (values) => {
      setisLoading(true);

      try {
        let response = await Axios({
          method: 'put',
          url: `${baseUrl}/Admins/${USER._id}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let user = response.data.admin;
        setUser(user);
        Notifier(response.data.message, 'success', t);
        formik.setFieldValue('oldPassword', '');
        formik.setFieldValue('newPassword', '');
        setisLoading(false);
      } catch (err) {
        setisLoading(false);
        Notifier(err.response.data.message, 'error', t);

        console.log('Errror->>>', err);
      }
    },
  });

  React.useEffect(() => {
    let initialValues = formik.initialValues;
    let editData = USER;
    if (editData && Object.keys(editData).length > 0) {
      Object.keys(editData).map((dat, i) => {
        if (
          Object.keys(initialValues).includes(dat) &&
          dat !== 'password' &&
          dat !== 'confirm_password'
        ) {
          formik.setFieldValue(dat, editData[dat]);
        }
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full  md:mx-auto  my-40">
      <div className="container mx-auto">
        <div className="flex justify-center  ">
          {/* Row */}

          <div className="w-full xl:w-1/2 lg:w-1/2 p-10 shadow-xl bg-gray-200">
            <h2 className="text-2xl font-semibold pb-5">{t('Edit Profile')}</h2>

            <div className="flex no-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  type="text"
                  placeholder={t('Last Name')}
                  label={t('Last Name')}
                  name="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
                <div className="text-red-600 ">
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <small>{formik.errors.last_name}</small>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  type="text"
                  placeholder={t('First Name')}
                  label={t('First Name')}
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
                <div className="text-red-600 ">
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <small>{formik.errors.first_name}</small>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex no-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2  px-3">
                <TextInput
                  type="email"
                  placeholder="Email"
                  label="Email"
                  disabled={true}
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <div className="text-red-600 ">
                  {formik.touched.email && formik.errors.email ? (
                    <small>{formik.errors.email}</small>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  type="password"
                  placeholder={t('Old Password')}
                  label={t('Old Password')}
                  name="oldPassword"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                />
                <div className="text-red-600 ">
                  {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <small>{formik.errors.oldPassword}</small>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex no-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <TextInput
                  type="password"
                  placeholder={t('New Password')}
                  label={t('New Password')}
                  name="newPassword"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                />
                <div className="text-red-600 ">
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <small>{formik.errors.newPassword}</small>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex pb-2 justify-end ">
              <div className=" ml-3">
                <Button
                  onClick={formik.handleSubmit}
                  disabled={isLoading}
                  label={t(isLoading ? 'Updating' : 'Update')}
                  default={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
