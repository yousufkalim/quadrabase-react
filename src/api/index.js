// Init
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseUrl } from '../config';

const api = async (method = 'get', uri, body, t) => {
  const token = localStorage.getItem('token');
  const lang = localStorage.getItem('i18nextLng');
  if (token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${token}`,
      lang: lang ? lang : 'fr',
    };
  }

  // API Call
  const url = baseUrl + uri;
  return new Promise((resolve, reject) => {
    axios[method](url, body)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err?.response?.status === 403) {
          window.location = '/login';
        } else {
          console.log('API Error --------> ', err?.response);
          if (err.response.data.message !== 'Unauthorized Access!') {
            toast.error(
              err?.response?.data
                ? t
                  ? t(err.response.data.message)
                  : err.response.data.message
                : t
                ? t(err?.message)
                : err?.message
            );
          }
          reject(err);
        }
      });
  });
};

// Export
export default api;
