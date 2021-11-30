import Admin from "./pages/admin";
import Architects from "./pages/admin/architects";
import Admins from "./pages/admin/admins";

import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

var routes = [
  //admin  side routes
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Admin,
    layout: "/admin",
  },
  {
    path: "/architects",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Architects,
    layout: "/admin",
  },
  {
    path: "/admins",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Admins,
    layout: "/admin",
  },

  // ********
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
