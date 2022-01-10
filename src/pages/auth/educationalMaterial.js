import React from "react";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapsible from "../../components/Collapsible/index";
import xyz from '../../images/784.jpg';

const primaryCol = "#F96B05";

const EducationMaterialsListItem = Collapsible;

function FirstExpandComponent(){

  const x = [
    "Niveau 1 : Famille (Travaux Publics, Bâtiments, …)",
    "Niveau 2 : Bibliothèques d’ouvrages (regroupées par secteurs d’activités)",
    "Niveau 3 : Catégories d’ouvrages (dans une même bibliothèque)",
    "Niveau 4 : Ouvrages (Ouvrages/Prestations/Produits)",
    "Niveau 5 : Détails d’Ouvrages (rattaché directement à l’ouvrage)"
  ];

  const y = [
    "Niveau 1 Famille : TRAVAUX PUBICS",
    "Niveau 2 Bibliothèque : TERRASSEMENTS",
    "Niveau 3 Catégorie 1 : Travaux préparatoires",
    "Niveau 4 Ouvrages 1.1 : Installation de chantier",
    "Niveau 4 Ouvrages 1.2 : Signalisation de chantier",
    "Niveau 5 Détail d’Ouvrage 1.2.1 : Panneau gamme petite",
    "Niveau 5 Détail d’ouvrage 1.2.2 : Panneau gamme normale"
  ];

  return (
    <>
      <div style={{marginLeft: "38px"}}>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px" }}
        >
          Quadrabase s'appuie sur un ensemble de bibliothèques comprenant plus de 40'000 ouvrages, prestations et produits dont les mises à jour sont faites régulièrement.
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 400, fontSize: 16, paddingTop: "10px", color: primaryCol }}
        >
          1.1 Organisation des données 
        </Typography>
        <List dense={true} >
          {
            x.map((e) => (
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{height: "7px", width: "7px"}} />
                </ListItemIcon>
                <ListItemText
                  primary={e}
                />
              </ListItem>
            ))
          }
        </List>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
        >
          Exemple :
        </Typography>
        <List dense={true} >
          {
            y.map((e) => (
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon sx={{height: "7px", width: "7px"}} />
                </ListItemIcon>
                <ListItemText
                  primary={e}
                />
              </ListItem>
            ))
          }
        </List>
        <Typography
          align="left"
          sx={{ fontWeight: 400, fontSize: 16, paddingTop: "10px", color: primaryCol }}
        >
          1.2 Documents associés aux différents Niveaux
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px" }}
        >
          Le tableau, ci-dessous, précise la ventilation des documents qui sont attachés aux différents niveaux.
        </Typography>
        <img src={xyz} style={{ heigth: "30vh", objectFit: "cover" }} />
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 11, paddingTop: "2px", fontStyle: "italic"}}
        >
          *A chaque Ouvrages/Prestations/Produits, on peut associer le logo d’un ou plusieurs fabricants avec un lien hypertexte vers leur site web.
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 400, fontSize: 16, paddingTop: "10px", color: primaryCol }}
        >
          1.3 Détail du CCTP
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px" }}
        >
          Le Cahier des Clauses Techniques Particulières (CCTP) est composé de 5 chapitres :
        </Typography>
        <div style={{marginLeft: "10px", marginRight: "10px"}}>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 0 – Clauses Générales (communes à tous les lots)
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Ce chapitre est traité séparément.
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            La partie 1 – Description du marché - est constituée des informations saisies lors de la création du Projet (Nom et Objet du Projet, liste des Intervenants, type de marché)
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            La partie 2 – Spécifications communes - est un document type sélectionné lors de la création du Projet et proposé au Prescripteur qui pourra le compléter et l’adapter aux spécificités du projet
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 1 – Documents de référence contractuels
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Sont repris dans ce chapitre les documents réglementaires et techniques de portées contractuelles applicables au secteur d’activité concerné.
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 2 – Provenances et spécifications des matériaux
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Sont repris dans ce chapitre les références normatives et techniques applicables aux produits et fournitures du secteur concerné.
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 3 – Mode d’exécution des travaux
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Sont repris dans ce chapitre les textes précisant les modalités particulières de réalisation des travaux.
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 4 – Essais – Contrôles – Réception
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Sont repris dans ce chapitre les textes précisant les modalités particulières de réalisation des essais, de contrôles et de réception.
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 300, fontSize: 13, paddingTop: "10px", color: primaryCol }}
          >
            Chapitre 5 – Localisation des ouvrages
          </Typography>
          <Typography
            align="left"
            sx={{ fontWeight: 200, fontSize: 12, paddingTop: "10px" }}
          >
            Ce chapitre n’est utilisé que pour un projet de Bâtiment avec l’option DPGF pour préciser les lieux d’exécution des travaux.
          </Typography>
        </div>
      </div>
    </>
  );

}

function EducationMaterialsList(){

  return (
    <>
      <Typography
        align="left"
        sx={{ fontWeight: 600, fontSize: 14, paddingTop: "20px" }}
      >
        LES SUPPORTS PEDAGOGIQUES ...
      </Typography>
      <div style={{ marginTop: "10px" }}>
        <EducationMaterialsListItem text="1. Structure de la base de données" expandComponent={<FirstExpandComponent />} />
        <EducationMaterialsListItem text="2. Connexion à l'application Quadrabase" expandComponent={<FirstExpandComponent />} />
        <EducationMaterialsListItem text="3. Créer et gérer un Projet" expandComponent={<FirstExpandComponent />} />
        <EducationMaterialsListItem text={`4. Comprendre la page \"Projet\"`} expandComponent={<FirstExpandComponent />} />
        <EducationMaterialsListItem text="5. Création de l'Estimation d'un Projet" expandComponent={<FirstExpandComponent />} />
      </div>
    </>
  );

}

function EducationMaterials(){

  return (
    <>
      <EducationMaterialsList />
      <div style={{marginTop: "50px"}} />
    </>
  );

}

export default function EducationMaterial(){

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFFFFF"
        }}
      >
        <EducationMaterials />
      </Container>
    </>
  );

}