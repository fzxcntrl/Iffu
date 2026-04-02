import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AdminRoute = () => {
  const { userInfo } = useAuthStore();

  if (userInfo && userInfo.isAdmin) {
    return <Outlet />;
  }
  
  return <Navigate to="/login" replace />;
};

export default AdminRoute;
