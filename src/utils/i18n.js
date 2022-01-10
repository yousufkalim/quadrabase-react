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
          "Telephone No": "Phone number",
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
          Save: "Save",
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
          "Add Work_Detail": "Add Work Detail",
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
          "Edit Chap0": "Chap0 Part2",
          "Add Chap0": "Add Chap0",
          //  CCTP
          CCTP: "CCTP",
          "Edit CCTP Title": "Edit CCTP Title",
          "Add CCTP": "Add CCTP",

          /////    Backend Notification
          //Admin
          "Admin already exists": "Admin already exists",
          "Admin created successfully": "Admin created successfully",
          "User not found!": "User not found!",
          "Invalid Password": "Invalid Password",
          "User login successfully": "User login successfully",
          "Admin does not exist": "Admin does not exist",
          "Email Sent successfully": "Email Sent successfully",
          "Invalid Token!": "Invalid Token!",
          "Token Expired!": "Token Expired!",
          "Password Updated successfully": "Password Updated successfully",
          "Admin updated successfully": "Admin updated successfully",
          "Internal server error": "Internal server error",
          "Admin deleted successfully": "Admin deleted successfully",
          //// Architects
          "Architect already exists": "Architect already exists",
          "Architect created successfully": "Architect created successfully",
          "BookLibrary already exists": "BookLibrary already exists",
          "BookLibrary created successfully":
            "BookLibrary created successfully",
          "Architect does not exist": "Architect does not exist",
          "Architect updated successfully": "Architect updated successfully",
          "Architect not found": "Architect not found",
          "Architect Deleted Successfully": "Architect Deleted Successfully",
          "BookLibraries  not found": "BookLibraries  not found",
          "Subscription Removed!": "Subscription Removed!",
          "Subscription Updated!": "Subscription Updated!",
          //  BookLibraries
          "BookLibrary updated successfully":
            "BookLibrary updated successfully",
          "BookLibrary deleted successfully":
            "BookLibrary deleted successfully",
          "BookLibray id not found": "BookLibray id not found",
          "Family id not found": "Family id not found",
          "Family added Successfully": "Family added Successfully",
          "Category name exists": "Category name exists",
          "Category added Successfully": "Category added Successfully",
          "Category id not found": "Category id not found",
          "Category updated Successfully": "Category updated Successfully",
          "Category  not found": "Category  not found",
          "Category deleted successfully": "Category deleted successfully",
          "Work name exists": "Work name exists",
          "Work added Successfully": "Work added Successfully",
          "Work updated Successfully": "Work updated Successfully",
          "Work  not found": "Work  not found",
          "Work deleted successfully": "Work deleted successfully",
          "workId id not found": "workId id not found",
          "Work Detail  exists": "Work Detail  exists",
          "Work Detail added Successfully": "Work Detail added Successfully",
          "Work id not found": "Work id not found",
          "Work Detail updated Successfully":
            "Work Detail updated Successfully",
          "Work Detail  not found": "Work Detail  not found",
          "WorkDetail deleted successfully": "WorkDetail deleted successfully",
          //    CCTP
          "CCTP already exists": "CCTP already exists",
          "CCTP created successfully": "CCTP created successfully",
          "CCTP updated successfully": "CCTP updated successfully",
          "CCTP deleted successfully": "CCTP deleted successfully",
          "CCTP Deleted!": "CCTP Deleted!",
          //  Chap0
          "Chap0 already exists": "Chap0 already exists",
          "Chap0 created successfully": "Chap0 created successfully",
          "Chap0 updated successfully": "Chap0 updated successfully",
          "Chap0 deleted successfully": "Chap0 deleted successfully",
          "Chap0 Deleted!": "Chap0 supprimé !",
          //  VAT
          "VAT already exists": "VAT already exists",
          "VAT created successfully": "VAT created successfully",
          "VAT updated successfully": "VAT updated successfully",
          "VAT deleted successfully": "VAT deleted successfully",
          "VAT Deleted!": "VAT Deleted!",
          //  Unit
          "Unit already exists": "Unit already exists",
          "Unit created successfully": "Unit created successfully",
          "Unit updated successfully": "Unit updated successfully",
          "Unit deleted successfully": "Unit deleted successfully",
          "Unit Deleted!": "Unit Deleted!",
          // Families
          "Family already exists": "Unit already exists",
          "Family created successfully": "Unit created successfully",
          "Family updated successfully": "Unit updated successfully",
          "Family deleted successfully": "Unit deleted successfully",
          "Family  not found": "Family  not found",
          //// Provider
          "Provider already exists": "Provider already exists",
          "Provider created successfully": "Provider created successfully",
          "Provider updated successfully": "Provider updated successfully",
          "Provider deleted successfully": "Provider deleted successfully",
          "Provider  not found": "Provider  not found",
          //// Subscription
          "Subscription already exists": "Subscription already exists",
          "Subscription created successfully":
            "Subscription created successfully",
          "Subscription updated successfully":
            "Subscription updated successfully",
          "Subscription deleted successfully":
            "Subscription deleted successfully",
          "Subscription  not found": "Subscription  not found",


          // New
          "Welcome to Quadrabase": "Welcome to Quadrabase",
          "Quadrabase is a business application aimed at automatically producing technical written documents for business consultation files (DCE)": "Quadrabase is a business application aimed at automatically producing technical written documents for business consultation files (DCE)",
          "Select Projects": "Select Projects",
          "Total Projects": "Total Projects",
          "Total Products": "Total Products",
          "Address 1": "Address 1",
          "Address 2": "Address 2",
          "PO Box": "PO Box",
          "Postal Code": "Postal Code",
          "City": "City",
          "Phone": "Phone",
          "Email Address (Client)": "Email Address (Client)",
          "Stakeholders List": "List of types of stakeholders",
          "Edit Stakeholder": "Edit Stakeholder",
          "Chap0": "Chap0 Part2",
          "Families": "Families",
          "Families List": "Families List",
          "Add Family": "Add Family",
          "Edit Work Detail": "Edit Work Detail",
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
          Email: "Courriel",
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
          "Subscription End Date": "Date de fin d'abonnement",
          Service: "Service",
          "Date/Time": "Date et heure",
          Action: "Action",
          // AdminheadCells
          Admins: "Administrateurs",
          Name: "Nom",
          Symbol: "Symbole",
          Ranking: "Classement",
          // VatheadCells
          Value: "Valeur",
          Type: "Taper",
          Title: "Titre",
          Text: "Texte",
          // ProviderheadCells
          "Telephone No": "Téléphone",
          "Contact No": "Contact",
          "Address 1": "Adresse 1",
          "Address 2": "Adresse 2",
          City: "Ville",
          ZipCode: "Code postale",
          Url: "URL",
          // Architects
          Architects: "Prescripteurs",
          "Add Architect": "Ajouter un prescripteur",
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
          "Edit Architect": "Modifier Prescripteur",
          Update: "Mettre à jour",
          "Are you sure?": "Êtes-vous sûr ?",
          "Do you really want to delete ? This process cannot be undone":
            "Voulez-vous vraiment supprimer ? Ce processus ne peut être annulé",
          Delete: "Supprimer",
          Cancel: "Annuler",
          // Admin
          "Edit Admin": "Modifier l’Admin",
          "Add Admin": "Ajouter un administrateur",
          // Providers
          "Add Provider": "Ajouter un fournisseur",
          Providers: "Fabricants",
          BPU: "BPU",
          "Edit Provider": "Modifier le fournisseur",
          // Libraries
          Libraries: "Bibliothèques",
          // Libraries => General Libraries
          "General Libraries": "Bibliothèques générales",
          "Add Library": "Editer la Bibliothèque",
          Edit: "Modifier",
          Delete: "Supprimer",
          "Add Category": "Ajouter une catégorie",
          "Add Work": "Ajouter un ouvrage",
          "Add Work_Detail": "Ajouter un détail d'ouvrage",
          TestWork: "TestWork",
          "Test Category": "Catégorie de test",
          Unit: "Unité",
          Quantity: "Quantité",
          "Unit Price": "Prix unitaire",
          Required: "Requis",
          "Edit Category": "Editer la Catégorie", // xxyq
          "Edit Library": "Editer la Bibliothèque",
          "Edit Work": "Editer un ouvrage",
          development: "Développement",
          Category1: "Catégorie1",
          Category2: "Catégorie2",
          Software: "Logiciel",
          // Unit
          Unitst: "Unités",
          "Add Unit": "Ajouter une Unité",
          "Edit Unit": "Modifier une Unité",
          // VAT
          VAT: "T.V.A.",
          "Add VAT": "Ajouter TVA",
          "Edit VAT": "Modifier TVA",
          // ChapO
          ChapO: "ChapO",
          // "Edit ChapO": "Modifier ChapO",
          "Edit Chap0": "Chap0 Part2",
          "Add Chap0": "Ajouter Chap0",
          // CCTP
          CCTP: "CCTP",
          "Edit CCTP Title": "Modifier Titre CCTP",
          "Add CCTP": "Ajouter CCTP",

          /////    Backend Notification
          //Admin
          "Admin already exists": "L'administrateur existe déjà",
          "Admin created successfully": "Administrateur créé avec succès",
          "User not found!": "Utilisateur non trouvé!",
          "Invalid Password": "Mot de passe incorrect",
          "User login successfully": "Connexion utilisateur réussie",
          "Admin does not exist": "L'administrateur n'existe pas",
          "Email Sent successfully": "E-mail envoyé avec succès",
          "Invalid Token!": "Jeton invalide!",
          "Token Expired!": "Jeton expiré !",
          "Password Updated successfully":
            "Mot de passe mis à jour avec succès",
          "Admin updated successfully":
            "L'administrateur a été mis à jour avec succès",
          "Internal server error": "Erreur interne du serveur",
          "Admin deleted successfully": "Administrateur supprimé avec succès",
          //// Architects
          "Architect already exists": "L'architecte existe déjà",
          "Architect created successfully": "Architecte créé avec succès",
          "BookLibrary already exists": "BookLibrary existe déjà",
          "BookLibrary created successfully": "BookLibrary créé avec succès",
          "Architect does not exist": "L'architecte n'existe pas",
          "Architect updated successfully": "Architecte mis à jour avec succès",
          "Architect not found": "Architecte introuvable",
          "Architect Deleted Successfully": "Architecte supprimé avec succès",
          "BookLibraries  not found": "Bibliothèques non trouvées",
          "Subscription Removed!": "Abonnement supprimé !",
          "Subscription Updated!": "Abonnement mis à jour !",
          //  BookLibraries
          "BookLibrary updated successfully":
            "BookLibrary mis à jour avec succès",
          "BookLibrary deleted successfully":
            "BookLibrary supprimé avec succès",
          "BookLibray id not found": "Identifiant BookLibray introuvable",
          "Family id not found": "Identifiant de famille introuvable",
          "Family added Successfully": "Famille ajoutée avec succès",
          "Category name exists": "Le nom de la catégorie existe",
          "Category added Successfully": "Catégorie ajoutée avec succès",
          "Category id not found": "Identifiant de catégorie introuvable",
          "Category updated Successfully": "Catégorie mise à jour avec succès",
          "Category  not found": "Catégorie introuvable",
          "Category deleted successfully": "Catégorie supprimée avec succès",
          "Work name exists": "Le nom de travail existe",
          "Work added Successfully": "Travail ajouté avec succès",
          "Work updated Successfully": "Travail mis à jour avec succès",
          "Work  not found": "uvre introuvable",
          "Work deleted successfully": "Travail supprimé avec succès",
          "workId id not found": "workId id introuvable",
          "Work Detail  exists": "Le détail du travail existe",
          "Work Detail added Successfully":
            "Détail du travail ajouté avec succès",
          "Work id not found": "Identifiant de travail introuvable",
          "Work Detail updated Successfully":
            "Détail du travail mis à jour avec succès",
          "Work Detail  not found": "Détail du travail introuvable",
          "WorkDetail deleted successfully": "WorkDetail a bien été supprimé",
          //    CCTP
          "CCTP already exists": "Le CCTP existe déjà",
          "CCTP created successfully": "CCTP créé avec succès",
          "CCTP updated successfully": "CCTP mis à jour avec succès",
          "CCTP deleted successfully": "CCTP Supprimé avec succès",
          "CCTP Deleted!": "CCTP supprimé !",
          //  Chap0
          "Chap0 already exists": "Chap0 existe déjà",
          "Chap0 created successfully": "Chap0 créé avec succès",
          "Chap0 updated successfully": "Chap0 mis à jour avec succès",
          "Chap0 deleted successfully": "Chap0 Supprimé avec succès",
          "Chap0 Deleted!": "Chap0 Deleted!",
          //  VAT
          "VAT already exists": "TVA existe déjà",
          "VAT created successfully": "TVA créé avec succès",
          "VAT updated successfully": "TVA mis à jour avec succès",
          "VAT deleted successfully": "TVA Supprimé avec succès",
          "VAT Deleted!": "TVA supprimée",
          //  Unit
          "Unit already exists": "Unité existe déjà",
          "Unit created successfully": "Unité créé avec succès",
          "Unit updated successfully": "Unité mis à jour avec succès",
          "Unit deleted successfully": "Unité Supprimé avec succès",
          "Unit Deleted!": "Unité supprimée !",
          // Families
          "Family already exists": "Famille existe déjà",
          "Family created successfully": "Famille créé avec succès",
          "Family updated successfully": "Famille mis à jour avec succès",
          "Family deleted successfully": "Famille Supprimé avec succès",
          "Family  not found": "Famille introuvable",
          //// Provider
          "Provider already exists": "Fournisseur existe déjà",
          "Provider created successfully": "Fournisseur créé avec succès",
          "Provider updated successfully": "Fournisseur mis à jour avec succès",
          "Provider deleted successfully": "Fournisseur Supprimé avec succès",
          "Provider  not found": "Fournisseur introuvable",
          //// Subscription
          "Subscription already exists": "Abonnement existe déjà",
          "Subscription created successfully":
            "SubscrAbonnementiption créé avec succès",
          "Subscription updated successfully":
            "Abonnement mis à jour avec succès",
          "Subscription deleted successfully":
            "Abonnement Supprimé avec succès",
          "Subscription  not found": "Abonnement introuvable",


          // New
          "Welcome to Quadrabase": "Bienvenue sur Quadrabase",
          "Quadrabase is a business application aimed at automatically producing technical written documents for business consultation files (DCE)": "Quadrabase est une application métier visant à produire automatiquement les pièces écrites techniques des dossiers de consultation des entreprises (DCE) dans le cadre de marchés de travaux",
          "Select Projects": "Sélection le Produit",
          "Total Projects": "Nb Projets",
          "Total Products": "Total des projets",
          "Address 1": "Adresse 1",
          "Address 2": "Adresse 2",
          "PO Box": "Boite Postale",
          "Postal Code": "Code Postal",
          "City": "Ville",
          "Phone": "Téléphone",
          "Email Address (Client)": "Adresse courriel (Client)",
          "Stakeholders List": "Liste des types d’intervenants",
          "Edit Stakeholder": "Modifier le Type d’intervenant",
          "Chap0": "Chap0 Part2",
          "Families": "Domaines",
          "Families List": "Liste des familles",
          "Add Family": "Ajouter une famille",
          "Add Work_Detail": "Ajouter un Détail d’ouvrage",
          "Edit Work Detail": "Modifier les détails du travail",
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
