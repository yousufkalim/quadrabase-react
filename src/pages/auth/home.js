// Init
import React from 'react';
import { useRef } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Services from './spc/components/Services';
import Icon1 from './spc/assets/images/icon1.svg';
import Icon2 from './spc/assets/images/icon2.svg';
import Icon3 from './spc/assets/images/icon3.svg';
import Icon4 from './spc/assets/images/icon4.svg';
import Icon5 from './spc/assets/images/icon5.svg';
import Icon6 from './spc/assets/images/icon6.svg';
import CircleIcon from '@mui/icons-material/Circle';
import Footerimg from './spc/assets/images/footerimg.svg';
import Quadralogo from './spc/assets/images/Quadralogo.svg';
import { useHistory } from 'react-router-dom';

// Importing Components
import Header from '../../pages/auth/spc/components/Header';
import Footer from '../../pages/auth/spc/components/Footer';
import DocumentProduits from './spc/components/DocumentProduits';
import Appbar from './spc/components/Appbar';

// Home Component
export default function Home() {
  const [index, setIndex] = React.useState(0);
  const history = useHistory();
  const handleChange = newValue => {
    setIndex(newValue);
  };

  const navToRegister = () => {
    history.push('/auth/register');
  };
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  let data = [
    {
      icon: Icon1,
      heading: 'Gain de temps en conception',
      text: 'S’appuyant sur une base de données de plus de 43’000 ouvrages/prestations/produits, Quadrabase couvrira plus de 80% des besoins pour vos projets. Le concept utilisé, déposé et protégé à l’INPI, vous permettra de diviser par 4 le temps de conception de vos documents techniques.'
    },
    {
      icon: Icon2,
      heading: 'Textes prérédigés à forte valeur ajoutée',
      text: 'Une attention toute particulière à été mise dans le contenu des descriptifs d’ouvrages ainsi que pour les textes composant les différents chapitres du CCTP afin de vous assurer un contenu le plus adapté et complet possible.      '
    },
    {
      icon: Icon3,
      heading: 'Adaptation des textes suivant les spécificités ',
      text: 'Vous aurez à tout moment la possibilité de modifier et enrichir les informations de base proposées pour les adapter aux spécificités de votre projet.'
    },
    {
      icon: Icon4,
      heading: 'Génération automatique des documents',
      text: 'Après la construction de la grille projet, un simple clic sur le document à produire lancera sa génération et sa mise en page automatiquement au format souhaité (Excel, Word ou PDF). Si besoin, vous pourrez toujours revenir modifier votre document initial et autant de fois que nécessaire.'
    },
    {
      icon: Icon5,
      heading: 'Sélection de fabricants avec lien vers leur site',
      text: 'Nous avons sélectionné pour vous les Fabricants Français des produits du BTP. Ils seront d’une part, listés et classés suivant leur domaine d’activité et d’autre part, référencés au droit des Ouvrages/Prestations/Produits qui les concernent. Un lien hypertexte permettra d’accéder directement sur leur site internet.'
    },
    {
      icon: Icon6,
      heading: 'Prix très compétitifs',
      text: 'Les tarifs de nos services ont été spécialement étudiés pour qu’ils soient les plus adaptés à vos budgets.'
    }
  ];

  return (
    <div>
      <div className="spc_headerdiv">
        <Appbar logo={Quadralogo} backgroundColor="inherit"></Appbar>
        <Header handleScroll={executeScroll} />
      </div>
      <div ref={myRef} className="scroll">
        <div className="spc_home_heading">
          <Typography className="spc_home_heading_typo">Intérêt pour vous</Typography>
        </div>

        <Grid container spacing={1} className="spc_grid">
          {data.map(items => (
            <>
              <Grid xs={12} sm={12} md={4} className="spc_homegrid">
                <img src={items.icon}></img>
                <Typography
                  className="spc_grid_heading"
                  style={{ paddingTop: '6%', paddingBottom: '8%' }}>
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
        <Divider variant="middle" sx={{ background: '#DCD6D1', margin: '0 10% 0 10%' }} />
      </div>
      <div>
        <DocumentProduits />
      </div>
      {/* <div>
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
                  {isReadMore ? items.text.slice(0, 150) : items.text}
                </Typography>
                <div className="spc_readmorediv">
                  <Typography
                    className="spc_readmore"
                    sx={{ paddingBottom: "5%", cursor: "pointer" }}
                    onClick={toggleReadMore}
                  >
                    {isReadMore ? "Read more" : " Show less"}
                  </Typography>
                  <div>
                    <img src={Arrow} className="spc_arrow_"></img>
                  </div>
                </div>
              </Grid>
            </>
          ))}
        </Grid>
      </div> */}
      <div className="spc_servicesdiv">
        <div>
          <Typography className="spc_carouselheading">Les secteurs d'activités</Typography>
        </div>
        <Services />
      </div>
      <div>
        <div>
          <Typography className="spc_carouselheading">Création et gestion des projets</Typography>
        </div>
        <div
          className="spc_"
          index={index}
          style={{
            display: 'flex',

            /* justify-content: space-evenly; */
            padding: '0 7% 0 7%'
          }}>
          <Button
            className={`${index == '0' ? 'spc_home_btn' : 'spc_footer_btn'}`}
            onClick={() => handleChange(0)}>
            Les fonctionnalités
          </Button>
          <div className="spc_divider"></div>
          <Button
            className={`${index == '1' ? 'spc_home_btn' : 'spc_footer_btn'}`}
            onClick={() => handleChange(1)}
            sx={{ marginLeft: '1%' }}>
            Les sources documentaires
          </Button>
          <div className="spc_divider"></div>
          <Button
            className={`${index == '2' ? 'spc_home_btn' : 'spc_footer_btn'}`}
            onClick={() => handleChange(2)}
            sx={{ marginLeft: '1%' }}>
            La base de données
          </Button>
        </div>
        <div style={{ paddingLeft: '6%' }}>
          <Divider
            variant="middle"
            sx={{
              background: '#DBDBDB',
              borderWidth: '1px',
              width: '45% !Important',
              borderRadius: '20px',
              marginTop: '1% !Important',
              marginBottom: '2%'
            }}
          />
        </div>
        <Grid container spacing={1} sx={{ padding: '0 8% 0 8%' }}>
          <Grid xs={12} sm={12} md={6}>
            <img src={Footerimg} style={{ width: '100%' }} className="spc_footer_img"></img>
          </Grid>

          <Grid xs={12} sm={12} md={6} className="spc_fottergrid">
            {index === 0 ? (
              <ul>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Création et gestion des projets
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Saisie des données générales du projet,
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Choix du type de marché (lots, tranches, subséquent)
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Construction du projet à partir des ouvrages des bibliothèques
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Création d’ouvrages spécifiques au projet
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Calcul automatique des totaux
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Réorganisation de la structure du projet
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Gestion du Chapitre 0 du CCTP (Clauses communes)
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Adaptation des descriptifs d’ouvrages et des textes du CCTP
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Génération et visualisation des documents au format Xml
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Transfert des documents vers Word, Excel ou PDF
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Création de Bibliothèques d’ouvrages spécifiques à chaque Prescripteur
                </li>
              </ul>
            ) : index === 1 ? (
              <ul>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Cahier des Clauses Techniques Générales (CCTG)
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Documents Techniques Unifiés (DTU)
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Normes NF et EN
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Guides Techniques
                </li>
                <li>
                  {/* <CircleIcon style={{ fontSize: 8 }} /> */}
                  &nbsp;&nbsp;Documentations des Fabricants
                </li>
              </ul>
            ) : (
              <>
                <strong>Quadrabase</strong> s'appuie sur un ensemble de bibliothèques comprenant
                plus de 42'000 ouvrages, prestations et produits dont les mises à jour sont faites
                régulièrement.
                <br />
                <br />
                Les Bibliothèques d’ouvrages proposées sont les suivantes :
                <br />
                <br />
                Travaux préparatoires / Terrassements généraux - Fouilles pour ouvrages /
                Géosynthétiques - Géomembranes / Chaussées / Voiries - Espaces publics / Travaux de
                maçonneries / Construction de Réseaux divers / Assainissements EU/EP / Alimentation
                Electrique – Eclairage Public / Télécom - Vidéo surveillance / Réseau AEP / Arrosage
                / Aménagements Paysagers - Plantations / Clôtures - Portails / Signalisation de
                Police / Signalisation Directionnelle / Signalisation Touristique et Commerciale /
                Signalisation Horizontale / Dispositifs de sécurité / Mobilier urbain métal /
                Mobilier urbain Pierre-Béton-Matériaux recyclés / Mobilier extérieur bois /
                Entretien Forestier - Elagage / Environnement - Collecte des Déchets / Equipements
                Sportifs de proximité / Espaces de Loisirs - Aires de jeux / Signalisation lumineuse
                Tricolore / Ouvrages de Génie Civil / Génie végétal / Contrôle d’accès / Bâtiments
              </>
            )}
          </Grid>
          <div className="spc_bottomborder">
            <div className="spc_border"></div>
            <div className="spc_border2"></div>
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
