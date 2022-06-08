// Init
import React, { useState, useEffect } from "react";
import { SubscriptionheadCells } from "../../utils/tableHeads";
import { MyProjectHeadCells } from "../../utils/tableHeads";
import { Store } from "../../StoreContext";
import api from "../../api";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../css/home.css";
import noSubcription from "../../assets/noSubcription.png";
import { UpdateStore } from "../../StoreContext";

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
  const updateStore = UpdateStore();
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
    SubscriptionheadCells.slice(0, SubscriptionheadCells.length - 1).map((cell) => array.push(cell.id));
    setSubscriptionHeadCells(array);
    let temp = [];
    MyProjectHeadCells.slice(0, MyProjectHeadCells.length).map((cell) => temp.push(cell.id));
    setProjectHeadCells(temp);
  }, []);

  useEffect(() => {
    getSubscriptions();
  }, [buySubModal, assignSubModal, buyProjectsModal, renewModal, addProjectModal]);

  useEffect(() => {
    getProjects();
  }, [addProjectModal]);

  const getSubscriptions = async () => {
    const result = await api("get", `/licenses/${store.user._id}`);
    let data = result.data.license.map((item) => {
      item.subType = "Prescripteur";
      return item;
    });
    setSubscriptionsData(data);
    setMySubscription(store?.user?.subscriptions);
  };

  const getProjects = async () => {
    const result = await api("get", `/project/byArchitect/${store.user._id}`);
    const projects = result?.data?.project.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  const handleNoSub = () => {
    localStorage.setItem("archId", store?.user._id);
    localStorage.setItem("step", 2);
    localStorage.removeItem("token");
    updateStore({ loggedIn: false, user: {} });
    history.push("/auth/register");
  };

  return mySubscription ? (
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
        component={<AssignSubscription assignSub={assignSub} handleAssignSubModal={handleAssignSubModal} />}
      />
      <Modal
        title={t("Buy Projects")}
        open={buyProjectsModal}
        onClose={handleBuyProjectsModals}
        component={<BuyProjects mySubscription={mySubscription} handleBuyProjectsModals={handleBuyProjectsModals} />}
      />
      <Modal
        title={t("Renew Subscription")}
        open={renewModal}
        onClose={handleRenewModalModal}
        component={<Renew mySubscription={mySubscription} handleRenewModalModal={handleRenewModalModal} />}
      />
      <Modal
        title={t("Add Project")}
        open={addProjectModal}
        onClose={handleAddProjectModal}
        component={<AddProjectModal handleAddProjectModal={handleAddProjectModal} />}
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
          <Table
            headCells={MyProjectHeadCells}
            data={
              projectHeadCells
                ? [
                    {
                      totalProjects: mySubscription?.projects > 0 ? mySubscription?.projects : 0,
                      inProgress: store?.user?.projects?.length > 0 ? store?.user?.projects?.length : 0,
                      remaining:
                        mySubscription?.projects - store?.user?.projects?.length > 0
                          ? mySubscription?.projects - store?.user?.projects?.length
                          : 0,
                    },
                  ]
                : []
            }
            noActions={true}
            noArrows={true}
            rows={projectHeadCells}
            headerText={t("Projects")}
            buttonText={t("Buy a project pack")}
            buttonAction={handleBuyProjectsModals}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="no-subscription">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img src={noSubcription} />
        <span className="no-subscription-text">
          {t("You have to complete your")} <br />
          {t("Sign up process first, to use this platform")}
        </span>
        <Button
          variant="contained"
          style={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 8,
            marginTop: 35,
          }}
          onClick={handleNoSub}
        >
          {t("Back to registration Process")}
        </Button>
      </div>
    </div>
  );
};

export default Home;
