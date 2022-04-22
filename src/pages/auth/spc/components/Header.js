// Init
import React from "react";
import Appbar from "../components/Appbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Quadralogo from "../assets/images/Quadralogo.svg";

import { useHistory } from "react-router-dom";

// Component
export default function Header(props) {
  const history = useHistory();

  const navToRegister = () => {
    // history.push("/auth/register");
    window.open("https://quadrabase-architect.web.app/register", "_blank");
  };

  return (
    <div className="spc_headerdiv">
      <Appbar logo={Quadralogo}></Appbar>

      <div className="spc_container">
        <Typography className="spc_Heroheading">
          Prescripteurs, gagnez <br />
          en productivité !
        </Typography>
        <Typography className="spc_Heropara">
          Maitres d’ouvrage, Maitre d'oeuvre, Architectes,
          <br />
          Bureaux d'études,Paysagistes-concepteurs,
          <br />
          Géomètres Experts
        </Typography>
        <div className="spc_btndiv">
          <Button
            className="spc_herobtn1"
            sx={{ marginRight: "1%" }}
            onClick={props.handleScroll}
          >
            En savoir plus
          </Button>
          <Button className="spc_herobtn2" onClick={navToRegister}>
            S'inscrire
          </Button>
        </div>
      </div>
    </div>
  );
}
