import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./StoreContext";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
console.log(pdfjs.GlobalWorkerOptions.workerSrc);

import { dataColumnsEstimation, footerColumnsSimpleEstimation } from "./pages/Architect/Project/ReportsGen/data.js";

addEventListener("storage", () => {
  const i18nextLng = localStorage.getItem("i18nextLng");
  dataColumnsEstimation[0] = i18nextLng == "en" ? "No #" : "Non #";
  dataColumnsEstimation[1] = i18nextLng == "en" ? "Name" : "Nom";
  dataColumnsEstimation[2] = i18nextLng == "en" ? "Unit" : "Unité";
});

addEventListener("storage", () => {
  const i18nextLng = localStorage.getItem("i18nextLng");
  footerColumnsSimpleEstimation[0] = i18nextLng == "en" ? "Total Lot n°1 :" : "Total HT :";
  footerColumnsSimpleEstimation[3] = i18nextLng == "en" ? "Total VAT (%) :" : "TVA totale (%) :";
  footerColumnsSimpleEstimation[4] = i18nextLng == "en" ? "Total Amount including VAT :" : "Montant total TTC :";
});

console.log(window, "window");

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
