import Admin from "./pages/admin";
import Architects from "./pages/admin/architects";
import BookLibraries from "./pages/admin/bookLibraries";
import PrivateLibraries from "./pages/admin/bookLibraries/PrivateLibraries";
import Providers from "./pages/admin/providers";
import Subscriptions from "./pages/admin/subscritions";

import AdminsList from "./pages/admin/admins";
import profileSettings from "./pages/admin/profileSettings";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Presentation from "./pages/auth/presentation";
import EducationalMaterial from "./pages/auth/educationalMaterial";
import Home from "./pages/auth/home";
import StudyMaterial from "./pages/auth/studyMaterial";
import Documentation from "./pages/auth/documentation";
import Manufacturer from "./pages/auth/manufacturers";
import Fabricant from "./pages/auth/fabricants";
import Libraries from "./pages/auth/libraries";
import Services from "./pages/auth/services";
import Contact from "./pages/auth/contactUs";
import Privacy from "./pages/auth/privacy";
import Terms from "./pages/auth/terms";
import Units from "./pages/admin/bookLibraries/Units";
import Stakeholders from "./pages/admin/bookLibraries/Stakeholders";

import Families from "./pages/admin/bookLibraries/Families";
import VAT from "./pages/admin/bookLibraries/VAT";
import CCTP from "./pages/admin/bookLibraries/CCTP";
import Chap0 from "./pages/admin/bookLibraries/Chap0";
import FileManager from "./pages/admin/fileManager";

import ArchitectIndex from "./pages/Architect/Home";
import Management from "./pages/Architect/Stakeholder-Chap0Part2/Index";
import ProjectLibraries from "./pages/Architect/ProjectLibraries/Index";
import MyProfile from "./pages/Architect/MyProfile/Index";
import ProjectView from "./pages/Architect/Project/ProjectView";
import Projects from "./pages/Architect/Project/Index";
import SubscriptionSuccess from "./pages/Architect/Subscription/Success";

// Architect drawer Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

var routes = [
  // architect side routes
  {
    path: "/index", //Architect
    name: "Architect",
    text: "Dashboard",
    icon: <HomeOutlinedIcon />,
    component: ArchitectIndex,
    layout: "/architect",
  },
  {
    path: "/projects", //Architect
    name: "Architect",
    text: "My Projects",
    icon: <WorkOutlineIcon />,
    component: Projects,
    layout: "/architect",
  },
  {
    path: "/management", //Architect
    name: "Architect",
    text: "Management",
    icon: <SettingsApplicationsOutlinedIcon />,
    component: Management,
    layout: "/architect",
  },

  {
    path: "/libraries", //Architect
    name: "Architect",
    text: "Libraries",
    icon: <LibraryBooksOutlinedIcon />,
    component: ProjectLibraries,
    layout: "/architect",
  },

  {
    path: "/profile", //Architect
    name: "Architect",
    text: "Profile",
    icon: <ManageAccountsOutlinedIcon />,
    component: MyProfile,
    layout: "/architect",
  },

  {
    path: "/projectview/:id", //Architect
    name: "Architect",
    text: "ProjectView",
    component: ProjectView,
    layout: "/architect",
  },

  {
    path: "/success", //Architect
    name: "Architect",
    text: "Success",
    component: SubscriptionSuccess,
    layout: "/architect",
  },

  //admin  side routes
  {
    path: "/index", //admin dashboard
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Admin,
    layout: "/admin",
  },
  {
    path: "/architects", //architects list
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Architects,
    layout: "/admin",
  },
  {
    path: "/admins", //admins list
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: AdminsList,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: profileSettings,
    layout: "/admin",
  },
  {
    path: "/libraries",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: BookLibraries,
    layout: "/admin",
  },
  // {
  //   path: "/privateLibraries",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: PrivateLibraries,
  //   layout: "/admin",
  // },
  {
    path: "/providers",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Providers,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Subscriptions,
    layout: "/admin",
  },
  {
    path: "/folders",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: FileManager,
    layout: "/admin",
  },
  {
    path: "/units",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Units,
    layout: "/admin",
  },
  {
    path: "/stakeholders",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Stakeholders,
    layout: "/admin",
  },
  {
    path: "/vat",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: VAT,
    layout: "/admin",
  },
  {
    path: "/cctp",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: CCTP,
    layout: "/admin",
  },
  {
    path: "/chap0",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Chap0,
    layout: "/admin",
  },

  {
    path: "/families",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Families,
    layout: "/admin",
  },

  {
    path: "/admin/libraries",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Families,
    layout: "/admin",
  },

  // ******** auth routes
  {
    path: "/login",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/presentation",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Presentation,
    layout: "/auth",
  },
  {
    path: "/educational_materials",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: EducationalMaterial,
    layout: "/auth",
  },
  {
    path: "/home",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/auth",
  },
  {
    path: "/support",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: StudyMaterial,
    layout: "/auth",
  },
  {
    path: "/documentation",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Documentation,
    layout: "/auth",
  },
  {
    path: "/fabricant",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Fabricant,
    layout: "/auth",
  },

  {
    path: "/libraries",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Libraries,
    layout: "/auth",
  },
  {
    path: "/services",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Services,
    layout: "/auth",
  },
  {
    path: "/contact",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Contact,
    layout: "/auth",
  },
  {
    path: "/manufacturers",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Manufacturer,
    layout: "/auth",
  },
  {
    path: "/privacy",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Privacy,
    layout: "/auth",
  },
  {
    path: "/terms",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Terms,
    layout: "/auth",
  },
];
export default routes;
