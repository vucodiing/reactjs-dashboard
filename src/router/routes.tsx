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
        path: "/",
        name: "Dashboard",
        icon: DashboardIcon,
        index: true,
        element: Dashboard,
        protected: true,
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
          },
          {
            path: "add",
            element: UserAdd,
            name: "User Add",
            protected: true,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: Login,
  },
];

export default routes;
