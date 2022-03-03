import React from "react";
import { useFormik } from "formik";
import { LOGIN_STATE } from "../../components/formik/initialValues";
import { LOGIN_YUP } from "../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";
import { handleLogin } from "../../utils/Auth";
import { Redirect } from "react-router-dom";
import Notifier from "../../utils/Notifier";
import TextInput from "../../components/TextInput";
import Modal from "../../components/Modal";
import { NavLink } from "react-router-dom";
import ForgetModal from "./ForgetModal";

import Appbar from "../../pages/auth/spc/components/Appbar";
import Quadralogo from "../../pages/auth/spc/assets/images/Quadralogo.svg";

export default function Login(props) {
  const { translate } = props;
  const [IsLoading, setIsLoading] = React.useState(false);
  const [IsRedirect, setIsRedirect] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const formik = useFormik({
    initialValues: LOGIN_STATE,
    validationSchema: LOGIN_YUP,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Admins/login`,
          data: values,
        });
        const { token, user } = response.data.result;
        Notifier(response.data.message, "success", translate);
        handleLogin(token, user);
        setIsRedirect(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.response) {
          Notifier(err.response.data.message, "error", translate);
        }
        console.log("Errror->>>", err);
      }
    },
  });

  const handleForgetPassword = async () => {
    try {
      let response = await Axios({
        method: "post",
        url: `${baseUrl}/Admins/forgotPassword`,
        data: {
          email: email,
        },
      });
      Notifier(response.data.message, "success", translate);
      handleOpenModal();
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        Notifier(err.response.data.message, "error", translate);
      }
      console.log("Errror->>>", err);
    }
  };

  const handleOpenModal = () => setOpenModal(!openModal);
  if (IsRedirect == true) return <Redirect to="/admin/index" />;
  else
    return (
      <>
        <Modal
          title="Forgot Password"
          open={openModal}
          width="30%"
          buttonLabel="Submit"
          onSubmit={handleForgetPassword}
          onClose={handleOpenModal}
          translate={translate}
          component={
            <ForgetModal
              translate={translate}
              email={email}
              setEmail={setEmail}
            />
          }
        />
        <Appbar logo={Quadralogo} dark={true} />
        <div className="w-full  md:mx-auto py-6 ">
          <div className="container mx-auto">
            <div className="flex justify-center px-6 my-12">
              {/* Row */}
              <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                {/* Col */}
                <div
                  className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                  style={{
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    borderRight: "1px solid",
                    borderColor: "#eaeaea",
                    backgroundImage:
                      'url("https://img.freepik.com/free-vector/online-registration-sign-up-with-man-sitting-near-smartphone_268404-95.jpg?size=626&ext=jpg")',
                  }}
                />
                {/* Col */}
                <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                  <h3 className="pt-4 text-3xl  text-purple-400 text-center">
                    {translate("Login")}
                  </h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                  >
                    <div>
                      <TextInput
                        id="email"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder={translate("Email")}
                        label="Email"
                        translate={translate}
                      />

                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <TextInput
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        placeholder="********"
                        label="Password"
                        translate={translate}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-3 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-purple-400 rounded-full hover:bg-purple-500 focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={IsLoading}
                      >
                        {IsLoading
                          ? `${translate("Loading....")}`
                          : `${translate("Login")}`}
                      </button>
                    </div>
                    {/* <div className="mb-3 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-purple-400 rounded-full hover:bg-purple-500 focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      <NavLink
                        exact
                        to="/auth/register"
                      >
                        {translate("Register")}
                      </NavLink>
                    </button>
                  </div> */}
                    <div className="text-center">
                      <div
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        onClick={handleOpenModal}
                        style={{ cursor: "pointer" }}
                      >
                        {translate("Forgot Password?")}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
