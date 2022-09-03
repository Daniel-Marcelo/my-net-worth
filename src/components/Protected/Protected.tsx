import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function Protected({ children }) {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
