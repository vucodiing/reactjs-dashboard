import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import mushroom from '@/service/api/mushroom-api';
const ProtectedRoute: React.FC<{ allowRoles?: string[]; children: React.ReactNode }> = ({
  allowRoles,
  children,
}) => {
  const location = useLocation();
  const { roles } = useUserStore();
  const isHasToken = Boolean(localStorage.getItem(`mushroom.tokens[${mushroom.$using()}]`));
  if (!isHasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowRoles && roles.every((role) => !allowRoles.includes(role))) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;
