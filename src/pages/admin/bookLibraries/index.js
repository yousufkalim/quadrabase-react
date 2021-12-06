import React, { useEffect } from "react";

import Modal from "../../../components/Modal";
import DeleteModal from "../../../components/DeleteModal";
import List from "../../../components/List/index.js";

import Notifier from "../../../utils/Notifier";

import AddLibrary from "./addLibrary";
import EditLibrary from "./editLibrary";

import { LibraryheadCells } from "../../../utils/tableHeads";
import Axios from "axios";
import { baseUrl } from "../../../utils/BaseUrl";
import { getToken } from "../../../utils/Auth";

export default function Index() {
  const token = getToken();
  const [modal, setModal] = React.useState(false);
  const [editmodal, seteditModal] = React.useState(false);
  const [deletemodal, setdeleteModal] = React.useState(false);
  const [headCells, setheadCells] = React.useState("");

  const [libraryId, setlibraryId] = React.useState("");
  const [libraryDeleteId, setlibraryDeleteId] = React.useState("");

  const [librariesData, setlibrariesData] = React.useState([]);
  const [editData, seteditData] = React.useState([]);

  const handleModal = () => setModal(!modal);
  //   delete architect modal
  const handleDeleteModal = (id) => {
    if (id) {
      setlibraryDeleteId(id);
    }
    setdeleteModal(!deletemodal);
  };
  //delete architect
  const handleDelete = async () => {
    try {
      let response = await Axios({
        method: "delete",
        url: `${baseUrl}/BookLibraries/${libraryDeleteId}`,
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
      setlibraryId(id);
      try {
        let response = await Axios({
          method: "get",
          url: `${baseUrl}/BookLibraries/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let data = response.data.bookLibrary;
        seteditData(data);
      } catch (error) {
        if (error.response) console.log(error.response.data.message, "error ");
      }
    }
    seteditModal(!editmodal);
  };

  const getBookLibraries = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/BookLibraries/`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = response.data.bookLibraries;
      let newData = data.filter((dat) => dat.email !== "admin@quadrabase.com");
      setlibrariesData(newData);
    } catch (error) {
      if (error.response) console.log(error.response.data.message, "error ");
    }
    //}
  };

  useEffect(() => {
    getBookLibraries();
  }, [modal, editmodal, deletemodal]);
  useEffect(() => {
    let array = [];
    LibraryheadCells.slice(0, LibraryheadCells.length - 1).map((cell) =>
      array.push(cell.id)
    );
    setheadCells(array);
  }, []);
  return (
    <>
      <Modal
        title="Add Libarary"
        open={modal}
        onClose={handleModal}
        component={<AddLibrary handleModal={handleModal} />}
      />
      <Modal
        title="Edit Libarary"
        open={editmodal}
        onClose={handleEditModal}
        component={
          <EditLibrary
            editData={editData}
            editmodal={editmodal}
            handleModal={handleEditModal}
            libraryId={libraryId}
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
      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            <List />
          </div>
        </div>
      </div>
    </>
  );
}
