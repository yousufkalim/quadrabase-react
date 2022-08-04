import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './css/style.scss';
import './css/custom.css';
import './pages/auth/spc/css/index.css';
import './utils/i18n';
import { Toaster } from 'react-hot-toast';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './containers';
import api from './api';
import {
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
} from './pages/Architect/Project/ReportsGen/data.js';
import moment from 'moment';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  useEffect(() => {
    if (moment().diff(moment(process.env.REACT_APP_CURRENT_DATE, 'DD/MM/YYYY'), 'days') >= 6) {
      const myElement = document.getElementById('App');
      myElement.style.display = 'none';
    }
  }, []);

  useEffect(() => {
    CheckVist();
    localStorage.removeItem('warning');
  }, []);

  useEffect(() => {
    const storageHandler = () => {
      const i18nextLng = localStorage.getItem('i18nextLng');
      dataColumnsEstimation[0] = i18nextLng == 'en' ? 'Number' : 'N°';
      dataColumnsEstimation[1] = i18nextLng == 'en' ? 'Designation' : 'Désignation';
      dataColumnsEstimation[2] = i18nextLng == 'en' ? 'Unit' : 'Unité';
      dataColumnsEstimation[3] = i18nextLng == 'en' ? 'Qty' : 'Qté';

      footerColumnsSimpleEstimation[0] = i18nextLng == 'en' ? 'Total Lot n°1 :' : 'Total HT :';
      footerColumnsSimpleEstimation[2] =
        i18nextLng == 'en' ? 'Total VAT (%) :' : 'TVA totale (%) :';
      footerColumnsSimpleEstimation[3] =
        i18nextLng == 'en' ? 'Total Amount including VAT :' : 'Montant total TTC :';
    };
    window.addEventListener('storage', storageHandler);
    return () => window.removeEventListener('storage', storageHandler);
  });

  const CheckVist = async () => {
    await api('post', `/Vists/`, { visit_date: '' });
  };

  return (
    <div id="App">
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
    </div>
  );
}

export default App;
