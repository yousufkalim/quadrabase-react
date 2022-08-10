import React from 'react';
import Appbar from './spc/components/Appbar';
import Footer from './spc/components/Footer';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import CollapseFabricants from './spc/components/CollapseFabricants';
import Grid from '@mui/material/Grid';

const Fabricant = () => {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Fabricants</Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ paddingTop: '2%', paddingBottom: '4%' }}>
          <CollapseFabricants />
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Fabricant;
