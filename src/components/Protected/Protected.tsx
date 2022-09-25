import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function Protected({ children }: PropsWithChildren) {
  const { login } = useAuthContext();
  const [isLoggedIn] = login;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : null;
}
