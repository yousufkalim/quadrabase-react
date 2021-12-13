import React, { useEffect } from "react";
import ArchitectsTable from "../../../components/Table";
import Button from "../../../components/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import Notifier from "../../../utils/Notifier";

import AddArchitect from "./addArchitect";
import EditArchitect from "./editArchitect";

import { ArchitectheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";
import SubscriptionModal from "./SubscriptionModal";

export default function Index() {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [architectId, setarchitectId] = React.useState("");
  const [architectDeleteId, setarchitectDeleteId] = React.useState("");

  const [architectsData, setarchitectsData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);

  const [subscriptionModal, setSubscriptionModal] = React.useState(false);
  const [subscriptionArchitextId, setSubscriptionArchitextId] =
    React.useState();
  const [currentSubscription, setCurrentSubscription] = React.useState();

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setarchitectDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/Architects/${architectDeleteId}`,
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
      setarchitectId(id);
      let filteredData = architectsData.find((data) => data._id == id);
      seteditData(filteredData);
    }
    seteditModal(!editmodal);
  };
  // Subscription Modal
  const handleSubscriptionModal = (id) => {
    if (id) {
      setSubscriptionArchitextId(id);
      let filteredData = architectsData.find((data) => data._id == id);
      setCurrentSubscription(filteredData?.subscriptions);
    }
    setSubscriptionModal(!subscriptionModal);
  };

  const getArchitects = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/Architects`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.architects;
      setarchitectsData(data);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getArchitects();
  }, [modal, editmodal, deletemodal, subscriptionModal]);
  useEffect(() => {
    let array = [];
    ArchitectheadCells.slice(0, ArchitectheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);
  return (
    <>
      <Modal
        title="Add Architect"
        open={modal}
        onClose={handleModal}
        component={<AddArchitect handleModal={handleModal} />}
      />
      <Modal
        title="Edit Architect"
        open={editmodal}
        onClose={handleEditModal}
        component={
          <EditArchitect
            editData={editData}
            editmodal={editmodal}
            handleModal={handleEditModal}
            architectId={architectId}
          />
        }
      />
      <Modal
        // title="Add Architect"
        open={deletemodal}
        onClose={handleDeleteModal}
        width="35%"
        component={
          <DeleteModal
            handleClose={handleDeleteModal}
            handleDelete={handleDelete}
          />
        }
      />
      <Modal
        title="Set Subscription"
        open={subscriptionModal}
        onClose={handleSubscriptionModal}
        width="35%"
        component={
          <SubscriptionModal
            handleModal={handleSubscriptionModal}
            architectId={subscriptionArchitextId}
            currentSubscription={currentSubscription}
          />
        }
      />
      <div className="w-full  md:mx-auto py-9 ">
        <div className="container mx-auto px-6">
          <div className="flex justify-between pb-3">
            <h1 className="text-2xl font-bold">Architects</h1>
            <Button
              variant="outlined"
              label="Add Architect"
              onClick={handleModal}
              startIcon={<AddIcon />}
            />
          </div>
          <ArchitectsTable
            headCells={ArchitectheadCells}
            data={architectsData}
            handleEdit={handleEditModal}
            handleDelete={handleDeleteModal}
            rows={headCells}
            subscription={true}
            handleSubscription={handleSubscriptionModal}
          />
        </div>
      </div>
    </>
  );
}
