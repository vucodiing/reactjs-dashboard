import PrivateRoute from "./ProtectedRoute";
import type { IRoute } from "./type";

const wrapProtectedRoutes = (routes: IRoute[]): IRoute[] => {
  return routes.map((route) => {
    const newRoute = { ...route };

    if (route.element) {
      const Component = route.element;

      const wrappedElement = <Component />;

      newRoute.element = () =>
        route.protected ? (
          <PrivateRoute allowRoles={route.meta?.allowRoles as string[]}>{wrappedElement}</PrivateRoute>
        ) : (
          wrappedElement
        );
    }

    if (route.children) {
      newRoute.children = wrapProtectedRoutes(route.children);
    }

    return newRoute;
  });
};

export default wrapProtectedRoutes;
