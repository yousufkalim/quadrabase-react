import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Line } from "react-chartjs-2";
import api from "../api";
import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

function CustomChart() {
  const { t } = useTranslation();
  const [quadrabaseUserVists, setQuadrabaseUserVists] = useState([]);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "#c7d2fe",
        borderColor: "#037BCB",
        tension: 0.4,
        fill: true,
        pointStyle: "rect",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        showLine: true,
      },
    ],
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    setAge(10);
  }, []);
  useEffect(() => {
    QuadrabaseUserVistsMonth();
    QuadrabaseUserVists();
  }, [age]);

  const QuadrabaseUserVists = async () => {
    if (age === 10) {
      const date = [];
      const visiting = [];

      const result = await api("get", `/Vists/days`);
      result.data.visits.map((item) => {
        date.push(item._id);
        visiting.push(item.data);
      });
      setData({
        labels: date.sort(),
        datasets: [
          {
            label: "",
            data: visiting,
            backgroundColor: "#c7d2fe",
            borderColor: "#037BCB",
            tension: 0.4,
            fill: true,
            pointStyle: "rect",
            pointBorderColor: "blue",
            pointBackgroundColor: "#fff",
            showLine: true,
          },
        ],
      });
    }
  };

  const QuadrabaseUserVistsMonth = async () => {
    if (age === 21) {
      const date = [];
      const visiting = [];
      const result = await api("get", `/Vists/months`);
      result.data.visits.map((item) => {
        date.push(item._id);
        visiting.push(item.data);
      });

      setData({
        labels: date.sort(),
        datasets: [
          {
            label: "",
            data: visiting,
            backgroundColor: "#c7d2fe",
            borderColor: "#037BCB",
            tension: 0.4,
            fill: true,
            pointStyle: "rect",
            pointBorderColor: "blue",
            pointBackgroundColor: "#fff",
            showLine: true,
          },
        ],
      });
    }
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 80 }}
        style={{ marginTop: "-40px", marginLeft: "80%" }}
      >
        <Select
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={10}>{t("Week")} </MenuItem>
          <MenuItem value={21}>{t("Month")}</MenuItem>
        </Select>
      </FormControl>
      <div className="App" style={{ width: "100%", padding: "14px" }}>
        <Line data={data}>Hello</Line>
      </div>
    </div>
  );
}

export default CustomChart;
