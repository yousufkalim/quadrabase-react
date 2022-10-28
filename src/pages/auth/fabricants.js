import React, { useEffect } from 'react';
import Appbar from './spc/components/Appbar';
import Axios from 'axios';
import Footer from './spc/components/Footer';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import CollapseFabricants from './spc/components/CollapseFabricants';
import Grid from '@mui/material/Grid';
import { baseUrl } from '../../utils/BaseUrl';

const Fabricant = () => {
  const [loading, setLoading] = React.useState(false);
  const [libraryData, setLibraryData] = React.useState([]);
  useEffect(() => {
    getFabricant();
  }, []);

  const getFabricant = async () => {
    try {
      setLoading(true);
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/fabricant/library`
      });
      let data = response.data.fabricants;
      console.log('get fabricant data', data);
      setLoading(false);
      setLibraryData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
    }
    //}
  };
  console.log('libraryData', libraryData);
  return (
    <div
      style={{
        height: '100vh'
      }}>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading">Fabricants</Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ paddingTop: '2%', paddingBottom: '4%' }}>
          <CollapseFabricants libraryData={libraryData} loading={loading} />
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default Fabricant;
