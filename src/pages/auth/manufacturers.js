import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Collapsible from "../../components/Collapsible/manufacturers";

const primaryCol = "#F96B05";

const ManufacturersListItem = Collapsible;

function FirstExpandComponent() {
  const a = [
    {
      text: "ARCADIAS GROUPE",
      url: "https://www.groupearcadias.com/",
    },
    {
      text: "BATISEC SAS",
      url: "https://batisec.fr/",
    },
    {
      text: "FORNELLS",
      url: "https://fornells.fr/chantier/",
    },
    {
      text: "HERAS Sarl",
      url: "https://www.cloture-mobile.fr/",
    },
    {
      text: "ISOSIGN",
      url: "https://isosign.fr/",
    },
    {
      text: "LACROIX CITY",
      url: "https://www.lacroix-city.fr/",
    },
    {
      text: "NADIA SIGNALISATION",
      url: "http://www.nadia-europ.com/",
    },
    {
      text: "SIGNATURE GROUPE",
      url: "https://www.groupe-signature.com/fr/",
    },
    {
      text: "SIGNAUX GIROD",
      url: "https://www.girod-signalisation.com/fr",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}
function SecondExpandComponent() {
  const a = [
    {
      text: "ANTALVERT",
      url: "http://www.antalvert.com/",
    },
    {
      text: "AQUATERRA SOLUTIONS",
      url: "http://www.aquaterra-solutions.fr/",
    },
    {
      text: "ATE DRAINAGE",
      url: "https://www.ate-drainage.com/",
    },
    {
      text: "BARTHE",
      url: "https://www.barthe-gratens.fr/gabion",
    },
    {
      text: "BETAFENCE France SAS",
      url: "https://www.betafence.fr/",
    },
    {
      text: "DINGER ENVIRONNEMENT",
      url: "http://dingerenvironnement.com",
    },
    {
      text: "EURO-TEC",
      url: "https://www.euro-tec.fr/",
    },
    {
      text: "FRAENKISCHE France SAS",
      url: "www.fraenkische.fr",
    },
    {
      text: "GABION CENTER",
      url: "https://www.gabioncenter.com/",
    },
    {
      text: "GABIONOR",
      url: "https://www.gabionor.fr/",
    },
    {
      text: "INTERPLAST",
      url: "https://interplast.com/fr/nos-produits/",
    },
    {
      text: "MACCAFERRI France SAS",
      url: "https://www.maccaferri.com/fr/",
    },
    {
      text: "SCHEIER France SARL",
      url: "http://www.scheier.fr/",
    },
    {
      text: "SYSTEM GROUP France",
      url: "https://tubi.net/fr/societes/system-group-france/",
    },
    {
      text: "TOP GREEN",
      url: "https://www.topgreen.com",
    },
    {
      text: "WAVIN France",
      url: "https://www.wavin.com/fr-fr",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function ThirdExpandComponent() {
  const a = [
    {
      text: "AGRU Environnement",
      url: "https://www.agru.fr/",
    },
    {
      text: "ECOBIOTEX SAS",
      url: "https://ecobiotex.fr/",
    },
    {
      text: "HUESKER France SAS",
      url: "https://www.huesker.fr/",
    },
    {
      text: "MACCAFERRI France SAS",
      url: "https://www.maccaferri.com/fr/",
    },
    {
      text: "NAUE Applications SARL",
      url: "https://www.naue.fr/",
    },
    {
      text: "PROTERRA Environnement",
      url: "https://www.proterra-environnement.com/",
    },
    {
      text: "SIPLAST",
      url: "https://www.siplast.fr",
    },
    {
      text: "TERAGEOS",
      url: "https://www.terageos.com/",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function FourthExpandComponent() {
  const a = [
    {
      text: "AFITEXINOV",
      url: "http://www.afitex.com/fr/",
    },
    {
      text: "LAFARGE",
      url: "https://www.lafarge.fr/route-et-reseaux",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function FifthExpandComponent() {
  const a = [
    {
      text: "AFITEXINOV",
      url: "http://www.afitex.com/fr/",
    },
    {
      text: "AGRESTA",
      url: "https://www.agresta.fr/fr/",
    },
    {
      text: "AQUITER",
      url: "https://aquiter.com/",
    },
    {
      text: "BONOMI SA",
      url: "http://www.bonomi-beton.fr/",
    },
    {
      text: "CALMINIA",
      url: "http://www.calminia.com/",
    },
    {
      text: "CELTYS",
      url: "https://www.celtys.fr/",
    },
    {
      text: "COLAS",
      url: "https://www.colas.com/sites/default/files/produits/noticetechniquevegecol_bd_0.pdf",
    },
    {
      text: "COMINEX",
      url: "http://www.equipements-ouvrages-art.fr/",
    },
    {
      text: "CONSOLIS BONNA SABLA",
      url: "https://www.bonnasabla.com",
    },
    {
      text: "CRP SAS",
      url: "http://www.crpsas.com",
    },
    {
      text: "DA COSTA PAVAGE",
      url: "https://dacosta-pavage-paca.fr",
    },
    {
      text: "EIFFAGE ROUTE",
      url: "https://www.eiffageroute.com/",
    },
    {
      text: "EUROPIERRE",
      url: "https://www.euro-pierre.fr",
    },
    {
      text: "EUROVIA",
      url: "http://www.groupe-signature.com/fr/notre-offre/fluidite-du-trafic",
    },
    {
      text: "FOURNIER PREFA",
      url: "http://www.fournier-prefa.com",
    },
    {
      text: "GALLAUD Ets",
      url: "http://www.gallaud-beton.fr/",
    },
    {
      text: "GRANIER DIFFUSION",
      url: "https://www.granier-diffusion.com/",
    },
    {
      text: "Groupe DANIEL",
      url: "https://www.groupe-daniel.fr/",
    },
    {
      text: "LAFARGE",
      url: "https://www.lafarge.fr/route-et-reseaux",
    },
    {
      text: "LPB",
      url: "http://www.lpb-sa.com",
    },
    {
      text: "PAC Etablissements",
      url: "https://www.ets-pac.fr",
    },
    {
      text: "PAVES DE RUE",
      url: "https://www.pavesderue.com",
    },
    {
      text: "PIERRE ET SOL",
      url: "https://www.pierreetsol.com",
    },
    {
      text: "PLATTARD SAS",
      url: "https://www.plattard.fr",
    },
    {
      text: "PROFIL 06",
      url: "https://www.profil06.fr",
    },
    {
      text: "PROPRESO",
      url: "http://www.propreso.fr",
    },
    {
      text: "RESINEO",
      url: "https://www.resineo.com/",
    },
    {
      text: "SEPA",
      url: "https://www.sepa-alsace.com/bordures-de-trottoir-en-beton.html",
    },
    {
      text: "SETP",
      url: "https://www.setp.fr/",
    },
    {
      text: "SOTUBEMA",
      url: "https://www.sotubema.fr",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function SixthExpandComponent() {
  const a = [
    {
      text: "BERTHOZAT",
      url: "https://www.pbabeton.fr/",
    },
    {
      text: "CHASI",
      url: "https://www.chasi.fr/",
    },
    {
      text: "ISCHEBECK France",
      url: "https://www.ischebeckfrance.fr/",
    },
    {
      text: "KRINGS INTERNATIONAL France",
      url: "https://www.krings.com/",
    },
    {
      text: "MAX RENAUD",
      url: "https://www.maxrenaud.fr/",
    },
    {
      text: "SOLLASE SOBLINTER",
      url: "http://blindage-sollase.com/",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function SeventhExpandComponent() {
  const a = [
    {
      text: "CELESTIN MATERIAUX",
      url: "https://www.celestin-materiaux.fr/",
    },
    {
      text: "CHASI",
      url: "https://www.chasi.fr/",
    },
    {
      text: "COURANT",
      url: "https://www.courant.fr/",
    },
    {
      text: "EJ Fonderie",
      url: "https://www.ejco.com/fr/fr/",
    },
    {
      text: "FORMATUB",
      url: "https://formatub-budget.com/",
    },
    {
      text: "FRANS BONHOMME",
      url: "https://www.fransbonhomme.fr/",
    },
    {
      text: "GISONE",
      url: "http://www.gisone.fr/",
    },
    {
      text: "GLS FUNDUCTIL France",
      url: "http://glsfunductil.fr/",
    },
    {
      text: "GROUPE ELYDAN",
      url: "https://elydan.eu/",
    },
    {
      text: "INTERPLAST",
      url: "https://interplast.com/fr/nos-produits/",
    },
    {
      text: "ISCHEBECK France",
      url: "https://www.ischebeckfrance.fr/",
    },
    {
      text: "KRINGS INTERNATIONAL France",
      url: "https://www.krings.com/",
    },
    {
      text: "MAX RENAUD",
      url: "https://www.maxrenaud.fr/",
    },
    {
      text: "MPB CONSOLIS",
      url: "https://www.mpb.fr/",
    },
    {
      text: "PENET",
      url: "https://penet-plastiques.fr/",
    },
    {
      text: "PLATTARD SAS",
      url: "https://www.plattard.fr",
    },
    {
      text: "PUM PLASTIQUES SAS",
      url: "https://www.pumplastiques.fr/",
    },
    {
      text: "RESOFLEX",
      url: "https://www.peignes-tp-resoflex.fr/resoflex/",
    },
    {
      text: "SAINT-GOBAIN PAM",
      url: "https://www.pamline.fr/",
    },
    {
      text: "SOLLASE SOBLINTER",
      url: "http://blindage-sollase.com/",
    },
    {
      text: "STRADAL",
      url: "https://www.stradal.fr/",
    },
    {
      text: "STRPEPP",
      url: "https://www.strpepp.org/",
    },
    {
      text: "TECOMAT SAS",
      url: "https://www.telcomat.com/",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function EighthExpandComponent() {
  const a = [
    {
      text: "ACO France Sarl",
      url: "www.aco.fr",
    },
    {
      text: "ALKERN",
      url: "https://www.alkern.fr/",
    },
    {
      text: "ATE DRAINAGE",
      url: "https://www.ate-drainage.com/",
    },
    {
      text: "BEMACO",
      url: "https://www.bemaco.fr/bemaco-assainissement/",
    },
    {
      text: "BIRCO France",
      url: "https://www.birco.fr/",
    },
    {
      text: "BLARD",
      url: "https://www.blard-assainissement.fr/",
    },
    {
      text: "BONNA SABLA",
      url: "https://www.bonnasabla.com/",
    },
    {
      text: "CIMENTUB",
      url: "https://www.cimentub.fr/",
    },
    {
      text: "COC ENVIRONNEMENT",
      url: "http://www.eog-technology.com/",
    },
    {
      text: "CRP SAS",
      url: "http://www.crpsas.com",
    },
    {
      text: "ELYDAN",
      url: "https://elydan.eu/produits/nappe-solpac/",
    },
    {
      text: "FRAENKISCHE France SAS",
      url: "www.fraenkische.fr",
    },
    {
      text: "GROUPE ADG",
      url: "http://www.adgbeton.fr/produits-batiment-tp/buses-et-siphons.html",
    },
    {
      text: "Groupe DANIEL",
      url: "https://www.groupe-daniel.fr/",
    },
    {
      text: "HAURATON France SARL",
      url: "https://www.hauraton.fr/",
    },
    {
      text: "HOBAS",
      url: "https://www.hobas.com/fr/products/",
    },
    {
      text: "HYDRHECO",
      url: "https://hydrheco.com/",
    },
    {
      text: "INTERPLAST",
      url: "https://interplast.com/fr/nos-produits/",
    },
    {
      text: "MEHAT",
      url: "https://www.mehat.fr/clotures-beton",
    },
    {
      text: "NICOLL",
      url: "https://www.nicoll.fr/fr",
    },
    {
      text: "NORMANDY TUB",
      url: "https://normandytub.com/",
    },
    {
      text: "OCIDO",
      url: "http://www.separateur-decanteur-lamellaire.fr/",
    },
    {
      text: "PAMLINE",
      url: "https://www.pamline.fr/",
    },
    {
      text: "PENET",
      url: "https://penet-plastiques.fr/",
    },
    {
      text: "PILLON FRERES SARL",
      url: "http://www.pillonfreres.fr/",
    },
    {
      text: "PIPELIFE France",
      url: "https://www.pipelife.fr/",
    },
    {
      text: "PLATTARD SAS",
      url: "https://www.plattard.fr",
    },
    {
      text: "PUM PLASTIQUES SAS",
      url: "https://www.pumplastiques.fr/",
    },
    {
      text: "SEBICO",
      url: "https://www.sebico.fr/",
    },
    {
      text: "SILIX",
      url: "https://www.silix.pro/",
    },
    {
      text: "SIMOP",
      url: "https://www.simop.fr/",
    },
    {
      text: "SOVAL",
      url: "https://www.soval.fr/",
    },
    {
      text: "SYSTEM GROUP France",
      url: "https://tubi.net/fr/societes/system-group-france/",
    },
    {
      text: "TECHNEAU",
      url: "https://www.techneau.com/accueil/",
    },
    {
      text: "TERAGEOS",
      url: "https://www.terageos.com/",
    },
    {
      text: "THEBAULT",
      url: "https://www.robert-thebault.fr/btp/accueil",
    },
    {
      text: "WAVIN France",
      url: "https://www.wavin.com/fr-fr",
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {a.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}

function ManufacturersList() {
  return (
    <>
      <div style={{ borderBottomWidth: "1px", borderBottomColor: "#000000" }}>
        <Typography
          align="left"
          sx={{
            fontWeight: 500,
            fontSize: 16,
            paddingTop: "20px",
            color: primaryCol,
          }}
        >
          MANUFACTURERS ...
        </Typography>
      </div>
      <div style={{ marginTop: "10px" }}>
        <ManufacturersListItem
          text="TP01-TRAVAUX PREPARATOIRES"
          expandComponent={<FirstExpandComponent />}
        />
        <ManufacturersListItem
          text="TP02-TERRASSEMENTS GENERAUX"
          expandComponent={<SecondExpandComponent />}
        />
        <ManufacturersListItem
          text="TP03-GEO-SYNTHETIQUES - GEO-MEMBRANES"
          expandComponent={<ThirdExpandComponent />}
        />
        <ManufacturersListItem
          text="TP04-CHAUSSEES"
          expandComponent={<FourthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP05-VOIRIES - ESPACES PUBLICS"
          expandComponent={<FifthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP06-TRAVAUX DE MACONNERIES - SOUTENEMENTS"
          expandComponent={<SixthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP07-RESEAUX DIVERS"
          expandComponent={<SeventhExpandComponent />}
        />
        <ManufacturersListItem
          text="TP08-ASSAINISSEMENTS EU-EP"
          expandComponent={<EighthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP09-ELECTRICAL SUPPLY - LIGHTING"
          expandComponent={<FirstExpandComponent />}
        />
        <ManufacturersListItem
          text="TP10-TELECOM - VIDEO SURVEILLANCE"
          expandComponent={<FirstExpandComponent />}
        />
      </div>
    </>
  );
}

function Manufacturers() {
  return (
    <>
      <ManufacturersList />
      <div style={{ marginTop: "50px" }} />
    </>
  );
}

export default function Manufacturer() {
  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Manufacturers />
      </Container>
    </>
  );
}
