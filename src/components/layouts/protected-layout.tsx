import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/auth";

// Protected Layout Component
const ProtectedLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  // Nếu chưa đăng nhập, chuyển hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
