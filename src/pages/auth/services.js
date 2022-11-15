import React, { useEffect, useState } from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import Footer from './spc/components/Footer';
import api from '../../api';

const Services = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    const result = await api('get', `/StaticPages/`);
    setData(result.data.data.product);
  };
  return (
    <div
      style={{
        height: '100vh'
      }}>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Produits</Typography>
        </div>
      </div>

      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div
            id="Alltables"
            style={{ padding: '0px 15px 0px 20px' }}
            dangerouslySetInnerHTML={{ __html: data }}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
