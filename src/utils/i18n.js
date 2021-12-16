import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // fallbackLng: ["fr", "en"],
    // we init with resources
    resources: {
      en: {
        translations: {
          // header
          Dashboard: "Dashboard",
          Presentation: "Presentation",
          "Educational Materials": "Educational Materials",
          Documentation: "Documentation",
          Manufacturers: "Manufacturers",
          Login: "Login",
          Ordered: "Ordered",
          //  sidebar
          Pages: "Pages",
          Dashboard: "Dashboard",
          // register
          "Create an Account!": "Create an Account!",
          "First Name": "First Name",
          "Last Name": "Last Name",
          Name: "Name",
          Email: "Email",
          Password: "Password",
          "Confirm Password": "Confirm Password",
          "Please choose a password.": "Please choose a password.",
          Register: "Register",
          "Already have an account?": "Already have an account?",
          //  login
          "Forgot Password?": "Forgot Password?",
          //  ArchitectheadCells
          Authorize: "Authorize",
          Subscription: "Subscription",
          "Subscription End Date": "Subscription End Date",
          Service: "Service",
          "Date/Time": "Date/Time",
          Action: "Action",
          //  AdminheadCells
          Symbol: "Symbol",
          Ranking: "Ranking",
          //  VatheadCells
          Value: "Value",
          Type: "Type",
          Title: "Title",
          Text: "Text",
          //  ProviderheadCells
          "Telephone No.": "Telephone No.",
          "Contact No.": "Contact No.",
          "Address 1": "Address 1",
          "Address 2": "Address 2",
          City: "City",
          ZipCode: "ZipCode",
          Url: "url",
          //  Architects
          Architects: "Architects",
          "Add Architect": "Add Architect",
          "Rows per page:": "Rows per page:",
          //  add Architects
          Establishment: "Establishment",
          Authorize: "Authorize",
          Yes: "Yes",
          No: "No",
          Close: "Close",
          Create: "Create",
          // set subscription
          "Set Subscription": "Set Subscription",
          "Select Subscription": "Select Subscription",
          Save: "Save1",
          "Select An Option": "Select An Option",
          "3 months subscription": "3 months subscription",
          "6 months subscription": "6 months subscriptiondfre",
          Yearly: "Yearly",
          //   update Architechs
          "Edit Architect": "Edit Architect",
          Update: "Update",
          Updating: "Updating",
          "Are you sure?": "Are you sure?",
          "Do you really want to delete ? This process cannot be undone":
            "Do you really want to delete ? This process cannot be undone",
          Delete: "Delete",
          Cancel: "Cancel",
          //   Admin
          Admins: "Admins",
          "Add Admin": "Add Admin",
          "Edit Admin": "Edit Admin",
          //  Providers
          Providers: "Providers",
          "Add Provider": "Add Provider",
          "Edit Provider": "Edit Provider",
          //  Libraries
          Libraries: "Libraries",
          //   Libraries => General Libraries
          "General Libraries": "General Libraries",
          "Add Library": "Add Library",
          Edit: "Edit",
          "Add Category": "Add Category",
          "Add Work": "Add Work",
          "Add Work_Detail": "Add Work_Detail",
          TestWork: "TestWork",
          "Test Category": "Test Category",
          Unit: "Unit",
          Quantity: "Quantity",
          "Unit Price": "Unit Price",
          Required: "Required",
          "Edit Category": "Edit Category",
          "Edit Library": "Edit Library",
          "Edit Work": "Edit Work",
          development: "development",
          Category1: "Category1",
          Category2: "Category2",
          Software: "Software",
          Symbol: "Symbol",
          Ranking: "Ranking",
          //  Unit
          Units: "Units",
          "Add Unit": "Add Unit",
          "Edit Unit": "Edit Unit",
          //  VAT
          VAT: "VAT",
          "Add VAT": "Add VAT",
          "Edit VAT": "Edit VAT",
          //   ChapO
          ChapO: "ChapO",
          "Edit ChapO": "Edit ChapO",
          "Add Chap0": "Add Chap0",
          //  CCTP
          CCTP: "CCTP",
          "Edit CCTP": "Edit CCTP",
          "Add CCTP": "Add CCTP",
        },
      },
      fr: {
        translations: {
          // header
          Dashboard: "Tableau de bord",
          Presentation: "Présentation",
          "Educational Materials": "Matériel pédagogique",
          Documentation: "Documentation",
          Manufacturers: "Fabricants",
          Login: "Se connecter",
          // register
          "Create an Account!": "Créer un compte",
          "First Name": "Prénom",
          "Last Name": "Nom de famille",
          Email: "E-mail",
          Password: "Mot de passe",
          "Confirm Password": "Confirmer le mot de passe",
          "Please choose a password.": "Veuillez choisir un mot de passe",
          Register: "S'inscrire",
          "Already have an account?": "Vous avez déjà un compte ?",
          // login
          "Forgot Password?": "Mot de passe oublié ?",
          // ArchitectheadCells
          Authorize: "Autoriser",
          Subscription: "Abonnement",
          "Subscription End Date": "Date de fin d'abonnemen",
          Service: "Service",
          "Date/Time": "Date/Heure",
          Action: "action",
          // AdminheadCells
          Name: "Nom",
          Symbol: "Symbole",
          Ranking: "Classement",
          // VatheadCells
          Value: "Valeur",
          Type: "Type",
          Title: "Titre",
          Text: "Texte",
          // ProviderheadCells
          "Telephone No.": "N° de téléphon",
          "Contact No.": "N° de contac",
          "Address 1": "Adresse 1",
          "Address 2": "Adresse 2",
          City: "Ville",
          ZipCode: "Code postale",
          Url: "URL",
          // Architects
          Architects: "Architectes",
          "Add Architect": "Ajouter un architecte",
          "Rows per page:": "Lignes par page",
          // add Architects
          Establishment: "Établissement",
          Authorize: "Autoriser",
          Yes: "Oui",
          No: "Non",
          Close: "Fermer",
          Create: "Créer",
          // set subscription
          "Set Subscription": "Définir l’abonnement",
          "Select Subscription": "Sélectionner l'abonnemen",
          Save: "Enregistrer",
          "Select An Option": "Sélectionner une option",
          "3 months subscription": "3 mois d'abonnemen",
          "6 months subscription": "6 mois d'abonnemen",
          Yearly: "Annuel",
          // update Architechs
          "Edit Architect": "Modifier l'architecte",
          Update: "Mettre à jour",
          "Are you sure?": "Êtes-vous sûr ?",
          "Do you really want to delete ? This process cannot be undone":
            "Voulez-vous vraiment supprimer ? Ce processus ne peut être annulé",
          Delete: "Supprimer",
          Cancel: "Annuler",
          // Admin
          Admins: "Admins",
          "Edit Admin": "Modifier l’Admin",
          // Providers
          Providers: "Fournisseurs",
          BPU: "BPU",
          "Edit Provider": "Modifier le fournisseur",
          // Libraries
          Libraries: "Bibliothèques",
          // Libraries => General Libraries
          "General Libraries": "Bibliothèques générale",
          "Add Library": "Ajouter une bibliothèque",
          Edit: "Modifier",
          Delete: "Supprimer",
          "Add Category": "Ajouter une catégorie",
          "Add Work": "Ajouter un ouvrage",
          "Add Work_Detail": "Ajouter un Détail d’ouvrage",
          TestWork: "TestWork",
          "Test Category": "Catégorie de test",
          Unit: "Unité",
          Quantity: "Quantité",
          "Unit Price": "Prix unitaire",
          Required: "Requis",
          "Edit Category": "Modifier la catégorie",
          "Edit Library": "Modifier la bibliothèque",
          "Edit Work": "Modifier Travail",
          development: "Développement",
          Category1: "Catégorie1",
          Category2: "Catégorie2",
          Software: "Logiciel",
          // Unit
          Unitst: "Unités",
          "Add Unit": "Ajouter une Unité",
          "Edit Unit": "Modifier une Unité",
          // VAT
          VAT: "TVA",
          "Add VAT": "Ajouter TVA",
          "Edit VAT": "Modifier TVA",
          // ChapO
          ChapO: "ChapO",
          "Edit ChapO": "Modifier ChapO",
          "Add Chap0": "Ajouter Chap0",
          // CCTP
          CCTP: "CCTP",
          "Edit CCTP": "Modifier CCTP",
          "Add CCTP": "Ajouter CCTP",
        },
      },
    },

    fallbackLng: "fr",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
