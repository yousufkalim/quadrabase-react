import React, { useState, useEffect } from "react";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import Grid from "@mui/material/Grid";
import axios from "axios";

import Banner from "../../components/Banner";
import "../../css/dashboard.css";
import CustomChart from "../../containers/CustomChart";

function Dashboard(props) {
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

  const QuadrabaseUser = () => {
    axios
      .get(`http://localhost:5000/api/v1/Dashboard/QuadrabaseUsers`)
      .then(function (response) {
        setQuadrabaseUsers(response.data.numberofusers);
        console.log(response, "--get");
      });
  };

  const NumberofRegistered = () => {
    axios
      .get(`http://localhost:5000/api/v1/Dashboard/NumberofRegistered`)
      .then(function (response) {
        setNumberofRegistered(response.data.NumberofRegistered);
      });
  };

  const Numberofsubscriber = () => {
    axios
      .get(`http://localhost:5000/api/v1/Dashboard/numberofsubscriber`)
      .then(function (response) {
        setNumberofsubscriber(response.data.numberofsubscriber);
      });
  };

  const ProjectInProgress = () => {
    axios
      .get(`http://localhost:5000/api/v1/Dashboard/ProjectsinProgress`)
      .then(function (response) {
        setProjectInProgress(response.data.ProjectsTop);
      });
  };

  console.log(projectInProgress, "-projectInProgress");
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
                <h3 className="cardh3">Quadrabase User</h3>
                <hr className="linhr" />
                <h1 className="cardh1">{quadrabaseUsers}</h1>
                <p className="cardP">New Customers</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">Number of Registered</h3>
                <hr className="linhr" />
                <h1 className="cardh1">{numberofRegistered}</h1>
                <p className="cardP">New Registrations</p>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">Number of Subscribers</h3>

                <hr className="linhr" />
                <h1 className="cardh1">{numberofsubscriber}</h1>
                <p className="cardP"> New Subscribers</p>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={8}>
              <div className="cardDiv">
                <h3 className="cardh3">Number of Vists </h3>
                <CustomChart />
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <div className="cardDiv">
                <h3 className="cardh3">Project inProgress</h3>

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
