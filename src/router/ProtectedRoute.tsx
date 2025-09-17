import { Navigate, useLocation } from 'react-router-dom';
import mushroom from '../service/api/mushroom-api';
const PrivateRoute = ({
  children,
  allowRoles,
}: {
  children: React.ReactNode;
  allowRoles: string[];
}) => {
  const location = useLocation();
  const isHasToken = !!localStorage.getItem('mushroom.tokens[' + mushroom.$using() + ']');
  const rolesFromLocalStogare = localStorage.getItem('roles');
  const roles = rolesFromLocalStogare ? (JSON.parse(rolesFromLocalStogare) as string[]) : null;

  if (!isHasToken) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!allowRoles || !roles || roles.every((role) => !allowRoles.includes(role)))
    return <Navigate to="/403" />;
  return children;
};

export default PrivateRoute;
