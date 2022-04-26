// Init
import React, { useState, useEffect } from "react";
import { SubscriptionheadCells } from "../../utils/tableHeads";
import { ProjectheadCells } from "../../utils/tableHeads";
import { Store } from "../../StoreContext";
import api from "../../api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "../../css/home.css";

// Importing Components
import { Button } from "@mui/material";
import Table from "../../components/Architect/Tabel";
import Modal from "../../components/Architect/Modal";
import BuySubscription from "./Subscription/BuySubscription";
import AssignSubscription from "./Subscription/AssignSubscription";
import BuyProjects from "./Subscription/BuyProjects";
import Renew from "./Subscription/Renew";
import AddProjectModal from "./Project/AddProjectModal";

const Home = () => {
  const { t } = useTranslation();
  const store = Store();
  const history = useHistory();
  // states
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [mySubscription, setMySubscription] = useState({});
  const [subscriptionHeadCells, setSubscriptionHeadCells] = useState("");
  const [projectHeadCells, setProjectHeadCells] = useState("");
  const [buySubModal, setBuySubModal] = useState(false);
  const [assignSubModal, setAssignSubModal] = useState(false);
  const [buyProjectsModal, setBuyProjectsModal] = useState(false);
  const [renewModal, setRenewModal] = useState(false);
  const [assignSub, setAssignSub] = useState({
    id: "",
    email: "",
  });
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    let array = [];
    SubscriptionheadCells.slice(0, SubscriptionheadCells.length - 1).map(
      (cell) => array.push(cell.id)
    );
    setSubscriptionHeadCells(array);
    let temp = [];
    ProjectheadCells.slice(0, ProjectheadCells.length - 1).map((cell) =>
      temp.push(cell.id)
    );
    setProjectHeadCells(temp);
  }, []);

  useEffect(() => {
    getSubscriptions();
  }, [
    buySubModal,
    assignSubModal,
    buyProjectsModal,
    renewModal,
    addProjectModal,
  ]);

  useEffect(() => {
    getProjects();
  }, [addProjectModal]);

  const getSubscriptions = async () => {
    const result = await api("get", `/licenses/${store.user._id}`);
    setSubscriptionsData(result.data.license);
    setMySubscription(store?.user?.subscriptions);
  };

  const getProjects = async () => {
    const result = await api("get", `/project/byArchitect/${store.user._id}`);
    const projects = result?.data?.project.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setProjectData(projects);
  };

  const handleAssignSubModal = (id, email) => {
    if (id && email) {
      setAssignSub({ id, email });
    } else if (id) {
      setAssignSub({ id });
    }
    setAssignSubModal(!assignSubModal);
  };

  const handleView = (id) => {
    history.push(`/projectview/${id}`);
  };

  const handleBuySubModal = () => setBuySubModal(!buySubModal);
  const handleBuyProjectsModals = () => setBuyProjectsModal(!buyProjectsModal);
  const handleRenewModalModal = () => setRenewModal(!renewModal);
  const handleAddProjectModal = () => setAddProjectModal(!addProjectModal);

  return (
    <div className="home-container">
      <Modal
        title={t("Buy Subscription")}
        open={buySubModal}
        onClose={handleBuySubModal}
        component={<BuySubscription handleBuySubModal={handleBuySubModal} />}
      />
      <Modal
        title={t("Assign Subscription")}
        open={assignSubModal}
        onClose={handleAssignSubModal}
        component={
          <AssignSubscription
            assignSub={assignSub}
            handleAssignSubModal={handleAssignSubModal}
          />
        }
      />
      <Modal
        title={t("Buy Projects")}
        open={buyProjectsModal}
        onClose={handleBuyProjectsModals}
        component={
          <BuyProjects
            mySubscription={mySubscription}
            handleBuyProjectsModals={handleBuyProjectsModals}
          />
        }
      />
      <Modal
        title={t("Renew Subscription")}
        open={renewModal}
        onClose={handleRenewModalModal}
        component={
          <Renew
            mySubscription={mySubscription}
            handleRenewModalModal={handleRenewModalModal}
          />
        }
      />
      <Modal
        title={t("Add Project")}
        open={addProjectModal}
        onClose={handleAddProjectModal}
        component={
          <AddProjectModal handleAddProjectModal={handleAddProjectModal} />
        }
      />
      <div className="home-upper-container">
        <div className="home-left-container">
          <Table
            headCells={SubscriptionheadCells}
            data={subscriptionsData}
            rows={subscriptionHeadCells}
            handleAssign={handleAssignSubModal}
            headerText={t("Subscriptions")}
            buttonText={t("Buy Subscriptions")}
            buttonAction={handleBuySubModal}
          />
        </div>
        <div className="home-right-container">
          <div style={{ fontSize: 20, padding: "9px 20px" }}>
            {t("My Subscription")}
          </div>
          <div
            style={{ height: 2, width: "100%", backgroundColor: "lightgray" }}
          ></div>
          <div style={{ fontSize: 16, padding: "16px 20px", fontWeight: 600 }}>
            {t("Remaning Projects")}
          </div>
          <div style={{ fontSize: 36, padding: "10px 20px", fontWeight: 600 }}>
            {mySubscription?.projects - store?.user?.projects?.length}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "right",
              padding: "12px 20px",
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 2,
                whiteSpace: "nowrap",
                ":hover": {
                  backgroundColor: "#8C1244",
                },
              }}
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleBuyProjectsModals}
            >
              {t("Buy Projects")}
            </Button>
          </div>
          <div
            style={{ height: 2, width: "100%", backgroundColor: "lightgray" }}
          ></div>
          <div style={{ fontSize: 16, padding: "16px 20px", fontWeight: 600 }}>
            {t("Valid Until")}
          </div>
          <div style={{ fontSize: 30, padding: "5px 20px", fontWeight: 600 }}>
            {moment(mySubscription?.end_date).format("DD MMMM, YYYY")}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "right",
              padding: "15px 20px",
              marginBottom: 10,
            }}
          >
            <Button
              variant="contained"
              onClick={handleRenewModalModal}
              sx={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 2,
                whiteSpace: "nowrap",
                ":hover": {
                  backgroundColor: "#8C1244",
                },
              }}
              startIcon={<AutorenewIcon />}
            >
              {t("Renew")}
            </Button>
          </div>
        </div>
      </div>
      <Table
        headCells={ProjectheadCells}
        data={projectData}
        rows={projectHeadCells}
        handleView={handleView}
        headerText={`${t("My Projects")} (${store?.user?.projects?.length}/${
          mySubscription?.projects ? mySubscription?.projects : 0
        })`}
        buttonText={t("New Projects")}
        buttonAction={handleAddProjectModal}
      />
    </div>
  );
};

export default Home;
