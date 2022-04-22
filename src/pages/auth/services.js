import React from "react";
import Appbar from "./spc/components/Appbar";
import Typography from "@mui/material/Typography";
import Quadralogo from "./spc/assets/images/Quadralogo2.svg";

const Services = () => {
  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography
            className="spc_suppportHeroheading"
            style={{ paddingBottom: "14%" }}
          >
            Services
          </Typography>
        </div>
      </div>

      <div className="w-full  md:mx-auto py-20 ">
        <div className="container mx-auto px-6">
          <div className="w-3/4 mx-auto ">
            <u>
              <strong>Offre pour les Prescripteurs</strong>
            </u>
            <br />
            <br />
            <small>1)Abonnement 1 an + 1 pack de 5 projets</small>
            <br />
            <small style={{ color: "#1e90ff" }}>
              Cet abonnement permet d'accéder à l'applica􏰁on Quadrabase durant
              1an via un iden􏰁fiant et un mot de passe. Il prend effet dès la
              transmission par mail de l'iden􏰁fiant et mot de passe. Un mail
              d'informa􏰁on sera envoyé au Client 2 mois et 1 semaine avant la
              date d'échéance de l'abonnement.
              <br />
              Sur la page « Ges􏰁on des Projets » de l'applica􏰁on Quadrabase, un
              compteur indique au Client le temps d'abonnement restant.
              <br />
              Le service comprend dans son prix : l'abonnement 1 an et 1 pack de
              5 projets
              <br />
              Un projet est ac􏰁f tant que le Client ne le supprime pas, avec une
              durée maximum de 2 ans. En cas de duplica􏰁on d'un projet existant,
              le nouveau projet est décompté comme un nouveau projet. Si un
              projet est en cours, ou s'il reste un ou des projets à créer,
              au-delà de la période d'abonnement, alors le Client devra
              renouveler son abonnement pour accéder aux projets en cours ou
              restants. A la fin d'un abonnement non reconduit, le service
              s'arrête et les projets en cours ou restants sont perdus.
            </small>
            <br />
            <br />

            <small>2)Renouvellement d'Abonnement 1 an (Seul)</small>
            <br />
            <small style={{ color: "#1e90ff" }}>
              Le renouvellement n'est accessible qu'aux Clients déjà inscrits.
              <br />
              Il n'y a pas de projets associés au renouvellement de
              l'abonnement.
            </small>
            <br />
            <br />

            <small>3)Paquets de 5 Projets Supplémentaires</small>
            <br />
            <small style={{ color: "#1e90ff" }}>
              Chaque Client a la possibilité d'acheter 1 ou plusieurs packs de 5
              projets en complément de son abonnement ini􏰁al. Il peut également
              acheter d'autres packs
              <br />
              durant une période d'abonnement valide.
            </small>
            <br />
            <br />
            <u>
              <strong>Offre pour les Fabricants</strong>
            </u>
            <br />
            <br />
            <small>1)Abonnement « Référencement » 1 an : (2'000€ H.T.)</small>
            <br />
            <small style={{ color: "#1e90ff" }}>
              L'abonnement « Référencement » comprend l’intégra􏰁on du Fabricant
              dans un lis􏰁ng général et au droit des
              Ouvrages/Presta􏰁ons/Produits qui le concerne.
              <br />
              Un lien hypertexte perme􏰂ra d’accéder diectement au site du
              Fabricant.
            </small>
            <br />
            <br />
            <small>2)Abonnement « Alerte » 1 an : (5'000 H.T.)</small>
            <br />
            <small style={{ color: "#1e90ff" }}>
              L'abonnement « Alerte » concerne l'envoi d'un message d'informa􏰁on
              au Fabricant/Fournisseur dès lors qu'un projet en cours
              d'élabora􏰁on intègre un Ouvrage/Presta􏰁on/Produits qui le
              concerne. Le message « d'Alerte » comportera les indica􏰁ons
              suivantes : -Nom du maître d'ouvrage/Nom du Prescripteur/Nom du
              projet en cours/Nom de l'Ouvrage/Presta􏰁on/Produit concerné.
              <br />
              Le message récapitula􏰁f sera envoyé par mail chaque vendredi au
              Fabricant.
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
