import React, { useEffect } from "react";

import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { STAKEHOLDER_STATE } from "../../../../components/formik/initialValues";
import { STAKEHOLDER_YUP } from "../../../../components/formik/validations";
import AddStakeholder from "./AddStakeholder";
import EditStakeholder from "./EditStakeholder";
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
  const [stakeholdersId, setstakeholdersId] = React.useState("");
  const [stakeholdersData, setstakeholdersData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const openanchorEl = Boolean(anchorEl);

  const handleanchorEl = (event, id) => {
    if (id === 0) {
      setparentLevel(true);
    } else {
      setstakeholdersId(id);
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
        url: `${baseUrl}/StakeholderTypes/${stakeholdersId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleanchorElClose();
      Notifier(response.data.message, "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async () => {
    let filteredData = stakeholdersData.find(
      (data) => data._id == stakeholdersId
    );
    seteditData(filteredData);
    handleanchorElClose();
    seteditModal(!editmodal);
  };

  const getStakeholders = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/StakeholderTypes/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.stakeholderTypes.sort(
        (a, b) => a.ranking - b.ranking
      );
      let newData = data.filter((dat) => dat.email !== USER.email);
      setstakeholdersData(newData);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getStakeholders();
  }, [modal, editmodal, deletemodal]);

  //create Unit
  const formik = useFormik({
    initialValues: STAKEHOLDER_STATE,
    validationSchema: STAKEHOLDER_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/StakeholderTypes/create`,
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
    initialValues: STAKEHOLDER_STATE,
    validationSchema: STAKEHOLDER_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/StakeholderTypes/${stakeholdersId}`,
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
  //StakeholdersUp
  const handleStakeholdersUp = async () => {
    // setIndex(id);
    let filteredIndex = stakeholdersData.findIndex(
      (dt) => dt._id == stakeholdersId
    );
    if (filteredIndex != 0) {
      let tempArr = [...stakeholdersData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/StakeholderTypes/${stakeholdersId}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/StakeholderTypes/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = stakeholdersData[filteredIndex - 1];
          tempArr[filteredIndex - 1] = stakeholdersData[filteredIndex];
          setstakeholdersData(tempArr);
        });
      });
    }
  };
  //Stakeholders Down
  const handleStakeholdersDown = async () => {
    // setIndex(id);
    let filteredIndex = stakeholdersData.findIndex(
      (dt) => dt._id == stakeholdersId
    );

    if (filteredIndex !== stakeholdersData.length - 1) {
      let tempArr = [...stakeholdersData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/StakeholderTypes/${stakeholdersId}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/StakeholderTypes/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          tempArr[filteredIndex] = stakeholdersData[nextIndex];
          tempArr[nextIndex] = stakeholdersData[filteredIndex];
          setstakeholdersData(tempArr);
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
        handleUp={handleStakeholdersUp}
        handleDown={handleStakeholdersDown}
        id={"unit-customized-button"}
        title={`${translate("Add Stakeholder")}`}
        translate={translate}
      />
      <div className="w-full md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          {console.log("stakeholder data", stakeholdersData)}
          <List
            data={stakeholdersData}
            translate={translate}
            handleanchorEl={handleanchorEl}
            handleDelete={handleDeleteModal}
            title="Stakeholders List"
          />
        </div>
      </div>
      <Modal
        title={`${translate("Add Stakeholder")}`}
        translate={translate}
        open={modal}
        onClose={onAddModal}
        width="35%"
        onSubmit={formik.handleSubmit}
        buttonLabel="Create"
        component={<AddStakeholder translate={translate} formik={formik} />}
      />
      {console.log(editData)}
      <Modal
        title={translate("Edit Stakeholder")}
        open={editmodal}
        translate={translate}
        onSubmit={edit_formik.handleSubmit}
        buttonLabel="Update"
        width="35%"
        onClose={handleEditModal}
        component={
          <EditStakeholder
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
