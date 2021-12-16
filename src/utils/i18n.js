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
          Presentation: "Presentation",
          "Educational Materials": "Educational Materials",
          Documentation: "Documentation",
          Manufacturers: "Manufacturers",
          Login: "Login",
          //  sidebar
          Pages: "Pages",
          Dashboard: "Dashboard",
          // register
          "Create an Account!": "Create an Account!",
          "First Name": "First Name",
          "Last Name": "Last Name",
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
          Name: "Name",
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
          url: "url",
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
          "6 months subscription": "6 months subscription",
          Yearly: "Yearly",
          //   update Architechs
          "Edit Architect": "Edit Architect",
          Update: "Update",
          "Are you sure?": "Are you sure?",
          "Do you really want to delete ? This process cannot be undone":
            "Do you really want to delete ? This process cannot be undone",
          Delete: "Delete",
          Cancel: "Cancel",
          //   Admin
          Admins: "Admins",
          "Edit Admin": "Edit Admin",
          //  Providers
          Providers: "Providers",
          "Edit Provider": "Edit Provider",
          //  Libraries
          Libraries: "Libraries",
          //   Libraries => General Libraries
          "General Libraries": "General Libraries",
          "Add Library": "Add Library",
          Edit: "Edit",
          Delete: "Delete",
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
          //  Unit
          Unitst: "Units",
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
          Presentation: "",
          "Educational Materials": "",
          Documentation: "",
          Manufacturers: "",
          Login: "",
          // register
          "Create an Account!": "",
          "First Name": "",
          "Last Name": "",
          Email: "",
          Password: "",
          "Confirm Password": "",
          "Please choose a password.": "",
          Register: "",
          "Already have an account?": "",
          //  login
          "Forgot Password?": "",
          //  ArchitectheadCells
          Authorize: "",
          Subscription: "",
          "Subscription End Date": "",
          Service: "",
          "Date/Time": "",
          Action: "",
          //  AdminheadCells
          Name: "",
          Symbol: "",
          Ranking: "",
          //  VatheadCells
          Value: "",
          Type: "",
          Title: "",
          Text: "",
          //  ProviderheadCells
          "Telephone No.": "",
          "Contact No.": "",
          "Address 1": "",
          "Address 2": "",
          City: "",
          ZipCode: "",
          url: "",
          //  Architects
          Architects: "",
          "Add Architect": "",
          "Rows per page:": "",
          //  add Architects
          Establishment: "",
          Authorize: "",
          Yes: "",
          No: "",
          Close: "",
          Create: "",
          // set subscription
          "Set Subscription": "",
          "Select Subscription": "",
          Save: "Save",
          "Select An Option": "",
          "3 months subscription": "",
          "6 months subscription": "",
          Yearly: "",
          //   update Architechs
          "Edit Architect": "",
          Update: "",
          "Are you sure?": "",
          "Do you really want to delete ? This process cannot be undone": "",
          Delete: "",
          Cancel: "",
          //   Admin
          Admins: "",
          "Edit Admin": "",
          //  Providers
          Providers: "",
          BPU: "",

          "Edit Provider": "",
          //  Libraries
          Libraries: "",
          //   Libraries => General Libraries
          "General Libraries": "",
          "Add Library": "",
          Edit: "",
          Delete: "",
          "Add Category": "",
          "Add Work": "",
          "Add Work_Detail": "",
          TestWork: "",
          "Test Category": "",
          Unit: "",
          Quantity: "",
          "Unit Price": "",
          Required: "",
          "Edit Category": "",
          "Edit Library": "",
          "Edit Work": "",
          development: "",
          Category1: "",
          Category2: "",
          Software: "",
          //  Unit
          Unitst: "",
          "Add Unit": "",
          "Edit Unit": "",
          //  VAT
          VAT: "",
          "Add VAT": "",
          "Edit VAT": "",
          //   ChapO
          ChapO: "",
          "Edit ChapO": "",
          "Add Chap0": "",
          //  CCTP
          CCTP: "",
          "Edit CCTP": "",
          "Add CCTP": "",
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
