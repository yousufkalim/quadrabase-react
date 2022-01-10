import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapsible from "../../components/Collapsible/index";

const primaryCol = "#F96B05";

function GainInProductivityListItem(props){
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: "-8px"
      }}>
        <ChevronRightIcon sx={{marginLeft: 0, paddingLeft: 0}}/>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13 }}
        >
          {props.text}
        </Typography>
      </div>
    </>
  );
}

function GainInProductivityMain(){
  return (
    <>
      <Typography
        align="left"
        sx={{ fontWeight: 500, fontSize: 18, color: primaryCol }}
      >
        GAGNEZ EN PRODUCTIVITE ...
      </Typography>
      <Typography
        align="left"
        sx={{ fontWeight: 200, fontSize: 14 }}
      >
        Quadrabase est une application métier visant à produire automatiquement les pièces écrites techniques des dossiers de consultation des entreprises (DCE)
      </Typography>
      <Typography
        align="left"
        sx={{ fontWeight: 200, fontSize: 15, color: primaryCol }}
      >
        Intérêt pour le prescripteur :
      </Typography>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <GainInProductivityListItem text=" Gain de temps en conception" />
        <GainInProductivityListItem text=" Textes prérédigés à forte valeur ajoutée" />
        <GainInProductivityListItem text=" Adaptation des textes suivant les spécificités du projet" />
        <GainInProductivityListItem text=" Génération automatique des documents" />
        <GainInProductivityListItem text=" Sélection de fabricants avec lien vers leur site internet" />
        <GainInProductivityListItem text="  Prix très compétitifs" /> 
      </div>
    </>
  );
}

function GainInProductivityImage(){
  return (
    <>
      <Paper variant="outlined">
          <img src="https://www.quadrabase.fr/Portals/0/BlockBuilderImages/439/Ecran_QB_01.JPG" style={{ heigth: "30vh", objectFit: "cover" }} />
      </Paper>
    </>
  );
}

function HeadText(){
  return (
    <>
      <Typography
        align="center"
        sx={{ fontWeight: 600, marginTop: "20px" }}
      >
        Maitres d’ouvrage, Maitre d'oeuvre, Architectes, Bureaux d'études
      </Typography>
      <Typography
        align="center"
        sx={{ fontWeight: 600, marginTop: "10px" }}
      >
        Paysagistes-concepteurs, Géomètres Experts, ...
      </Typography>
      <Typography
        align="center"
        sx={{ fontWeight: 800, marginTop: "30px", color: primaryCol }}
      >
        pour vos marchés de travaux ...
      </Typography>
    </>
  );
}

function HeadList(){
  return (
    <>
      <Grid container spacing={2} sx={{marginTop: "40px"}}>
        <Grid item xs={12} md={6}>
          <GainInProductivityMain />
        </Grid>
        <Grid item xs={12} md={6}>
          <GainInProductivityImage />
        </Grid>
      </Grid>
    </>
  );
}

function DocumentsProducedListItem(props){

  const {title, imageURL, description} = props;

  return (
    <>
      <Typography
        align="left"
        sx={{ fontWeight: 200, fontSize: 14, color: primaryCol }}
      >
        {title}
      </Typography>
      <div style={{ marginTop: 10, height: 300 }}>
        <img src={imageURL} style={{height: "100%", width: "100%"}} />
      </div>
      <Typography
        align="left"
        sx={{ fontWeight: 200, fontSize: 12, marginTop: "10px" }}
      >
        {description}
      </Typography>
    </>
  );

}

function DocumentsProducedList(){
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <DocumentsProducedListItem
            title = "ESTIMATION"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/Estim1.PNG"
            description = "Ce document n'est pas diffusé. Le montant total de l'estimation financière résulte de la somme des produits des quantités estimées par les prix unitaires."
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DocumentsProducedListItem
            title = "DQE"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/DQE1.PNG"
            description = "Le Détail Quantitatif et Estimatif (DQE) est le document, en principe non contractuel, qui liste les ouvrages et prestations à réaliser dans le cadre du projet. Il est destiné à permettre la comparaison des prix entre les offres des candidats."
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DocumentsProducedListItem
            title = "BPU"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/BPU2.PNG"
            description = "Le Bordereau des Prix Unitaire (BPU) est le document contractuel destiné à décrire plus en détail le contenu des ouvrages et prestations à réaliser. Il représente l'offre financière du candidat pour chacun des ouvrages ou prestations à réaliser dans le cadre du projet."
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DocumentsProducedListItem
            title = "CCTP"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/CCTP6.PNG"
            description = "Le Cahier des Clauses Techniques Particulières (CCTP) est le document contractuel qui rassemble les prescriptions techniques et réglementaires qui devront être prises en compte pour la réalisation des ouvrages ou prestations. Il complète le BPU."
          />
        </Grid>
      </Grid>
    </>
  );
}

function DocumentsProduced(){
  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <Typography
          align="left"
          sx={{ fontWeight: 400, fontSize: 18, color: primaryCol, marginBottom: "10px" }}
        >
           Les documents produits ...
        </Typography>
        <DocumentsProducedList />
      </div>
    </>
  );
}

