import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { CCTP_STATE } from "../../../../components/formik/initialValues";
import { CCTP_YUP } from "../../../../components/formik/validations";
import AddCctp from "./AddCctp";
import EditCctp from "./EditCctp";
import List from "../../../../components/List";
import ListMenu from "../../../../components/List/listMenu";

import { CctpheadCells } from "../../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken, getUser } from "../../../../utils/Auth";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const USER = getUser();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [cctpId, setcctpId] = React.useState("");
  const [adminDeleteId, setadminDeleteId] = React.useState("");

  const [cctpsData, setcctpsData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const openanchorEl = Boolean(anchorEl);

  const handleanchorEl = (event, id) => {
    if (id === 0) {
      setparentLevel(true);
    } else {
      setcctpId(id);
      setparentLevel(false);
    }
    setanchorEl(event.currentTarget);
  };
  const handleanchorElClose = () => {
    setanchorEl(null);
  };
  const onAddModal = () => {
    setModal(!modal);
    handleanchorElClose();
  };
  //   delete architect modal
  const handleDeleteModal = () => {
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/CCTP/${cctpId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setanchorEl(null);
      Notifier("CCTP Deleted!", "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = () => {
    let filteredData = cctpsData.find((data) => data._id == cctpId);
    seteditData(filteredData);

    seteditModal(!editmodal);
  };

  const getAdmins = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/CCTP/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.cctp.sort((a, b) => a.ranking - b.ranking);
      let newData = data.filter((dat) => dat.email !== USER.email);
      setcctpsData(newData);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getAdmins();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    CctpheadCells.slice(0, CctpheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);

  //add CCTP
  const formik = useFormik({
    initialValues: CCTP_STATE,
    validationSchema: CCTP_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/CCTP/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);

        onAddModal();
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //edit CCTP
  const edit_formik = useFormik({
    initialValues: CCTP_STATE,
    validationSchema: CCTP_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/CCTP/${cctpId}`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);

        handleEditModal();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  // ****************
  //*** */
  //CctpTop
  const handleCctpTop = async () => {
    let filteredIndex = cctpsData.findIndex((dt) => dt._id == cctpId);

    if (filteredIndex != 0) {
      let minRanking = Math.min.apply(
        Math,
        cctpsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/CCTP/${cctpId}`,
        data: { ranking: minRanking - 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...cctpsData];
        tempArr[filteredIndex].ranking = minRanking - 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        setcctpsData(tempArr);
      });
    }
  };
  //UnitsUp
  const handleCctpUp = async () => {
    // setIndex(id);
    let filteredIndex = cctpsData.findIndex((dt) => dt._id == cctpId);
    if (filteredIndex != 0) {
      let tempArr = [...cctpsData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/CCTP/${cctpId}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/CCTP/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = cctpsData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = cctpsData[filteredIndex];
          setcctpsData(tempArr);
        });
      });
    }
  };
  //Units Down
  const handleCctpDown = async () => {
    // setIndex(id);
    let filteredIndex = cctpsData.findIndex((dt) => dt._id == cctpId);

    if (filteredIndex !== cctpsData.length - 1) {
      let tempArr = [...cctpsData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/CCTP/${cctpId}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/CCTP/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = cctpsData[nextIndex];
          tempArr[nextIndex] = cctpsData[filteredIndex];
          setcctpsData(tempArr);
        });
      });
    }
  };

  // Cctp Bottom
  const handleCctpBottom = async () => {
    let filteredIndex = cctpsData.findIndex((dt) => dt._id == cctpId);

    if (filteredIndex !== cctpsData.length - 1) {
      let maxRanking = Math.max.apply(
        Math,
        cctpsData.map((item) => {
          return item.ranking;
        })
      );
      Axios({
        method: "put",
        url: `${baseUrl}/CCTP/${cctpId}`,
        data: { ranking: maxRanking + 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        let tempArr = [...cctpsData];
        tempArr[filteredIndex].ranking = maxRanking + 1;
        tempArr = tempArr.sort((a, b) => a.ranking - b.ranking);
        setcctpsData(tempArr);
      });
    }
  };

  // ********
  return (
    <>
      <ListMenu
        onClick={handleanchorEl}
        onClose={handleanchorElClose}
        parentLevel={parentLevel}
        open={openanchorEl}
        onAddModal={onAddModal}
        anchorEl={anchorEl}
        onEdit={handleEditModal}
        onDelete={handleDeleteModal}
        handleTop={handleCctpTop}
        handleBottom={handleCctpBottom}
        handleUp={handleCctpUp}
        handleDown={handleCctpDown}
        translate={translate}
        id={"unit-customized-button"}
        title={translate("Add CCTP")}
      />
      <div className="w-full md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <List
            data={cctpsData}
            primaryKey="name"
            secondaryKey="type"
            translate={translate}
            handleanchorEl={handleanchorEl}
            handleDelete={handleDeleteModal}
            title={translate("CCTP List")}
          />
        </div>
      </div>
      <Modal
        title="Add CCTP"
        open={modal}
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        translate={translate}
        onClose={onAddModal}
        component={<AddCctp translate={translate} formik={formik} />}
      />
      <Modal
        title="Edit CCTP Title"
        open={editmodal}
        translate={translate}
        onClose={handleEditModal}
        buttonLabel="Update"
        onSubmit={edit_formik.handleSubmit}
        component={
          <EditCctp
            translate={translate}
            editData={editData}
            editmodal={editmodal}
            formik={edit_formik}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        delete={true}
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
    </>
  );
}
