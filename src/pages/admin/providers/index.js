import React, { useEffect } from "react";
import ArchitectsTable from "../../../components/Table";
import Button from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import Notifier from "../../../utils/Notifier";

import AddProvider from "./addProvider";
import EditProvider from "./editProvider";

import { ProviderheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";

export default function Index() {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [providerId, setproviderId] = React.useState("");
  const [providerDeleteId, setproviderDeleteId] = React.useState("");

  const [providersData, setprovidersData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setproviderDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Providers/${providerDeleteId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Notifier(response.data.message, "success");
    } catch (error) {
      if (error.response) Notifier(error.response.data.message, "error ");
    }

    setdeleteModal(!deletemodal);
  };
  const handleEditModal = async (id) => {
    if (id) {
      setproviderId(id);
      let filteredData = providersData.find((data) => data._id == id);
      seteditData(filteredData);
    }
    seteditModal(!editmodal);
  };

  const getProviders = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Providers/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.providers;
      setprovidersData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getProviders();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    ProviderheadCells.slice(0, ProviderheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);
  return (
    <>
      <Modal
        title="Add Provider"
        open={modal}
        onClose={handleModal}
        component={<AddProvider handleModal={handleModal} />}
      />
      <Modal
        title="Edit Provider"
        open={editmodal}
        onClose={handleEditModal}
        component={
          <EditProvider
            editData={editData}
            editmodal={editmodal}
            handleModal={handleEditModal}
            providerId={providerId}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        component={
          <DeleteModal
            handleModal={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">Providers</h1>
            <Button
              variant="outlined"
              label="Add Provider"
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>
          <ArchitectsTable
            headCells={ProviderheadCells}
            data={providersData}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
          />
        </div>
      </div>
    </>
  );
}
