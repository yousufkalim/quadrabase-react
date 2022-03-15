import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

let mainData = [
  {
    title: "TP01-Travaux Preparatoires",
    avatartitle: "1",
  },
  {
    title: "TP02-Terrassements Generaux",
    avatartitle: "2",
  },
  {
    title: "TP03-Geosynthetiques-geomembranes",
    avatartitle: "3",
  },
  {
    title: "TP04-Chaussees",
    avatartitle: "4",
  },
  {
    title: "TP05-Voiries-Espaces Publics",
    avatartitle: "5",
  },
  {
    title: "TP06-Travaux De Maconneries - Soutenements",
    avatartitle: "6",
  },
  {
    title: "TP07-Reseaux Divers",
    avatartitle: "7",
  },
  {
    title: "TP08-Assainissements Eu-Ep",
    avatartitle: "8",
  },
  {
    title: "TP09-Alimentation Electrique - Eclairage",
    avatartitle: "9",
  },
  {
    title: "TP10-Telecom - Video Surveillance",
    avatartitle: "10",
  },
  {
    title: "TP11-Reseau Aep",
    avatartitle: "11",
  },
  {
    title: "TP12-Arrosage",
    avatartitle: "12",
  },
  {
    title: "TP13-Espaces Verts - Plantations",
    avatartitle: "13",
  },
  {
    title: "TP14-Clotures - Portails",
    avatartitle: "14",
  },
  {
    title: "TP15-Signalisation De Police",
    avatartitle: "15",
  },

  {
    title: "TP16-Signalisation Directionnelle",
    avatartitle: "16",
  },
  {
    title: "TP17-Signaletique Touristique Et Commerciale",
    avatartitle: "17",
  },
  {
    title: "TP18-Signalisation Horizontale",
    avatartitle: "18",
  },
  {
    title: "TP19-Dispositifs De Securite",
    avatartitle: "19",
  },
  {
    title: "TP20-Mobilier Urbain Metal",
    avatartitle: "20",
  },
  {
    title: "TP21-Mobilier Urbain Pierre/Beton/Plastique",
    avatartitle: "21",
  },
  {
    title: "TP22-Mobilier Exterieur Bois",
    avatartitle: "22",
  },
  {
    title: "TP23-Entretien Forestier & Elagage",
    avatartitle: "23",
  },
  {
    title: "TP24-Environnement & Collecte Des Dechets",
    avatartitle: "24",
  },
  {
    title: "TP25-Equipements Sportifs De Proximite",
    avatartitle: "25",
  },
  {
    title: "TP26-Espaces De Loisir - Aires De Jeux",
    avatartitle: "26",
  },
  {
    title: "TP27-Signalisation Lumineuse Tricolore",
    avatartitle: "27",
  },
  {
    title: "TP28-Ouvrages De Genie Civil",
    avatartitle: "28",
  },
  {
    title: "TP29-Genie Vegetal",
    avatartitle: "29",
  },
  {
    title: "TP30-Contrôle D'acces",
    avatartitle: "30",
  },
];

const CollapseFabricants = () => {
  return (
    <>
      <Grid container spacing={1}>
        {mainData.map((v) => (
          <Single {...v} />
        ))}
      </Grid>
    </>
  );
};

function Single(props) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(270deg)" : "rotate(360deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      sx={{ marginTop: "2%", display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: "80%",
          background: " #FFFFFF",
          boxShadow: " 0px 5px 19px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={` ${expanded ? "spc_active" : "spc_nonactive"}`}
            >
              {props.avatartitle}
            </Avatar>
          }
          action={
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          }
          title={<Typography className="spc_title">{props.title}</Typography>}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ background: "#F5F6F8", paddingLeft: "2%" }}>
            <Typography paragraph>
              <ul className="spc_list">
                <li>Batisec Sas</li>
                <li>Cbs Btp</li>
                <li>Cisabac</li>
                <li>Echamat Kernst</li>
                <li>Fornells</li>
                <li>Heras Sarl</li>
                <li>Kromm </li>
              </ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default CollapseFabricants;
