import React, { useEffect, useState } from "react";
import ArchitectsTable from "../../../components/Table";
import Button from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import Notifier from "../../../utils/Notifier";

import AddProvider from "./addProvider";
import EditProvider from "./editProvider";
import ListOfWork from "./listOfWork";

import { ProviderheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";

export default function Index(props) {
  const { translate } = props;
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [providerModal, setproviderModal] = React.useState(false);
  const [provider, setprovider] = useState([]);

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
  const handleProvider = (id) => {
    let filteredData = providersData.find((data) => data._id == id);
    setprovider(filteredData);
    setproviderModal(!providerModal);
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
        height="70%"
        onClose={handleModal}
        translate={translate}
        component={
          <AddProvider translate={translate} handleModal={handleModal} />
        }
      />
      <Modal
        title="List Of Works"
        open={providerModal}
        height={provider && provider.works.length > 15 ? "60%" : "20%"}
        onClose={handleProvider}
        translate={translate}
        component={
          <ListOfWork
            translate={translate}
            handleModal={handleProvider}
            provider={provider}
          />
        }
      />
      <Modal
        title="Edit Provider"
        open={editmodal}
        height="70%"
        onClose={handleEditModal}
        translate={translate}
        component={
          <EditProvider
            translate={translate}
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
        width="35%"
        height="40%"
        component={
          <DeleteModal
            translate={translate}
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />

      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">{translate("Providers")}</h1>
            <Button
              variant="outlined"
              label="Add Provider"
              onClick={handleModal}
              translate={translate}
              startIcon={<AddIcon />}
            />
          </div>
          <ArchitectsTable
            headCells={ProviderheadCells}
            data={providersData}
            translate={translate}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
            provider={true}
            handleProvider={handleProvider}
          />
        </div>
      </div>
    </>
  );
}
