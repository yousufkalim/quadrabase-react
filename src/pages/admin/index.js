import React, { useState, useEffect } from "react";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import Grid from "@mui/material/Grid";
import axios from "axios";
import api from "../../api";
import Banner from "../../components/Banner";
import "../../css/dashboard.css";
import CustomChart from "../../components/CustomChart";
import { useTranslation } from "react-i18next";

function Dashboard(props) {
  const { t } = useTranslation();
  const [quadrabaseUsers, setQuadrabaseUsers] = useState(0);
  const [numberofRegistered, setNumberofRegistered] = useState(0);
  const [numberofsubscriber, setNumberofsubscriber] = useState(0);
  const [projectInProgress, setProjectInProgress] = useState();

  const [count, setCount] = useState(0);
  var visitCount = localStorage.getItem("page_view");
  useEffect(() => {
    QuadrabaseUser();
    NumberofRegistered();
    Numberofsubscriber();
    ProjectInProgress();
  }, []);

  const QuadrabaseUser = async () => {
    const result = await api("get", `/Dashboard/QuadrabaseUsers`);
    setQuadrabaseUsers(result.data.numberofusers);
  };

  const NumberofRegistered = async () => {
    const result = await api("get", `/Dashboard/NumberofRegistered`);
    setNumberofRegistered(result.data.NumberofRegistered);
  };

  const Numberofsubscriber = async () => {
    const result = await api("get", `/Dashboard/numberofsubscriber`);
    setNumberofsubscriber(result.data.numberofsubscriber);
  };

  const ProjectInProgress = async () => {
    const result = await api("get", `/Dashboard/ProjectsinProgress`);
    setProjectInProgress(result.data.ProjectsTop);
  };

  console.log(quadrabaseUsers, "-quadrabaseUsers");

  return (
    <div>
      {/* Content area */}
      <main className="dashboard-main">
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          {/* Welcome banner */}
          <WelcomeBanner {...props} />

          {/* Dashboard actions */}
        </div>
        <main className="dashboard_second">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">{t("Number of Administrators")}</h3>
                <hr className="linhr" />
                <h1 className="cardh1">{quadrabaseUsers}</h1>
                <p className="cardP">{t("Administrators ")}</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3"> {t("Number of Architects")}</h3>
                <hr className="linhr" />
                <h1 className="cardh1">{numberofRegistered}</h1>
                <p className="cardP"> {t("Architects")}</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">{t("Number of Providers")}</h3>

                <hr className="linhr" />
                <h1 className="cardh1">{numberofsubscriber}</h1>
                <p className="cardP"> {t("Providers")}</p>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={8}>
              <div className="cardDiv">
                <h3 className="cardh3">{t("Number of Vists")} </h3>
                <CustomChart />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">{t("Project in Progress")}</h3>

                <hr className="linhr" />

                <div className="progress_div-main">
                  {projectInProgress?.map((obj, index) => {
                    return <div className="progress_div">{obj.name}</div>;
                  })}
                </div>
              </div>
            </Grid>
          </Grid>
        </main>
      </main>
      <Banner />
    </div>
  );
}

export default Dashboard;
