import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";
import { useFormik } from "formik";
import { CHAP0_STATE } from "../../../../components/formik/initialValues";
import { CHAP0_YUP } from "../../../../components/formik/validations";
import AddChap0 from "./AddChap0";
import EditChap0 from "./EditChap0";

import { Chap0headCells } from "../../../../utils/tableHeads";
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
  const [text, setText] = React.useState("");
  const [editText, setEditText] = React.useState("");

  const [adminId, setadminId] = React.useState("");
  const [adminDeleteId, setadminDeleteId] = React.useState("");

  const [adminsData, setadminsData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setadminDeleteId(id);
    }
    setdeleteModal(!deletemodal);
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

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async (id) => {
    if (id) {
      setadminId(id);
      try {
        let filteredData = adminsData.find((data) => data._id == id);
        seteditData(filteredData);
      } catch (error) {
        if (error.response) console.log(error.response.data.message, "error ");
      }
    }
    seteditModal(!editmodal);
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
      setadminsData(newData);
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
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/Chap0/create`,
          data: values,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Notifier(response.data.message, "success", translate);

        handleModal();
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

        handleEditModal();
      } catch (err) {
        Notifier(err.response.data.message, "error", translate);

        console.log("Errror->>>", err);
      }
    },
  });
  return (
    <>
      <Modal
        title="Add Chap0"
        open={modal}
        onClose={handleModal}
        width="30%"
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
        title="Edit Chap0"
        titleUpperCase={true}
        open={editmodal}
        width="30%"
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
        open={deletemodal}
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
      <div className="w-full md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">
              {translate("Chap0").toUpperCase()}
            </h1>
            <Button
              variant="outlined"
              label="Add Chap0"
              translate={translate}
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>
          <UnitsTable
            translate={translate}
            headCells={Chap0headCells}
            data={adminsData}
            translate={translate}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
          />
        </div>
      </div>
    </>
  );
}
