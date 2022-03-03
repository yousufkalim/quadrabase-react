import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import {
  CHAP0_STATE,
  CHAP0_Level2_STATE,
  CHAP0_Level3_STATE,
} from "../../../../components/formik/initialValues";
import { CHAP0_YUP } from "../../../../components/formik/validations";
import AddChap0 from "./AddChap0";
import EditChap0 from "./EditChap0";
import EditChap0Level2 from "./EditChap0Level2";
import EditChap0Level3 from "./EditChap0Level3";
import AddChap0Level2 from "./AddChap0Level2";
import AddChap0Level3 from "./AddChap0Level3";

import { Chap0headCells } from "../../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken, getUser } from "../../../../utils/Auth";

import List from "../../../../components/Chap0List/index";
import ListMenu from "../../../../components/Chap0List/listMenu";
import { Chap0Reducer } from "../reducer";
import { initialState } from "../initialState";
import actionTypes from "../actionTypes";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const USER = getUser();
  const [state, dispatch] = React.useReducer(Chap0Reducer, initialState);
  const [TextAction, setTextAction] = React.useState(null);
  const [parentLevel, setParentLevel] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");
  const [text, setText] = React.useState("");
  const [text2, setText2] = React.useState("");
  const [text3, setText3] = React.useState("");
  const [editText, setEditText] = React.useState("");
  const [editText2, setEditText2] = React.useState("");
  const [editText3, setEditText3] = React.useState("");

  const [adminId, setadminId] = React.useState("");
  const [adminDeleteId, setadminDeleteId] = React.useState("");
  const [deleteIdLevel2, setDeleteIdLevel2] = React.useState("");
  const [deleteIdLevel3, setDeleteIdLevel3] = React.useState("");

  const [adminsData, setadminsData] = React.useState([]);
  const [chap0Level2Data, setChap0Level2Data] = React.useState([]);
  const [chap0Level3Data, setChap0Level3Data] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [editData2, seteditData2] = React.useState([]);
  const [editData3, seteditData3] = React.useState([]);

  const handleModalClose = () => {
    dispatch({
      type: actionTypes.AddChap0Level1,
      AddChap0Level1: false,
    });
  };
  const handleModal2Close = () => {
    dispatch({
      type: actionTypes.AddChap0Level2,
      AddChap0Level2: false,
    });
  };
  const handleModal3Close = () => {
    dispatch({
      type: actionTypes.AddChap0Level3,
      AddChap0Level3: false,
    });
  };
  //   delete architect modal
  const handleDeleteModal = (id) => {
    dispatch({
      type: actionTypes.DeleteChap0Level1,
      DeleteChap0Level1: false,
    });
  };
  const handleDelete2Modal = (id) => {
    dispatch({
      type: actionTypes.DeleteChap0Level2,
      DeleteChap0Level2: false,
    });
  };
  const handleDelete3Modal = (id) => {
    dispatch({
      type: actionTypes.DeleteChap0Level3,
      DeleteChap0Level3: false,
    });
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Chap0/${adminDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier("Chap0 Deleted!", "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }
    handleanchorElClose();

    dispatch({
      type: actionTypes.DeleteChap0Level1,
      DeleteChap0Level1: false,
    });
  };

  //delete architect
  const handleDelete2 = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Chap0Level2/${deleteIdLevel2}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let temp = [];
      temp = chap0Level2Data.filter((dat) => dat._id !== deleteIdLevel2);
      setChap0Level2Data(temp);
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }
    handleanchorElClose();

    dispatch({
      type: actionTypes.DeleteChap0Level2,
      DeleteChap0Level2: false,
    });
  };

  //delete architect
  const handleDelete3 = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Chap0Level3/${deleteIdLevel3}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let temp = [];
      temp = chap0Level3Data.filter((dat) => dat._id !== deleteIdLevel3);
      setChap0Level3Data(temp);
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }
    handleanchorElClose();

    dispatch({
      type: actionTypes.DeleteChap0Level3,
      DeleteChap0Level3: false,
    });
  };
  const handleEditModal = async (id) => {
    dispatch({
      type: actionTypes.EditChap0Level1,
      EditChap0Level1: false,
    });
  };

  const handleEdit2Modal = async (id) => {
    dispatch({
      type: actionTypes.EditChap0Level2,
      EditChap0Level2: false,
    });
  };

  const handleEdit3Modal = async (id) => {
    dispatch({
      type: actionTypes.EditChap0Level3,
      EditChap0Level3: false,
    });
  };

  const getAdmins = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Chap0/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.chap0;
      let newData = data.filter((dat) => dat.email !== USER.email);
      setadminsData(newData.sort((a, b) => a.ranking - b.ranking));
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
  };

  useEffect(() => {
    getAdmins();
  }, [modal, editmodal, deletemodal]);

  useEffect(() => {
    let array = [];
    Chap0headCells.slice(0, Chap0headCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);

  //create Chap0
  const formik = useFormik({
    initialValues: CHAP0_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = text;
        if (adminsData.length > 0) {
          let maxRanking = Math.max.apply(
            Math,
            adminsData.map((item) => {
              return item.ranking;
            })
          );
          values.ranking = maxRanking ? maxRanking + 1 : 0;
        } else {
          values.ranking = 0;
        }
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Chap0/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        handleModalClose();
        getAdmins();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  //edit Chap0

  const edit_formik = useFormik({
    initialValues: CHAP0_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = editText;
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Chap0/${adminId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);
        getAdmins();
        handleEditModal();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //create Chap0Level2
  const level2_formik = useFormik({
    initialValues: CHAP0_Level2_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = text2;
        values.parentLevel = LevelID;
        if (chap0Level2Data.length > 0) {
          let maxRanking = Math.max.apply(
            Math,
            chap0Level2Data.map((item) => {
              return item.ranking;
            })
          );
          values.ranking = maxRanking ? maxRanking + 1 : 0;
        } else {
          values.ranking = 0;
        }
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Chap0Level2/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let temp = chap0Level2Data;
        temp.push(response.data.chap0Level2);
        setChap0Level2Data(temp);
        Notifier(response.data.message, "success", translate);
        handleModal2Close();
        level2_formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //level2 editChap0

  const level2_edit_formik = useFormik({
    initialValues: CHAP0_Level2_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = editText2;
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level2/${LevelID}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, "success", translate);
        getChap0Level2(
          adminsData.find((dat) => dat._id === editData2.parentLevel)._id
        );
        handleEdit2Modal();
        level2_edit_formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //create Chap0Level3
  const level3_formik = useFormik({
    initialValues: CHAP0_Level3_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = text3;
        values.parentLevel = LevelID;
        if (chap0Level3Data.length > 0) {
          let maxRanking = Math.max.apply(
            Math,
            chap0Level3Data.map((item) => {
              return item.ranking;
            })
          );
          values.ranking = maxRanking ? maxRanking + 1 : 0;
        } else {
          values.ranking = 0;
        }
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Chap0Level3/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let temp = chap0Level3Data;
        temp.push(response.data.chap0Level3);
        setChap0Level3Data(temp);
        Notifier(response.data.message, "success", translate);
        handleModal3Close();
        level3_formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //level3 editChap0

  const level3_edit_formik = useFormik({
    initialValues: CHAP0_Level3_STATE,
    validationSchema: CHAP0_YUP,
    onSubmit: async (values) => {
      try {
        values.text = editText3;
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level3/${LevelID}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Notifier(response.data.message, "success", translate);
        getChap0Level3(
          chap0Level2Data.find((dat) => dat._id === editData3.parentLevel)._id
        );
        handleEdit3Modal();
        level3_edit_formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  // for list menu
  const openanchorEl = Boolean(state.Chap0AnchorEl);
  const [Level, setLevel] = React.useState("");
  const [LevelID, setLevelID] = React.useState("");
  const handleanchorEl = (event, id, level) => {
    dispatch({
      type: actionTypes.Chap0AnchorEl,
      Chap0AnchorEl: event.currentTarget,
    });
    setLevel(level);

    setLevelID(id);
    switch (level) {
      case "Chap0Level1":
        setTextAction("AddChap0Level1");
        setParentLevel(true);
        break;
      case "Chap0Level2":
        setTextAction("AddChap0Level2");
        setParentLevel(false);
        break;
      case "Chap0Level3":
        setTextAction("AddChap0Level3");
        setParentLevel(false);
        break;
      default:
        setTextAction("");
        break;
    }
  };
  const handleanchorElClose = () => {
    dispatch({
      type: actionTypes.Chap0AnchorEl,
      Chap0AnchorEl: null,
    });
  };

  const handleModalClick = (value) => {
    if (Level == actionTypes.Chap0Level1) {
      switch (value) {
        case `AddChap0Level1_Chap0Level1`:
          dispatch({
            type: actionTypes.AddChap0Level1,
            AddChap0Level1: true,
          });
          break;
        default:
          break;
      }
    } else if (Level == actionTypes.Chap0Level2) {
      switch (value) {
        case `AddChap0Level2_Chap0Level2`:
          getChap0Level2(LevelID);
          dispatch({
            type: actionTypes.AddChap0Level2,
            AddChap0Level2: true,
          });
          break;
        case `Edit_Chap0Level2`:
          setadminId(LevelID);
          let filteredData = adminsData.find((data) => data._id == LevelID);
          seteditData(filteredData);
          dispatch({
            type: actionTypes.EditChap0Level1,
            EditChap0Level1: true,
          });
          break;
        case `Delete_Chap0Level2`:
          setadminDeleteId(LevelID);
          dispatch({
            type: actionTypes.DeleteChap0Level1,
            DeleteChap0Level1: true,
          });
          break;
        case `Top_Chap0Level2`:
          handleLevel1Top(LevelID);
          break;
        case `Up_Chap0Level2`:
          handleLevel1Up(LevelID);
          break;
        case `Down_Chap0Level2`:
          handleLevel1Down(LevelID);
          break;
        case `Bottom_Chap0Level2`:
          handleLevel1Bottom(LevelID);
          break;
        default:
          break;
      }
    } else if (Level == actionTypes.Chap0Level3) {
      console.log(value);

      switch (value) {
        case `AddChap0Level3_Chap0Level3`:
          getChap0Level3(LevelID);
          dispatch({
            type: actionTypes.AddChap0Level3,
            AddChap0Level3: true,
          });
          break;
        case `Edit_Chap0Level3`:
          let filteredData = chap0Level2Data.find(
            (data) => data._id == LevelID
          );
          seteditData2(filteredData);
          dispatch({
            type: actionTypes.EditChap0Level2,
            EditChap0Level2: true,
          });
          break;
        case `Delete_Chap0Level3`:
          setDeleteIdLevel2(LevelID);
          dispatch({
            type: actionTypes.DeleteChap0Level2,
            DeleteChap0Level2: true,
          });
          break;
        case `Top_Chap0Level3`:
          handleLevel2Top(LevelID);
          break;
        case `Up_Chap0Level3`:
          handleLevel2Up(LevelID);
          break;
        case `Down_Chap0Level3`:
          handleLevel2Down(LevelID);
          break;
        case `Bottom_Chap0Level3`:
          handleLevel2Bottom(LevelID);
          break;
        default:
          break;
      }
    } else if (Level == "lastLevel") {
      switch (value) {
        case `Edit_lastLevel`:
          let filteredData = chap0Level3Data.find(
            (data) => data._id == LevelID
          );
          seteditData3(filteredData);
          dispatch({
            type: actionTypes.EditChap0Level3,
            EditChap0Level3: true,
          });
          break;
        case `Delete_lastLevel`:
          setDeleteIdLevel3(LevelID);
          dispatch({
            type: actionTypes.DeleteChap0Level3,
            DeleteChap0Level3: true,
          });
          break;
        case `Top_lastLevel`:
          handleLevel3Top(LevelID);
          break;
        case `Up_lastLevel`:
          handleLevel3Up(LevelID);
          break;
        case `Down_lastLevel`:
          handleLevel3Down(LevelID);
          break;
        case `Bottom_lastLevel`:
          handleLevel3Bottom(LevelID);
          break;
        default:
          break;
      }
    }
  };
  const handleClick = (level, id, obj) => {
    dispatch({
      type: level,
      obj,
    });
  };

  const getChap0Level2 = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Chap0Level2/getbyParentId/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChap0Level2Data(
        response.data.chap0Level2.sort((a, b) => a.ranking - b.ranking)
      );
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
  };

  const getChap0Level3 = async (id) => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Chap0Level3/getbyParentId/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChap0Level3Data(
        response.data.chap0Level3.sort((a, b) => a.ranking - b.ranking)
      );
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
  };

  //chap0Top
  const handleLevel1Top = async (id) => {
    let filteredIndex = adminsData.findIndex((dt) => dt._id == id);

    if (filteredIndex != 0) {
      let minRanking = Math.min.apply(
        Math,
        adminsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0/${id}`,
        data: { ranking: minRanking - 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...adminsData];
        tempArr[filteredIndex].ranking = minRanking - 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setadminsData(tempArr);
      });
    }
  };
  //chapLevel1
  const handleLevel1Up = async (id) => {
    let filteredIndex = adminsData.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...adminsData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0/${id}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = adminsData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = adminsData[filteredIndex];
          handleanchorElClose();
          setadminsData(tempArr);
        });
      });
    }
  };
  //ChapLevel1 Down
  const handleLevel1Down = async (id) => {
    // setIndex(id);
    let filteredIndex = adminsData.findIndex((dt) => dt._id == id);

    if (filteredIndex !== adminsData.length - 1) {
      let tempArr = [...adminsData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0/${id}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = adminsData[nextIndex];
          tempArr[nextIndex] = adminsData[filteredIndex];
          handleanchorElClose();
          setadminsData(tempArr);
        });
      });
    }
  };

  // ChapLevel1 Bottom
  const handleLevel1Bottom = async (id) => {
    let filteredIndex = adminsData.findIndex((dt) => dt._id == id);

    if (filteredIndex !== adminsData.length - 1) {
      let maxRanking = Math.max.apply(
        Math,
        adminsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0/${id}`,
        data: { ranking: maxRanking + 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...adminsData];
        tempArr[filteredIndex].ranking = maxRanking + 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setadminsData(tempArr);
      });
    }
  };

  //Chap0 Level2
  const handleLevel2Top = async (id) => {
    let data = chap0Level2Data;
    let filteredIndex = data.findIndex((dt) => dt._id == id);

    if (filteredIndex != 0) {
      let minRanking = Math.min.apply(
        Math,
        data.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level2/${id}`,
        data: { ranking: minRanking - 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...data];
        tempArr[filteredIndex].ranking = minRanking - 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setChap0Level2Data(tempArr);
      });
    }
  };

  //chapLevel2
  const handleLevel2Up = async (id) => {
    let filteredIndex = chap0Level2Data.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...chap0Level2Data];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level2/${id}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level2/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = chap0Level2Data[filteredIndex - 1];
          tempArr[filteredIndex - 1] = chap0Level2Data[filteredIndex];
          handleanchorElClose();
          setChap0Level2Data(tempArr);
        });
      });
    }
  };
  //ChapLevel1 Down
  const handleLevel2Down = async (id) => {
    // setIndex(id);
    let filteredIndex = chap0Level2Data.findIndex((dt) => dt._id == id);

    if (filteredIndex !== chap0Level2Data.length - 1) {
      let tempArr = [...chap0Level2Data];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level2/${id}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level2/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = chap0Level2Data[nextIndex];
          tempArr[nextIndex] = chap0Level2Data[filteredIndex];
          handleanchorElClose();
          setChap0Level2Data(tempArr);
        });
      });
    }
  };

  // ChapLevel1 Bottom
  const handleLevel2Bottom = async (id) => {
    let filteredIndex = chap0Level2Data.findIndex((dt) => dt._id == id);

    if (filteredIndex !== chap0Level2Data.length - 1) {
      let maxRanking = Math.max.apply(
        Math,
        adminsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level2/${id}`,
        data: { ranking: maxRanking + 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...chap0Level2Data];
        tempArr[filteredIndex].ranking = maxRanking + 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setChap0Level2Data(tempArr);
      });
    }
  };

  //Chap0 Level3
  const handleLevel3Top = async (id) => {
    let data = chap0Level3Data;
    let filteredIndex = data.findIndex((dt) => dt._id == id);

    if (filteredIndex != 0) {
      let minRanking = Math.min.apply(
        Math,
        data.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level3/${id}`,
        data: { ranking: minRanking - 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...data];
        tempArr[filteredIndex].ranking = minRanking - 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setChap0Level3Data(tempArr);
      });
    }
  };

  //chapLevel3
  const handleLevel3Up = async (id) => {
    let filteredIndex = chap0Level3Data.findIndex((dt) => dt._id == id);
    if (filteredIndex != 0) {
      let tempArr = [...chap0Level3Data];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level3/${id}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level3/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = chap0Level3Data[filteredIndex - 1];
          tempArr[filteredIndex - 1] = chap0Level3Data[filteredIndex];
          handleanchorElClose();
          setChap0Level3Data(tempArr);
        });
      });
    }
  };
  //ChapLevel3 Down
  const handleLevel3Down = async (id) => {
    // setIndex(id);
    let filteredIndex = chap0Level3Data.findIndex((dt) => dt._id == id);

    if (filteredIndex !== chap0Level3Data.length - 1) {
      let tempArr = [...chap0Level3Data];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];

      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level3/${id}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Chap0Level3/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = chap0Level3Data[nextIndex];
          tempArr[nextIndex] = chap0Level3Data[filteredIndex];
          handleanchorElClose();
          setChap0Level3Data(tempArr);
        });
      });
    }
  };

  // ChapLevel3 Bottom
  const handleLevel3Bottom = async (id) => {
    let filteredIndex = chap0Level3Data.findIndex((dt) => dt._id == id);

    if (filteredIndex !== chap0Level3Data.length - 1) {
      let maxRanking = Math.max.apply(
        Math,
        adminsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/Chap0Level3/${id}`,
        data: { ranking: maxRanking + 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...chap0Level3Data];
        tempArr[filteredIndex].ranking = maxRanking + 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        handleanchorElClose();
        setChap0Level3Data(tempArr);
      });
    }
  };

  return (
    <>
      {/* Level1 Modals*/}
      <Modal
        title={translate("Add Chap0")}
        open={state.AddChap0Level1}
        onClose={handleModalClose}
        width="45%"
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        translate={translate}
        component={
          <AddChap0
            translate={translate}
            formik={formik}
            text={text}
            setText={setText}
          />
        }
      />
      <Modal
        title={translate("Edit Chap0")}
        titleUpperCase={true}
        open={state.EditChap0Level1}
        width="45%"
        translate={translate}
        onClose={handleEditModal}
        buttonLabel="Update"
        onSubmit={edit_formik.handleSubmit}
        component={
          <EditChap0
            translate={translate}
            editData={editData}
            editmodal={editmodal}
            formik={edit_formik}
            editText={editText}
            setEditText={setEditText}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={state.DeleteChap0Level1}
        onClose={handleDeleteModal}
        width="35%"
        translate={translate}
        delete={true}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
      {/* Level 2 Modals */}
      <Modal
        title={translate("Add Chap0 Level2")}
        open={state.AddChap0Level2}
        onClose={handleModal2Close}
        width="45%"
        buttonLabel="Create"
        onSubmit={level2_formik.handleSubmit}
        translate={translate}
        component={
          <AddChap0Level2
            translate={translate}
            formik={level2_formik}
            text={text2}
            setText={setText2}
          />
        }
      />
      <Modal
        title={translate("Edit Chap0 Level2")}
        titleUpperCase={true}
        open={state.EditChap0Level2}
        width="45%"
        translate={translate}
        onClose={handleEdit2Modal}
        buttonLabel="Update"
        onSubmit={level2_edit_formik.handleSubmit}
        component={
          <EditChap0Level2
            translate={translate}
            editData={editData2}
            formik={level2_edit_formik}
            editText={editText2}
            setEditText={setEditText2}
          />
        }
      />
      <Modal
        open={state.DeleteChap0Level2}
        onClose={handleDelete2Modal}
        width="35%"
        translate={translate}
        delete={true}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDelete2Modal}
            handleDelete={handleDelete2}
          />
        }
      />
      {/* Level 3 Modals */}
      <Modal
        title={translate("Add Chap0 Level3")}
        open={state.AddChap0Level3}
        onClose={handleModal3Close}
        width="45%"
        buttonLabel="Create"
        onSubmit={level3_formik.handleSubmit}
        translate={translate}
        component={
          <AddChap0Level3
            translate={translate}
            formik={level3_formik}
            text={text3}
            setText={setText3}
          />
        }
      />
      <Modal
        title={translate("Edit Chap0 Level3")}
        titleUpperCase={true}
        open={state.EditChap0Level3}
        width="45%"
        translate={translate}
        onClose={handleEdit3Modal}
        buttonLabel="Update"
        onSubmit={level3_edit_formik.handleSubmit}
        component={
          <EditChap0Level3
            translate={translate}
            editData={editData3}
            formik={level3_edit_formik}
            editText={editText3}
            setEditText={setEditText3}
          />
        }
      />
      <Modal
        open={state.DeleteChap0Level3}
        onClose={handleDelete3Modal}
        width="35%"
        translate={translate}
        delete={true}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDelete3Modal}
            handleDelete={handleDelete3}
          />
        }
      />
      <ListMenu
        onClick={handleanchorEl}
        onClose={handleanchorElClose}
        onAdd={handleModalClick}
        open={openanchorEl}
        anchorEl={state.Chap0AnchorEl}
        text={TextAction}
        level={Level}
        id={"demo-customized-button"}
        parentLevel={parentLevel}
        translate={translate}
        {...props}
      />
      <div className="w-full md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <List
            secondaryKey="symbol"
            data={adminsData}
            translate={translate}
            handleanchorEl={handleanchorEl}
            title={`Chap0 `}
            state={state}
            handleClick={handleClick}
            getChap0Level2={getChap0Level2}
            items={chap0Level2Data}
            getChap0Level3={getChap0Level3}
            items2={chap0Level3Data}
          />
        </div>
      </div>
    </>
  );
}
