import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./css/style.scss";

import { Toaster } from "react-hot-toast";

import Main from "./containers";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
