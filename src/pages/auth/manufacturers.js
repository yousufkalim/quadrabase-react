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

function NinthExpandComponent() {
  const a = [
    {
      text: "ALUNOX",
      url: "http://www.alunox.fr/",
    },
    {
      text: "AUBRILAM",
      url: "https://www.aubrilam.com/fr/",
    },
    {
      text: "CAHORS GROUPE",
      url: "https://www.groupe-cahors.com/fr-france/chambres-de-tirage.html",
    },
    {
      text: "CONIMAST INTERNATIONAL",
      url: "https://www.conimast.fr/",
    },
    {
      text: "ECI-SIGNALISATION",
      url: "http://www.eci-signalisation.fr/",
    },
    {
      text: "ECLAIRAGE DESIGN",
      url: "https://www.eclairage-design.com/",
    },
    {
      text: "ECLATEC",
      url: "www.eclatec.com",
    },
    {
      text: "GHM",
      url: "https://www.ghm.fr/fr/",
    },
    {
      text: "GROLLEAU SA",
      url: "https://www.grolleau.fr/",
    },
    {
      text: "LUMIERES DE France",
      url: "http://www.lumieresdefrance.com/php/",
    },
    {
      text: "MSA",
      url: "https://www.msaron.fr/",
    },
    {
      text: "NEXANS France",
      url: "https://www.nexans.fr/",
    },
    {
      text: "OCCIREP",
      url: "http://www.occirep.com/fr/page/eclairage-exterieur.php",
    },
    {
      text: "PETITJEAN SAS",
      url: "https://www.petitjean.fr/",
    },
    {
      text: "RAGNI",
      url: "https://www.ragni.com/",
    },
    {
      text: "SEIFEL SAS",
      url: "http://www.seifel.fr/",
    },
    {
      text: "SIEBA",
      url: "http://www.sieba.fr/pylones-beton",
    },
    {
      text: "SILUMEN",
      url: "https://www.silumen.com/fr/",
    },
    {
      text: "SOCABEL",
      url: "http://www.socabel.com/",
    },
    {
      text: "STRADAL",
      url: "https://www.stradal.fr/",
    },
    {
      text: "TECHNILUM",
      url: "https://www.technilum.com/",
    },
    {
      text: "VALMONT France SAS",
      url: "https://www.valmont-france.com/",
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

function TenthExpandComponent() {
  const a = [
    {
      text: "BONNA SABLA",
      url: "https://www.bonnasabla.com/",
    },
    {
      text: "CAHORS GROUPE",
      url: "https://www.groupe-cahors.com/fr-france/chambres-de-tirage.html",
    },
    {
      text: "COURANT",
      url: "https://www.courant.fr/",
    },
    {
      text: "FABEMI",
      url: "https://www.fabemi.fr/produit/chambre-telecom/",
    },
    {
      text: "France BOIS",
      url: "https://www.franceboisimpregnes.fr/",
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
      text: "INTERPLAST",
      url: "https://interplast.com/fr/nos-produits/",
    },
    {
      text: "KMC",
      url: "https://www.groupe-kmc.com/les-entreprises/semap-composite",
    },
    {
      text: "NEXANS France",
      url: "https://www.nexans.fr/",
    },
    {
      text: "PENET",
      url: "https://penet-plastiques.fr/",
    },
    {
      text: "PIPELIFE France",
      url: "https://www.pipelife.fr/",
    },
    {
      text: "PUM PLASTIQUES SAS",
      url: "https://www.pumplastiques.fr/",
    },
    {
      text: "STRADAL",
      url: "https://www.stradal.fr/",
    },
    {
      text: "TALIAPLAST",
      url: "https://www.taliaplast.com/fr/categorie/signalisation-et-balisage-de-chantier/signalisation-diverse/grillages-avertisseurs",
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

function EleventhExpandComponent() {
  const a = [
    {
      text: "ATLANTIC ROBINETTERIE",
      url: "https://www.atlantic-robinetterie.fr/",
    },
    {
      text: "BAYARD",
      url: "https://www.bayard.fr/produits/nos-produits.html",
    },
    {
      text: "ELECTROSTEEL",
      url: "https://www.electrosteel.fr/",
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
      text: "INTERPLAST",
      url: "https://interplast.com/fr/nos-produits/",
    },
    {
      text: "PENET",
      url: "https://penet-plastiques.fr/",
    },
    {
      text: "PIPELIFE France",
      url: "https://www.pipelife.fr/",
    },
    {
      text: "PUM PLASTIQUES SAS",
      url: "https://www.pumplastiques.fr/",
    },
    {
      text: "SAINT-GOBAIN PAM",
      url: "https://www.pamline.fr/",
    },
    {
      text: "SOVAL",
      url: "https://www.soval.fr/",
    },
    {
      text: "VERT BLEU",
      url: "https://www.vert-bleu.fr/",
    },
    {
      text: "VONROLL HYDRO SAS",
      url: "https://www.vonroll-hydro.fr/fr/",
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

function TwelvethExpandComponent() {
  const a = [
    {
      text: "ALLAMAN",
      url: "https://www.allaman.fr/citerne-pour-stockage-des-eaux-de-pluie.html",
    },
    {
      text: "ALSAPLAST",
      url: "https://www.alsaplast.com/cuve-plastique/",
    },
    {
      text: "API PLASTIQUES",
      url: "https://www.apiplast.fr/cuves-de-stockage-plastique/",
    },
    {
      text: "ARROSAGE DISTRIBUTION",
      url: "https://www.arrosage-distribution.fr/",
    },
    {
      text: "CADIOU",
      url: "https://cadiou-chaudronnerie-plastique.com/",
    },
    {
      text: "CELESTIN MATERIAUX",
      url: "https://www.celestin-materiaux.fr/",
    },
    {
      text: "CONCEPT CUVE",
      url: "https://www.conceptcuve.com/cuves.html",
    },
    {
      text: "EJ Fonderie",
      url: "https://www.ejco.com/fr/fr/",
    },
    {
      text: "France ARROSAGE",
      url: "http://france-arrosage.fr/",
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
      text: "GRUNDFOS Distribution SAS",
      url: "https://fr.grundfos.com/",
    },
    {
      text: "HARLOR",
      url: "http://www.harlor.fr/cuve-de-stockage-plastique-grand-volume-pehd/",
    },
    {
      text: "JETLY",
      url: "https://www.jetly.com/fr/",
    },
    {
      text: "PLASTEAM",
      url: "http://www.plasteam.fr/cuves-de-stockage-cylindriques-et-rectangulaires.html",
    },
    {
      text: "PLASTEAU",
      url: "https://www.plasteau.com/",
    },
    {
      text: "PLATTARD SAS",
      url: "https://www.plattard.fr",
    },
    {
      text: "RAIN BIRD EUROPE SNC",
      url: "https://www.rainbird.fr/",
    },
    {
      text: "SAINT-GOBAIN PAM",
      url: "https://www.pamline.fr/",
    },
    {
      text: "STRADAL",
      url: "https://www.stradal.fr/",
    },
    {
      text: "TECHNIPLAST",
      url: "https://techniplast-sas.com/fr/cuve-plastique.html",
    },
    {
      text: "TUBAO",
      url: "https://www.tubao.fr/",
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

function TP13ExpandComponent() {
  const a = [
    {
      text: "123GAZON",
      url: "https://123-gazon.fr/",
    },
    {
      text: "AG'CO",
      url: "http://www.gazon-synthetique-agco.fr/",
    },
    {
      text: "AZURIO",
      url: "https://www.azurio-gazon.fr/",
    },
    {
      text: "BHS",
      url: "https://www.bhs.fr/",
    },
    {
      text: "CAILLARD",
      url: "https://graines-caillard.com/",
    },
    {
      text: "DISTRICONCEPT",
      url: "https://www.distri-concept.com",
    },
    {
      text: "EXELGREEN France",
      url: "https://www.exelgreen.com/fr/",
    },
    {
      text: "GAZONDIRECT",
      url: "https://www.gazondirect.fr/",
    },
    {
      text: "GAZONEO SARL",
      url: "https://www.gazoneo.fr/",
    },
    {
      text: "GREEN ECO CONCEPT",
      url: "https://www.greenecoconcept.com/",
    },
    {
      text: "GREEN ZONE",
      url: "https://gazon-synthetique-herault.fr/",
    },
    {
      text: "GREENTOUCH GAZON",
      url: "http://www.gazon-greentouch.com/",
    },
    {
      text: "GUILLOT-BOURNE II",
      url: "https://www.guillot-bourne.com/",
    },
    {
      text: "JAMES-GRASS",
      url: "https://www.james-grass.fr/",
    },
    {
      text: "LA PEPINIERE DU BOSC",
      url: "https://www.pepinieredubosc.fr/",
    },
    {
      text: "LES GAZONS DE France",
      url: "http://www.semence-gazon.fr/",
    },
    {
      text: "LORAS GRAINES",
      url: "https://www.graines-loras.com/",
    },
    {
      text: "PEPINIERES BAUCHERY",
      url: "https://bauchery.fr/",
    },
    {
      text: "PEPINIERES BRAVARD",
      url: "http://www.bravard.fr/",
    },
    {
      text: "PEPINIERES CHARENTAISES",
      url: "https://www.pepinieres-charentaises.com/fr/",
    },
    {
      text: "PEPINIERES CHARGE",
      url: "https://www.pepinieres-charge.com/",
    },
    {
      text: "PEPINIERES COTTE",
      url: "http://www.pepinieres-cotte.com/",
    },
    {
      text: "PEPINIERES DE BAZAINVILLE",
      url: "https://www.pepinieres-bazainville.fr/",
    },
    {
      text: "PEPINIERES DE MARNAY",
      url: "https://www.pepinieres-marnay.com/",
    },
    {
      text: "PEPINIERES DE SAINT-CYPRIEN",
      url: "http://pepinieres-saint-cyprien.com/",
    },
    {
      text: "PEPINIERES FOLLIN",
      url: "http://www.pepinieres-follin.com/",
    },
    {
      text: "PEPINIERES GROMOLARD",
      url: "https://www.pepinieres-gromolard.com/",
    },
    {
      text: "PEPINIERES IMBERT",
      url: "http://www.pepinieres-imbert.fr/",
    },
    {
      text: "PEPINIERES JACQUET",
      url: "https://www.pepinieresjacquet.com/",
    },

    {
      text: "PEPINIERES JEAN HUCHET",
      url: "https://www.pepinieres-huchet.com/",
    },
    {
      text: "PEPINIERES LECOMTE",
      url: "https://www.pepinieres-lecomte.com/",
    },
    {
      text: "PEPINIERES NAUDET",
      url: "https://www.pepinieres-naudet.com/",
    },
    {
      text: "PEPINIERES RIPAUD",
      url: "https://www.ripaudpepinieres.com/",
    },
    {
      text: "PEPINIERES SCRIVE",
      url: "https://www.pepinierescrive.com/",
    },
    {
      text: "PEPINIERES VALDEDRE",
      url: "https://www.pepinieres-valderdre.fr/",
    },
    {
      text: "PHM",
      url: "https://www.pepiniere-phm.fr/",
    },

    {
      text: "TOP GREEN",
      url: "https://www.topgreen.com",
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

function TP14ExpandComponent() {
  const a = [
    {
      text: "AABIS",
      url: "http://aabis.fr/",
    },
    {
      text: "AKIA France",
      url: "https://www.akia-system.com/fr/motorisation-portail-battant-a-roue/",
    },
    {
      text: "BETAFENCE France SAS",
      url: "https://www.betafence.fr/",
    },
    {
      text: "CAME",
      url: "https://www.came.com/fr/",
    },
    {
      text: "CAVATORTA France SA",
      url: "https://www.cavatorta.fr/",
    },
    {
      text: "CLONOR",
      url: "https://www.clonor.com/",
    },
    {
      text: "CLOSAMBRE",
      url: "http://www.closambre.com/",
    },
    {
      text: "CLOTURES NICOLAS",
      url: "https://www.clotures-nicolas.fr/",
    },
    {
      text: "DIRICKX GROUPE",
      url: "https://www.dirickx.fr/",
    },
    {
      text: "EUROFENCE",
      url: "http://eurofence.pro/",
    },
    {
      text: "EUROPE AUTOMATISMES",
      url: "https://www.europe-automatismes.com/",
    },
    {
      text: "GANTOIS INDUSTRIES",
      url: "https://www.gantois.com/fr/",
    },
    {
      text: "GREEN CLOTURE",
      url: "https://greencloture.fr/",
    },
    {
      text: "GRILLAGES NAAS",
      url: "https://www.grillages-naas.com/",
    },
    {
      text: "JERREL SAS",
      url: "https://www.jerrel.fr/",
    },
    {
      text: "KOCH SAS",
      url: "https://www.lambert-clotures.com/koch-clotures-91.html",
    },
    {
      text: "MARIUS WASILEWSKI",
      url: "http://www.marius-wasilewski.fr/poteau-beton-grillage-180/",
    },
    {
      text: "MEHAT",
      url: "https://www.mehat.fr/clotures-beton",
    },
    {
      text: "MEVACO SARL",
      url: "https://www.mevaco.fr/",
    },
    {
      text: "NORMACLO",
      url: "http://www.normaclo.com/",
    },
    {
      text: "PROPRESO",
      url: "http://www.propreso.fr",
    },
    {
      text: "PROTECO",
      url: "https://www.boutique-proteco.fr/",
    },
    {
      text: "SCHERTZ",
      url: "http://www.schertz.fr/",
    },
    {
      text: "VERMIGLI",
      url: "http://vermigli.com/",
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

function TP15ExpandComponent() {
  const a = [
    {
      text: "ARCADIAS GROUPE",
      url: "https://www.groupearcadias.com/",
    },
    {
      text: "GROUPE HELIOS",
      url: "http://www.groupe-helios.fr/",
    },
    {
      text: "HICON France",
      url: "http://www.hicon.fr/",
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
      text: "NICOLAS SIGNALISATION",
      url: "https://www.nicolas-signalisation.fr/",
    },
    {
      text: "SICOM SA",
      url: "http://www.sicom-sa.com/",
    },
    {
      text: "SIGNAL CONCEPT",
      url: "http://signalconcept.fr/",
    },
    {
      text: "SIGNATURE GROUPE",
      url: "https://www.groupe-signature.com/fr/",
    },
    {
      text: "SIGNAUX GIROD",
      url: "https://www.girod-signalisation.com/fr/",
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

function TP16ExpandComponent() {
  const a = [
    { text: "ARCADIAS GROUPE", url: "https://www.groupearcadias.com/" },
    { text: "GROUPE HELIOS", url: "http://www.groupe-helios.fr/" },
    { text: "HICON France", url: "http://www.hicon.fr/" },
    { text: "ISOSIGN", url: "https://isosign.fr/" },
    { text: "LACROIX CITY", url: "https://www.lacroix-city.fr/" },
    { text: "NADIA SIGNALISATION", url: "http://www.nadia-europ.com/" },
    { text: "SICOM SA", url: "http://www.sicom-sa.com/" },
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

function TP17ExpandComponent() {
  const a = [
    { text: "AD PRODUCTION", url: "https://ad-production.fr/" },
    { text: "ARCADIAS GROUPE", url: "https://www.groupearcadias.com/" },
    {
      text: "GRAPFICOM",
      url: "https://signaletique-enseigne-ajaccio-bastia.com/",
    },
    { text: "GROUPE HELIOS", url: "http://www.groupe-helios.fr/" },
    { text: "HICON France", url: "http://www.hicon.fr/" },
    { text: "ISOSIGN", url: "https://isosign.fr/" },
    { text: "LACROIX CITY", url: "https://www.lacroix-city.fr/" },
    { text: "NADIA SIGNALISATION", url: "http://www.nadia-europ.com/" },
    { text: "PIC BOIS", url: "https://www.pic-bois.com/" },
    { text: "SICOM SA", url: "http://www.sicom-sa.com/" },
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

function TP18ExpandComponent() {
  const a = [
    { text: "AZ MARQUAGE", url: "www.azmarquage.fr" },
    { text: "GROUP HELIOS", url: "http://www.groupe-helios.fr/" },
    { text: "ISOSIGN", url: "https://isosign.fr/" },
    { text: "JBC SIGNALISATION", url: "https://www.jcbsignalisation.com/" },
    { text: "LACROIX CITY", url: "https://www.lacroix-city.fr/" },
    { text: "LLACER", url: "https://www.marquage-llacer.fr/" },
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

function TP19ExpandComponent() {
  const a = [
    { text: "ACROPOSE", url: "https://www.acropose.com/" },
    { text: "ARCADIAS GROUPE", url: "https://www.groupearcadias.com/" },
    { text: "ATECH", url: "https://www.atech-sas.com/" },
    { text: "BRUT METAL", url: "http://www.brut-metal.com/" },
    { text: "BUTON DESIGN", url: "https://www.buton-design.com/" },
    { text: "CONCEPT URBAIN", url: "http://www.concept-urbain.fr/" },
    { text: "CREAMETAL", url: "https://www.creametal.com/" },
    { text: "FRAMETO METALLERIE", url: "http://www.frameto.fr/" },
    { text: "GLASDON EUROPE SARL", url: "https://fr.glasdon.com/" },
    {
      text: "GUYON MOBILIER URBAIN",
      url: "https://www.guyon-mobilier-urbain.com/",
    },
    { text: "LACROIX CITY", url: "https://www.lacroix-city.fr/" },
    { text: "METALCO MOBIL CONCEPTS", url: "https://metalco.fr/" },
    { text: "MILLET CULINOR", url: "http://www.millet-culinor.com/" },
    { text: "MU MOBILIER", url: "https://www.mu-mobilier.com/" },
    { text: "NADIA SIGNALISATION", url: "http://www.nadia-europ.com/" },
    { text: "OESTERLE", url: "http://www.oesterle.fr/" },
    { text: "POLYMOBYL France", url: "https://www.polymobyl.com/" },
    {
      text: "SIGNATURE GROUPE",
      url: "https://www.groupe-signature.com/fr/",
    },
    {
      text: "SIGNAUX GIROD",
      url: "https://www.girod-signalisation.com/fr",
    },
    { text: "SINEU GRAFF", url: "https://sineugraff.com/fr/" },
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

function TP20ExpandComponent() {
  const a = [
    { text: "ALENTOUR", url: "https://www.pierre-alentour.fr/" },
    { text: "ARTEMAT", url: "https://artemat.fr/mobilier-urbain/" },
    { text: "ESPACE CREATIC", url: "https://espacecreatic.com/" },
    { text: "FRANCIOLI", url: "https://www.francioli.fr/fr/" },
    { text: "GIRPAV SAS", url: "https://www.girpav.fr/fr" },
    {
      text: "GUYON MOBILIER URBAIN",
      url: "https://www.guyon-mobilier-urbain.com/",
    },
    { text: "LMBETON", url: "http://lmbeton.com/" },
    { text: "MOBILUM France", url: "http://www.mobilum-france.com/" },
    { text: "MUM", url: "https://mum-oc.com/" },
    { text: "OPENSPACE", url: "https://www.openspace-urbain.fr/" },
    { text: "PIERISOL", url: "https://pierisol.com/" },
    {
      text: "PIERRE NATURELLE DE BOURGOGNE",
      url: "https://www.pierrenaturelledebourgogne.com/",
    },
    { text: "PIERRE URBAINE", url: "https://pierreurbaine.com/" },
    { text: "PLAS ECO", url: "https://plaseco.fr/" },
    { text: "SETP", url: "https://www.setp.fr/" },
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

function TP21ExpandComponent() {
  const a = [
    {
      text: "AFIPH ENTREPRISES",
      url: "https://www.afiph-entreprises.org/",
    },
    { text: "BOIS ET VIA", url: "http://www.boisetvia.fr/" },
    { text: "BOISDEXTER", url: "https://boisdexter.fr/" },
    {
      text: "ESAT",
      url: "https://www.esat-adsea-nievre.com/mobilier-dexterieur-en-bois/",
    },
    {
      text: "GUYON MOBILIER URBAIN",
      url: "https://www.guyon-mobilier-urbain.com/",
    },
    {
      text: "LABAT-MERLE",
      url: "https://www.labat-merle.fr/mobilier-de-plein-air/",
    },
    {
      text: "MAROLLEAU AMENAGEMENT BOIS",
      url: "https://www.marolleau-amenagement-bois.com/",
    },
    {
      text: "MERLE & FILS",
      url: "http://www.aquitaine-parquet-terrasse.fr/",
    },
    { text: "RONDINO", url: "http://www.rondino.fr/" },
    { text: "Sarl SCIEBOIS", url: "https://www.sciebois.fr/" },
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

function TP22ExpandComponent() {
  const a = [
    { text: "ASTECH", url: "https://www.astech-eco.com" },
    { text: "COLLECTAL", url: "https://www.collectal.fr" },
    { text: "COLLVERT", url: "https://www.collvert.fr/" },
    { text: "ECOLLECT", url: "https://www.ecollect.fr/" },
    { text: "ENGELS", url: "https://www.engels.fr/" },
    { text: "ESE France", url: "https://www.ese.com/fr/" },
    { text: "FABRIQUE DES GAVOTTES", url: "http://composteur-bois.eu/" },
    { text: "MOLOK France SAS", url: "https://www.molok.com/fr/" },
    { text: "QUADRIA Environnement", url: "https://www.quadria.eu" },
    { text: "SULO", url: "http://www.sulo.fr" },
    { text: "TERCOL", url: "http://www.tercol.fr" },
    { text: "TUCOM BERNARD SARL", url: "http://www.tucom-bernard.fr/" },
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

function TP23ExpandComponent() {
  const a = [
    { text: "BWA SPORTS", url: "https://www.bwa-sports.fr/" },
    {
      text: "GROUPE SAE TENNIS D'AQUITAINE",
      url: "http://www.groupesae.com/",
    },
    { text: "METALUPLAST", url: "https://www.metalu-plast.com/" },
    { text: "MILLET CULINOR", url: "http://www.millet-culinor.com/" },
    { text: "OP SPORT CONCEPT", url: "https://www.opsportconcept.com/" },
    { text: "SATD SA", url: "http://www.satd-sa.com/" },
    { text: "SODEX SPORT", url: "https://www.sodexsport.fr/" },
    { text: "SPSFILETS", url: "https://spsfilets.com/fr/" },
    { text: "URBASPORT", url: "http://www.urbasport.fr/" },
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
function TP24ExpandComponent() {
  const a = [
    { text: "ACODIS", url: "https://www.acodis.com/" },
    { text: "CREA COMPOSITE", url: "http://www.creacomposite.fr/" },
    { text: "IDEO EQUIPEMENTS", url: "http://www.ideo-equipements.fr/" },
    { text: "MILLET CULINOR", url: "http://www.millet-culinor.com/" },
    { text: "PROLUDIC SAS", url: "https://www.proludic.fr/" },
    { text: "RONDINO", url: "http://www.rondino.fr/" },
    { text: "SATD SA", url: "http://www.satd-sa.com/" },
    { text: "SYNCHRONICITY", url: "http://www.synchronicity.fr/" },
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

function TP25ExpandComponent() {
  const a = [
    { text: "AXIMUM", url: "http://www.aximum.fr/fr/" },
    { text: "ECI-SIGNALISATION", url: "http://www.eci-signalisation.fr/" },
    { text: "GROLLEAU SA", url: "https://www.grolleau.fr/" },
    { text: "JPV EQUIPEMENTS", url: "http://www.jpve-signalisation.com/" },
    { text: "NEXANS France", url: "https://www.nexans.fr/" },
    { text: "SEA SIGNALISATION", url: "http://www.sea-signalisation.fr/" },
    { text: "SOCABEL", url: "http://www.socabel.com/" },
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

function TP26ExpandComponent() {
  const a = [
    { text: "2ARMATUR", url: "https://www.2armatures.fr/" },
    { text: "ALKERN", url: "https://www.alkern.fr/" },
    { text: "ARMAT AUVERGNE", url: "http://www.armat-auvergne.com/" },
    { text: "ARMATECH", url: "https://www.armatech.fr/" },
    { text: "BIRCO France", url: "https://www.birco.fr/" },
    { text: "CHASI", url: "https://www.chasi.fr/" },
    { text: "COMELY", url: "http://www.equipements-ouvrages-art.fr/" },
    { text: "GISONE", url: "http://www.gisone.fr/" },
    { text: "HAURATON France SARL", url: "https://www.hauraton.fr/" },
    { text: "ISCHEBECK France", url: "https://www.ischebeckfrance.fr/" },
    { text: "KRINGS INTERNATIONAL France", url: "https://www.krings.com/" },
    { text: "LAFARGE", url: "https://www.lafarge.fr/route-et-reseaux" },
    { text: "MAX RENAUD", url: "https://www.maxrenaud.fr/" },
    { text: "PREFAC", url: "http://www.prefac.com/" },
    { text: "ROUSSEAU SARL", url: "https://www.rousseau-equipements.com/" },
    { text: "SAS ARMATURES", url: "https://www.sasarmatures.com/fr" },
    {
      text: "SOCRAMAT FABRICATION",
      url: "https://www.socramatfabrication.fr/",
    },
    { text: "SOLLASE SOBLINTER", url: "http://blindage-sollase.com/" },
    { text: "VIBROMAT", url: "http://www.vibromat.com" },
    { text: "VICAT", url: "https://www.vicat.fr/" },
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

function TP27ExpandComponent() {
  const a = [
    {
      text: "AQUATERRA SOLUTIONS",
      url: "http://www.aquaterra-solutions.fr/",
    },
    { text: "CHOGNOT SAS", url: "https://www.chognot.fr/" },
    { text: "GABIONOR", url: "https://www.gabionor.fr/" },
    {
      text: "GIE OSERAIES DE France",
      url: "http://www.oseraiesdefrance.com/",
    },
    {
      text: "LA COMPAGNIE DES FORESTIERS",
      url: "https://www.lacompagniedesforestiers.com",
    },
    { text: "L'AGENCE URBAINE", url: "https://www.agence-urbaine.fr/" },
    { text: "CBA", url: "https://www.carriere-ballastiere-alpes.fr/" },
    { text: "SATAR", url: "https://www.satar.fr/fr/hydro-ensemencement" },
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

function TP28ExpandComponent() {
  const a = [
    { text: "ARCADIAS GROUPE", url: "https://www.groupearcadias.com/" },
    { text: "BORNES ACCESS", url: "https://bornesaccess.com/" },
    { text: "CANDELIANCE", url: "https://www.candeliance.fr/" },
    { text: "ESPACE URBAIN", url: "https://www.espace-urbain.fr/" },
    {
      text: "FRONTIER PITTS France",
      url: "https://www.frontier-pitts.fr/",
    },
    { text: "GROUPE ESPACS", url: "http://www.groupe-espacs.com/" },
    { text: "GROUPE IVT SECURITY", url: "http://www.ivtsecurity.com/" },
    { text: "INTRATONE", url: "https://www.intratone.fr/" },
    { text: "MBPS", url: "https://www.mbps.fr/" },
    { text: "NICE IN France", url: "https://www.niceforyou.com/fr/" },
    { text: "PORTIS LYON", url: "http://www.portis.fr/" },
    { text: "SCOLA CONCEPT", url: "https://www.scolaconcept.fr/" },
    { text: "SIGNACLIC", url: "https://www.signaclic.com/" },
    { text: "SODILOR", url: "https://www.sodilor.fr/fr/" },
    { text: "STOP PARK", url: "https://www.stop-park.fr/" },
    { text: "TANSA France SAS", url: "https://www.tansa.fr/" },
    { text: "URBAN-NT", url: "https://www.urbannt.fr/" },
    { text: "VIRAGES", url: "https://www.virages.com/" },
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
          text="TP09-ALIMENTATION ELECTRIQUE - ECLAIRAGE"
          expandComponent={<NinthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP10-TELECOM - VIDEO SURVEILLANCE"
          expandComponent={<TenthExpandComponent />}
        />
        <ManufacturersListItem
          text="TP11-RESEAU AEP"
          expandComponent={<EleventhExpandComponent />}
        />
        <ManufacturersListItem
          text="TP12-ARROSAGE"
          expandComponent={<TwelvethExpandComponent />}
        />
        <ManufacturersListItem
          text="TP13-ESPACES VERTS - PLANTATIONS"
          expandComponent={<TP13ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP14-CLOTURES - PORTAILS"
          expandComponent={<TP14ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP15-SIGNALISATION DE POLICE"
          expandComponent={<TP15ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP16-SIGNALISATION DIRECTIONNELLE"
          expandComponent={<TP16ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP17-SIGNALETIQUE TOURISTIQUE ET COMMERCIALE"
          expandComponent={<TP17ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP18-SIGNALISATION HORIZONTALE"
          expandComponent={<TP18ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP19-MOBILIER URBAIN METAL"
          expandComponent={<TP19ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP20-MOBILIER URBAIN PIERRE/BETON/MATERIAUX RECYCLES"
          expandComponent={<TP20ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP21-MOBILIER EXTERIEUR BOIS"
          expandComponent={<TP21ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP22-ENVIRONNEMENT & COLLECTE DES DECHETS"
          expandComponent={<TP22ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP23-EQUIPEMENTS SPORTIFS DE PROXIMITE"
          expandComponent={<TP23ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP24-ESPACES DE LOISIR - AIRES DE JEUX"
          expandComponent={<TP24ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP25-SIGNALISATION LUMINEUSE TRICOLORE"
          expandComponent={<TP25ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP26-OUVRAGES DE GENIE CIVIL"
          expandComponent={<TP26ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP27-GENIE VEGETAL"
          expandComponent={<TP27ExpandComponent />}
        />
        <ManufacturersListItem
          text="TP28-CONTRÔLE D'ACCES"
          expandComponent={<TP28ExpandComponent />}
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
