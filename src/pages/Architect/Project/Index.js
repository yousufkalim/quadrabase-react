import React, { useState, useEffect } from 'react';
import Table from '../../../components/Architect/Tabel';
import Modal from '../../../components/Architect/Modal';
import AddProjectModal from './AddProjectModal';
import StatusUpdate from './Modals/StatusUpdate';
import { ProjectheadCells } from '../../../utils/tableHeads';
import api from '../../../api';
import { Store } from '../../../StoreContext';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import DeleteModal from '../../../components/Architect/DeleteModal';
import '../../../css/projects.css';

const Index = () => {
  const { t } = useTranslation();
  const store = Store();
  const history = useHistory();
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [selectedProject, setSelectedProject] = useState({});
  const [projectData, setProjectData] = useState([]);
  const [projectHeadCells, setProjectHeadCells] = useState('');
  const [mySubscription, setMySubscription] = useState({});

  useEffect(() => {
    let temp = [];
    ProjectheadCells.slice(0, ProjectheadCells.length - 1).map(cell => temp.push(cell.id));
    setProjectHeadCells(temp);
  }, []);

  useEffect(() => {
    getProjects();
  }, [addProjectModal, openStatusModal]);

  useEffect(() => {
    getSubscriptions();
  }, [addProjectModal]);

  const getSubscriptions = async () => {
    const result = await api('get', `/licenses/${store.user._id}`);
    setMySubscription(store?.user?.subscriptions);
  };

  const getProjects = async () => {
    const result = await api('get', `/project/byArchitect/${store.user._id}`);
    const projects = result?.data?.project.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    console.log('projects', projects);
    setProjectData(projects);
  };

  const handleDeleteProject = async () => {
    await api('delete', `/project/${deleteId}`);
    getProjects();
    handleDeleteProjectModal();
  };

  const handleView = id => {
    history.push(`/projectview/${id}`);
  };

  const handleAddProjectModal = () => setAddProjectModal(!addProjectModal);
  const handleDeleteProjectModal = id => {
    if (id) {
      setDeleteId(id);
    }
    setOpenDeleteModal(!openDeleteModal);
  };
  const handleOpenStatusModal = item => {
    if (item) setSelectedProject(item);
    setOpenStatusModal(!openStatusModal);
  };

  return (
    <div className="projects-container">
      <Modal
        title={t('Add Project')}
        open={addProjectModal}
        onClose={handleAddProjectModal}
        component={<AddProjectModal handleAddProjectModal={handleAddProjectModal} />}
      />
      <Modal
        title={t('Update Status')}
        open={openStatusModal}
        onClose={handleOpenStatusModal}
        component={
          <StatusUpdate
            selectedProject={selectedProject}
            handleOpenStatusModal={handleOpenStatusModal}
          />
        }
      />
      <Modal
        open={openDeleteModal}
        onClose={handleDeleteProjectModal}
        component={
          <DeleteModal handleCancel={handleDeleteProjectModal} handleDelete={handleDeleteProject} />
        }
      />

      <Table
        headCells={ProjectheadCells}
        data={projectData}
        rows={projectHeadCells}
        handleView={handleView}
        headerText={`${t('My Projects')} (${store?.user?.projects?.length}/${
          mySubscription?.projects ? mySubscription?.projects : 0
        })`}
        type="project"
        buttonText={t('New Project')}
        buttonAction={handleAddProjectModal}
        handleOpenStatusModal={handleOpenStatusModal}
        handleDeleteProjectModal={handleDeleteProjectModal}
      />
    </div>
  );
};

export default Index;
