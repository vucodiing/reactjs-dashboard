// AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import type { IRoute } from './type';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  const renderRoutes = (routesArr: IRoute[]) =>
    routesArr.map((route, index) => {
      const Element = route.element ? <route.element /> : null;

      if (route.protected) {
        return (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoute allowRoles={route.allowRoles}>{Element}</ProtectedRoute>}
          >
            {route.children && renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route key={index} path={route.path} element={Element}>
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });

  return <Routes>{renderRoutes(routes)}</Routes>;
}
