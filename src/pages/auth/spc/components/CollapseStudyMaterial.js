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
import img1 from "../assets/images/support/img1.png";
import img2 from "../assets/images/support/img2.png";
import img3 from "../assets/images/support/img3.png";
import img4 from "../assets/images/support/img4.png";
import img5 from "../assets/images/support/img5.png";
import img6 from "../assets/images/support/img6.png";
import img7 from "../assets/images/support/img7.png";
import img8 from "../assets/images/support/img8.png";
import img9 from "../assets/images/support/img9.png";
import img10 from "../assets/images/support/img10.png";
import img11 from "../assets/images/support/img11.png";
import img12 from "../assets/images/support/img12.png";
import img13 from "../assets/images/support/img13.png";
import img14 from "../assets/images/support/img14.png";
import img15 from "../assets/images/support/img15.png";
import img16 from "../assets/images/support/img16.png";
import img17 from "../assets/images/support/img17.png";
import img18 from "../assets/images/support/img18.png";
import img19 from "../assets/images/support/img19.png";
import img20 from "../assets/images/support/img20.png";
import img21 from "../assets/images/support/img21.png";
import img22 from "../assets/images/support/img22.png";
import img23 from "../assets/images/support/img23.png";
import img24 from "../assets/images/support/img24.png";
import img25 from "../assets/images/support/img25.png";
import img26 from "../assets/images/support/img26.png";
import img27 from "../assets/images/support/img27.png";
import img28 from "../assets/images/support/img28.png";
import img29 from "../assets/images/support/img29.png";
import img30 from "../assets/images/support/img30.png";
import img31 from "../assets/images/support/img31.png";
import img32 from "../assets/images/support/img32.png";
import img33 from "../assets/images/support/img33.png";

