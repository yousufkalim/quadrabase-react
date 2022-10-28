import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapsible from '../../../../components/Collapsible/manufacturers';

const primaryCol = '#7E7B75';

const ManufacturersListItem = Collapsible;

const CollapseFabricants = ({ token, loading, libraryData, setFabLoading, fabloading }) => {
  return (
    <>
      <Grid container spacing={1}>
        <Single
          token={token}
          loading={loading}
          libraryData={libraryData}
          setFabLoading={setFabLoading}
          fabloading={fabloading}
        />
      </Grid>
    </>
  );
};

let dumyData = [
  {
    title: 'TP01ss-TRAVAUX PREPARATOIRES',
    fabricants: [
      {
        name: 'ARCADIAS GROUPE',
        url: 'https://www.groupearcadias.com/'
      },
      {
        name: 'BATISEC SAS',
        url: 'https://batisec.fr/'
      },
      {
        name: 'FORNELLS',
        url: 'https://fornells.fr/chantier/'
      },
      {
        name: 'HERAS Sarl',
        url: 'https://www.cloture-mobile.fr/'
      },
      {
        name: 'ISOSIGN',
        url: 'https://isosign.fr/'
      },
      {
        name: 'LACROIX CITY',
        url: 'https://www.lacroix-city.fr/'
      },
      {
        name: 'NADIA SIGNALISATION',
        url: 'http://www.nadia-europ.com/'
      },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr'
      }
    ]
  },
  {
    title: 'TP02-TERRASSEMENTS GENERAUX',
    fabricants: [
      {
        name: 'ANTALVERT',
        url: 'http://www.antalvert.com/'
      },
      {
        name: 'AQUATERRA SOLUTIONS',
        url: 'http://www.aquaterra-solutions.fr/'
      },
      {
        name: 'ATE DRAINAGE',
        url: 'https://www.ate-drainage.com/'
      },
      {
        name: 'BARTHE',
        url: 'https://www.barthe-gratens.fr/gabion'
      },
      {
        name: 'BETAFENCE France SAS',
        url: 'https://www.betafence.fr/'
      },
      {
        name: 'DINGER ENVIRONNEMENT',
        url: 'http://dingerenvironnement.com'
      },
      {
        name: 'EURO-TEC',
        url: 'https://www.euro-tec.fr/'
      },
      {
        name: 'FRAENKISCHE France SAS',
        url: 'www.fraenkische.fr'
      },
      {
        name: 'GABION CENTER',
        url: 'https://www.gabioncenter.com/'
      },
      {
        name: 'GABIONOR',
        url: 'https://www.gabionor.fr/'
      },
      {
        name: 'INTERPLAST',
        url: 'https://interplast.com/fr/nos-produits/'
      },
      {
        name: 'MACCAFERRI France SAS',
        url: 'https://www.maccaferri.com/fr/'
      },
      {
        name: 'SCHEIER France SARL',
        url: 'http://www.scheier.fr/'
      },
      {
        name: 'SYSTEM GROUP France',
        url: 'https://tubi.net/fr/societes/system-group-france/'
      },
      {
        name: 'TOP GREEN',
        url: 'https://www.topgreen.com'
      },
      {
        name: 'WAVIN France',
        url: 'https://www.wavin.com/fr-fr'
      }
    ]
  },
  {
    title: 'TP03-GEO-SYNTHETIQUES - GEO-MEMBRANES',
    fabricants: [
      {
        name: 'AGRU Environnement',
        url: 'https://www.agru.fr/'
      },
      {
        name: 'ECOBIOTEX SAS',
        url: 'https://ecobiotex.fr/'
      },
      {
        name: 'HUESKER France SAS',
        url: 'https://www.huesker.fr/'
      },
      {
        name: 'MACCAFERRI France SAS',
        url: 'https://www.maccaferri.com/fr/'
      },
      {
        name: 'NAUE Applications SARL',
        url: 'https://www.naue.fr/'
      },
      {
        name: 'PROTERRA Environnement',
        url: 'https://www.proterra-environnement.com/'
      },
      {
        name: 'SIPLAST',
        url: 'https://www.siplast.fr'
      },
      {
        name: 'TERAGEOS',
        url: 'https://www.terageos.com/'
      }
    ]
  },

  {
    title: 'TP04-CHAUSSEES',
    fabricants: [
      {
        name: 'AFITEXINOV',
        url: 'http://www.afitex.com/fr/'
      },
      {
        name: 'LAFARGE',
        url: 'https://www.lafarge.fr/route-et-reseaux'
      }
    ]
  },
  {
    title: 'TP05-VOIRIES - ESPACES PUBLICS',
    fabricants: [
      {
        name: 'AFITEXINOV',
        url: 'http://www.afitex.com/fr/'
      },
      {
        name: 'AGRESTA',
        url: 'https://www.agresta.fr/fr/'
      },
      {
        name: 'AQUITER',
        url: 'https://aquiter.com/'
      },
      {
        name: 'BONOMI SA',
        url: 'http://www.bonomi-beton.fr/'
      },
      {
        name: 'CALMINIA',
        url: 'http://www.calminia.com/'
      },
      {
        name: 'CELTYS',
        url: 'https://www.celtys.fr/'
      },
      {
        name: 'COLAS',
        url: 'https://www.colas.com/sites/default/files/produits/noticetechniquevegecol_bd_0.pdf'
      },
      {
        name: 'COMINEX',
        url: 'http://www.equipements-ouvrages-art.fr/'
      },
      {
        name: 'CONSOLIS BONNA SABLA',
        url: 'https://www.bonnasabla.com'
      },
      {
        name: 'CRP SAS',
        url: 'http://www.crpsas.com'
      },
      {
        name: 'DA COSTA PAVAGE',
        url: 'https://dacosta-pavage-paca.fr'
      },
      {
        name: 'EIFFAGE ROUTE',
        url: 'https://www.eiffageroute.com/'
      },
      {
        name: 'EUROPIERRE',
        url: 'https://www.euro-pierre.fr'
      },
      {
        name: 'EUROVIA',
        url: 'http://www.groupe-signature.com/fr/notre-offre/fluidite-du-trafic'
      },
      {
        name: 'FOURNIER PREFA',
        url: 'http://www.fournier-prefa.com'
      },
      {
        name: 'GALLAUD Ets',
        url: 'http://www.gallaud-beton.fr/'
      },
      {
        name: 'GRANIER DIFFUSION',
        url: 'https://www.granier-diffusion.com/'
      },
      {
        name: 'Groupe DANIEL',
        url: 'https://www.groupe-daniel.fr/'
      },
      {
        name: 'LAFARGE',
        url: 'https://www.lafarge.fr/route-et-reseaux'
      },
      {
        name: 'LPB',
        url: 'http://www.lpb-sa.com'
      },
      {
        name: 'PAC Etablissements',
        url: 'https://www.ets-pac.fr'
      },
      {
        name: 'PAVES DE RUE',
        url: 'https://www.pavesderue.com'
      },
      {
        name: 'PIERRE ET SOL',
        url: 'https://www.pierreetsol.com'
      },
      {
        name: 'PLATTARD SAS',
        url: 'https://www.plattard.fr'
      },
      {
        name: 'PROFIL 06',
        url: 'https://www.profil06.fr'
      },
      {
        name: 'PROPRESO',
        url: 'http://www.propreso.fr'
      },
      {
        name: 'RESINEO',
        url: 'https://www.resineo.com/'
      },
      {
        name: 'SEPA',
        url: 'https://www.sepa-alsace.com/bordures-de-trottoir-en-beton.html'
      },
      {
        name: 'SETP',
        url: 'https://www.setp.fr/'
      },
      {
        name: 'SOTUBEMA',
        url: 'https://www.sotubema.fr'
      }
    ]
  },
  {
    title: 'TP06-TRAVAUX DE MACONNERIES - SOUTENEMENTS',
    fabricants: [
      {
        name: 'BERTHOZAT',
        url: 'https://www.pbabeton.fr/'
      },
      {
        name: 'CHASI',
        url: 'https://www.chasi.fr/'
      },
      {
        name: 'ISCHEBECK France',
        url: 'https://www.ischebeckfrance.fr/'
      },
      {
        name: 'KRINGS INTERNATIONAL France',
        url: 'https://www.krings.com/'
      },
      {
        name: 'MAX RENAUD',
        url: 'https://www.maxrenaud.fr/'
      },
      {
        name: 'SOLLASE SOBLINTER',
        url: 'http://blindage-sollase.com/'
      }
    ]
  },

  {
    title: 'TP07-RESEAUX DIVERS',
    fabricants: [
      {
        name: 'CELESTIN MATERIAUX',
        url: 'https://www.celestin-materiaux.fr/'
      },
      {
        name: 'CHASI',
        url: 'https://www.chasi.fr/'
      },
      {
        name: 'COURANT',
        url: 'https://www.courant.fr/'
      },
      {
        name: 'EJ Fonderie',
        url: 'https://www.ejco.com/fr/fr/'
      },
      {
        name: 'FORMATUB',
        url: 'https://formatub-budget.com/'
      },
      {
        name: 'FRANS BONHOMME',
        url: 'https://www.fransbonhomme.fr/'
      },
      {
        name: 'GISONE',
        url: 'http://www.gisone.fr/'
      },
      {
        name: 'GLS FUNDUCTIL France',
        url: 'http://glsfunductil.fr/'
      },
      {
        name: 'GROUPE ELYDAN',
        url: 'https://elydan.eu/'
      },
      {
        name: 'INTERPLAST',
        url: 'https://interplast.com/fr/nos-produits/'
      },
      {
        name: 'ISCHEBECK France',
        url: 'https://www.ischebeckfrance.fr/'
      },
      {
        name: 'KRINGS INTERNATIONAL France',
        url: 'https://www.krings.com/'
      },
      {
        name: 'MAX RENAUD',
        url: 'https://www.maxrenaud.fr/'
      },
      {
        name: 'MPB CONSOLIS',
        url: 'https://www.mpb.fr/'
      },
      {
        name: 'PENET',
        url: 'https://penet-plastiques.fr/'
      },
      {
        name: 'PLATTARD SAS',
        url: 'https://www.plattard.fr'
      },
      {
        name: 'PUM PLASTIQUES SAS',
        url: 'https://www.pumplastiques.fr/'
      },
      {
        name: 'RESOFLEX',
        url: 'https://www.peignes-tp-resoflex.fr/resoflex/'
      },
      {
        name: 'SAINT-GOBAIN PAM',
        url: 'https://www.pamline.fr/'
      },
      {
        name: 'SOLLASE SOBLINTER',
        url: 'http://blindage-sollase.com/'
      },
      {
        name: 'STRADAL',
        url: 'https://www.stradal.fr/'
      },
      {
        name: 'STRPEPP',
        url: 'https://www.strpepp.org/'
      },
      {
        name: 'TECOMAT SAS',
        url: 'https://www.telcomat.com/'
      }
    ]
  },
  {
    title: 'TP08-ASSAINISSEMENTS EU-EP',
    fabricants: [
      {
        name: 'ACO France Sarl',
        url: 'www.aco.fr'
      },
      {
        name: 'ALKERN',
        url: 'https://www.alkern.fr/'
      },
      {
        name: 'ATE DRAINAGE',
        url: 'https://www.ate-drainage.com/'
      },
      {
        name: 'BEMACO',
        url: 'https://www.bemaco.fr/bemaco-assainissement/'
      },
      {
        name: 'BIRCO France',
        url: 'https://www.birco.fr/'
      },
      {
        name: 'BLARD',
        url: 'https://www.blard-assainissement.fr/'
      },
      {
        name: 'BONNA SABLA',
        url: 'https://www.bonnasabla.com/'
      },
      {
        name: 'CIMENTUB',
        url: 'https://www.cimentub.fr/'
      },
      {
        name: 'COC ENVIRONNEMENT',
        url: 'http://www.eog-technology.com/'
      },
      {
        name: 'CRP SAS',
        url: 'http://www.crpsas.com'
      },
      {
        name: 'ELYDAN',
        url: 'https://elydan.eu/produits/nappe-solpac/'
      },
      {
        name: 'FRAENKISCHE France SAS',
        url: 'www.fraenkische.fr'
      },
      {
        name: 'GROUPE ADG',
        url: 'http://www.adgbeton.fr/produits-batiment-tp/buses-et-siphons.html'
      },
      {
        name: 'Groupe DANIEL',
        url: 'https://www.groupe-daniel.fr/'
      },
      {
        name: 'HAURATON France SARL',
        url: 'https://www.hauraton.fr/'
      },
      {
        name: 'HOBAS',
        url: 'https://www.hobas.com/fr/products/'
      },
      {
        name: 'HYDRHECO',
        url: 'https://hydrheco.com/'
      },
      {
        name: 'INTERPLAST',
        url: 'https://interplast.com/fr/nos-produits/'
      },
      {
        name: 'MEHAT',
        url: 'https://www.mehat.fr/clotures-beton'
      },
      {
        name: 'NICOLL',
        url: 'https://www.nicoll.fr/fr'
      },
      {
        name: 'NORMANDY TUB',
        url: 'https://normandytub.com/'
      },
      {
        name: 'OCIDO',
        url: 'http://www.separateur-decanteur-lamellaire.fr/'
      },
      {
        name: 'PAMLINE',
        url: 'https://www.pamline.fr/'
      },
      {
        name: 'PENET',
        url: 'https://penet-plastiques.fr/'
      },
      {
        name: 'PILLON FRERES SARL',
        url: 'http://www.pillonfreres.fr/'
      },
      {
        name: 'PIPELIFE France',
        url: 'https://www.pipelife.fr/'
      },
      {
        name: 'PLATTARD SAS',
        url: 'https://www.plattard.fr'
      },
      {
        name: 'PUM PLASTIQUES SAS',
        url: 'https://www.pumplastiques.fr/'
      },
      {
        name: 'SEBICO',
        url: 'https://www.sebico.fr/'
      },
      {
        name: 'SILIX',
        url: 'https://www.silix.pro/'
      },
      {
        name: 'SIMOP',
        url: 'https://www.simop.fr/'
      },
      {
        name: 'SOVAL',
        url: 'https://www.soval.fr/'
      },
      {
        name: 'SYSTEM GROUP France',
        url: 'https://tubi.net/fr/societes/system-group-france/'
      },
      {
        name: 'TECHNEAU',
        url: 'https://www.techneau.com/accueil/'
      },
      {
        name: 'TERAGEOS',
        url: 'https://www.terageos.com/'
      },
      {
        name: 'THEBAULT',
        url: 'https://www.robert-thebault.fr/btp/accueil'
      },
      {
        name: 'WAVIN France',
        url: 'https://www.wavin.com/fr-fr'
      }
    ]
  },
  {
    title: 'TP09-ALIMENTATION ELECTRIQUE - ECLAIRAGE',
    fabricants: [
      {
        name: 'ALUNOX',
        url: 'http://www.alunox.fr/'
      },
      {
        name: 'AUBRILAM',
        url: 'https://www.aubrilam.com/fr/'
      },
      {
        name: 'CAHORS GROUPE',
        url: 'https://www.groupe-cahors.com/fr-france/chambres-de-tirage.html'
      },
      {
        name: 'CONIMAST INTERNATIONAL',
        url: 'https://www.conimast.fr/'
      },
      {
        name: 'ECI-SIGNALISATION',
        url: 'http://www.eci-signalisation.fr/'
      },
      {
        name: 'ECLAIRAGE DESIGN',
        url: 'https://www.eclairage-design.com/'
      },
      {
        name: 'ECLATEC',
        url: 'www.eclatec.com'
      },
      {
        name: 'GHM',
        url: 'https://www.ghm.fr/fr/'
      },
      {
        name: 'GROLLEAU SA',
        url: 'https://www.grolleau.fr/'
      },
      {
        name: 'LUMIERES DE France',
        url: 'http://www.lumieresdefrance.com/php/'
      },
      {
        name: 'MSA',
        url: 'https://www.msaron.fr/'
      },
      {
        name: 'NEXANS France',
        url: 'https://www.nexans.fr/'
      },
      {
        name: 'OCCIREP',
        url: 'http://www.occirep.com/fr/page/eclairage-exterieur.php'
      },
      {
        name: 'PETITJEAN SAS',
        url: 'https://www.petitjean.fr/'
      },
      {
        name: 'RAGNI',
        url: 'https://www.ragni.com/'
      },
      {
        name: 'SEIFEL SAS',
        url: 'http://www.seifel.fr/'
      },
      {
        name: 'SIEBA',
        url: 'http://www.sieba.fr/pylones-beton'
      },
      {
        name: 'SILUMEN',
        url: 'https://www.silumen.com/fr/'
      },
      {
        name: 'SOCABEL',
        url: 'http://www.socabel.com/'
      },
      {
        name: 'STRADAL',
        url: 'https://www.stradal.fr/'
      },
      {
        name: 'TECHNILUM',
        url: 'https://www.technilum.com/'
      },
      {
        name: 'VALMONT France SAS',
        url: 'https://www.valmont-france.com/'
      }
    ]
  },
  {
    title: 'TP10-TELECOM - VIDEO SURVEILLANCE',
    fabricants: [
      {
        name: 'BONNA SABLA',
        url: 'https://www.bonnasabla.com/'
      },
      {
        name: 'CAHORS GROUPE',
        url: 'https://www.groupe-cahors.com/fr-france/chambres-de-tirage.html'
      },
      {
        name: 'COURANT',
        url: 'https://www.courant.fr/'
      },
      {
        name: 'FABEMI',
        url: 'https://www.fabemi.fr/produit/chambre-telecom/'
      },
      {
        name: 'France BOIS',
        url: 'https://www.franceboisimpregnes.fr/'
      },
      {
        name: 'FRANS BONHOMME',
        url: 'https://www.fransbonhomme.fr/'
      },
      {
        name: 'GISONE',
        url: 'http://www.gisone.fr/'
      },
      {
        name: 'INTERPLAST',
        url: 'https://interplast.com/fr/nos-produits/'
      },
      {
        name: 'KMC',
        url: 'https://www.groupe-kmc.com/les-entreprises/semap-composite'
      },
      {
        name: 'NEXANS France',
        url: 'https://www.nexans.fr/'
      },
      {
        name: 'PENET',
        url: 'https://penet-plastiques.fr/'
      },
      {
        name: 'PIPELIFE France',
        url: 'https://www.pipelife.fr/'
      },
      {
        name: 'PUM PLASTIQUES SAS',
        url: 'https://www.pumplastiques.fr/'
      },
      {
        name: 'STRADAL',
        url: 'https://www.stradal.fr/'
      },
      {
        name: 'TALIAPLAST',
        url: 'https://www.taliaplast.com/fr/categorie/signalisation-et-balisage-de-chantier/signalisation-diverse/grillages-avertisseurs'
      }
    ]
  },
  {
    title: 'TP11-RESEAU AEP',
    fabricants: [
      {
        name: 'ATLANTIC ROBINETTERIE',
        url: 'https://www.atlantic-robinetterie.fr/'
      },
      {
        name: 'BAYARD',
        url: 'https://www.bayard.fr/produits/nos-produits.html'
      },
      {
        name: 'ELECTROSTEEL',
        url: 'https://www.electrosteel.fr/'
      },
      {
        name: 'FORMATUB',
        url: 'https://formatub-budget.com/'
      },
      {
        name: 'FRANS BONHOMME',
        url: 'https://www.fransbonhomme.fr/'
      },
      {
        name: 'INTERPLAST',
        url: 'https://interplast.com/fr/nos-produits/'
      },
      {
        name: 'PENET',
        url: 'https://penet-plastiques.fr/'
      },
      {
        name: 'PIPELIFE France',
        url: 'https://www.pipelife.fr/'
      },
      {
        name: 'PUM PLASTIQUES SAS',
        url: 'https://www.pumplastiques.fr/'
      },
      {
        name: 'SAINT-GOBAIN PAM',
        url: 'https://www.pamline.fr/'
      },
      {
        name: 'SOVAL',
        url: 'https://www.soval.fr/'
      },
      {
        name: 'VERT BLEU',
        url: 'https://www.vert-bleu.fr/'
      },
      {
        name: 'VONROLL HYDRO SAS',
        url: 'https://www.vonroll-hydro.fr/fr/'
      },
      {
        name: 'WAVIN France',
        url: 'https://www.wavin.com/fr-fr'
      }
    ]
  },
  {
    title: 'TP12-ARROSAGE',
    fabricants: [
      {
        name: 'ALLAMAN',
        url: 'https://www.allaman.fr/citerne-pour-stockage-des-eaux-de-pluie.html'
      },
      {
        name: 'ALSAPLAST',
        url: 'https://www.alsaplast.com/cuve-plastique/'
      },
      {
        name: 'API PLASTIQUES',
        url: 'https://www.apiplast.fr/cuves-de-stockage-plastique/'
      },
      {
        name: 'ARROSAGE DISTRIBUTION',
        url: 'https://www.arrosage-distribution.fr/'
      },
      {
        name: 'CADIOU',
        url: 'https://cadiou-chaudronnerie-plastique.com/'
      },
      {
        name: 'CELESTIN MATERIAUX',
        url: 'https://www.celestin-materiaux.fr/'
      },
      {
        name: 'CONCEPT CUVE',
        url: 'https://www.conceptcuve.com/cuves.html'
      },
      {
        name: 'EJ Fonderie',
        url: 'https://www.ejco.com/fr/fr/'
      },
      {
        name: 'France ARROSAGE',
        url: 'http://france-arrosage.fr/'
      },
      {
        name: 'GISONE',
        url: 'http://www.gisone.fr/'
      },
      {
        name: 'GLS FUNDUCTIL France',
        url: 'http://glsfunductil.fr/'
      },
      {
        name: 'GRUNDFOS Distribution SAS',
        url: 'https://fr.grundfos.com/'
      },
      {
        name: 'HARLOR',
        url: 'http://www.harlor.fr/cuve-de-stockage-plastique-grand-volume-pehd/'
      },
      {
        name: 'JETLY',
        url: 'https://www.jetly.com/fr/'
      },
      {
        name: 'PLASTEAM',
        url: 'http://www.plasteam.fr/cuves-de-stockage-cylindriques-et-rectangulaires.html'
      },
      {
        name: 'PLASTEAU',
        url: 'https://www.plasteau.com/'
      },
      {
        name: 'PLATTARD SAS',
        url: 'https://www.plattard.fr'
      },
      {
        name: 'RAIN BIRD EUROPE SNC',
        url: 'https://www.rainbird.fr/'
      },
      {
        name: 'SAINT-GOBAIN PAM',
        url: 'https://www.pamline.fr/'
      },
      {
        name: 'STRADAL',
        url: 'https://www.stradal.fr/'
      },
      {
        name: 'TECHNIPLAST',
        url: 'https://techniplast-sas.com/fr/cuve-plastique.html'
      },
      {
        name: 'TUBAO',
        url: 'https://www.tubao.fr/'
      }
    ]
  },
  {
    title: 'TP13-ESPACES VERTS - PLANTATIONS',
    fabricants: [
      {
        name: '123GAZON',
        url: 'https://123-gazon.fr/'
      },
      {
        name: "AG'CO",
        url: 'http://www.gazon-synthetique-agco.fr/'
      },
      {
        name: 'AZURIO',
        url: 'https://www.azurio-gazon.fr/'
      },
      {
        name: 'BHS',
        url: 'https://www.bhs.fr/'
      },
      {
        name: 'CAILLARD',
        url: 'https://graines-caillard.com/'
      },
      {
        name: 'DISTRICONCEPT',
        url: 'https://www.distri-concept.com'
      },
      {
        name: 'EXELGREEN France',
        url: 'https://www.exelgreen.com/fr/'
      },
      {
        name: 'GAZONDIRECT',
        url: 'https://www.gazondirect.fr/'
      },
      {
        name: 'GAZONEO SARL',
        url: 'https://www.gazoneo.fr/'
      },
      {
        name: 'GREEN ECO CONCEPT',
        url: 'https://www.greenecoconcept.com/'
      },
      {
        name: 'GREEN ZONE',
        url: 'https://gazon-synthetique-herault.fr/'
      },
      {
        name: 'GREENTOUCH GAZON',
        url: 'http://www.gazon-greentouch.com/'
      },
      {
        name: 'GUILLOT-BOURNE II',
        url: 'https://www.guillot-bourne.com/'
      },
      {
        name: 'JAMES-GRASS',
        url: 'https://www.james-grass.fr/'
      },
      {
        name: 'LA PEPINIERE DU BOSC',
        url: 'https://www.pepinieredubosc.fr/'
      },
      {
        name: 'LES GAZONS DE France',
        url: 'http://www.semence-gazon.fr/'
      },
      {
        name: 'LORAS GRAINES',
        url: 'https://www.graines-loras.com/'
      },
      {
        name: 'PEPINIERES BAUCHERY',
        url: 'https://bauchery.fr/'
      },
      {
        name: 'PEPINIERES BRAVARD',
        url: 'http://www.bravard.fr/'
      },
      {
        name: 'PEPINIERES CHARENTAISES',
        url: 'https://www.pepinieres-charentaises.com/fr/'
      },
      {
        name: 'PEPINIERES CHARGE',
        url: 'https://www.pepinieres-charge.com/'
      },
      {
        name: 'PEPINIERES COTTE',
        url: 'http://www.pepinieres-cotte.com/'
      },
      {
        name: 'PEPINIERES DE BAZAINVILLE',
        url: 'https://www.pepinieres-bazainville.fr/'
      },
      {
        name: 'PEPINIERES DE MARNAY',
        url: 'https://www.pepinieres-marnay.com/'
      },
      {
        name: 'PEPINIERES DE SAINT-CYPRIEN',
        url: 'http://pepinieres-saint-cyprien.com/'
      },
      {
        name: 'PEPINIERES FOLLIN',
        url: 'http://www.pepinieres-follin.com/'
      },
      {
        name: 'PEPINIERES GROMOLARD',
        url: 'https://www.pepinieres-gromolard.com/'
      },
      {
        name: 'PEPINIERES IMBERT',
        url: 'http://www.pepinieres-imbert.fr/'
      },
      {
        name: 'PEPINIERES JACQUET',
        url: 'https://www.pepinieresjacquet.com/'
      },

      {
        name: 'PEPINIERES JEAN HUCHET',
        url: 'https://www.pepinieres-huchet.com/'
      },
      {
        name: 'PEPINIERES LECOMTE',
        url: 'https://www.pepinieres-lecomte.com/'
      },
      {
        name: 'PEPINIERES NAUDET',
        url: 'https://www.pepinieres-naudet.com/'
      },
      {
        name: 'PEPINIERES RIPAUD',
        url: 'https://www.ripaudpepinieres.com/'
      },
      {
        name: 'PEPINIERES SCRIVE',
        url: 'https://www.pepinierescrive.com/'
      },
      {
        name: 'PEPINIERES VALDEDRE',
        url: 'https://www.pepinieres-valderdre.fr/'
      },
      {
        name: 'PHM',
        url: 'https://www.pepiniere-phm.fr/'
      },

      {
        name: 'TOP GREEN',
        url: 'https://www.topgreen.com'
      }
    ]
  },
  {
    title: 'TP14-CLOTURES - PORTAILS',
    fabricants: [
      {
        name: 'AABIS',
        url: 'http://aabis.fr/'
      },
      {
        name: 'AKIA France',
        url: 'https://www.akia-system.com/fr/motorisation-portail-battant-a-roue/'
      },
      {
        name: 'BETAFENCE France SAS',
        url: 'https://www.betafence.fr/'
      },
      {
        name: 'CAME',
        url: 'https://www.came.com/fr/'
      },
      {
        name: 'CAVATORTA France SA',
        url: 'https://www.cavatorta.fr/'
      },
      {
        name: 'CLONOR',
        url: 'https://www.clonor.com/'
      },
      {
        name: 'CLOSAMBRE',
        url: 'http://www.closambre.com/'
      },
      {
        name: 'CLOTURES NICOLAS',
        url: 'https://www.clotures-nicolas.fr/'
      },
      {
        name: 'DIRICKX GROUPE',
        url: 'https://www.dirickx.fr/'
      },
      {
        name: 'EUROFENCE',
        url: 'http://eurofence.pro/'
      },
      {
        name: 'EUROPE AUTOMATISMES',
        url: 'https://www.europe-automatismes.com/'
      },
      {
        name: 'GANTOIS INDUSTRIES',
        url: 'https://www.gantois.com/fr/'
      },
      {
        name: 'GREEN CLOTURE',
        url: 'https://greencloture.fr/'
      },
      {
        name: 'GRILLAGES NAAS',
        url: 'https://www.grillages-naas.com/'
      },
      {
        name: 'JERREL SAS',
        url: 'https://www.jerrel.fr/'
      },
      {
        name: 'KOCH SAS',
        url: 'https://www.lambert-clotures.com/koch-clotures-91.html'
      },
      {
        name: 'MARIUS WASILEWSKI',
        url: 'http://www.marius-wasilewski.fr/poteau-beton-grillage-180/'
      },
      {
        name: 'MEHAT',
        url: 'https://www.mehat.fr/clotures-beton'
      },
      {
        name: 'MEVACO SARL',
        url: 'https://www.mevaco.fr/'
      },
      {
        name: 'NORMACLO',
        url: 'http://www.normaclo.com/'
      },
      {
        name: 'PROPRESO',
        url: 'http://www.propreso.fr'
      },
      {
        name: 'PROTECO',
        url: 'https://www.boutique-proteco.fr/'
      },
      {
        name: 'SCHERTZ',
        url: 'http://www.schertz.fr/'
      },
      {
        name: 'VERMIGLI',
        url: 'http://vermigli.com/'
      }
    ]
  },
  {
    title: 'TP15-SIGNALISATION DE POLICE',
    fabricants: [
      {
        name: 'ARCADIAS GROUPE',
        url: 'https://www.groupearcadias.com/'
      },
      {
        name: 'GROUPE HELIOS',
        url: 'http://www.groupe-helios.fr/'
      },
      {
        name: 'HICON France',
        url: 'http://www.hicon.fr/'
      },
      {
        name: 'ISOSIGN',
        url: 'https://isosign.fr/'
      },
      {
        name: 'LACROIX CITY',
        url: 'https://www.lacroix-city.fr/'
      },
      {
        name: 'NADIA SIGNALISATION',
        url: 'http://www.nadia-europ.com/'
      },
      {
        name: 'NICOLAS SIGNALISATION',
        url: 'https://www.nicolas-signalisation.fr/'
      },
      {
        name: 'SICOM SA',
        url: 'http://www.sicom-sa.com/'
      },
      {
        name: 'SIGNAL CONCEPT',
        url: 'http://signalconcept.fr/'
      },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr/'
      }
    ]
  },
  {
    title: 'TP16-SIGNALISATION DIRECTIONNELLE',
    fabricants: [
      { name: 'ARCADIAS GROUPE', url: 'https://www.groupearcadias.com/' },
      { name: 'GROUPE HELIOS', url: 'http://www.groupe-helios.fr/' },
      { name: 'HICON France', url: 'http://www.hicon.fr/' },
      { name: 'ISOSIGN', url: 'https://isosign.fr/' },
      { name: 'LACROIX CITY', url: 'https://www.lacroix-city.fr/' },
      { name: 'NADIA SIGNALISATION', url: 'http://www.nadia-europ.com/' },
      { name: 'SICOM SA', url: 'http://www.sicom-sa.com/' },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr'
      }
    ]
  },
  {
    title: 'TP17-SIGNALETIQUE TOURISTIQUE ET COMMERCIALE',
    fabricants: [
      { name: 'AD PRODUCTION', url: 'https://ad-production.fr/' },
      { name: 'ARCADIAS GROUPE', url: 'https://www.groupearcadias.com/' },
      {
        name: 'GRAPFICOM',
        url: 'https://signaletique-enseigne-ajaccio-bastia.com/'
      },
      { name: 'GROUPE HELIOS', url: 'http://www.groupe-helios.fr/' },
      { name: 'HICON France', url: 'http://www.hicon.fr/' },
      { name: 'ISOSIGN', url: 'https://isosign.fr/' },
      { name: 'LACROIX CITY', url: 'https://www.lacroix-city.fr/' },
      { name: 'NADIA SIGNALISATION', url: 'http://www.nadia-europ.com/' },
      { name: 'PIC BOIS', url: 'https://www.pic-bois.com/' },
      { name: 'SICOM SA', url: 'http://www.sicom-sa.com/' },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr'
      }
    ]
  },
  {
    title: 'TP18-SIGNALISATION HORIZONTALE',
    fabricants: [
      { name: 'AZ MARQUAGE', url: 'www.azmarquage.fr' },
      { name: 'GROUP HELIOS', url: 'http://www.groupe-helios.fr/' },
      { name: 'ISOSIGN', url: 'https://isosign.fr/' },
      { name: 'JBC SIGNALISATION', url: 'https://www.jcbsignalisation.com/' },
      { name: 'LACROIX CITY', url: 'https://www.lacroix-city.fr/' },
      { name: 'LLACER', url: 'https://www.marquage-llacer.fr/' },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr'
      }
    ]
  },
  {
    title: 'TP20-MOBILIER URBAIN PIERRE/BETON/MATERIAUX RECYCLES',
    fabricants: [
      { name: 'ACROPOSE', url: 'https://www.acropose.com/' },
      { name: 'ARCADIAS GROUPE', url: 'https://www.groupearcadias.com/' },
      { name: 'ATECH', url: 'https://www.atech-sas.com/' },
      { name: 'BRUT METAL', url: 'http://www.brut-metal.com/' },
      { name: 'BUTON DESIGN', url: 'https://www.buton-design.com/' },
      { name: 'CONCEPT URBAIN', url: 'http://www.concept-urbain.fr/' },
      { name: 'CREAMETAL', url: 'https://www.creametal.com/' },
      { name: 'FRAMETO METALLERIE', url: 'http://www.frameto.fr/' },
      { name: 'GLASDON EUROPE SARL', url: 'https://fr.glasdon.com/' },
      {
        name: 'GUYON MOBILIER URBAIN',
        url: 'https://www.guyon-mobilier-urbain.com/'
      },
      { name: 'LACROIX CITY', url: 'https://www.lacroix-city.fr/' },
      { name: 'METALCO MOBIL CONCEPTS', url: 'https://metalco.fr/' },
      { name: 'MILLET CULINOR', url: 'http://www.millet-culinor.com/' },
      { name: 'MU MOBILIER', url: 'https://www.mu-mobilier.com/' },
      { name: 'NADIA SIGNALISATION', url: 'http://www.nadia-europ.com/' },
      { name: 'OESTERLE', url: 'http://www.oesterle.fr/' },
      { name: 'POLYMOBYL France', url: 'https://www.polymobyl.com/' },
      {
        name: 'SIGNATURE GROUPE',
        url: 'https://www.groupe-signature.com/fr/'
      },
      {
        name: 'SIGNAUX GIROD',
        url: 'https://www.girod-signalisation.com/fr'
      },
      { name: 'SINEU GRAFF', url: 'https://sineugraff.com/fr/' }
    ]
  },

  {
    title: 'TP21-MOBILIER EXTERIEUR BOIS',
    fabricants: [
      {
        name: 'AFIPH ENTREPRISES',
        url: 'https://www.afiph-entreprises.org/'
      },
      { name: 'BOIS ET VIA', url: 'http://www.boisetvia.fr/' },
      { name: 'BOISDEXTER', url: 'https://boisdexter.fr/' },
      {
        name: 'ESAT',
        url: 'https://www.esat-adsea-nievre.com/mobilier-dexterieur-en-bois/'
      },
      {
        name: 'GUYON MOBILIER URBAIN',
        url: 'https://www.guyon-mobilier-urbain.com/'
      },
      {
        name: 'LABAT-MERLE',
        url: 'https://www.labat-merle.fr/mobilier-de-plein-air/'
      },
      {
        name: 'MAROLLEAU AMENAGEMENT BOIS',
        url: 'https://www.marolleau-amenagement-bois.com/'
      },
      {
        name: 'MERLE & FILS',
        url: 'http://www.aquitaine-parquet-terrasse.fr/'
      },
      { name: 'RONDINO', url: 'http://www.rondino.fr/' },
      { name: 'Sarl SCIEBOIS', url: 'https://www.sciebois.fr/' }
    ]
  },
  {
    title: 'TP22-ENVIRONNEMENT & COLLECTE DES DECHETS',
    fabricants: [
      { name: 'ASTECH', url: 'https://www.astech-eco.com' },
      { name: 'COLLECTAL', url: 'https://www.collectal.fr' },
      { name: 'COLLVERT', url: 'https://www.collvert.fr/' },
      { name: 'ECOLLECT', url: 'https://www.ecollect.fr/' },
      { name: 'ENGELS', url: 'https://www.engels.fr/' },
      { name: 'ESE France', url: 'https://www.ese.com/fr/' },
      { name: 'FABRIQUE DES GAVOTTES', url: 'http://composteur-bois.eu/' },
      { name: 'MOLOK France SAS', url: 'https://www.molok.com/fr/' },
      { name: 'QUADRIA Environnement', url: 'https://www.quadria.eu' },
      { name: 'SULO', url: 'http://www.sulo.fr' },
      { name: 'TERCOL', url: 'http://www.tercol.fr' },
      { name: 'TUCOM BERNARD SARL', url: 'http://www.tucom-bernard.fr/' }
    ]
  },

  {
    title: 'TP23-EQUIPEMENTS SPORTIFS DE PROXIMITE',
    fabricants: [
      { name: 'BWA SPORTS', url: 'https://www.bwa-sports.fr/' },
      {
        name: "GROUPE SAE TENNIS D'AQUITAINE",
        url: 'http://www.groupesae.com/'
      },
      { name: 'METALUPLAST', url: 'https://www.metalu-plast.com/' },
      { name: 'MILLET CULINOR', url: 'http://www.millet-culinor.com/' },
      { name: 'OP SPORT CONCEPT', url: 'https://www.opsportconcept.com/' },
      { name: 'SATD SA', url: 'http://www.satd-sa.com/' },
      { name: 'SODEX SPORT', url: 'https://www.sodexsport.fr/' },
      { name: 'SPSFILETS', url: 'https://spsfilets.com/fr/' },
      { name: 'URBASPORT', url: 'http://www.urbasport.fr/' }
    ]
  },
  {
    title: 'TP25-SIGNALISATION LUMINEUSE TRICOLORE',
    fabricants: [
      { name: 'AXIMUM', url: 'http://www.aximum.fr/fr/' },
      { name: 'ECI-SIGNALISATION', url: 'http://www.eci-signalisation.fr/' },
      { name: 'GROLLEAU SA', url: 'https://www.grolleau.fr/' },
      { name: 'JPV EQUIPEMENTS', url: 'http://www.jpve-signalisation.com/' },
      { name: 'NEXANS France', url: 'https://www.nexans.fr/' },
      { name: 'SEA SIGNALISATION', url: 'http://www.sea-signalisation.fr/' },
      { name: 'SOCABEL', url: 'http://www.socabel.com/' }
    ]
  },
  {
    title: 'TP26-OUVRAGES DE GENIE CIVIL',
    fabricants: [
      { name: '2ARMATUR', url: 'https://www.2armatures.fr/' },
      { name: 'ALKERN', url: 'https://www.alkern.fr/' },
      { name: 'ARMAT AUVERGNE', url: 'http://www.armat-auvergne.com/' },
      { name: 'ARMATECH', url: 'https://www.armatech.fr/' },
      { name: 'BIRCO France', url: 'https://www.birco.fr/' },
      { name: 'CHASI', url: 'https://www.chasi.fr/' },
      { name: 'COMELY', url: 'http://www.equipements-ouvrages-art.fr/' },
      { name: 'GISONE', url: 'http://www.gisone.fr/' },
      { name: 'HAURATON France SARL', url: 'https://www.hauraton.fr/' },
      { name: 'ISCHEBECK France', url: 'https://www.ischebeckfrance.fr/' },
      { name: 'KRINGS INTERNATIONAL France', url: 'https://www.krings.com/' },
      { name: 'LAFARGE', url: 'https://www.lafarge.fr/route-et-reseaux' },
      { name: 'MAX RENAUD', url: 'https://www.maxrenaud.fr/' },
      { name: 'PREFAC', url: 'http://www.prefac.com/' },
      { name: 'ROUSSEAU SARL', url: 'https://www.rousseau-equipements.com/' },
      { name: 'SAS ARMATURES', url: 'https://www.sasarmatures.com/fr' },
      {
        name: 'SOCRAMAT FABRICATION',
        url: 'https://www.socramatfabrication.fr/'
      },
      { name: 'SOLLASE SOBLINTER', url: 'http://blindage-sollase.com/' },
      { name: 'VIBROMAT', url: 'http://www.vibromat.com' },
      { name: 'VICAT', url: 'https://www.vicat.fr/' }
    ]
  },
  {
    title: 'TP27-GENIE VEGETAL',
    fabricants: [
      {
        name: 'AQUATERRA SOLUTIONS',
        url: 'http://www.aquaterra-solutions.fr/'
      },
      { name: 'CHOGNOT SAS', url: 'https://www.chognot.fr/' },
      { name: 'GABIONOR', url: 'https://www.gabionor.fr/' },
      {
        name: 'GIE OSERAIES DE France',
        url: 'http://www.oseraiesdefrance.com/'
      },
      {
        name: 'LA COMPAGNIE DES FORESTIERS',
        url: 'https://www.lacompagniedesforestiers.com'
      },
      { name: "L'AGENCE URBAINE", url: 'https://www.agence-urbaine.fr/' },
      { name: 'CBA', url: 'https://www.carriere-ballastiere-alpes.fr/' },
      { name: 'SATAR', url: 'https://www.satar.fr/fr/hydro-ensemencement' }
    ]
  },
  {
    title: "TP28-CONTRÔLE D'ACCES",
    fabricants: [
      { name: 'ARCADIAS GROUPE', url: 'https://www.groupearcadias.com/' },
      { name: 'BORNES ACCESS', url: 'https://bornesaccess.com/' },
      { name: 'CANDELIANCE', url: 'https://www.candeliance.fr/' },
      { name: 'ESPACE URBAIN', url: 'https://www.espace-urbain.fr/' },
      {
        name: 'FRONTIER PITTS France',
        url: 'https://www.frontier-pitts.fr/'
      },
      { name: 'GROUPE ESPACS', url: 'http://www.groupe-espacs.com/' },
      { name: 'GROUPE IVT SECURITY', url: 'http://www.ivtsecurity.com/' },
      { name: 'INTRATONE', url: 'https://www.intratone.fr/' },
      { name: 'MBPS', url: 'https://www.mbps.fr/' },
      { name: 'NICE IN France', url: 'https://www.niceforyou.com/fr/' },
      { name: 'PORTIS LYON', url: 'http://www.portis.fr/' },
      { name: 'SCOLA CONCEPT', url: 'https://www.scolaconcept.fr/' },
      { name: 'SIGNACLIC', url: 'https://www.signaclic.com/' },
      { name: 'SODILOR', url: 'https://www.sodilor.fr/fr/' },
      { name: 'STOP PARK', url: 'https://www.stop-park.fr/' },
      { name: 'TANSA France SAS', url: 'https://www.tansa.fr/' },
      { name: 'URBAN-NT', url: 'https://www.urbannt.fr/' },
      { name: 'VIRAGES', url: 'https://www.virages.com/' }
    ]
  }
];

function Single({ token, loading, libraryData, setFabLoading, fabloading }) {
  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      sx={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
      <>
        <div style={{ borderBottomWidth: '1px', borderBottomColor: '#000000' }}></div>
        <div style={{ marginTop: '10px', width: '80%' }}>
          {loading ? (
            <>
              <div style={{ textAlign: 'center' }}>
                <CircularProgress color="inherit" />
              </div>
            </>
          ) : (
            <>
              {libraryData?.length >= 1 &&
                libraryData?.map((data, i) => (
                  <>
                    <ManufacturersListItem
                      text={data.library}
                      avatartitle={i + 1}
                      token={token}
                      loading={loading}
                      // expandComponent={<FirstExpandComponent />}
                      data={data}
                      setFabLoading={setFabLoading}
                      fabloading={fabloading}
                    />
                  </>
                ))}
            </>
          )}
          {dumyData?.map((data, i) => (
            <>
              <ManufacturersListItem
                text={data.title}
                avatartitle={i + 1}
                token={token}
                // expandComponent={<FirstExpandComponent />}
                data={data}
              />
            </>
          ))}
        </div>
      </>
    </Grid>
  );
}

export default CollapseFabricants;
