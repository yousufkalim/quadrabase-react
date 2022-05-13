import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./StoreContext";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
console.log(pdfjs.GlobalWorkerOptions.workerSrc);

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
