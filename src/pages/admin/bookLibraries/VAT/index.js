import React, { useEffect } from "react";
import UnitsTable from "../../../../components/Table";
import Button from "../../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../../components/Modal";
import DeleteModal from "../../../../components/DeleteModal";
import Notifier from "../../../../utils/Notifier";

import AddVat from "./AddVat";
import EditVat from "./EditVat";

import { VatheadCells } from "../../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";
import { getToken, getUser } from "../../../../utils/Auth";

export default function Index() {
  const token = getToken();
  const USER = getUser();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

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
        url: `${baseUrl}/Vat/${adminDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier("VAT Deleted!", "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
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
        url: `${baseUrl}/VAT/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.vat;
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
    VatheadCells.slice(0, VatheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);
  return (
    <>
      <Modal
        title="Add VAT"
        open={modal}
        onClose={handleModal}
        component={<AddVat handleModal={handleModal} />}
      />
      <Modal
        title="Edit Edit"
        open={editmodal}
        onClose={handleEditModal}
        component={
          <EditVat
            editData={editData}
            editmodal={editmodal}
            handleModal={handleEditModal}
            adminId={adminId}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        component={
          <DeleteModal
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">VAT</h1>
            <Button
              variant="outlined"
              label="Add VAT"
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>
          <UnitsTable
            headCells={VatheadCells}
            data={adminsData}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
          />
        </div>
      </div>
    </>
  );
}
