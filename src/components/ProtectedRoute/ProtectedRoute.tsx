import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "../../types/routes";
import cookie from "js-cookie";

interface ProtectedRouteProps {
  children: ReactNode;
  isProtected: boolean;
  redirectPath?: RoutePaths;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isProtected, redirectPath = RoutePaths.AUTH }) => {
  // Типизированная проверка авторизации по простому если содержится token в cookie
  const isAuthenticated = (): boolean => {
    const token = cookie.get("token");

    if (!token) return false;

    return true;
  };

  if (isProtected && !isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
