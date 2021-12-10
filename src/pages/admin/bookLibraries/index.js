import React, { useEffect } from "react";

import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import List from "../../../components/List/index.js";

import Notifier from "../../../utils/Notifier";

import AddLibrary from "./addLibrary";
import AddCategory from "./addCategory";

import EditLibrary from "./editLibrary";

import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import LibraryReducer from "./reducer";
import { initialState } from "./initialState";
import actionTypes from "./actionTypes";

export default function Index() {
  const token = getToken();
  const [state, dispatch] = React.useReducer(LibraryReducer, initialState);
  const [librariesData, setlibrariesData] = React.useState([]);

  const [libraryId, setlibraryId] = React.useState("");
  const [BookLibraryId, setBookLibraryId] = React.useState("");

  const [libraryDeleteId, setlibraryDeleteId] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [LevelID, setLevelID] = React.useState("");
  const [Level, setLevel] = React.useState("");

  const [parentLevel, setparentLevel] = React.useState(false);

  const [Text, setText] = React.useState(null);
  const openanchorEl = Boolean(anchorEl);
  const handleanchorEl = (event, id, level) => {
    setLevel(level);
    setLevelID(id);

    switch (level) {
      case "level0":
        setText("Add_Library");
        setparentLevel(true);
        break;
      case "level1":
        setText("Add_Category");
        setparentLevel(false);
        break;
      case "level2":
        setText("Add_Work");
        setparentLevel(false);

        break;
      case "level3":
        setText("Add_Work_Detail");
        setparentLevel(false);

        break;
      default:
        setparentLevel(false);

        setText("");
        break;
    }

    setAnchorEl(event.currentTarget);
  };
  const handleanchorElClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (level, obj) => {
    dispatch({
      type: level,
      obj,
    });
  };
  const handleModalClick = (type, value) => {
    if (Level == actionTypes.LEVEL_0) {
      switch (value) {
        case "Add_Library":
          dispatch({
            type: actionTypes.ADD_LIBRARY,
            addlibrary: true,
          });
          handleanchorElClose();
          break;

        default:
          break;
      }
    } else if (Level == actionTypes.LEVEL_1) {
      switch (value) {
        case "Add_Category":
          setBookLibraryId(LevelID);
          dispatch({
            type: actionTypes.ADD_CATEGORY,
            addcategory: true,
          });
          break;
        case "Edit":
          let filteredData = handleEditLibrary(LevelID);
          dispatch({
            type: actionTypes.EDIT_LIBRARY,
            editlibrary: true,
            editLibraryData: filteredData,
          });

          break;
        case "Delete":
          handleDeleteLibraryModal(LevelID);
          dispatch({
            type: actionTypes.DELETE_LIBRARY,
            deletelibrary: true,
            deletecategory: true,
          });
          handleanchorElClose();
          break;

        default:
          break;
      }
    }
  };
  const handleClose = (type) => {
    switch (type) {
      case "Add_Library":
        dispatch({
          type: actionTypes.ADD_LIBRARY,
          addlibrary: false,
        });
        break;
      case "Edit":
        dispatch({
          type: actionTypes.EDIT_LIBRARY,
          editlibrary: false,
        });
        break;
      case "Delete":
        dispatch({
          type: actionTypes.DELETE_LIBRARY,
          deletelibrary: false,
          deletecategory: false,
        });
      case "Add_Category":
        dispatch({
          type: actionTypes.ADD_CATEGORY,
          addcategory: false,
        });

        break;

      default:
        break;
    }
  };

  //delete library
  const handleDeleteLibrary = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/${libraryDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose("Delete");
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }
  };
  //delete Category
  const handleDeleteCategory = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/deleteCategory/${libraryDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose("Delete");
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }
  };
  const handleEditLibrary = (id) => {
    let filteredData;
    if (id) {
      setlibraryId(id);
      filteredData = librariesData.find((data) => data._id == id);
    }
    return filteredData;
  };
  const handleDeleteLibraryModal = (id) => {
    if (id) {
      setlibraryDeleteId(id);
    }
  };

  const getBookLibraries = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.bookLibraries;
      setlibrariesData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };
  useEffect(() => {
    getBookLibraries();
    handleanchorElClose();
  }, [state]);

  return (
    <>
      <Modal
        title="Add Library"
        open={state.addlibrary}
        component={<AddLibrary handleClose={handleClose} />}
      />
      <Modal
        title="Add Category"
        open={state.addcategory}
        component={
          <AddCategory
            handleClose={handleClose}
            BookLibraryId={BookLibraryId}
          />
        }
      />
      <Modal
        title="Edit Library"
        open={state.editlibrary}
        component={
          <EditLibrary
            editData={state.editLibraryData}
            editmodal={state.editlibrary}
            handleClose={handleClose}
            libraryId={libraryId}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={state.deletelibrary}
        component={
          <DeleteModal
            handleClose={handleClose}
            handleDelete={handleDeleteLibrary}
          />
        }
      />
      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            <List
              state={state}
              librariesData={librariesData}
              handleClick={handleClick}
              onAdd={handleModalClick}
              Text={Text}
              parentLevel={parentLevel}
              openanchorEl={openanchorEl}
              handleanchorEl={handleanchorEl}
              anchorEl={anchorEl}
              handleanchorElClose={handleanchorElClose}
            />
          </div>
        </div>
      </div>
    </>
  );
}