let mainData = [
  {
    title: "Structure de la base de données",
    avatartitle: "1",
    body: (
      <>
        <Typography paragraph className="spc_head">
          La base de données est structurée de la façon suivante.
        </Typography>
        <Typography style={{ fontWeight: 600 }}>
          1.1 Organisation des données
        </Typography>
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
              Niveau 5 : Détails d’Ouvrages (rattaché directement à l’ouvrage)
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
            <li>Niveau 4 Ouvrages 1.2 : Signalisation de chantier</li>
            <li>Niveau 5 Détail d’Ouvrage 1.2.1 : Panneau gamme petite</li>
            <li>Niveau 5 Détail d’ouvrage 1.2.2 : Panneau gamme normale</li>
          </ul>
        </Typography>

        <Typography style={{ fontWeight: 600 }}>
          1.2 Documents associés aux différents Niveaux
        </Typography>
        <Typography className="spc_text">
          Le tableau, ci-dessous, précise la ventilation des documents qui sont
          attachés aux différents niveaux.
        </Typography>
        <img src={img1} />
        <Typography className="spc_text">
          *A chaque Ouvrages/Prestations/Produits, on peut associer le logo d’un
          ou plusieurs fabricants avec un lien hypertexte vers leur site web.
        </Typography>

        <Typography style={{ fontWeight: 600 }}>1.3 Détail du CCTP</Typography>
        <Typography className="spc_text">
          Le Cahier des Clauses Techniques Particulières (CCTP) est composé de 5
          chapitres :
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 0 – Clauses Générales (communes à tous les lots)
          </Typography>
          <Typography className="spc_text">
            Ce chapitre est traité séparément.
          </Typography>
          <Typography className="spc_text">
            a partie 1 – Description du marché - est constituée des informations
            saisies lors de la création du Projet (Nom et Objet du Projet, liste
            des Intervenants, type de marché)
          </Typography>
          <Typography className="spc_text">
            La partie 2 – Spécifications communes - est un document type
            sélectionné lors de la création du Projet et proposé au Prescripteur
            qui pourra le compléter et l’adapter aux spécificités du projet
          </Typography>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 1 – Documents de référence contractuels
          </Typography>
          <Typography className="spc_text">
            Sont repris dans ce chapitre les documents réglementaires et
            techniques de portées contractuelles applicables au secteur
            d’activité concerné.
          </Typography>

          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 2 – Provenances et spécifications des matériaux
          </Typography>
          <Typography className="spc_text">
            Sont repris dans ce chapitre les références normatives et techniques
            applicables aux produits et fournitures du secteur concerné.
          </Typography>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 3 – Mode d’exécution des travaux
          </Typography>
          <Typography className="spc_text">
            Sont repris dans ce chapitre les textes précisant les modalités
            particulières de réalisation des travaux.
          </Typography>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 4 – Essais – Contrôles – Réception
          </Typography>
          <Typography className="spc_text">
            Sont repris dans ce chapitre les textes précisant les modalités
            particulières de réalisation des essais, de contrôles et de
            réception.
          </Typography>

          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            Chapitre 5 – Localisation des ouvrages
          </Typography>
          <Typography className="spc_text">
            Ce chapitre n’est utilisé que pour un projet de Bâtiment avec
            l’option DPGF pour préciser les lieux d’exécution des travaux.
          </Typography>
          <Typography className="spc_text">
            Les textes du CCTP sont ventilés dans les différents chapitres
            suivant la nature des informations.
          </Typography>
          <Typography className="spc_text">
            Les informations sont hiérarchisées suivant le niveau, du plus
            général (Bibliothèques) au plus précis (ouvrages). Les textes du
            CCTP des niveaux Bibliothèques et Catégories ne sont modifiables si
            besoin que dans le document final (Word). Les textes du CCTP du
            niveau Ouvrages sont modifiables lors de la conception du Projet.
          </Typography>
          <Typography className="spc_text">
            Lors de la génération du CCTP, il est procédé à l‘élimination des
            doublons des niveaux Bibliothèques et Catégories. L’objectif
            recherché est d’avoir un CCTP le plus complet et précis possible
            mais sans redondance.
          </Typography>
        </div>
        <Typography style={{ fontWeight: 600 }}>
          1.5 Détail des Ouvrages/Prestations/Produits
        </Typography>
        <Typography paragraph>
          <ul className="spc_list">
            <li>Libellé (DQE, Estimation, BPU, DPGF)</li>
            <li>Unité Symbolisée (DQE, Estimation, DPGF)</li>
            <li>Unité Libellé (BPU)</li>
            <li>Prix Unitaire HT (Estimation)</li>
            <li>Taux de TVA (DQE, Estimation, DPGF)</li>
            <li>Descriptif de l’ouvrage (BPU, DPGF)</li>
            <li>
              Texte pour chaque Chap. du CCTP (CCTP Chap1, Chap2, Chap3, …)
            </li>
            <li>Doc Technique (Dessin de détail ou notice technique)</li>
            <li>
              Doc Fabricants/Fournisseurs (Logo Fabricants + lien hypertexte,
              Nom Fabricants)
            </li>
          </ul>
        </Typography>
        <Typography className="spc_text">
          De plus, une (ou plusieurs) vignette image représentant le logo du
          Fabricant ou du Fournisseurs pourra être intégrée et liée à un
          ouvrage. Cette vignette pourra lancer un lien vers un fichier ou vers
          une page du site du Fabricant ou du Fournisseur partenaire.
        </Typography>
      </>
    ),
  },
  {
    title: "Connexion à l'application Quadrabase",
    avatartitle: "2",
    body: (
      <>
        <Typography style={{ fontWeight: 600 }}>
          2.1 Depuis votre navigateur
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography className="spc_text">
            1) ‘Tapez’ l’URL https://www.quadrabase.fr dans la ligne de
            recherche.
            <br />
            2) ‘Cliquez’ sur « Connexion » en haut à droite
          </Typography>
          <br />
          <img src={img2} />
          <br />
          <Typography className="spc_text">
            3) Dans la page « Connexion », ‘Saisissez’ votre Nom d’utilisateur
            et votre mot de passe, puis ‘Cliquez’ sur « Connexion ».
          </Typography>
          <br />
          <img src={img3} />
          <br />
        </div>
        <Typography style={{ fontWeight: 600 }}>
          2.2 Depuis le site QBSoft
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography className="spc_text">
            1) Dans la page « Accueil » de QBsoft, ‘Cliquez’ sur le bouton «
            Quadrabase » – Vous serez redirigé vers le site Quadrabase
          </Typography>
          <Typography className="spc_text">
            2) Dans la page « Connexion », ‘Saisissez’ votre Nom d’utilisateur
            et votre mot de passe, puis ‘Cliquez’ sur « Connexion » en haut à
            droite.
          </Typography>
          <br />
          <img src={img3} />
          <br />
          <Typography className="spc_text">
            La connexion à Quadrabase affiche la page « Quadrabase/Application
            ».
          </Typography>
          <br />
          <img src={img4} />
          <br />
          <Typography className="spc_text">
            Cette page vous indique :
          </Typography>
        </div>
        <Typography style={{ fontWeight: 600 }}>Mon abonnement</Typography>
        <Typography paragraph>
          <ul className="spc_list">
            <li>Le nombre de projets restant à utiliser</li>
            <li>
              Un bouton « +acheter des projets »<br />
              Vous serez redirigé vers la page « www.qbsoft.fr/commande »
            </li>
            <li>La date de fin d’abonnement</li>
            <li>
              Un bouton « Renouveler »<br />
              Vous serez redirigé vers la page « www.qbsoft.fr/commande »
            </li>
          </ul>
        </Typography>
        <Typography style={{ fontWeight: 600 }}>Mes Projets</Typography>
        <Typography paragraph>
          <ul className="spc_list">
            <li>
              Un libellé indiquant le nombre de Projets en cours / le nombre de
              projets achetés
            </li>
            <li>
              Un bouton « +Nouveau Projet » pour ajouter un nouveau projet
            </li>
            <li>La liste des projets en cours comprenant :</li>
            <ul style={{ marginLeft: 20 }}>
              <li>Le Nom du Projet</li>
              <li>Le Nom du Rédacteur</li>
              <li>La date de création du Projet</li>
              <li>La date de la dernière mise à jour du Projet</li>
            </ul>
          </ul>
        </Typography>
      </>
    ),
  },
  {
    title: "Créer et gérer un Projet",
    avatartitle: "3",
    body: (
      <>
        <Typography style={{ fontWeight: 600 }}>3.1 Généralités</Typography>
        <Typography className="spc_text">
          Le phasage de la création d’un projet est le suivant :
        </Typography>
        <Typography paragraph>
          <ul className="spc_list">
            <li>
              Renseignement des Propriétés du Projet (nom du maître d’ouvrage,
              nom du Rédacteur, nom du projet, date, TVA, type de marché, …)
            </li>
            <li>
              Construction du cadre estimatif du projet par sélection et
              déplacement des ouvrages depuis les bibliothèques d’ouvrages,
            </li>
            <li>
              Modification des éléments du projet (quantitatif, PU, textes BPU
              et CCTP, localisation des ouvrages)
            </li>
            <li>Génération des documents</li>
            <li>Le nombre de projets restant à utiliser</li>
          </ul>
        </Typography>
        <Typography className="spc_text">
          La génération des documents Estim, DQE, BPU, DPGF et CCTP est faite
          suivant l’organisation du cadre estimatif du projet. Tous les textes
          CCTP liés aux ouvrages, et aux niveaux supérieurs auxquels ils
          appartiennent, sont copiés depuis la base de donnes et ventilés dans
          les différents chapitres du CCTP.
        </Typography>
        <Typography className="spc_text">
          Les descriptifs des ouvrages composent le BPU ou le DPGF du projet.
        </Typography>
        <Typography className="spc_text">
          Les libellés des différends niveaux des bibliothèques sont utilisés
          comme titres et sous-titres dans le CCTP.
        </Typography>
        <Typography className="spc_text">
          Un algorithme détermine le positionnement de chacun des textes du CCTP
          et élimine les doublons.
        </Typography>
        <Typography className="spc_text">
          La numérotation des éléments (Lots, tranches, ouvrages) est calculée
          automatiquement à chaque génération des documents et mise à jour en
          cas de modification.
        </Typography>
        <Typography style={{ fontWeight: 600 }}>
          3.2 Information de la page « Gestion des Projets »
        </Typography>
        <Typography className="spc_text">
          Dans cette page « Gestion des projets » nous pouvez prendre
          connaissance des informations suivantes :
        </Typography>
        <ul className="spc_list">
          <li>Le nom du Prescripteur</li>
          <li>La date du jour</li>
          <li>
            Le nombre de Projets restants par rapport au Nombre de projets
            achetés
          </li>
          <li>La date de fin d’abonnement à l’application Quadrabase</li>
          <li>
            Un bouton « Commander » qui active un lien vers la page
            https://qbsoft.fr/quadrabase/categorie-produit/prescripteurs/ pour
            acheter de nouveaux packs de Projets ou renouveler son abonnement.
          </li>
          <li>La liste des projets en cours</li>
        </ul>
        <Typography style={{ fontWeight: 600 }}>
          3.3 Ouvrir un Projet existant
        </Typography>
        <div style={{ marginLeft: 15 }} className="spc_text">
          1) Dans la liste des Projets, ‘Cliquez’ sur le libellé du projet à
          ouvrir.
        </div>
        <img src={img5} />
        <br />
        <i style={{ fontSize: 14 }}>
          La fenêtre « Projet » s’ouvre avec le projet en cours.
        </i>
        <br />
        <img src={img6} />
        <br />
        <Typography style={{ fontWeight: 600 }}>
          3.4 Créer un nouveau Projet
        </Typography>
        <Typography className="spc_text">
          Cette opération n’est possible que s’il vous reste au moins un projet
          à créer
        </Typography>
        <div style={{ marginLeft: 15 }} className="spc_text">
          1) Dans la page « Quadrabase/application », Cliquez sur « Nouveau
          Projet »
        </div>
        <i className="spc_text">La fenêtre « Nouveau Projet » s’affiche.</i>
        <img src={img7} />
        <br />
        <div style={{ marginLeft: 15 }} className="spc_text">
          2) Dans la fenêtre « Nouveau Projet », ‘saisissez’ :
          <ul className="spc_list">
            <li>Le nom du maître d’ouvrage*</li>
            <li>Le nom du Projet*</li>
            <li>Le nom du Prescripteur*</li>
            <li>La date du projet (par défaut la date du jour) *</li>
            <li>La TVA du Projet * (par défaut TVA courante)</li>
            <li>La référence de l’Opération</li>
            <li>L’objet du Projet</li>
            <li>La nature du Projet (Aucun, TP ou BAT)</li>
            <li>
              Les champs marqués d’une * sont à renseigner obligatoirement
            </li>
          </ul>
          3) Validez la saisie.
        </div>
        <br />

        <Typography style={{ fontWeight: 600 }}>
          3.5 Les propriétés du projet
        </Typography>
        <Typography className="spc_text">
          Dans la fenêtre « Propriétés du Projet » renseignez les éléments
          suivants :
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography style={{ fontWeight: 600 }}>
            Onglet 1 – Références Projet
          </Typography>
          <ul className="spc_list">
            <li>Le nom du maître d’ouvrage*</li>
            <li>Le nom du Projet*</li>
            <li>Le nom du Prescripteur*</li>
            <li>La date du projet (par défaut la date du jour) *</li>
            <li>La TVA du Projet * (par défaut TVA courante)</li>
            <li>La référence de l’Opération</li>
            <li>L’objet du Projet</li>
            <li>La nature du Projet (Aucun, TP ou BAT)</li>
            <li>
              Les champs marqués d’une * sont à renseigner obligatoirement
            </li>
          </ul>
        </div>
        <br />
        <img src={img8} />
        <br />
        <div style={{ marginLeft: 15 }}>
          <Typography style={{ fontWeight: 600 }}>
            Onglet 2 – Onglet « Type de marché/Structure »
          </Typography>
          <Typography className="spc_text">
            1) 'Sélectionnez' le type de marché
          </Typography>
          <ul className="spc_list">
            <li>Marché Simple (Lot unique)</li>
            <li>Marché à lots</li>
            <li>Marché à lots et à tranches optionnelles</li>
            <li>Marché subséquent à bons de commande</li>
          </ul>
        </div>
        <br />
        <i className="spc_text">
          La sélection se fait par simple clic sur le bouton « Sélecteur ». Il
          seul choix est possible.
        </i>
        <br />
        <i className="spc_text" style={{ fontWeight: 600 }}>
          Attention ! Ce choix n’est pas modifiable après validation des
          paramètres du projets.
        </i>
        <Typography className="spc_text">
          2) 'Sélectionnez’ la structure du Projet (Documents)
          <br />
          <ul className="spc_list">
            <li>DQE/BPU (Pour les Projets de Travaux Publics)</li>
            <li>DPGF (Pour les Projets de Bâtiments)</li>
          </ul>
        </Typography>
        <i className="spc_text">
          La sélection se fait par simple clic sur le bouton « Sélecteur ». Il
          seul choix est possible. Il sera possible de modifier ce choix
          ultérieurement.img
        </i>
        <br />
        <br />
        <img src={img9} />
        <br />
        <br />
        <Typography style={{ fontWeight: 600, marginLeft: 15 }}>
          Onglet 3 – Onglet « Intervenants »
        </Typography>
        <Typography className="spc_text">
          Dans cet onglet, vous allez intégrer les coordonnées des intervenants
          au marché suivant le type d’intervenants.
          <br />
          <ul className="spc_list">
            <li>
              Dans la fenêtre « Type d’intervenant », ‘sélectionnez’ un type
              d’intervenant à renseigner (Maitre d’ouvrage, Architecte, Maitre
              d’œuvre, Bureau d’études, Coordonnateur SPS, …)
            </li>
            <li>
              Dans la fenêtre « Sélection de l’Intervenant », ‘Cliquez’ sur le
              bouton « + » pour ouvrir la fenêtre « Gestion des intervenants »,
              puis ‘Renseignez’ les coordonnées de l’intervenant. ‘Validez’
              votre saisie.
            </li>
          </ul>
        </Typography>
        <i className="spc_text">
          Répétez l’opération pour chaque Intervenant au projet à intégrer
        </i>
        <ul className="spc_list">
          <li>
            Dans la fenêtre « Sélection de l’intervenant » ‘sélectionnez’
            l’Intervenant à intégrer dans la fenêtre « Intervenants au projet »
            puis ‘Cliquez’ sur bouton « â » (Ajoute cet Intervenant au projet)
            L’intervenant sélectionné est intégré à la liste des Intervenants du
            projet
          </li>
          <li>
            ‘Reclassez’ les Intervenants du Projet si besoin avec les flèches
            directionnelles (Monte/Baisse)
          </li>
          <li>
            ‘Supprimez’ si nécessaire un intervenant dans la liste en ‘Cliquant’
            sur le bouton dédié « á ».
          </li>
        </ul>
        <Typography className="spc_text">
          La liste des Intervenants peut être renseignée et modifiée à tout
          moment de la construction du projet.
        </Typography>
        <br />
        <img src={img10} />
        <br />
        <Typography className="spc_text">
          Après avoir renseignés les 3 onglets, validez la saisie pour créer le
          projet.
        </Typography>
        <br />
        <Typography style={{ fontWeight: 600 }}>
          3.6 Supprimer un Projet à partir de la liste des projets en cours
        </Typography>
        <ul className="spc_list">
          <li>‘Sélectionnez‘ la ligne du Projet à supprimer</li>
          <li>‘Clic’ droit sur la souris pour ouvrir la liste de choix</li>
          <li>
            ‘Clic’ sur « Supprimer » un Projet – Une fenêtre de demande de
            confirmation s’ouvre
          </li>
          <li>
            ‘Confirmez’ votre action – Le Projet est supprimé de la liste et
            n’est plus accessible
          </li>
        </ul>
        <br />
        <Typography style={{ fontWeight: 600 }}>
          3.7 Dupliquer un Projet à partir de la liste des projets en cours
        </Typography>
        <ul className="spc_list">
          <li> ‘Sélectionnez‘ la ligne du Projet à dupliquer</li>
          <li> ‘Clic’ droit sur la souris pour ouvrir la liste de choix</li>
          <li>
            ‘Clic’ sur « Dupliquer » un Projet – Une fenêtre de demande de
            confirmation s’ouvre
          </li>
          <li>
            ‘Confirmez’ votre action – Le projet dupliqué s’affiche en fin de
            liste. Il s’affiche avec le libellé du projet source et la mention
            (copie) – Vous pouvez ensuite le renommer
          </li>
        </ul>
        <br />
        <Typography style={{ fontWeight: 600 }}>
          3.8 Renommer un Projet à partir de la liste des projets en cours
        </Typography>
        <ul className="spc_list">
          <li> ‘Sélectionnez’ la ligne du Projet à renommer</li>
          <li> ‘Clic’ droit sur la souris pour ouvrir la liste de choix</li>
          <li>
            ‘Clic’ sur « Renommer » un Projet – Une fenêtre de demande de
            confirmation s’ouvre
          </li>
          <li>
            ‘Confirmer’ votre action – Le libellé du Projet est mis à jour
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Comprendre la page Projet",
    avatartitle: "4",
    body: (
      <>
        <Typography style={{ fontWeight: 600 }}>
          4.1 Description de la page "Projet"
        </Typography>
        <img src={img11} />
        <br />
        <Typography className="spc_text">
          1) Le bandeau supérieur (1) regroupe les éléments suivants :
        </Typography>
        <ul className="spc_list">
          <li>
            Le bouton « Propriétés » : Ouvre la fenêtre « Propriété du Projet »
            – Accessible à tout moment
          </li>
          <li>
            Le bouton « Sauvegarde » : Créé une copie de sauvegarde du Projet en
            cours.
          </li>
          <li>
            Le bouton « Quitter » : Ferme la fenêtre « Projet » après avoir
            sauvegardé le projet en cours.
          </li>
        </ul>
        <br />
        <Typography className="spc_text">
          2) La Colonne de gauche « Bibliothèques générales » (2) regroupe les
          éléments suivants :
        </Typography>
        <ul className="spc_list">
          <li>
            Un champ « Recherche » d’un mot dans les bibliothèques générales
          </li>
          <li>
            Un champ « Combo » pour sélectionner le type de Bibliothèques à
            afficher dans le champ Treeview – On peut sélectionner : Toutes (les
            Bibliothèques), Travaux Publics ou Bâtiment
          </li>
          <li>
            Un champ Treeview regroupant les Bibliothèques générales - Suivant
            le choix précédent
          </li>
        </ul>
        <br />
        <Typography className="spc_text">
          3) La Colonne de gauche « Bibliothèques de projets » (3) regroupe les
          éléments suivants :
        </Typography>
        <ul className="spc_list">
          <li>
            Un champ « Treeview » regroupant les Bibliothèques du Projet – Il
            regroupe les ouvrages spécifiques au projet. Ces ouvrages pourront
            être sélectionnés pour être intégrés au projet dans les mêmes
            conditions que ceux des Bibliothèques générales.
          </li>
        </ul>
        <br />
        <Typography className="spc_text">
          4) La Partie centrale « Grille du Projet » regroupe les éléments
          suivants :
        </Typography>
        <ul className="spc_list">
          <li>Un bandeau d’outils (4) composé des éléments suivants :</li>
          <ul style={{ marginLeft: 20 }}>
            <li>
              Ajout d’un Lot – Actif seulement si l’option « Lot » a été
              sélectionné dans les Propriétés du Projet
            </li>
            <li>
              Ajout d’une Tranche – Actif seulement si l’option « Lot et Tranche
              » a été sélectionné dans les Propriétés du Projet
            </li>
            <li>
              Gestion du Chap0 Part2 – Ouvre la fenêtre « Gestion du Chap0 Part2
              »{" "}
            </li>
            <li>
              Génération des documents – Ouvre la fenêtre « Choix des documents
              à générer » : Estimation, DQE, BPU, DPGF, CCTP, Doc technique)
            </li>
          </ul>
          <br />
          <li>Une grille « Projet » (5) composée des colonnes suivantes :</li>
          <ul style={{ marginLeft: 20 }}>
            <li>
              Colonne « Désignation » (Ouvrages/Prestations/Produits) –
              Renseignée automatiquement par sélection
              d’Ouvrages/Prestations/Produits depuis les Bibliothèques
              (Modifiable)
            </li>
            <li>
              Colonne « Unité » – Renseignée automatiquement par sélection
              d’Ouvrages/Prestations/Produits depuis les Bibliothèques
              (Modifiable)
            </li>
            <li>
              Colonne « Quantité » – Renseignée automatiquement par sélection
              d’Ouvrages/Prestations/Produits depuis les Bibliothèques. Par
              défaut = 1 (Modifiable)
            </li>
            <li>
              Colonne « Prix Unitaire Hors Taxes » – Renseignée automatiquement
              par sélection d’Ouvrages/Prestations/Produits depuis les
              Bibliothèques. Par défaut = Valeur de la Bibliothèque (Modifiable)
            </li>
            <li>
              Colonne « Total Hors Taxes » – Valeur calculée automatiquement
              (Produit de la Qté x PU HT)
            </li>
          </ul>
          <br />
          <li> A savoir :</li>
          <ul style={{ marginLeft: 20 }}>
            <li>
              Le texte de la ligne de Titre (Lot et Tranche) est modifiable
            </li>
            <li>
              La valeur de la ligne Total HT (lot et Tranche) est calculée
              automatiquement
            </li>
            <li>
              La valeur de la ligne Total HT du Projet est calculée
              automatiquement
            </li>
            <li>
              La valeur de la ligne Total TVA est calculée automatiquement en
              fonction du % de TVA applicable sélectionné dans la fenêtre «
              Propriétés du Projet ».
            </li>
          </ul>
        </ul>
        <br />
      </>
    ),
  },
  {
    title: "Création de l'Estimation d'un Projet",
    avatartitle: "5",
    body: (
      <>
        <Typography style={{ fontWeight: 600 }}>
          5.1 Sélection des ouvrages
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            1) A partir des Bibliothèques Générales
          </Typography>
          <img src={img12} />
          <br />
          <br />
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ une Bibliothèque d’Ouvrages et développez le niveau
              « Catégorie »
            </li>
            <li>
              ‘Sélectionnez’ une Catégorie d’Ouvrages et développez le niveau «
              Ouvrages »
            </li>
            <li>
              ‘Sélectionnez’ l’ouvrage à intégrer au projet et ‘Double-Cliquez’
              sur celui-ci ou ‘Cliquez’ sur l’Icon « » pour le transférer dans
              la grille Projet
            </li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            La fenêtre « Ajout d’un Ouvrage » s’ouvre.
          </i>
          <br />
          <img src={img13} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Saisissez’ les éléments du Projet : Quantité, PU HT et modifiez
              les éléments extraits de la base
            </li>
            <li>
              Si l’ouvrage possède des « Détails d’ouvrages », alors une fenêtre
              listant les détails d’ouvrages s’ouvre.
            </li>
            <li>
              ‘Sélectionnez’ les détails d’ouvrages à intégrer au Projet et
              ‘Validez’.
            </li>
            <li>
              L’ensemble des lignes « Ouvrage et Détails d’ouvrages sélectionnés
              » s’insère dans la grille « Projet »
            </li>
            <li>
              Pour modifier les textes associés à l’Ouvrage, ‘Cliquez’ sur le
              bouton « Textes »
            </li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            La fenêtre « Modification des textes de l'Ouvrage » s’ouvre.
          </i>
          <br />
          <br />
          <img src={img14} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ le type de texte à modifier (CCTP 1, 2, 3, 4, 5 ou
              BPU)
            </li>
            <li>Le texte s’affiche dans le traitement de texte</li>
            <li>‘Apportez’ les modifications au texte</li>
            <li>
              ‘Validez’ la saisie en cliquant sur « OK », la fenêtre se ferme
            </li>
            <li>
              ‘Fermez’ la fenêtre « Ajout d’un Ouvrage » en cliquant sur «
              Valider ».
            </li>
            <li>Répétez l’opération pour chaque ouvrage à insérer au Projet</li>
          </ul>
          <br />
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            2) A partir de la Bibliothèque du Projet
          </Typography>
          <ul className="spc_list">
            <li>Même procédure que pour les Bibliothèques Générales</li>
          </ul>
        </div>
        <br />
        <Typography style={{ fontWeight: 600 }}>
          5.2 Modification des titres des Lots et Tranches
        </Typography>
        <br />
        <img src={img15} />
        <br />
        <ul className="spc_list">
          <li>‘Sélectionnez’ le Titre à modifier</li>
          <li>‘Double-Cliquez’ sur le titre à modifier</li>
          <li> ‘Modifiez’ le libellé</li>
          <li>‘Validez’ la saisie en cliquant sur « OK »</li>
        </ul>
        <i style={{ fontSize: 14 }}>
          La ligne Total (du Lot ou de la Tranche est mise à jour
          automatiquement
        </i>
        <br />
        <br />
        <Typography style={{ fontWeight: 600 }}>
          5.3 Modification des données des ouvrages et Détails d’Ouvrages
        </Typography>
        <div style={{ marginLeft: 15 }}>
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            1) Modification d’Ouvrage sans détail d’Ouvrage
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la Grille du Projet</strong>
            </i>
          </Typography>
          <ul className="spc_list">
            <li>
              {" "}
              ‘Double-Cliquez’ sur l’ouvrage ou sur le Détail d’ouvrage à
              modifier ou ‘Cliquez’ sur la Flèche « 6 » en bout de libellé, puis
              ‘Sélectionnez’ « Modifier » pour ouvrir la fenêtre « Modification
              d’un Ouvrage »
            </li>
          </ul>
          <br />
          <i>
            {" "}
            <strong className="spc_text">
              {" "}
              Dans la fenêtre « Modification d’un Ouvrage »
            </strong>
          </i>
          <br />
          <img src={img16} />

          <br />
          <ul className="spc_list">
            <li>
              ‘Modifiez’ la valeur des champs (libellé, Unité, Quantité, Prix
              Unitaire)
            </li>
            <li>‘Cliquez’ sur le bouton « Textes »</li>
          </ul>
          <br />
          <i>
            {" "}
            <strong className="spc_text">
              {" "}
              Dans la fenêtre « Modifier les Textes » (Ouvrages uniquement)
            </strong>
          </i>
          <img src={img17} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ le type de texte à modifier (BPU, CCTP1, 2, 3, 4,
              5)
            </li>
            <li> ‘Modifiez’ les Textes</li>
            <li> ‘Validez’ la saisie</li>
          </ul>
          <br />
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            2) Modification d’Ouvrage avec détail d’Ouvrage
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la Grille du Projet,</strong>
            </i>
          </Typography>
          <img src={img18} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Double-Cliquez’ sur l’ouvrage sans détail à modifier ou ‘Cliquez’
              sur la Flèche « 6 » en bout de libellé, puis sélectionnez «
              Modifier » pour ouvrir la fenêtre « Modification d’un Ouvrage »
            </li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            {" "}
            <strong className="spc_text">
              {" "}
              Dans la fenêtre « Modification d’un Ouvrage »
            </strong>
          </i>
          <img src={img19} />
          <br />
          <ul className="spc_list">
            <li>‘Modifiez’ la valeur du champ Désignation</li>
            <li>‘Cliquez’ sur le bouton « Textes »</li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            {" "}
            <strong className="spc_text">
              {" "}
              Dans la fenêtre « Modification des Textes de l’Ouvrage »
            </strong>
          </i>
          <img src={img20} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ le type de texte à modifier (BPU, CCTP1, 2, 3, 4,
              5)
            </li>
            <li>‘Modifiez’ les Textes</li>
            <li>‘Validez’ la saisie</li>
          </ul>
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            3) Modification de la position d’un élément
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la grille « Projet »</strong>
            </i>
          </Typography>
          <img src={img21} />
          <br />
          <ul className="spc_list">
            <li>‘Sélectionnez’ l’élément à déplacer</li>
            <li>
              ‘Cliquez’ sur la flèche pointant vers le bas, en bout de libellé,
              pour ouvrir la fenêtre Popup de choix
            </li>
            <li>‘Sélectionnez’ l’action à réaliser (Monter ou descendre)</li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            L’élément se repositionne automatiquement dans la liste.
          </i>
          <br />
          <i style={{ fontSize: 14 }}>
            Le déplacement d’un lot, d’une tranche ou d’un ouvrage entraîne le
            déplacement de l’intégralité de son contenu.
          </i>
          <br />
          <i style={{ fontSize: 14 }}>
            Le déplacement d’un élément ne peut se faire que dans le niveau dans
            lequel il se trouve.
          </i>

          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            4) Suppression d’un élément
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la grille « Projet »</strong>
            </i>
          </Typography>
          <img src={img22} />
          <br />
          <ul className="spc_list">
            <li> ‘Sélectionnez’ l’élément à supprimer</li>
            <li>
              ‘Cliquez’ sur la flèche pointant vers le bas, en bout de libellé
              pour ouvrir la fenêtre Popup de choix
            </li>
            <li> ‘Sélectionnez’ l’action à réaliser (Supprimer)</li>
            <li> ‘Validez’ le choix</li>
          </ul>
          <br />
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            5) Duplication d’un Ouvrage
          </Typography>
          <ul className="spc_list">
            <li>‘Sélectionnez’ l’Ouvrage à dupliquer</li>
            <li>‘Clic Droit’ ouvre la fenêtre Popup</li>
            <li> ‘Sélectionnez’ l’action à réaliser (Dupliquer)</li>
            <li> ‘Validez’ le choix</li>
          </ul>
          <i style={{ fontSize: 14 }}>
            L’ouvrage et tous ses éléments sont dupliqués et placé par défaut en
            fin de liste.
          </i>
          <br />
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            6) Ajout d'un Lot
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la grille « Projet »</strong>
            </i>
          </Typography>
          <img src={img23} />
          <br />
          <ul className="spc_list">
            <li>‘Cliquez’ sur l’Icône « Lot » dans le bandeau supérieur</li>
            <li>‘Saisissez’ le nom du lot dans le champ libellé</li>
            <li> ‘Validez’ en cliquant sur le bouton « OK »</li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>Le nouveau lot se crée en fin de liste</i>
          <i style={{ fontSize: 14 }}>
            Repositionnez-la suivant la démarche décrite plus haut.
          </i>
          <br />
          <Typography
            className="spc_text"
            style={{ fontWeight: 600, marginTop: 10 }}
          >
            7) Ajout d’une Tranche
            <br />
            &nbsp;&nbsp;&nbsp;
            <i>
              {" "}
              <strong className="spc_text"> Dans la grille « Projet »</strong>
            </i>
          </Typography>
          <img src={img24} />
          <br />
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ le Lot dans lequel vous souhaitez ajouter une
              Tranche
            </li>
            <li> ‘Cliquez’ sur l’Icône « Tranche » dans le bandeau supérieu</li>
            <li> ‘Saisissez’ le nom de la Tranche</li>
            <li> ‘Validez’ en cliquant sur le bouton « OK »</li>
          </ul>
          <br />
          <i style={{ fontSize: 14 }}>
            La nouvelle Tranche se créé en fin de liste.
          </i>
          <i style={{ fontSize: 14 }}>
            Repositionnez-la suivant la démarche décrite plus haut.
          </i>
        </div>
      </>
    ),
  },
  {
    title: "Génération des documents",
    avatartitle: "6",
    body: (
      <>
        <Typography style={{ fontWeight: 600 }}>
          6.1 Générer l’Estimation, le DQE, le BPU et la DPGF &nbsp;&nbsp;&nbsp;
          <i>Dans la fenêtre "Projet"</i>
        </Typography>
        <img src={img25} />
        <ul className="spc_list">
          <li>
            Cliquez’ sur l’Icône « Génération des Documents »<br />
            Une fenêtre Popup s’ouvre avec la liste des documents à générer
          </li>
          <li> ‘Sélectionnez’ le document à générer</li>
          <li> ‘Validez’ votre choix</li>
        </ul>

        <br />
        <i style={{ fontSize: 14 }}>
          Le document s’affiche dans le Browser en format XML
        </i>
        <img src={img26} />
        <br />
        <ul className="spc_list">
          <li>
            Dans le bandeau supérieur du Browser, ‘Sélectionnez’ le format de
            sortie du document (Word, Excel ou PDF)
          </li>
        </ul>
        <br />
        <i style={{ fontSize: 14 }}>
          Le document est généré dans l’application sélectionnée et apparaît en
          fichier à télécharger.
        </i>
        <Typography style={{ fontWeight: 600 }}>
          6.2 Génération du CCTP
        </Typography>
        <ul className="spc_list">
          <li>‘Cliquez’ sur l’Icône « Génération des Documents »</li>
          <i style={{ fontSize: 14 }}>
            Une fenêtre Popup s’ouvre avec la liste des documents à générer
          </i>
          <li>‘Sélectionnez’ le document « CCTP »</li>
          <li>‘Validez’ votre choix</li>
          <i style={{ fontSize: 14 }}>
            Une fenêtre de sélection des différents chapitres s’ouvre
          </i>
        </ul>
        <br />
        <img src={img27} />
        <br />
        <ul className="spc_list">
          <li>‘Sélectionnez’ le document « CCTP »</li>
          <li>
            ‘Validez’ votre choix – Le document s’affiche dans le Browser en
            format XML
          </li>
        </ul>
        <br />
        <img src={img28} />
        <br />
        <ul className="spc_list">
          <li>
            {" "}
            Dans le bandeau supérieur du navigateur, ‘Sélectionnez’ le format de
            sortie du document (Word ou PDF)
          </li>

          <li>
            <i>
              Le document est généré dans l’application sélectionnée et apparaît
              en fichier à télécharger.
            </i>
          </li>
        </ul>
      </>
    ),
  },
  {
    title:
      "Consultation des textes liés aux différents niveaux (Bibliothèques, Ouvrages).",
    avatartitle: "7",
    body: (
      <>
        <Typography className="spc_text">
          Lors de la construction de son projet, il est possible de consulter
          les textes liés aux différents niveaux : Bibliothèques, Catégories,
          Ouvrages, de la base de données.
        </Typography>
        <i style={{ fontSize: 14 }}>
          Dans la liste des Bibliothèques Générales
        </i>
        <ul className="spc_list">
          <li>‘Sélectionnez’ un niveau à consulter</li>
          <li>‘Cliquez’ sur la flèche en bout de ligne</li>
          <li>
            <i>
              Une fenêtre Popup s’ouvre avec la liste des documents associés
            </i>
          </li>
        </ul>
        <br />
        <img src={img29} />
        <br />
        <ul className="spc_list">
          <li>
            ‘Cliquez’ sur le texte (en gras s'il existe) que vous souhaitez
            consulter, il apparaîtra dans une fenêtre séparée.
          </li>
        </ul>
        <br />
        <img src={img30} />
      </>
    ),
  },
  {
    title: "Consultation des sites des Fabricants liés aux ouvrages",
    avatartitle: "8",
    body: (
      <>
        <Typography className="spc_text">
          Il est possible de consulter les sites des Fabricants associés aux
          ouvrages de la base de données.
        </Typography>
        <i style={{ fontSize: 14 }}>
          Dans la liste des Bibliothèques Générales
        </i>
        <ul className="spc_list">
          <li>Sélectionnez’ un Ouvrage</li>
          <li>‘Cliquez’ sur la flèche en bout de ligne</li>
          <li>
            <i>
              Une fenêtre Popup s’ouvre avec la liste des éléments associés.
            </i>
          </li>
          <li>
            <i>
              Si des Fabricants sont associés à l'ouvrage, alors leurs logos
              apparaissent dans une liste classées alphabétiquement.
            </i>
          </li>
        </ul>
        <br />
        <img src={img31} />
        <br />
        <ul className="spc_list">
          <li>
            ‘Cliquez’ sur le logo du Fabricant que vous souhaitez consulter pour
            que son site s’affiche dans une fenêtre.
          </li>
        </ul>
        <br />
        <img src={img32} />
      </>
    ),
  },
  {
    title: "Création d'un ouvrage spécifique au Projet",
    avatartitle: "9",
    body: (
      <>
        <i style={{ fontSize: 14 }}>
          Allez dans la section « Bibliothèques de Projets »
        </i>
        <br />
        <br />
        <img src={img33} />
        <br />
        <Typography className="spc_text" style={{ fontWeight: 600 }}>
          8.1 Création d’une Bibliothèque d’Ouvrages
        </Typography>
        <ul className="spc_list">
          <li>‘Sélectionnez’ Bibliothèques de Projets</li>
          <li>
            ‘Cliquez’ sur la flèche « 6 » en bout du libellé pour ouvrir la
            fenêtre Popup de choix
          </li>
          <li>Cliquez’ sur « Ajouter Bibliothèque »</li>
          <li>‘Saisissez’ le libellé de la Bibliothèque et ‘Validez’</li>
          <li>
            <i>La nouvelle Bibliothèque d’Ouvrages s’affiche dans la liste</i>
          </li>
        </ul>
        <br />
        <Typography className="spc_text" style={{ fontWeight: 600 }}>
          8.2 Création d’une Catégorie d’Ouvrage
        </Typography>
        <ul className="spc_list">
          <li>
            ‘Sélectionnez’ la Bibliothèque d’ouvrages dans laquelle vous voulez
            créer un Catégorie d’Ouvrages
          </li>
          <li>
            ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
            fenêtre Popup de choix
          </li>
          <li>‘Cliquez’ sur « Ajouter Catégorie »</li>
          <li>‘Saisissez’ le libellé de la Catégorie et ‘Validez’</li>
          <li>
            <i>La nouvelle Catégorie d’Ouvrage s’affiche dans la liste</i>
          </li>
        </ul>
        <br />
        <Typography className="spc_text" style={{ fontWeight: 600 }}>
          8.3 Création d’un Ouvrage
        </Typography>
        <ul className="spc_list">
          <li>
            {" "}
            ‘Cliquez’ sur le libellé de la Bibliothèque d’ouvrages pour
            développer le niveau
          </li>
          <li>
            ‘Sélectionnez’ la Catégorie d’ouvrages dans laquelle vous souhaitez
            créer l’ouvrage
          </li>
          <li>
            ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
            fenêtre Popup de choix
          </li>
          <li>‘Cliquez’ sur « Ajouter Ouvrage »</li>
          <li>‘Saisissez’ le libellé de l’Ouvrage et ‘Validez’</li>
          <li>
            <i>Le nouvel Ouvrage s’affiche dans la liste</i>
          </li>
        </ul>
        <br />
        <Typography className="spc_text" style={{ fontWeight: 600 }}>
          8.4 Création d’un Détail d’Ouvrage
        </Typography>
        <ul className="spc_list">
          <li>
            ‘Cliquez’ sur le libellé de la Bibliothèque d’ouvrages pour
            développer le niveau
          </li>
          <li>
            ‘Cliquez’ sur le libellé de la Catégorie d’ouvrages pour développer
            le niveau
          </li>
          <li>
            ‘Sélectionnez’ l’Ouvrage pour lequel vous souhaitez créer le Détail
            d’Ouvrage
          </li>
          <li>
            ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
            fenêtre Popup de choix
          </li>
          <li> ‘Cliquez’ sur « Ajouter Détail d’Ouvrage »</li>
          <li>‘Saisissez’ le libellé du Détail d’Ouvrage et ‘Validez’</li>
          <li>
            <i>Le nouveau Détail d’Ouvrage s’affiche dans la liste</i>
          </li>
        </ul>
        <br />

        <Typography className="spc_text" style={{ fontWeight: 600 }}>
          8.5 Gestion des Textes associés aux différents niveaux
        </Typography>
        <div style={{ marginLeft: 15, fontWeight: 600 }}>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            1) Saisir ou Modifier un texte au Niveau Bibliothèques
          </Typography>
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ la Bibliothèque d’ouvrages pour laquelle vous
              voulez saisir du texte (Uniquement CCTP)
            </li>
            <li>
              ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
              fenêtre Popup de choix
            </li>
            <li>‘Cliquez’ sur « Modifier Textes »</li>
            <li>‘Sélectionnez’ le chapitre à renseigner</li>
            <li>‘Saisissez’ le texte dans la fenêtre de traitement de texte</li>
            <li>‘Validez’ votre saisie en cliquant sur « OK »</li>
          </ul>
          <br />
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            2) Saisir ou Modifier un texte au Niveau Catégories
          </Typography>
          <ul className="spc_list">
            <li>
              ‘Sélectionnez’ la Bibliothèque d’ouvrages et ‘Cliquez’ dessus pour
              développer le niveau
            </li>
            <li>
              ‘Sélectionnez’ la Catégorie pour laquelle vous voulez saisir du
              texte (Uniquement CCTP)
            </li>
            <li>
              {" "}
              ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
              fenêtre Popup de choix
            </li>
            <li>‘Cliquez’ sur « Modifier Textes »</li>
            <li>‘Sélectionnez’ le chapitre à renseigner</li>
            <li>‘Saisissez’ le texte dans la fenêtre de traitement de texte</li>
            <li> ‘Validez’ votre saisie en cliquant sur « OK »</li>
          </ul>
          <Typography className="spc_text" style={{ fontWeight: 600 }}>
            3) Saisir ou Modifier un texte au Niveau Ouvrages
          </Typography>
          <ul className="spc_list">
            <li>
              ‘Sélectionner’ la Bibliothèque d’ouvrages et Cliquez dessus pour
              développer le niveau
            </li>
            <li>
              ‘Sélectionnez’ la Catégorie d’Ouvrages et Cliquez dessus pour
              développer le niveau
            </li>
            <li>
              ‘Sélectionnez’ l’Ouvrage pour lequel vous voulez saisir du texte
              (BPU et CCTP)
            </li>
            <li>
              {" "}
              ‘Cliquez’ sur la flèche « 6 » en bout de libellé pour ouvrir la
              fenêtre Popup de choix
            </li>
            <li> ‘Cliquez’ sur « Modifier Textes »</li>
            <li>‘Sélectionnez' le chapitre à renseigner</li>
            <li>
              {" "}
              ‘Saisissez’ le texte dans la fenêtre de traitement de texte
            </li>
            <li> ‘Validez’ votre saisie en cliquant sur « OK »</li>
          </ul>
        </div>
      </>
    ),
  },
];

const CollapseStudyMaterial = () => {
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
            {props.body}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}

export default CollapseStudyMaterial;
