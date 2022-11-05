import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useAuthService } from "../../services/AuthService";

export const useRegister = () => {
  const authService = useAuthService();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [, setIsLoggedIn] = login;

  return {
    registerWithEmailAndPassword: async (email: string, password: string) => {
      await authService.createWithEmailAndPassword(email, password);
      setIsLoggedIn(true);
      navigate("/portfolios");
    },
  } as const;
};
