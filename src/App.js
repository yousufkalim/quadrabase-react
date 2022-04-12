import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./css/style.scss";
import "./css/custom.css";
import "./pages/auth/spc/css/index.css";
import "./utils/i18n";
import { Toaster } from "react-hot-toast";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./containers";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        transition={Flip}
      />
      <Toaster />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