function SectorOfActivityListItem(props){

  const {title, imageURL} = props;

  return (
    <>
      <Typography
        align="left"
        sx={{ fontWeight: 200, fontSize: 14, color: primaryCol }}
      >
        {title}
      </Typography>
      <div style={{ marginTop: 10, height: 160 }}>
        <img src={imageURL} style={{height: "100%", width: "100%"}} />
      </div>
    </>
  );

}

function SectorOfActivityList(){
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Routes & Autoroutes"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/01-Routes%20&%20Autoroutes1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Aménagements urbains"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/02-Am%C3%A9nagements%20Urbains1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Construction de réseaux"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/03-Construction%20de%20r%C3%A9seaux.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Electricité & Eclairage"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/04-Electricite&Eclairage.jpg"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Espaces de loisirs"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/05-Espaces%20de%20loisirs1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Mobilier urbain"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/05-Espaces%20de%20loisirs1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Aménagements paysagers"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/07-Am%C3%A9nagements_Paysagers1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Signalisation & Sécurité routière"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/08-Signalisation%20&%20S%C3%A9curite%20Routi%C3%A8re2.jpg"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Equipements sportifs"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/09-Equipements%20Sportifs2.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Environnement & Collecte des déchets"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/10-Environnement&Collecte%20des%20Dechets1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Ouvrages de génie civil"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/11-Ouvrages%20de%20Genie%20Civil1.jpg"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <SectorOfActivityListItem
            title = "Bâtiments"
            imageURL = "https://www.quadrabase.fr/Portals/0/BlockBuilderImages/449/12-Batiment.jpg"
          />
        </Grid>
      </Grid>
    </>
  );
}

function SectorOfActivity(){
  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <Typography
          align="left"
          sx={{ fontWeight: 400, fontSize: 18, color: primaryCol, marginBottom: "10px" }}
        >
          Les secteurs d'activités ...
        </Typography>
        <SectorOfActivityList />
      </div>
    </>
  );
}

const QNAListItem = Collapsible;

function FirstExpandComponent(){

  const x = [
    "Création et gestion des projets",
    "Saisie des données générales du projet,",
    "Choix du type de marché (lots, tranches, subséquent)",
    "Construction du projet à partir des ouvrages des bibliothèques",
    "Création d’ouvrages spécifiques au projet"
  ];

  return (
    <>
      <List dense={true} sx={{marginLeft: "20px"}}>
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
    </>
  );

}

function SecondExpandComponent(){

  const x = [
    "Cahier des Clauses Techniques Générales (CCTG)",
    "Documents Techniques Unifiés (DTU)",
    "Normes NF et EN",
    "Guides Techniques",
    "Préconisations CEREMA"
  ];

  return (
    <>
      <List dense={true} sx={{marginLeft: "20px"}}>
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
    </>
  );

}

function ThirdExpandComponent(){

  return (
    <>
      <div style={{marginLeft: "36px"}}>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px" }}
        >
          Quadrabase s'appuie sur un ensemble de bibliothèques comprenant plus de 40'000 ouvrages, prestations et produits dont les mises à jour sont faites régulièrement.
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px" }}
        >
          Les Bibliothèques d’ouvrages proposées sont les suivantes :
        </Typography>
        <Typography
          align="left"
          sx={{ fontWeight: 200, fontSize: 13, paddingTop: "10px", paddingBottom: "20px" }}
        >
          Travaux préparatoires ; Terrassements généraux & Fouilles pour ouvrages ; Géo-synthétiques & Géomembranes ; Chaussées ; Voiries & Espaces publics ; Travaux de maçonneries ; Construction de Réseaux divers ; Assainissements ; Alimentation Electrique & Eclairage ; Télécom & Vidéo surveillance ; Réseau AEP ; Arrosage ; Espaces verts & Plantations ; Clôtures & Portails ; Signalisation de Police ; Signalisation Directionnelle ; Signalisation Touristique et Commerciale ; Signalisation Horizontale ; Dispositifs de sécurité ; Mobilier urbain métal ; Mobilier urbain Pierre et béton ; Mobilier extérieur bois ; Entretien Forestier & Elagage ; Environnement & Collecte des Déchets ; Equipements Sportifs de proximité ; Espaces de Loisirs & Aires de jeux ; Signalisation lumineuse Tricolore ; Ouvrages de Génie Civil ; Génie végétal ; Contrôle d’accès ; Bâtiments
        </Typography>
      </div>
    </>
  );

}

function QNAList(){

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <QNAListItem text="Les fonctionnalités" expandComponent={<FirstExpandComponent />} />
        <QNAListItem text="Les sources documentaires" expandComponent={<SecondExpandComponent />} />
        <QNAListItem text="La base de données" expandComponent={<ThirdExpandComponent />} />
      </div>
    </>
  );

}

function QNA(){

  return (
    <>
      <QNAList />
      <div style={{marginTop: "50px"}} />
    </>
  );

}

export default function Presentation(){

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFFFFF"
        }}
      >
        <HeadText />
        <HeadList />
        <DocumentsProduced />
        <SectorOfActivity />
        <QNA />
      </Container>
    </>
  );

}