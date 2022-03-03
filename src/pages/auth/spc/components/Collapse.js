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

const CollapseData = () => {
  let data = [
    {
      title: "Structure de la base de données",
      avatartitle: "1",
    },
    {
      title: "Connexion à l'application Quadrabase",
      avatartitle: "2",
    },
    {
      title: "Créer et gérer un Projet",
      avatartitle: "3",
    },
    {
      title: "Comprendre la page Projet",
      avatartitle: "4",
    },
    {
      title: "Création de l'Estimation d'un Projet",
      avatartitle: "5",
    },
    {
      title: "Génération des documents",
      avatartitle: "6",
    },
    {
      title:
        "Consultation des textes liés aux différents niveaux (Bibliothèques, Ouvrages).",
      avatartitle: "7",
    },
    {
      title: "Consultation des sites des Fabricants liés aux ouvrages",
      avatartitle: "8",
    },
    {
      title: "Création d'un ouvrage spécifique au Projet",
      avatartitle: "9",
    },
  ];
  return (
    <>
      <Grid container spacing={1}>
        {data.map((v) => (
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
      sx={12}
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
            <Typography paragraph className="spc_head">
              Quadrabase s'appuie sur un ensemble de bibliothèques comprenant
              plus de 40'000 ouvrages, prestations et produits dont les mises à
              jour sont faites régulièrement.
            </Typography>
            <Typography>1.1 Organisation des données</Typography>
            <Typography paragraph>
              <ul className="spc_list">
                <li>Niveau 1 : Famille (Travaux Publics, Bâtiments, …)</li>
                <li>
                  Niveau 2 : Bibliothèques d’ouvrages (regroupées par secteurs
                  d’activités)
                </li>
                <li>
                  Niveau 3 : Catégories d’ouvrages (dans une même bibliothèque)
                </li>
                <li>Niveau 4 : Ouvrages (Ouvrages/Prestations/Produits)</li>
                <li>
                  Niveau 5 : Détails d’Ouvrages (rattaché directement à
                  l’ouvrage)
                </li>
              </ul>
            </Typography>
            <Typography>Exemple :</Typography>
            <Typography paragraph>
              <ul className="spc_list">
                <li>Niveau 1 Famille : TRAVAUX PUBICS</li>
                <li>Niveau 2 Bibliothèque : TERRASSEMENTS</li>
                <li>Niveau 3 Catégorie 1 : Travaux préparatoires</li>
                <li>Niveau 4 Ouvrages 1.1 : Installation de chantier</li>
                <li>Niveau 5 Détail d’Ouvrage 1.2.1 : Panneau gamme petite</li>
              </ul>
            </Typography>
            <Typography>
              1.2 Documents associés aux différents Niveaux
            </Typography>
            <Typography className="spc_head">
              Le tableau, ci-dessous, précise la ventilation des documents qui
              sont attachés aux différents niveaux.
            </Typography>
            <Typography>1.3 Détail du CCTP</Typography>
            <Typography className="spc_head">
              Le Cahier des Clauses Techniques Particulières (CCTP) est composé
              de 5 chapitres :
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default CollapseData;
