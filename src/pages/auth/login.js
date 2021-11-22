import React from "react";
import { useFormik } from "formik";
import { LOGIN_STATE } from "../../components/formik/initialValues";
import { LOGIN_YUP } from "../../components/formik/validations";
import Axios from "axios";
import { baseUrl } from "../../utils/BaseUrl";
import { handleLogin } from "../../utils/Auth";
import { Redirect } from "react-router-dom";
export default function Login() {
  const [isLoading, setisLoading] = React.useState(false);
  const [isRedirect, setisRedirect] = React.useState(false);

  const formik = useFormik({
    initialValues: LOGIN_STATE,
    validationSchema: LOGIN_YUP,
    onSubmit: async (values) => {
      setisLoading(true);
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Admins/login`,
          data: values,
        });
        const { token, user } = response.data.result;
        handleLogin(token, user);
        setisRedirect(true);
        setisLoading(false);
        window.location.reload();
      } catch (err) {
        setisLoading(false);

        console.log("Errror->>>", err);
      }
    },
  });
  if (isRedirect == true) return <Redirect to="/admin/index" />;
  else
    return (
      <div className="w-full  md:mx-auto py-6 ">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            {/* Row */}
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              {/* Col */}
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bG9naW58ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60")',
                }}
              />
              {/* Col */}
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-3xl text-center">Login</h3>
                <form
                  onSubmit={formik.handleSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div>
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      type="password"
                      placeholder="******************"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="mb-3 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading...." : "Login"}
                    </button>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
