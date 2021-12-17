import React, { useEffect } from "react";

import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import List from "../../../components/List/index.js";
import ListMenu from "../../../components/List/listMenu";

import Notifier from "../../../utils/Notifier";
import Families from "./Families";

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

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [state, dispatch] = React.useReducer(LibraryReducer, initialState);
  const [librariesData, setlibrariesData] = React.useState([]);
  const [LevelID, setLevelID] = React.useState("");
  const [Index, setIndex] = React.useState("");

  const [LibraryID, setLibraryID] = React.useState("");
  const [LevelData, setLevelData] = React.useState([]);
  const [Level, setLevel] = React.useState("");
  const [parentLevel, setparentLevel] = React.useState(false);
  const [Text, setText] = React.useState(null);
  const openanchorEl = Boolean(state.anchorEl);
  const handleanchorEl = (event, id, level) => {
    // setAnchorEl(event.currentTarget);
    dispatch({
      type: actionTypes.anchorEl,
      anchorEl: event.currentTarget,
    });
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
  };

  const handleanchorElClose = () => {
    dispatch({
      type: actionTypes.anchorEl,
      anchorEl: null,
    });
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
        case `Manage_Families_${Level}`:
          dispatch({
            type: actionTypes.MANAGE_FAMILIES,
            managefamily: true,
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
        case `Up_${Level}`:
          handleLibraryUp(LevelID);
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
      managefamily: false,
    });
  };
  const handleLibraryUp = async (id) => {
    // setIndex(id);
    let filteredIndex = librariesData.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...librariesData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/BookLibraries/${id}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        console.log("success");
        Axios({
          method: "put",
          url: `${baseUrl}/BookLibraries/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => console.log("success2"));
      });
      tempArr[filteredIndex] = librariesData[filteredIndex - 1];
      tempArr[filteredIndex - 1] = librariesData[filteredIndex];
      setlibrariesData(tempArr);
    }
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
        anchorEl={state.anchorEl}
        text={Text}
        level={Level}
        id={"demo-customized-button"}
        parentLevel={parentLevel}
      />

      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            <List
              translate={translate}
              state={state}
              librariesData={librariesData}
              handleClick={handleClick}
              parentLevel={parentLevel}
              handleanchorEl={handleanchorEl}
            />
          </div>
        </div>
      </div>
      {/* All  Modals */}
      <Modal
        title="Manage Families"
        width="40%"
        translate={translate}
        open={state.managefamily}
        component={<Families translate={translate} handleClose={handleClose} />}
      />
      <Modal
        title="Add Library"
        width="50%"
        translate={translate}
        open={state.addlibrary}
        component={
          <AddLibrary translate={translate} handleClose={handleClose} />
        }
      />
      <Modal
        title="Add Category"
        width="50%"
        open={state.addcategory}
        translate={translate}
        component={
          <AddCategory
            translate={translate}
            handleClose={handleClose}
            BookLibraryId={LevelID}
          />
        }
      />
      <Modal
        title="Add Work"
        // width="100%"
        height="95%"
        // left="50%"
        open={state.addwork}
        translate={translate}
        component={
          <AddWork
            translate={translate}
            handleClose={handleClose}
            categoryId={LevelID}
          />
        }
      />
      <Modal
        title="Add Work Detail"
        open={state.addworkdetail}
        translate={translate}
        width="30%"
        component={
          <AddWorkDetail
            translate={translate}
            handleClose={handleClose}
            workId={LevelID}
          />
        }
      />
      <Modal
        title="Edit Library"
        translate={translate}
        open={state.editlibrary}
        component={
          <EditLibrary
            translate={translate}
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
        translate={translate}
        component={
          <EditCategory
            translate={translate}
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
        translate={translate}
        height="95%"
        component={
          <EditWork
            translate={translate}
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
        translate={translate}
        component={
          <EditWorkDetail
            translate={translate}
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
            translate={translate}
            handleClose={handleClose}
            handleDelete={handleDeleteLibrary}
          />
        }
      />
      <Modal
        open={state.deletecategory}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleClose}
            handleDelete={handleDeleteCategory}
          />
        }
      />
      <Modal
        open={state.deletework}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleClose}
            handleDelete={handleDeleteWork}
          />
        }
      />
      <Modal
        open={state.deleteworkdetail}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleClose}
            handleDelete={handleDeleteWorkDetail}
          />
        }
      />
    </>
  );
}
