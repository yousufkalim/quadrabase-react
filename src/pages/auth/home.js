// Init
import React from "react";
import { useRef } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Services from "./spc/components/Services";
import Icon1 from "./spc/assets/images/icon1.svg";
import Icon2 from "./spc/assets/images/icon2.svg";
import Icon3 from "./spc/assets/images/icon3.svg";
import Icon4 from "./spc/assets/images/icon4.svg";
import Icon5 from "./spc/assets/images/icon5.svg";
import Icon6 from "./spc/assets/images/icon6.svg";
import Icon7 from "./spc/assets/images/icon7.svg";
import Icon8 from "./spc/assets/images/icon8.svg";
import Icon9 from "./spc/assets/images/icon9.svg";
import Icon10 from "./spc/assets/images/icon10.svg";
import Arrow from "./spc/assets/images/arrow.svg";
import Footerimg from "./spc/assets/images/footerimg.svg";

// Importing Components
import Header from "../../pages/auth/spc/components/Header";

// Home Component
export default function Home() {
  const [index, setIndex] = React.useState(0);
  const handleChange = (newValue) => {
    setIndex(newValue);
  };

  const navToRegister = () => {
    // history.push("/auth/register");
    window.open("https://quadrabase-architect.web.app/signup", "_blank");
  };
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  let data = [
    {
      icon: Icon1,
      heading: "Gain de temps en conception",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
    {
      icon: Icon2,
      heading: "Textes prérédigés à forte valeur ajoutée",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
    {
      icon: Icon3,
      heading: "Adaptation des textes suivant les spécificités ",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
    {
      icon: Icon4,
      heading: "Génération automatique des documents",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
    {
      icon: Icon5,
      heading: "Sélection de fabricants avec lien vers leur site",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
    {
      icon: Icon6,
      heading: "Prix très compétitifs",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce varius justo et scelerisque varius. Nullam mollis augue et facilisis blandit. Morbi sollicitudin",
    },
  ];
  let cardData = [
    {
      icon: Icon7,
      heading: "ESTIMATION",
      text: "Ce document n'est pas diffusé.Le montant total de l'estimation financière résulte de.",
      button: "Read more",
    },
    {
      icon: Icon8,
      heading: "DQE",
      text: "Le Détail Quantitatif et Estimatif (DQE) est le document, en principe non contractuel.",
      button: "Read more",
    },
    {
      icon: Icon9,
      heading: "BPU",
      text: "Le Bordereau des Prix Unitaire (BPU) est le document contractuel destiné à.",
      button: "Read more",
    },
    {
      icon: Icon10,
      heading: "CCTP",
      text: "Le Cahier des Clauses Techniques Particulières (CCTP) est le document.",
      button: "Read more",
    },
  ];
  return (
    <>
      <Header handleScroll={executeScroll} />
      <div ref={myRef} className="scroll">
        <div className="spc_home_heading">
          <Typography className="spc_home_heading_typo">
            Intérêt pour le prescripteur
          </Typography>
        </div>

        <Grid container spacing={1} className="spc_grid">
          {data.map((items) => (
            <>
              <Grid xs={12} sm={12} md={4} className="spc_homegrid">
                <img src={items.icon}></img>
                <Typography
                  className="spc_grid_heading"
                  style={{ paddingTop: "6%", paddingBottom: "8%" }}
                >
                  {items.heading}
                </Typography>
                <Typography className="spc_grid_para">{items.text}</Typography>
              </Grid>
            </>
          ))}
        </Grid>
        <div className="spc_btn_div">
          <Button className="spc_home_btn" onClick={navToRegister}>
            S'inscrire
          </Button>
        </div>
        <Divider
          variant="middle"
          sx={{ background: "#DCD6D1", margin: "0 10% 0 10%" }}
        />
      </div>
      <div>
        <div className="spc_home_heading">
          <Typography className="spc_home_heading_typo">
            Les documents produits
          </Typography>
        </div>
        <Grid container spacing={1} className="spc_grid_btm">
          {cardData.map((items) => (
            <>
              <Grid xs={12} sm={12} md={2.5} className="spc_home_bottom_gird">
                <img src={items.icon} style={{ marginBottom: "10%" }}></img>
                <Typography
                  className="spc_grid_heading"
                  sx={{ paddingBottom: "5%" }}
                >
                  {items.heading}
                </Typography>
                <Divider
                  variant="middle"
                  sx={{
                    background: "#F76820",
                    borderWidth: "3px",
                    width: "35%",
                    borderRadius: "20px",
                    marginBottom: "10%",
                  }}
                />
                <Typography
                  className="spc_grid_para"
                  sx={{ paddingBottom: "5%" }}
                >
                  {items.text}
                </Typography>
                <div className="spc_readmorediv">
                  <Typography
                    className="spc_readmore"
                    sx={{ paddingBottom: "5%" }}
                  >
                    {items.button}
                  </Typography>
                  <div>
                    <img src={Arrow} className="spc_arrow_"></img>
                  </div>
                </div>
              </Grid>
            </>
          ))}
        </Grid>
      </div>
      <div className="spc_servicesdiv">
        <div>
          <Typography className="spc_carouselheading">
            Les secteurs d'activités
          </Typography>
        </div>
        <Services />
      </div>
      <div>
        <div
          className="spc_"
          index={index}
          style={{
            display: "flex",

            /* justify-content: space-evenly; */
            padding: "0 7% 0 7%",
          }}
        >
          <Button
            className={`${index == "0" ? "spc_home_btn" : "spc_footer_btn"}`}
            onClick={() => handleChange(0)}
          >
            Les fonctionnalités
          </Button>
          <div className="spc_divider"></div>
          <Button
            className={`${index == "1" ? "spc_home_btn" : "spc_footer_btn"}`}
            onClick={() => handleChange(1)}
            sx={{ marginLeft: "1%" }}
          >
            Les fonctionnalités
          </Button>
          <div className="spc_divider"></div>
          <Button
            className={`${index == "2" ? "spc_home_btn" : "spc_footer_btn"}`}
            onClick={() => handleChange(2)}
            sx={{ marginLeft: "1%" }}
          >
            Les fonctionnalités
          </Button>
        </div>
        <div style={{ paddingLeft: "6%" }}>
          <Divider
            variant="middle"
            sx={{
              background: "#DBDBDB",
              borderWidth: "1px",
              width: "45% !Important",
              borderRadius: "20px",
              marginTop: "1% !Important",
              marginBottom: "2%",
            }}
          />
        </div>
        <Grid container spacing={1} sx={{ padding: "0 8% 0 8%" }}>
          <Grid xs={12} sm={12} md={6}>
            <img
              src={Footerimg}
              style={{ width: "100%" }}
              className="spc_footer_img"
            ></img>
          </Grid>
          <Grid xs={12} sm={12} md={5} className="spc_fottergrid">
            <Typography
              className="spc_footertypo"
              style={{ paddingBottom: "5%" }}
            >
              Création et gestion
              <br /> des projets
            </Typography>
            <Typography className="spc_footerpara">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
              fusce varius <br /> justo et scelerisque varius nullam mollis
            </Typography>
            <div className="spc_readmorediv" style={{ paddingTop: "5%" }}>
              <Typography className="spc_readmore" sx={{ paddingRight: "2%" }}>
                Read more
              </Typography>
              <div style={{ paddingLeft: "3% !important" }}>
                <img src={Arrow}></img>
              </div>
            </div>
          </Grid>
          <div className="spc_bottomborder">
            <div className="spc_border"></div>
            <div className="spc_border2"></div>
          </div>
        </Grid>
      </div>
    </>
  );
}
