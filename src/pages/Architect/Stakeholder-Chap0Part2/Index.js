// init
import React, { useState, useEffect } from "react";
import Header from "../../../components/Architect/Header";
import Table from "../../../components/Architect/Tabel";
import { StakeholderheadCells } from "../../../utils/tableHeads";
import { Chap0Part2headCells } from "../../../utils/tableHeads";
import { useStyles } from "../../../css/stakeholder";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../../components/Architect/Modal";
import DeleteModal from "../../../components/Architect/DeleteModal";
import AddStakeholder from "./Stakeholder management/AddStakholder";
import EditStakholder from "./Stakeholder management/EditStakholder";
import api from "../../../api";
import { Store } from "../../../StoreContext";
import AddChap0Part2 from "./Chap0Part2 management/AddChap0Part2";
import EditChap0Part2 from "./Chap0Part2 management/EditChap0Part2";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AddChapLevel from "./Chap0Part2 management/AddChapLevel";
import EditChapModal from "./Chap0Part2 management/EditChapModal";

// component
const Index = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const store = Store();

  //   states
  const [stakeholdersData, setStakeholdersData] = useState([]);
  const [stakeholdersHeadCells, setStakeholdersHeadCells] = useState("");
  const [addStakeholderModal, setAddStakeholderModal] = useState(false);
  const [editStakeholderModal, setEditStakeholderModal] = useState(false);
  const [editStakeholder, setEditStakeholder] = useState({});
  const [deleteStakeholderModal, setDeleteStakeholderModal] = useState(false);
  const [deleteStakeholder, setDeleteStakeholder] = useState();

  const [addChap0Part2Modal, setAddChap0Part2Modal] = useState(false);
  const [chap0Part2Data, setChap0Part2Data] = useState([]);
  const [chap0part2HeadCells, setChap0part2HeadCells] = useState("");
  const [editChap0Part2Modal, setEditChap0Part2Modal] = useState(false);
  const [editChap0Part2, setEditChap0Part2] = useState({});
  const [deleteChap0part2Modal, setDeleteChap0part2Modal] = useState(false);
  const [deleteChap0part2, setDeleteChap0part2] = useState();
  const [openEditChap0Part2Modal, setOpenEditChap0Part2Modal] = useState(false);
  const [editChapItem, setEditChapItem] = useState();
  const [openEditChapModal, setOpenEditChapModal] = useState(false);
  const [deleteChap, setDeleteChap] = useState({});
  const [openDeleteChap, setOpenDeleteChap] = useState(false);
  const [openAddChapModal, setOpenAddChapModal] = useState(false);

  //   useEffect to setheadcells
  useEffect(() => {
    let array = [];
    StakeholderheadCells.slice(0, StakeholderheadCells.length - 1).map((cell) => array.push(cell.id));
    setStakeholdersHeadCells(array);

    let temp = [];
    Chap0Part2headCells.slice(0, Chap0Part2headCells.length - 1).map((cell) => temp.push(cell.id));
    setChap0part2HeadCells(temp);
  }, []);

  //   useEffect to get stakeholders
  useEffect(() => {
    getStakeholders();
  }, [addStakeholderModal, editStakeholderModal, deleteStakeholderModal]);

  //   useEffect to get chap0part2
  useEffect(() => {
    getChap0Part2();
  }, [addChap0Part2Modal, editChap0Part2Modal, deleteChap0part2Modal, openAddChapModal, openEditChapModal, openDeleteChap]);

  //   func to get stakeholders
  const getStakeholders = async () => {
    const result = await api("get", `/Architects/current/getStakeholders`);
    setStakeholdersData(result.data.stakeholders);
  };

  //   func to get Chap0Part2Data
  const getChap0Part2 = async () => {
    const result = await api("get", `/ArchitectsChap0/current/architectchap0part2`);
    setChap0Part2Data(result.data.architectsChap0);
  };

  //   func to delete stakeholders
  const handleDeleteStakeholder = async () => {
    const result = await api("delete", `/stakeholders/${deleteStakeholder}/${store.user._id}`, {}, t);
    toast.success(t(result.data.message));
    handleDeleteStakeholderModal();
  };

  //   func to delete chap0part2
  const handleDeleteChap0Part2 = async () => {
    const result = await api("delete", `/ArchitectsChap0/${deleteChap0part2}`, {}, t);
    toast.success(t(result.data.message));
    handleDeleteChap0Part2Modal();
  };

  //   funct to open/close modal
  const handleAddStakeholderModal = () => setAddStakeholderModal(!addStakeholderModal);

  const handleEditStakeholderModal = (stakeholder) => {
    if (stakeholder) {
      setEditStakeholder(stakeholder);
    }
    setEditStakeholderModal(!editStakeholderModal);
  };

  const handleDeleteStakeholderModal = (id) => {
    if (id) {
      setDeleteStakeholder(id);
    }
    setDeleteStakeholderModal(!deleteStakeholderModal);
  };

  const handleAddChap0Part2Modal = () => setAddChap0Part2Modal(!addChap0Part2Modal);

  const handleEditChap0Part2Modal = (chap0part2) => {
    if (chap0part2) {
      setEditChap0Part2(chap0part2);
    }
    setEditChap0Part2Modal(!editChap0Part2Modal);
  };

  const handleDeleteChap0Part2Modal = (id) => {
    if (id) {
      setDeleteChap0part2(id);
    }
    setDeleteChap0part2Modal(!deleteChap0part2Modal);
  };

  const handleOpenEditChap0Part2Modal = (chap0part2) => {
    if (chap0part2) {
      let chap = chap0part2;
      chap?.level2?.map((item) => {
        item.level3 = item?.level3?.sort((a, b) => a.ranking - b.ranking);
      });
      chap.level2 = chap?.level2?.sort((a, b) => a.ranking - b.ranking);
      setEditChap0Part2(chap);
    }
    setOpenEditChap0Part2Modal(!openEditChap0Part2Modal);
  };

  const handleOpenEditChapModal = (item) => {
    if (item?.item?._id) {
      setEditChapItem(item);
      setOpenEditChapModal(true);
    } else {
      setOpenEditChapModal(false);
    }
  };

  const handleOpenDeleteChapModal = (item) => {
    if (item?.item?._id) {
      setDeleteChap(item);
    }
    setOpenDeleteChap(!openDeleteChap);
  };

  const handleOpenAddChapModal = (item) => {
    if (item?.item?._id) {
      setEditChapItem(item);
      setOpenAddChapModal(true);
    } else {
      setOpenAddChapModal(false);
    }
  };

  // handle delete
  const handleChapDelete = async () => {
    const result = await api(
      "delete",
      `/ArchitectsChap0/deleteChapLevel/${editChap0Part2._id}`,
      {
        data: {
          type: deleteChap.type,
          id: deleteChap.item._id,
        },
      },
      t
    );
    toast.success(t(result.data.message));
    handleOpenDeleteChapModal();
    handleOpenEditChap0Part2Modal();
  };

  // jsx
  return (
    <div>
      {/* stakholder modals */}
      <Modal
        title={t("Add Stakeholder")}
        open={addStakeholderModal}
        onClose={handleAddStakeholderModal}
        component={<AddStakeholder handleAddStakeholderModal={handleAddStakeholderModal} stakeholdersData={stakeholdersData} />}
      />
      <Modal
        title={t("Edit Stakeholder")}
        open={editStakeholderModal}
        onClose={handleEditStakeholderModal}
        component={<EditStakholder stakeholder={editStakeholder} handleEditStakeholderModal={handleEditStakeholderModal} />}
      />
      <Modal
        open={deleteStakeholderModal}
        onClose={handleDeleteStakeholderModal}
        component={<DeleteModal handleCancel={handleDeleteStakeholderModal} handleDelete={handleDeleteStakeholder} />}
      />
      {/* Chap0part2 modals */}
      <Modal
        title={t("Add Chap0Part2")}
        open={addChap0Part2Modal}
        onClose={handleAddChap0Part2Modal}
        component={<AddChap0Part2 handleAddChap0Part2Modal={handleAddChap0Part2Modal} />}
      />
      <Modal
        open={deleteChap0part2Modal}
        onClose={handleDeleteChap0Part2Modal}
        component={<DeleteModal handleCancel={handleDeleteChap0Part2Modal} handleDelete={handleDeleteChap0Part2} />}
      />

      <Modal
        title={t("Edit Chap. 0 part 2")}
        open={openEditChap0Part2Modal}
        onClose={handleOpenEditChap0Part2Modal}
        component={
          <EditChap0Part2
            handleOpenEditChap0Part2Modal={handleOpenEditChap0Part2Modal}
            editChap0Part2={editChap0Part2}
            handleOpenEditChapModal={handleOpenEditChapModal}
            handleOpenDeleteChapModal={handleOpenDeleteChapModal}
            setEditChap0Part2={setEditChap0Part2}
            handleOpenAddChapModal={handleOpenAddChapModal}
          />
        }
      />

      <Modal
        title={t("Add Chap")}
        open={openAddChapModal}
        onClose={handleOpenAddChapModal}
        component={
          <AddChapLevel
            handleOpenAddChapModal={handleOpenAddChapModal}
            editChapItem={editChapItem}
            editChap0Part2={editChap0Part2}
            handleOpenEditChap0Part2Modal={handleOpenEditChap0Part2Modal}
          />
        }
      />

      <Modal
        title={t("Modify the text of Chap0 Part2")}
        open={openEditChapModal}
        onClose={handleOpenEditChapModal}
        component={
          <EditChapModal
            handleOpenEditChapModal={handleOpenEditChapModal}
            editChapItem={editChapItem}
            editChap0Part2={editChap0Part2}
            handleOpenEditChap0Part2Modal={handleOpenEditChap0Part2Modal}
          />
        }
      />

      <Modal
        open={openDeleteChap}
        onClose={handleOpenDeleteChapModal}
        component={<DeleteModal handleCancel={handleOpenDeleteChapModal} handleDelete={handleChapDelete} />}
      />

      <div className={classes.container}>
        {/* left Contaoiner */}
        <div className={classes.left_container}>
          <div>
            <Table
              headCells={StakeholderheadCells}
              data={stakeholdersData}
              rows={stakeholdersHeadCells}
              handleEdit={handleEditStakeholderModal}
              handleDelete={handleDeleteStakeholderModal}
              headerText={t("Stakeholders")}
              buttonText={t("Add Stakeholder")}
              buttonAction={handleAddStakeholderModal}
            />
          </div>
        </div>
        {/* right container */}
        <div className={classes.right_container}>
          <div>
            <Table
              headCells={Chap0Part2headCells}
              data={chap0Part2Data}
              rows={chap0part2HeadCells}
              handleEdit={handleOpenEditChap0Part2Modal}
              handleDelete={handleDeleteChap0Part2Modal}
              headerText={t("Chap0Part2")}
              buttonText={chap0Part2Data.length === 0 && t("Add Chap0Part2")}
              buttonAction={chap0Part2Data.length === 0 && handleAddChap0Part2Modal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
