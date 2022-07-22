import React, { useState, useEffect } from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import Footer from './spc/components/Footer';
import api from '../../api';
import Grid from '@mui/material/Grid';

const Terms = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    const result = await api('get', `/StaticPages/`);
    setData(result.data.data.cgv);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Conditions d'utilisation</Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ padding: '2% 6%' }}>
          <div
            style={{ padding: '0px 15px 0px 20px' }}
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
