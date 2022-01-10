import Admin from "./pages/admin";
import Architects from "./pages/admin/architects";
import BookLibraries from "./pages/admin/bookLibraries";
import Providers from "./pages/admin/providers";

import AdminsList from "./pages/admin/admins";
import profileSettings from "./pages/admin/profileSettings";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Presentation from "./pages/auth/presentation";
import EducationalMaterial from "./pages/auth/educationalMaterial";
import Documentation from "./pages/auth/documentation";
import Manufacturer from "./pages/auth/manufacturers";

import Units from "./pages/admin/bookLibraries/Units";
import Stakeholders from "./pages/admin/bookLibraries/Stakeholders";

import Families from "./pages/admin/bookLibraries/Families";
import VAT from "./pages/admin/bookLibraries/VAT";
import CCTP from "./pages/admin/bookLibraries/CCTP";
import Chap0 from "./pages/admin/bookLibraries/Chap0";

var routes = [
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
  {
    path: "/providers",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Providers,
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
    path: "/documentation",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Documentation,
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
    path: "/families",
    name: "Auth",
    icon: "ni ni-tv-2 text-primary",
    component: Families,
    layout: "/admin",
  },
];
export default routes;
