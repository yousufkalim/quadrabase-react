import Admin from "./pages/admin";
import Architects from "./pages/admin/architects";
import BookLibraries from "./pages/admin/bookLibraries";

import AdminsList from "./pages/admin/admins";
import profileSettings from "./pages/admin/profileSettings";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

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
];
export default routes;
