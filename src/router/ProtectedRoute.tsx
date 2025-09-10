import { Navigate, useLocation } from "react-router-dom";
import mushroom from "../service/api/mushroom-api";
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem(
    "mushroom.tokens[" + mushroom.$using() + "]"
  );

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
