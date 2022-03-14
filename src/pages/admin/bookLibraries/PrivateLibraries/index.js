import React, { useEffect } from "react";
import List from "../../../../components/LibrariesList/index.js";
import Loader from "../../../../components/Loader";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken } from "../../../../utils/Auth";
import LibraryReducer from "../reducer";
import { initialState } from "../initialState";
import actionTypes from "../actionTypes";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [state, dispatch] = React.useReducer(LibraryReducer, initialState);
  const [familiesData, setFamiliesData] = React.useState([]);
  const [currentFamily, setCurrentFamily] = React.useState("");
  const [librariesData, setlibrariesData] = React.useState([]);
  const [Level2, setLevel2] = React.useState([]);
  const [Level3, setLevel3] = React.useState([]);
  const [Level4, setLevel4] = React.useState([]);

  const [LibraryID, setLibraryID] = React.useState("");
  const [LevelData, setLevelData] = React.useState([]);
  const [Level, setLevel] = React.useState("");
  const [parentLevel, setparentLevel] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [loadingData, setLoadingData] = React.useState("");
  const [openLib, setOpenLib] = React.useState("");
  const [openCat, setOpenCat] = React.useState("");
  const [openWork, setOpenWork] = React.useState("");

  const handleClick = (level, id, obj) => {
    dispatch({
      type: level,
      obj,
    });
    if (level === "level1") {
      setLibraryID(id);
      handleLibraryData(id);
    }
  };

  const handleOpenLib = (id, level) => {
    if (level === "level1") {
      if (id) {
        setOpenLib(id);
      } else {
        setOpenLib("");
      }
    } else if (level === "level2") {
      if (id) {
        setOpenCat(id);
      } else {
        setOpenCat("");
      }
    } else if (level === "level3") {
      if (id) {
        setOpenWork(id);
      } else {
        setOpenWork("");
      }
    }
  };
  const handleLibraryData = (id) => {
    let filteredData = handleEditLibrary(id);

    setLevelData(filteredData);
  };

  const handleEditLibrary = (id) => {
    let filteredData;
    if (id) {
      filteredData = librariesData.find((data) => data._id == id);
    }
    return filteredData;
  };

  const getBookLibraries = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/private/getByFamily/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.bookLibraries.sort(
        (a, b) => a.ranking - b.ranking
      );
      setlibrariesData(data);
      setLoadingData("");
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
      setLoadingData("");
    }
    //}
  };

  const getLevel2 = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/getLevel2/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.categories.sort((a, b) => a.ranking - b.ranking);
      setLevel2(data);
      setLoadingData("");
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
      setLoadingData("");
    }
  };

  const getLevel3 = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/getLevel3/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.works.sort((a, b) => a.ranking - b.ranking);
      setLevel3(data);
      setLoadingData("");
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
      setLoadingData("");
    }
  };

  const getLevel4 = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/getLevel4/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.workDetails.sort(
        (a, b) => a.ranking - b.ranking
      );
      setLevel4(data);
      setLoadingData("");
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
      setLoadingData("");
    }
  };

  const getFamilies = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Families/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.families.sort((a, b) => a.ranking - b.ranking);
      setFamiliesData(data);
      setLoading(false);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (LibraryID) {
      handleLibraryData(LibraryID);
    }
  }, [state, Level]);

  useEffect(() => {
    getFamilies();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            {console.log(openCat)}
            <List
              translate={translate}
              state={state}
              familiesData={familiesData}
              librariesData={librariesData}
              handleClick={handleClick}
              parentLevel={parentLevel}
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
              type="private"
              handleOpenLib={handleOpenLib}
              openLib={openLib}
              openCat={openCat}
              openWork={openWork}
            />
          </div>
        </div>
      </div>
    </>
  );
}
