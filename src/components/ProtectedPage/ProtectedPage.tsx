import { ReactNode } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { x } from "@xstyled/styled-components";

interface ProtectedPageProps {
  children: ReactNode;
}

export function ProtectedPage({ children }: ProtectedPageProps) {
  const { login } = useAuthContext();
  const [isLoggedIn] = login;

  if(isLoggedIn === undefined) {
    return <x.div h="90vh" display="flex" alignItems="center" justifyContent="center">
    <ProgressBar
    height="200"
    width="200"
    ariaLabel="progress-bar-loading"
    wrapperStyle={{}}
    wrapperClass="progress-bar-wrapper"
    borderColor='#387be980'
    barColor='#1976d2'
  />
    </x.div>
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
