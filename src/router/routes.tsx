import * as React from 'react';
import type { IRoute } from './type';
import { DashboardOutlined, PersonOutline, MapOutlined } from '@mui/icons-material';
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const UserList = React.lazy(() => import('../pages/Users/UsersList'));
const UserAdd = React.lazy(() => import('../pages/Users/UsersAdd'));
const MapBox = React.lazy(() => import('../pages/Map/Map'));
const routes: IRoute[] = [
  {
    path: '/',
    element: React.lazy(() => import('../layouts/Layout')),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        icon: DashboardOutlined,
        index: true,
        element: Dashboard,
        protected: true,
        allowRoles: ['Admin', 'User'],
      },
      {
        path: 'users',
        name: 'Users',
        icon: PersonOutline,
        children: [
          {
            path: 'list',
            element: UserList,
            name: 'User List',
            protected: true,
            allowRoles: ['User'],
          },
          {
            path: 'add',
            element: UserAdd,
            name: 'User Add',
            protected: true,
            allowRoles: ['User'],
          },
        ],
      },
      {
        path: 'map',
        name: 'Map',
        element: MapBox,
        protected: true,
        icon: MapOutlined,
        allowRoles: ['tEST'],
      },
    ],
  },
  {
    path: '/login',
    element: React.lazy(() => import('../auth/login')),
  },
  {
    path: '/change-password',
    element: React.lazy(() => import('../auth/changePassword')),
  },
  {
    path: '/403',
    element: React.lazy(() => import('../pages/Forbidden/Forbidden')),
  },
  {
    path: '*',
    element: React.lazy(() => import('../pages/NotFound/NotFound')),
  },
];

export default routes;
