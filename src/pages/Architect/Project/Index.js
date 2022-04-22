import React, { useState, useEffect } from "react";
import Table from "../../../components/Architect/Tabel";
import Modal from "../../../components/Architect/Modal";
import AddProjectModal from "./AddProjectModal";
import { ProjectheadCells } from "../../../utils/tableHeads";
import api from "../../../api";
import { Store } from "../../../StoreContext";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "../../../css/projects.css";

const Index = () => {
  const { t } = useTranslation();
  const store = Store();
  const history = useHistory();
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [projectHeadCells, setProjectHeadCells] = useState("");
  const [mySubscription, setMySubscription] = useState({});

  useEffect(() => {
    let temp = [];
    ProjectheadCells.slice(0, ProjectheadCells.length - 1).map((cell) =>
      temp.push(cell.id)
    );
    setProjectHeadCells(temp);
  }, []);

  useEffect(() => {
    getProjects();
  }, [addProjectModal]);

  useEffect(() => {
    getSubscriptions();
  }, [addProjectModal]);

  const getSubscriptions = async () => {
    const result = await api("get", `/licenses/${store.user._id}`);
    setMySubscription(store?.user?.subscriptions);
  };

  const getProjects = async () => {
    const result = await api("get", `/project/byArchitect/${store.user._id}`);
    const projects = result?.data?.project.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProjectData(projects);
  };

  const handleView = (id) => {
    history.push(`/projectview/${id}`);
  };

  const handleAddProjectModal = () => setAddProjectModal(!addProjectModal);

  return (
    <div className="projects-container">
      <Modal
        title={t("Add Project")}
        open={addProjectModal}
        onClose={handleAddProjectModal}
        component={
          <AddProjectModal handleAddProjectModal={handleAddProjectModal} />
        }
      />
      <Table
        headCells={ProjectheadCells}
        data={projectData}
        rows={projectHeadCells}
        handleView={handleView}
        headerText={`My Projects (${store?.user?.projects?.length}/${
          mySubscription?.projects ? mySubscription?.projects : 0
        })`}
        buttonText="New Projects"
        buttonAction={handleAddProjectModal}
      />
    </div>
  );
};

export default Index;
