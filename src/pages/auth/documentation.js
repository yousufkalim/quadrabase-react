import React from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import CollapseDocumentation from './spc/components/CollapseDocumentation';
import Grid from '@mui/material/Grid';

const Documentation = () => {
  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Documentation</Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ paddingTop: '2%', paddingBottom: '4%' }}>
          <CollapseDocumentation />
        </Grid>
      </div>
    </>
  );
};

export default Documentation;
