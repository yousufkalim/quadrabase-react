import React, { useEffect } from 'react';
import Appbar from './spc/components/Appbar';
import Typography from '@mui/material/Typography';
import Quadralogo from './spc/assets/images/Quadralogo2.svg';
import List from '../../components/LibrariesList/index';
import { useTranslation } from 'react-i18next';
import LibraryReducer from '../admin/bookLibraries/reducer';
import { initialState } from '../admin/bookLibraries/initialState';
import actionTypes from '../admin/bookLibraries/actionTypes';
import { baseUrl } from '../../utils/BaseUrl';
import Footer from './spc/components/Footer';
import Axios from 'axios';

const Libraries = () => {
  const { t } = useTranslation();
  const [loadingData, setLoadingData] = React.useState('');
  const [state, dispatch] = React.useReducer(LibraryReducer, initialState);
  const [familiesData, setFamiliesData] = React.useState([]);
  const [librariesData, setlibrariesData] = React.useState([]);
  const [Level2, setLevel2] = React.useState([]);
  const [Level3, setLevel3] = React.useState([]);
  const [Level4, setLevel4] = React.useState([]);
  const [currentFamily, setCurrentFamily] = React.useState('');

  useEffect(() => {
    getFamilies();
  }, []);

  const getFamilies = async () => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/Families/`,
      });
      let data = response.data.families.sort((a, b) => a.ranking - b.ranking);
      data = data.filter((item) => {
        let famName = item.name.toUpperCase();
        return famName !== 'PRESCRIPTEUR';
      });
      setCurrentFamily(data[0]._id);
      getBookLibraries(data[0]._id);
      let tempObj = {
        id: data[0]._id,
      };
      let tempKey = data[0].name;
      tempObj[tempKey] = true;
      handleClick('level0', data[0]._id, tempObj);
      setFamiliesData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
    }
  };

  const getBookLibraries = async (id) => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/BookLibraries/getByFamily/${id}`,
      });
      let data = response.data.bookLibraries.sort((a, b) => a.ranking - b.ranking);
      setlibrariesData(data);
      setLoadingData('');
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
      setLoadingData('');
    }
    //}
  };

  const getLevel2 = async (id) => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/BookLibraries/getLevel2/${id}`,
      });
      let data = response.data.categories.sort((a, b) => a.ranking - b.ranking);
      setLevel2(data);
      setLoadingData('');
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
      setLoadingData('');
    }
  };

  const getLevel3 = async (id) => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/BookLibraries/getLevel3/${id}`,
      });
      let data = response.data.works.sort((a, b) => a.ranking - b.ranking);
      setLevel3(data);
      setLoadingData('');
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
      setLoadingData('');
    }
  };

  const getLevel4 = async (id) => {
    try {
      let response = await Axios({
        method: 'get',
        url: `${baseUrl}/BookLibraries/getLevel4/${id}`,
      });
      let data = response.data.workDetails.sort((a, b) => a.ranking - b.ranking);
      setLevel4(data);
      setLoadingData('');
    } catch (error) {
      if (error.response) console.log(error.response.data.message, 'error ');
      setLoadingData('');
    }
  };

  const handleClick = (level, id, obj) => {
    console.log(level, id, obj);
    dispatch({
      type: level,
      obj,
    });
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
          <Typography className="spc_suppportHeroheading">Bibliothèques</Typography>
        </div>
      </div>
      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            <List
              translate={t}
              state={state}
              familiesData={familiesData}
              librariesData={librariesData}
              handleClick={handleClick}
              parentLevel={false}
              getLevel2={getLevel2}
              Level2={Level2}
              getLevel3={getLevel3}
              Level3={Level3}
              getLevel4={getLevel4}
              Level4={Level4}
              getBookLibraries={getBookLibraries}
              setlibrariesData={setlibrariesData}
              setLevel2={setLevel2}
              setLevel3={setLevel3}
              setLevel4={setLevel4}
              setCurrentFamily={setCurrentFamily}
              loadingData={loadingData}
              setLoadingData={setLoadingData}
              type="static"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Libraries;
