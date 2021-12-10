import React, { useEffect } from "react";

import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import List from "../../../components/List/index.js";
import ListMenu from "../../../components/List/listMenu";

import Notifier from "../../../utils/Notifier";

import AddLibrary from "./addLibrary";
import AddCategory from "./addCategory";
import AddWork from "./addWork";
import EditWork from "./editWork";

import AddWorkDetail from "./addWorkDetail";
import EditWorkDetail from "./editWorkDetail";

import EditLibrary from "./editLibrary";
import EditCategory from "./editCategory";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [LevelID, setLevelID] = React.useState("");
  const [LibraryID, setLibraryID] = React.useState("");
  const [LevelData, setLevelData] = React.useState([]);
  const [Level, setLevel] = React.useState("");
  const [parentLevel, setparentLevel] = React.useState(false);
  const [Text, setText] = React.useState(null);
  const [Index, setIndex] = React.useState(null);

  const openanchorEl = Boolean(anchorEl);
  const handleanchorEl = (event, id, level, Index) => {
    setLevel(level);
    setLevelID(id);
    setIndex(Index);
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
  const handleLibraryData = (id) => {
    let filteredData = handleEditLibrary(id);
    setLevelData(filteredData);
  };
  const handleModalClick = (value) => {
    if (Level == actionTypes.LEVEL_0) {
      switch (value) {
        case `Add_Library_${Level}`:
          dispatch({
            type: actionTypes.ADD_LIBRARY,
            addlibrary: true,
          });

          break;
        case `Add_Library_${Level}`:
          dispatch({
            type: actionTypes.ADD_LIBRARY,
            addlibrary: true,
          });

          break;
        default:
          break;
      }
    } else if (Level == actionTypes.LEVEL_1) {
      switch (value) {
        case `Add_Category_${Level}`:
          dispatch({
            type: actionTypes.ADD_CATEGORY,
            addcategory: true,
          });
          break;
        case `Edit_${Level}`:
          let filteredData = handleEditLibrary(LevelID);
          dispatch({
            type: actionTypes.EDIT_LIBRARY,
            editlibrary: true,
            editLibraryData: filteredData,
            editlibraryId: LevelID,
          });
          break;
        case `Delete_${Level}`:
          dispatch({
            type: actionTypes.DELETE_LIBRARY,
            deletelibrary: true,
            libraryDeleteId: LevelID,
          });
          break;
        default:
          break;
      }
    } else if (Level == actionTypes.LEVEL_2) {
      switch (value) {
        case `Add_Work_${Level}`:
          dispatch({
            type: actionTypes.ADD_WORK,
            addwork: true,
          });
          break;
        case `Edit_${Level}`:
          let filteredData = handleEditCategory(LevelID);
          dispatch({
            type: actionTypes.EDIT_CATEGORY,
            editcategory: true,
            editCategoryData: filteredData,
            editcategoryId: LevelID,
          });
          break;
        case `Delete_${Level}`:
          dispatch({
            type: actionTypes.DELETE_CATEGORY,
            deletecategory: true,
            categoryDeleteId: LevelID,
          });
          break;
        default:
          break;
      }
    } else if (Level == actionTypes.LEVEL_3) {
      switch (value) {
        case `Add_Work_Detail_${Level}`:
          dispatch({
            type: actionTypes.ADD_WORK_DETAIL,
            addworkdetail: true,
          });
          break;
        case `Edit_${Level}`:
          let filteredData = handleEditWork(LevelID);

          dispatch({
            type: actionTypes.EDIT_WORK,
            editwork: true,
            editWorkData: filteredData,
            editworkId: LevelID,
          });
          break;
        case `Delete_${Level}`:
          dispatch({
            type: actionTypes.DELETE_WORK,
            deletework: true,
            workDeleteId: LevelID,
          });
          break;
        default:
          break;
      }
    } else if (Level == actionTypes.LEVEL_4) {
      switch (value) {
        case `Edit_${Level}`:
          let filteredData = handleEditWorkDetail(LevelID);

          dispatch({
            type: actionTypes.EDIT_WORK_DETAIL,
            editworkdetail: true,
            editWorkDetailData: filteredData,
            editworkdetailId: LevelID,
          });
          break;
        case `Delete_${Level}`:
          dispatch({
            type: actionTypes.DELETE_WORK_DETAIL,
            deleteworkdetail: true,
            workDetailDeleteId: LevelID,
          });
          break;
        default:
          break;
      }
    }
  };
  const handleClose = () => {
    dispatch({
      type: actionTypes.CLOSE_MODAL,
      addlibrary: false,
      editlibrary: false,
      deletelibrary: false,
      // category
      addcategory: false,
      editcategory: false,
      deletecategory: false,
      //work
      addwork: false,
      editwork: false,
      deletework: false,
      //work detail
      addworkdetail: false,
      editworkdetail: false,
      deleteworkdetail: false,
    });
  };

  //delete library
  const handleDeleteLibrary = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/${state.libraryDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
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
        url: `${baseUrl}/BookLibraries/deleteCategory/${state.categoryDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }
  };
  //delete Work
  const handleDeleteWork = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/deleteWork/${state.workDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }
  };
  //delete Work Detail
  const handleDeleteWorkDetail = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/deleteWorkDetail/${state.workDetailDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleClose();
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }
  };
  const handleEditLibrary = (id) => {
    let filteredData;
    if (id) {
      filteredData = librariesData.find((data) => data._id == id);
    }
    return filteredData;
  };

  const handleEditCategory = (id) => {
    let filteredData;
    if (id) {
      filteredData = LevelData.categories.find((data) => data._id == id);
    }
    return filteredData;
  };

  const handleEditWork = (id) => {
    let filteredData;
    if (id) {
      filteredData = LevelData.works.find((data) => data._id == id);
    }

    return filteredData;
  };
  const handleEditWorkDetail = (id) => {
    let filteredData;
    if (id) {
      filteredData = LevelData.work_details.find((data) => data._id == id);
    }

    return filteredData;
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
    if (LibraryID) {
      handleLibraryData(LibraryID);
    }
  }, [state, Level]);

  return (
    <>
      <ListMenu
        onClick={handleanchorEl}
        onClose={handleanchorElClose}
        onAdd={handleModalClick}
        open={openanchorEl}
        anchorEl={anchorEl}
        text={Text}
        level={Level}
        id={"demo-customized-button"}
        parentLevel={parentLevel}
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
      <Modal
        title="Add Library"
        open={state.addlibrary}
        component={<AddLibrary handleClose={handleClose} />}
      />
      <Modal
        title="Add Category"
        open={state.addcategory}
        component={
          <AddCategory handleClose={handleClose} BookLibraryId={LevelID} />
        }
      />
      <Modal
        title="Add Work"
        open={state.addwork}
        component={<AddWork handleClose={handleClose} categoryId={LevelID} />}
      />
      <Modal
        title="Add Work Detail"
        open={state.addworkdetail}
        component={<AddWorkDetail handleClose={handleClose} workId={LevelID} />}
      />
      <Modal
        title="Edit Library"
        open={state.editlibrary}
        component={
          <EditLibrary
            editData={state.editLibraryData}
            editmodal={state.editlibrary}
            handleClose={handleClose}
            libraryId={state.editlibraryId}
          />
        }
      />
      <Modal
        title="Edit Category"
        open={state.editcategory}
        component={
          <EditCategory
            editData={state.editCategoryData}
            editmodal={state.editcategory}
            handleClose={handleClose}
            libraryId={state.editcategoryId}
          />
        }
      />
      <Modal
        title="Edit Work"
        open={state.editwork}
        component={
          <EditWork
            editData={state.editWorkData}
            editmodal={state.editwork}
            handleClose={handleClose}
            libraryId={state.editworkId}
          />
        }
      />
      <Modal
        title="Edit Work Detail"
        open={state.editworkdetail}
        component={
          <EditWorkDetail
            editData={state.editWorkDetailData}
            editmodal={state.editworkdetail}
            handleClose={handleClose}
            libraryId={state.editworkdetailId}
          />
        }
      />
      <Modal
        open={state.deletelibrary}
        component={
          <DeleteModal
            handleClose={handleClose}
            handleDelete={handleDeleteLibrary}
          />
        }
      />
      <Modal
        open={state.deletecategory}
        component={
          <DeleteModal
            handleClose={handleClose}
            handleDelete={handleDeleteCategory}
          />
        }
      />
      <Modal
        open={state.deletework}
        component={
          <DeleteModal
            handleClose={handleClose}
            handleDelete={handleDeleteWork}
          />
        }
      />
      <Modal
        open={state.deleteworkdetail}
        component={
          <DeleteModal
            handleClose={handleClose}
            handleDelete={handleDeleteWorkDetail}
          />
        }
      />
    </>
  );
}
