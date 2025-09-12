import * as React from "react";
import type { IRoute } from "./type";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
const Login = React.lazy(() => import("../auth/login/login"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
const UserList = React.lazy(() => import("../pages/Users/UsersList"));
const UserAdd = React.lazy(() => import("../pages/Users/UsersAdd"));

const routes: IRoute[] = [
  {
    path: "/",
    element: React.lazy(() => import("../layouts/Layout")),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        index: true,
        element: Dashboard,
        protected: true,
        meta: {
          allowRoles: ["Admin", "User"],
        },
      },
      {
        path: "users",
        name: "Users",
        icon: PersonIcon,
        children: [
          {
            path: "list",
            element: UserList,
            name: "User List",
            protected: true,
            meta: {
              allowRoles: ["User"],
            },
          },
          {
            path: "add",
            element: UserAdd,
            name: "User Add",
            protected: true,
            meta: {
              allowRoles: ["User"],
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/403",
    element: React.lazy(() => import("../pages/Forbidden/Forbidden")),
  },
  {
    path: "*",
    element: React.lazy(() => import("../pages/NotFound/NotFound")),
  },
];

export default routes;
