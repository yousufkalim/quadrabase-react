import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { FAMILIES_STATE } from "../../../../components/formik/initialValues";
import { FAMILIES_YUP } from "../../../../components/formik/validations";
import AddFamily from "./AddFamily";
import EditFamily from "./EditFamily";
import List from "../../../../components/List";
import ListMenu from "../../../../components/List/listMenu";

import { FamiliesheadCells } from "../../../../utils/tableHeads";
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

  const [familyId, setfamilyId] = React.useState("");
  const [adminDeleteId, setadminDeleteId] = React.useState("");

  const [familiesData, setfamiliesData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const openanchorEl = Boolean(anchorEl);

  const handleanchorEl = (event, id) => {
    if (id === 0) {
      setparentLevel(true);
    } else {
      setfamilyId(id);
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
        url: `${baseUrl}/Families/${familyId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setanchorEl(null);
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = () => {
    let filteredData = familiesData.find((data) => data._id == familyId);
    seteditData(filteredData);

    seteditModal(!editmodal);
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
      let newData = data.filter((dat) => dat.email !== USER.email);
      setfamiliesData(newData);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getFamilies();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    FamiliesheadCells.slice(0, FamiliesheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);

  //add Family
  const formik = useFormik({
    initialValues: FAMILIES_STATE,
    validationSchema: FAMILIES_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Families/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        onAddModal();
        Notifier(response.data.message, "success", translate);
        formik.resetForm();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });

  //edit Family
  const edit_formik = useFormik({
    initialValues: FAMILIES_STATE,
    validationSchema: FAMILIES_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/Families/${familyId}`,
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
  //FamiliesUp
  const handleFamilyUp = async () => {
    // setIndex(id);
    let filteredIndex = familiesData.findIndex((dt) => dt._id == familyId);
    if (filteredIndex != 0) {
      let tempArr = [...familiesData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/Families/${familyId}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Families/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = familiesData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = familiesData[filteredIndex];
          setfamiliesData(tempArr);
        });
      });
    }
  };
  //Units Down
  const handleFamilyDown = async () => {
    let filteredIndex = familiesData.findIndex((dt) => dt._id == familyId);

    if (filteredIndex !== familiesData.length - 1) {
      let tempArr = [...familiesData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/Families/${familyId}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/Families/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = familiesData[nextIndex];
          tempArr[nextIndex] = familiesData[filteredIndex];
          setfamiliesData(tempArr);
        });
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
        handleUp={handleFamilyUp}
        handleDown={handleFamilyDown}
        id={"unit-customized-button"}
        title={translate("Add Family")}
        translate={translate}
      />
      <div className="w-full md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <List
            data={familiesData}
            primaryKey="name"
            secondaryKey="type"
            translate={translate}
            handleanchorEl={handleanchorEl}
            handleDelete={handleDeleteModal}
            title={translate("Families List")}
          />
        </div>
      </div>
      <Modal
        title={translate("Add Family")}
        open={modal}
        buttonLabel="Create"
        onSubmit={formik.handleSubmit}
        onClose={onAddModal}
        translate={translate}
        component={<AddFamily translate={translate} formik={formik} />}
      />
      <Modal
        title={translate("Edit Family Title")}
        open={editmodal}
        translate={translate}
        onClose={handleEditModal}
        buttonLabel="Update"
        onSubmit={edit_formik.handleSubmit}
        component={
          <EditFamily
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
