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
import api from "./api";
import { dataColumnsEstimation, footerColumnsSimpleEstimation } from "./pages/Architect/Project/ReportsGen/data.js";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  useEffect(() => {
    CheckVist();
  }, []);

  useEffect(() => {
    const storageHandler = () => {
      const i18nextLng = localStorage.getItem("i18nextLng");
      dataColumnsEstimation[0] = i18nextLng == "en" ? "No #" : "Non #";
      dataColumnsEstimation[1] = i18nextLng == "en" ? "Name" : "Nom";
      dataColumnsEstimation[2] = i18nextLng == "en" ? "Unit" : "Unité";
    };
    document.addEventListener("storage", storageHandler);
    return () => document.removeEventListener("storage", storageHandler);
  });

  useEffect(() => {
    const storageHandler = () => {
      const i18nextLng = localStorage.getItem("i18nextLng");
      footerColumnsSimpleEstimation[0] = i18nextLng == "en" ? "Total Lot n°1 :" : "Total HT :";
      footerColumnsSimpleEstimation[3] = i18nextLng == "en" ? "Total VAT (%) :" : "TVA totale (%) :";
      footerColumnsSimpleEstimation[4] = i18nextLng == "en" ? "Total Amount including VAT :" : "Montant total TTC :";
    };

    document.addEventListener("storage", storageHandler);
    return () => document.removeEventListener("storage", storageHandler);
  });

  const CheckVist = async () => {
    await api("post", `/Vists/`, { visit_date: "" });
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} transition={Flip} />
      <Toaster />
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </>
  );
}

export default App;
