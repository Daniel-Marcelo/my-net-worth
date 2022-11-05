import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const { login } = useAuthContext();
  const [isLoggedIn] = login;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
