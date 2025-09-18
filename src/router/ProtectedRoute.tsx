import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import Loading from '@/components/Loading/Loading';
import mushroom from '@/service/api/mushroom-api';
const ProtectedRoute: React.FC<{ allowRoles?: string[] }> = ({ allowRoles }) => {
  const location = useLocation();
  const { roles, loading } = useUserStore();
  const isHasToken = Boolean(localStorage.getItem(`mushroom.tokens[${mushroom.$using()}]`));
  if (loading) {
    return <Loading />;
  }

  if (!isHasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowRoles && roles.every((role) => !allowRoles.includes(role))) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
