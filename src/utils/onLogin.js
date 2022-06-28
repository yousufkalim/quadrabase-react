import api from "../api";
import { toast } from "react-toastify";
import { handleLogin } from "./Auth";

export const onSubmit = (e, email, password, updateStore, history) => {
  // prevent default so page doesn't reload
  e.preventDefault();
  // data object to send to login req
  const data = {
    email,
    password,
  };
  // Using global api to post data on server and handling the response
  api("post", "/Auth/login", data).then((response) => {
    if (response.data.success) {
      handleLogin(response.data.result.token, response.data.result.user, response.data.result.role);
      updateStore({ loggedIn: true, user: response.data.result.user });
      toast.success(response.data.message);
      history.push("/");
    } else {
      updateStore({ loggedIn: false, user: {} });
    }
  });
};
