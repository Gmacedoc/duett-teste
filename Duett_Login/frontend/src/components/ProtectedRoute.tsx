import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: "Administrador" | "Usuario";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    
    return <Navigate to="/" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
