import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function LoggedInReRoute({ children }: PropsWithChildren) {
  const { login } = useAuthContext();
  const [isLoggedIn] = login;

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return <>{children}</>;
}
