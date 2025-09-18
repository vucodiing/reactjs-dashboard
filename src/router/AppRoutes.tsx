import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import type { IRoute } from './type';

export default function AppRoutes() {
  const renderRoutes = (routesArr: IRoute[]) =>
    routesArr.map((route, index) => {
      const Element = route.element;

      if (route.children) {
        return (
          <Route key={index} path={route.path} element={Element ? <Element /> : undefined}>
            {renderRoutes(route.children)}
          </Route>
        );
      }

      return (
        <Route
          key={index}
          path={route.path}
          index={route.index}
          element={Element ? <Element /> : undefined}
        />
      );
    });

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </BrowserRouter>
  );
}
