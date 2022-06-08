import React, { useState, useEffect } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Line } from "react-chartjs-2";
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

function Joshua() {
  const [quadrabaseUserVists, setQuadrabaseUserVists] = useState([]);

  console.log(quadrabaseUserVists, "-quadrabaseUserVists");
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
  console.log(age, "-ages");
  useEffect(() => {
    setAge(10);
  }, []);
  useEffect(() => {
    QuadrabaseUserVistsMonth();
    QuadrabaseUserVists();
  }, [age]);

  const QuadrabaseUserVists = () => {
    if (age === 10) {
      const date = [];
      const visiting = [];

      axios
        .get(`http://localhost:5000/api/v1/Vists/days`)
        .then(function (response) {
          // setQuadrabaseUserVists(response.data.visits);
          response.data.visits.map((item) => {
            console.log(item, "--get");
            date.push(item._id);
            visiting.push(item.data);
          });
          console.log(date.sort());
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
        });
    }
  };
  // QuadrabaseUserVists();

  const QuadrabaseUserVistsMonth = () => {
    if (age === 21) {
      const date = [];
      const visiting = [];
      axios
        .get(`http://localhost:5000/api/v1/Vists/months`)
        .then(function (response) {
          // setQuadrabaseUserVists(response.data.visits);
          response.data.visits.map((item) => {
            console.log(item, "--get");
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
        });
    }
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 80 }}
        style={{ marginTop: "-40px", marginLeft: "80%" }}
      >
        {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
        <Select
          // labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // defaultValue={10}
          value={age}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={10}>Daily </MenuItem>
          <MenuItem value={21}>Monthly</MenuItem>
        </Select>
      </FormControl>
      <div className="App" style={{ width: "100%", padding: "14px" }}>
        <Line data={data}>Hello</Line>
      </div>
    </div>
  );
}

export default Joshua;
