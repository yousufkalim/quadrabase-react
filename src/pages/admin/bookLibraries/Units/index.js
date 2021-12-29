import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { UNIT_STATE } from "../../../../components/formik/initialValues";
import { UNIT_YUP } from "../../../../components/formik/validations";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken, getUser } from "../../../../utils/Auth";
import List from "../../../../components/List";
import ListMenu from "../../../../components/List/listMenu";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const USER = getUser();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [unitId, setunitId] = React.useState("");
  const [unitsData, setunitsData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const openanchorEl = Boolean(anchorEl);

  const handleanchorEl = (event, id) => {
    if (id === 0) {
      setparentLevel(true);
    } else {
      setunitId(id);
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
        url: `${baseUrl}/Units/${unitId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleanchorElClose();
      Notifier("Unit Deleted!", "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async () => {
    let filteredData = unitsData.find((data) => data._id == unitId);
    seteditData(filteredData);
    handleanchorElClose();
    seteditModal(!editmodal);
  };

  const getUnits = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Units/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.units;
      let newData = data.filter((dat) => dat.email !== USER.email);
      setunitsData(newData);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getUnits();
  }, [modal, editmodal, deletemodal]);

  //create Unit
  const formik = useFormik({
    initialValues: UNIT_STATE,
    validationSchema: UNIT_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Units/create`,
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

  //edit unit
  const edit_formik = useFormik({
    initialValues: UNIT_STATE,
    validationSchema: UNIT_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Units/${unitId}`,
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
  //UnitsUp
  const handleUnitsUp = async () => {
    // setIndex(id);
    let filteredIndex = unitsData.findIndex((dt) => dt._id == unitId);
    if (filteredIndex != 0) {
      let tempArr = [...unitsData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/Units/${unitId}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Units/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => console.log("success2"));
      });
      tempArr[filteredIndex] = unitsData[filteredIndex - 1];
      tempArr[filteredIndex - 1] = unitsData[filteredIndex];
      setunitsData(tempArr);
    }
  };
  //Units Down
  const handleUnitsDown = async () => {
    // setIndex(id);
    let filteredIndex = unitsData.findIndex((dt) => dt._id == unitId);

    if (filteredIndex !== unitsData.length - 1) {
      let tempArr = [...unitsData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/Units/${unitId}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Units/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => console.log("success2"));
      });
      tempArr[filteredIndex] = unitsData[nextIndex];
      tempArr[nextIndex] = unitsData[filteredIndex];
      setunitsData(tempArr);
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
        handleUp={handleUnitsUp}
        handleDown={handleUnitsDown}
        id={"unit-customized-button"}
        title="Add Unit"
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <List
            data={unitsData}
            translate={translate}
            handleanchorEl={handleanchorEl}
            handleDelete={handleDeleteModal}
            title="Units List"
          />
        </div>
      </div>
      <Modal
        title="Add Unit"
        translate={translate}
        open={modal}
        onClose={onAddModal}
        onSubmit={formik.handleSubmit}
        buttonLabel="Create"
        component={<AddUnit translate={translate} formik={formik} />}
      />
      <Modal
        title="Edit Unit"
        open={editmodal}
        translate={translate}
        onSubmit={edit_formik.handleSubmit}
        buttonLabel="Update"
        onClose={handleEditModal}
        component={
          <EditUnit
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
