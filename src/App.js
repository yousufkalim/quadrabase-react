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
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/Vists/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visit_date: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

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
