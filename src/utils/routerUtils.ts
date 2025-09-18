import type { IRoute } from '../router/type';
export function filterRoutesByRole(routes: IRoute[], roles: string[]): IRoute[] {
  return routes
    .filter((route) => {
      if (route?.allowRoles) {
        return route.allowRoles.some((role) => roles.includes(role));
      }
      return true;
    })
    .map((route) => ({
      ...route,
      children: route.children ? filterRoutesByRole(route.children, roles) : undefined,
    }));
}
