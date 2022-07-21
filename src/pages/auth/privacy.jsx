import React, { useState, useEffect } from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import api from '../../api';
import Grid from '@mui/material/Grid';

const Privacy = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    const result = await api('get', `/StaticPages/privacy`);
    setData(result.data.data.privacy);
  };
  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading" style={{ paddingBottom: '14%' }}>
            Déclaration de confidentialité sur le site : <br />
            Quadrabase
          </Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ padding: '6%' }}>
          <div
            style={{ padding: '0px 15px 0px 20px' }}
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </Grid>
      </div>
    </>
  );
};

export default Privacy;
