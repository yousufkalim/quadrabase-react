import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { VAT_STATE } from "../../../../components/formik/initialValues";
import { VAT_YUP } from "../../../../components/formik/validations";
import AddVat from "./AddVat";
import EditVat from "./EditVat";
import List from "../../../../components/List";
import ListMenu from "../../../../components/List/listMenu";
import { VatheadCells } from "../../../../utils/tableHeads";
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

  const [vatId, setvatId] = React.useState("");
  const [adminDeleteId, setadminDeleteId] = React.useState("");

  const [vatsData, setvatsData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [parentLevel, setparentLevel] = React.useState(false);

  const openanchorEl = Boolean(anchorEl);

  const handleanchorEl = (event, id) => {
    if (id === 0) {
      setparentLevel(true);
    } else {
      setvatId(id);
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
        url: `${baseUrl}/VAT/${vatId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier("VAT Deleted!", "success", translate);
    } catch (error) {
      if (error.response)
        Notifier(error.response.data.message, "error ", translate);
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = () => {
    let filteredData = vatsData.find((data) => data._id == vatId);
    seteditData(filteredData);

    seteditModal(!editmodal);
  };

  const getAdmins = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/VAT/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.vat;
      let newData = data.filter((dat) => dat.email !== USER.email);
      setvatsData(newData);
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
    VatheadCells.slice(0, VatheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);

  //create Vat
  const formik = useFormik({
    initialValues: VAT_STATE,
    validationSchema: VAT_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/VAT/create`,
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

  //edit VAt
  const edit_formik = useFormik({
    initialValues: VAT_STATE,
    validationSchema: VAT_YUP,
    onSubmit: async (values) => {
      try {
        let response = await Axios({
          method: "put",
          url: `${baseUrl}/VAT/${vatId}`,
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
    let filteredIndex = vatsData.findIndex((dt) => dt._id == vatId);
    if (filteredIndex != 0) {
      let tempArr = [...vatsData];
      let prevIndex = filteredIndex - 1;

      let prev = tempArr[prevIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/VAT/${vatId}`,
        data: { ranking: prevIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/VAT/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => console.log("success2"));
      });
      tempArr[filteredIndex] = vatsData[filteredIndex - 1];
      tempArr[filteredIndex - 1] = vatsData[filteredIndex];
      setvatsData(tempArr);
    }
  };
  //Units Down
  const handleUnitsDown = async () => {
    // setIndex(id);
    let filteredIndex = vatsData.findIndex((dt) => dt._id == vatId);

    if (filteredIndex !== vatsData.length - 1) {
      let tempArr = [...vatsData];
      let nextIndex = filteredIndex + 1;
      let prev = tempArr[nextIndex];
      handleanchorElClose();
      Axios({
        method: "put",
        url: `${baseUrl}/VAT/${vatId}`,
        data: { ranking: nextIndex },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        Axios({
          method: "put",
          url: `${baseUrl}/VAT/${prev._id}`,
          data: { ranking: filteredIndex },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => console.log("success2"));
      });
      tempArr[filteredIndex] = vatsData[nextIndex];
      tempArr[nextIndex] = vatsData[filteredIndex];
      setvatsData(tempArr);
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
        title="Add VAT"
        translate={translate}
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <List
            data={vatsData}
            primaryKey="value"
            secondaryKey="symbol"
            translate={translate}
            handleanchorEl={handleanchorEl}
            handleDelete={handleDeleteModal}
            title="VATS List"
            keyName="value"
          />
        </div>
      </div>
      <Modal
        title="Add VAT"
        open={modal}
        translate={translate}
        onClose={onAddModal}
        onSubmit={formik.handleSubmit}
        buttonLabel="Create"
        component={<AddVat translate={translate} formik={formik} />}
      />
      <Modal
        title="Edit VAT"
        translate={translate}
        open={editmodal}
        onSubmit={edit_formik.handleSubmit}
        buttonLabel="Update"
        onClose={handleEditModal}
        component={
          <EditVat
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
