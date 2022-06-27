import React from "react";
import Appbar from "./spc/components/Appbar";
import Typography from "@mui/material/Typography";
import Quadralogo from "./spc/assets/images/Quadralogo2.svg";
import CollapseStudyMaterial from "./spc/components/CollapseStudyMaterial";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const Privacy = () => {
  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography className="spc_suppportHeroheading" style={{ paddingBottom: "14%" }}>
            Déclaration de confidentialité sur le site : <br />
            Quadrabase
          </Typography>
        </div>
      </div>

      <div>
        <Grid container spacing={1} sx={{ padding: "6%" }}>
          <div style={{ padding: "0px 15px 0px 20px" }}>
            <p align="left">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                <a name="AAAA">
                  <b>Date de dernière mise à jour</b>
                </a>{" "}
                : le 30/04/2021
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Sur le site Quadrabase (si après dénommé le "Site"), nous nous attachons à protéger vos données personnelles.
                Cette déclaration de confidentialité s’applique uniquement à ce site ; elle ne peut pas s’appliquer à d’autres
                sites, en ligne ou non, ni à d’autres produits ou services. En accédant au Site, vous acceptez l'enregistrement de
                vos informations et les conditions d'utilisation décrites dans cette déclaration de confidentialité.{" "}
              </span>
            </p>

            <h5 align="left" style={{ paddingTop: 2 }}>
              <span id="dnn_ctr_Privacy_lblPrivacy">Sur cette page</span>
            </h5>

            <div align="left">
              <table border="0" cellPadding="0" cellSpacing="0" style={{ marginTop: "7px", marginBottom: "12px" }}>
                <tbody>
                  <tr valign="top">
                    <td className="onThisPage">
                      <ul>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Collecte de vos informations personnelles</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Utilisation de vos données personnelles</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Contrôle de vos informations personnelles</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Accès à vos données personnelles</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Sécurité de vos informations personnelles</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Protection des informations personnelles des enfants</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Cookies</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Application de cette déclaration de confidentialité</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <ListItemIcon sx={{ minWidth: "16px" }}>
                              <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                            </ListItemIcon>
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <a href="#">
                                <font size="2">Modifications de cette déclaration de confidentialité</font>
                              </a>
                            </span>
                          </p>
                        </li>
                        <li>
                          <p align="left">
                            <span id="dnn_ctr_Privacy_lblPrivacy">
                              <ListItemIcon sx={{ minWidth: "16px" }}>
                                <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                              </ListItemIcon>
                              <a href="#">
                                <font size="2">Contacts</font>
                              </a>
                            </span>
                          </p>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EKAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Collecte de vos informations personnelles</strong>
            </h2>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous vous demanderons des informations lorsque nous aurons besoin de données permettant de vous identifier
                personnellement (informations personnelles) ou dans le but de vous contacter. En général, ces informations sont
                nécessaires lorsque nous vous fournissons un service ou effectuons une transaction dont vous avez fait la demande,
                par exemple pour des informations sur des produits et services de ce Site, l'inscription à un concours, la
                commande de bulletins d'information par courrier électronique, l'accès à un site prioritaire à accès limité ou
                l'achat et l'enregistrement de produits sur ce Site. Les informations personnelles que nous collectons peuvent
                comprendre votre nom, votre fonction, le nom de votre entreprise ou de votre organisation, votre adresse de
                messagerie professionnelle, votre numéro de téléphone professionnel, votre adresse postale professionnelle ou
                personnelle, des informations sur votre fonction ou sur votre entreprise, et des informations sur votre carte de
                crédit.{" "}
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Le Site peut également collecter des informations sur votre visite, dont le nom de votre fournisseur d'accès
                Internet et l'adresse IP utilisés pour accéder à Internet, la date et l'heure d'accès au site, les pages
                auxquelles vous accédez sur le Site et l'URL du site à partir duquel vous êtes arrivé sur notre site. Ces
                informations sont destinées à l'analyse des tendances et à l'administration et l'amélioration du Site.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Afin d'éviter que votre adresse de messagerie ou d'autres informations personnelles ne soient récupérées et mal
                utilisées par d'autres, nous vous recommande d'être prudent quant à l'utilisation d'une adresse de messagerie
                existante ou d'autres informations personnelles dans des groupes de discussion, des conversations ou autres forums
                publics.
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EJAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Utilisation de vos données personnelles</strong>
            </h2>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Les informations personnelles collectées sur ce Site sont utilisées pour le fonctionnement du Site et pour nous
                permettre de vous fournir le service ou de mener à bien la transaction que vous avez demandé ou autorisé.{" "}
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Dans le cadre de ces utilisations, ce Site peut utiliser des informations personnelles dans le but de vous fournir
                un service clientèle plus efficace, pour améliorer le Site et tout autre produit ou service de ce Site et pour
                vous faciliter la navigation en vous évitant d'entrer plusieurs fois les mêmes informations ou en adaptant le site
                à vos préférences ou vos intérêts. Afin de vous proposer un environnement constant dans vos interactions avec
                notre Site, les informations collectées peuvent être utilisées en combinaison avec celles collectées par d'autres
                services de notre Site.
              </span>
            </p>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous pouvons utiliser vos informations personnelles pour vous faire parvenir des informations importantes sur le
                produit ou le service que vous utilisez.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous combinons les données de visites du site avec des données démographiques anonymes dans le but d’effectuer des
                recherches ; les volumes d’informations obtenus sont utilisés de manière à vous fournir le contenu que vous
                attendez. Dans certaines zones d’accès limité de notre Site, avec votre accord, nous combinerons les données de
                visite du site avec vos données personnelles de manière à vous proposer des contenus personnalisés. Sans votre
                autorisation, nous ne serons pas en mesure de vous fournir un service personnalisé et nous ne pourrons pas
                combiner vos données personnelles avec celles des visites du site.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Lorsque vous vous inscrivez à un bulletin d'information ou que vous déclarer que vous souhaitez recevoir des
                messages électroniques publicitaires, notre Site peut utiliser des liens personnalisés ou d'autres technologies
                similaires pour suivre les liens sur lesquels vous cliquez dans les messages électroniques. Nous pouvons associer
                ces informations à vos informations personnelles afin de vous envoyer des messages ou des informations encore plus
                ciblés.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Certains services sur notre Site offrent aux particuliers la possibilité d'afficher publiquement certaines
                informations personnelles, par exemple pour un de nos partenaires qui souhaite publier ses informations de contact
                dans le cadre des services qu'il propose. La participation à de tels services est toujours facultative.{" "}
              </span>
            </p>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Notre Site utilise parfois d'autres entreprises pour fournir certains services de sa part. Il peut s'agir par
                exemple de l'hébergement de sites Web, de l'empaquetage, de l'expédition et de la livraison de prix, de réponses à
                des questions posées par un client sur les produits et services ou encore de l'envoi d'informations sur nos
                produits, nos offres spéciales ou d'autres nouveaux services. Nous ne transmettrons à ces entreprises que les
                informations personnelles nécessaires à leur service. Ces entreprises sont tenues de respecter la confidentialité
                de ces informations et ne peuvent en aucun cas les utiliser dans un autre but.{" "}
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous communiquerons vos informations personnelles uniquement si la loi l’exige ou si nous pensons en toute bonne
                fois qu’il est nécessaire de nous conformer à des décrets de loi ou à une procédure légale, protéger et défendre
                nos droits ou nos propriétés et agir dans des cas d’urgence pour protéger la sécurité personnelle de nos employés
                et utilisateurs du site.{" "}
              </span>
            </p>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Les informations personnelles collectées sur le Site peuvent être stockées et utilisées en France ou dans tout
                autre pays par ses filiales, ses partenaires ou ses agents sont présents. En utilisant le Site, vous consentez à
                de tels transferts de vos informations personnelles en dehors de votre pays.
              </span>
            </p>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous respectons et nous conformons à la{" "}
                <a href="https://www.cnil.fr/index.php?id=301" target="_new">
                  <b>loi du 6 janvier 1978</b>
                </a>{" "}
                (lien vers le site de la CNIL).{" "}
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EIAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Contrôle de vos informations personnelles</strong>
            </h2>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Sauf indication contraire dans cette déclaration, les informations personnelles que vous fournissez sur le Site ne
                seront pas transmises en dehors de ses filiales et partenaires sans votre autorisation. Tel que décrit dans la
                section qui suit, vous pouvez accéder à vos informations personnelles et choisir comme vous souhaitez être
                contacté.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Cette déclaration de confidentialité et les choix que vous faites sur le Site ne s'appliquent pas forcément aux
                informations personnelles que vous nous avez fournies dans le contexte d'autres produits ou services distincts.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous pouvons vous envoyer régulièrement des courriers électroniques pour vous informer des problèmes de service
                technique ou de sécurité liés à un produit ou un service que vous avez demandé, ou accuser réception d’une demande
                de produit ou de service. Dans certains services offerts sur notre Site, le contact avec le client est un élément
                essentiel du service. Vous ne pourrez pas annuler votre inscription à ces publipostages car ils font partie
                intégrante du service que vous avez choisi.
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EHAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Accès à vos données personnelles</strong>
            </h2>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="left">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Vous pouvez rectifier vos données personnelles et vos informations de contact sur ce Site après vous être
                identifié.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Certains services que nous offrons peuvent recueillir des informations non accessibles par le biais de vos
                paramètres personnels. Toutefois, dans ce cas, vous pouvez accéder à vos données personnelles en nous contactant
                comme expliqué au bas de cette déclaration, ou via d’autres sources de communication décrites par le service.{" "}
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EGAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Sécurité de vos informations personnelles</strong>
            </h2>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous vous garantissons rigoureusement la protection de vos informations personnelles. Nous faisons appel à
                diverses technologies et procédures de sécurité afin d’assurer la protection de vos données personnelles et éviter
                qu’elles ne soient consultées, utilisées ou divulguées sans autorisation. Par exemple, nous stockons les données
                que vous nous fournissez sur des serveurs dont l’accès est limité et qui sont situés dans des installations
                surveillées. De plus, lorsque nous transmettons des informations confidentielles sensibles sur Internet (un numéro
                de carte de crédit, par exemple), ces informations sont protégées au moyen d’un système de cryptage tel que le
                protocole SSL (Secure Socket Layer) ou toutes autres techniques permettant le chiffrement de ces informations.{" "}
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EFAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Protection des informations personnelles des enfants</strong>
            </h2>

            <p align="left">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Notre Site ne collecte pas volontairement les informations personnelles des enfants.
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EEAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Cookies </strong>
            </h2>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Les cookies sont utilisés sur ce Site pour assurer l'intégrité du processus d'inscription et pour personnaliser le
                Site. Un cookie est un petit fichier texte placé sur votre disque dur par un serveur de pages Web. Il ne peut pas
                être utilisé pour exécuter des programmes ou pour infecter votre ordinateur avec des virus. Les cookies vous sont
                adressés exclusivement et peuvent être lus uniquement par les serveurs Web appartenant au domaine qui vous a livré
                le cookie.{" "}
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                L’une des principales fonctions pratiques des cookies est de vous faire gagner du temps. Par exemple, si vous
                personnalisez une page Web, ou naviguez dans un site, le cookie aidera le site à trouver vos informations
                spécifiques au cours des visites suivantes. Cela permet, notamment, de simplifier le processus de livraison des
                contenus qui vous intéressent et la navigation sur le site. Lorsque vous revenez sur le site, les informations que
                vous avez fournies auparavant sont réutilisées pour vous permettre d’utiliser plus facilement les fonctions du
                site que vous avez personnalisé.
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous pouvons également utiliser des pixels invisibles, également connus sous le nom de GIF invisible, pour aider à
                l'implantation du cookie. Nous utilisons cette technologie comme un outil de compilation de statistiques relatives
                à l'utilisation de notre Site. Ces statistiques incluent le nombre de visiteurs ayant cliqué sur les éléments clés
                (par exemple des liens ou des graphismes) d'une page Web, d'une page de journal Web ou d'un bulletin d'information
                de notre Site. Nous sommes susceptibles de partager des statistiques compilées avec des entreprises partenaires,
                mais nous n'autorisons pas d'autres entreprises à placer des images .gif ou des cookies sur nos sites, sauf dans
                le cas d'un intérêt particulier temporaire pour nos clients (par exemple par l'intégration d'un service d'un site
                basé sur des cookies tiers ou des .gif clairs).
              </span>
            </p>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Vous pouvez accepter ou refuser les cookies. La plupart des navigateurs Web acceptent les cookies automatiquement,
                mais vous pouvez modifier les paramètres de votre navigateur pour leur refuser l’accès à votre ordinateur si vous
                le souhaitez. Si vous choisissez de refuser les cookies, vous risquez de ne pas pouvoir utiliser complètement les
                fonctions interactives de ce site ou d’autres sites Web que vous visiterez.{" "}
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EDAA"></a>
              <a name="ECAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Application de cette déclaration de confidentialité</strong>
            </h2>

            <p align="left">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Si vous avez des questions concernant cette déclaration, contactez-nous par le biais du formulaire que nous
                mettons à votre disposition auquel vous avez accès après vous être identifié.
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EBAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Modifications de cette déclaration de confidentialité</strong>
            </h2>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Nous mettons occasionnellement à jour cette déclaration de confidentialité. Dans ce cas, nous corrigeons également
                la date de «{" "}
                <a href="/Privacy#AAAA">
                  <b>dernière mise à jour</b>
                </a>{" "}
                » en haut de la déclaration de confidentialité. En cas de modifications substantielles de cette déclaration, nous
                vous le signalerons en plaçant une notice visible sur la page d'accueil du site ou en vous envoyant directement
                une notification. Nous vous encourageons à consulter régulièrement cette déclaration de confidentialité afin de
                rester informé de comment nous vous aidons à protéger les informations personnelles que nous collectons.
                L'utilisation continue de ce service constitue votre accord quant à cette déclaration de confidentialité et à ses
                mises à jour.{" "}
              </span>
            </p>

            <div style={{ marginTop: "3px", marginBottom: "10px" }}>
              <p align="left">
                <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                  <a className="topOfPage" href="#">
                    Haut de page
                  </a>
                </span>
              </p>
            </div>
            <span id="dnn_ctr_Privacy_lblPrivacy">
              <a name="EAAA"></a>
            </span>

            <h2 align="left">
              <strong id="dnn_ctr_Privacy_lblPrivacy">Contacts</strong>
            </h2>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="justify">
              <span id="dnn_ctr_Privacy_lblPrivacy">
                Vos commentaires concernant cette déclaration de confidentialité sont les bienvenus. Si vous estimez que notre
                Site n'a pas respecté cette déclaration de confidentialité, contactez-nous par voie électronique ou par courrier
                postal à l'adresse se trouvant sur les{" "}
                <a href="/Default.aspx?tabid=36&amp;ctl=Terms">
                  <b>conditions d'utilisation</b>
                </a>
                , et nous userons de tous moyens raisonnables pour rapidement déterminer le problème et y remédier.
              </span>
            </p>
            <span id="dnn_ctr_Privacy_lblPrivacy"> </span>

            <p align="left">
              <span id="dnn_ctr_Privacy_lblPrivacy" style={{ color: "blue" }}>
                <a className="topOfPage" href="#">
                  Haut de page
                </a>
              </span>
            </p>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Privacy;
