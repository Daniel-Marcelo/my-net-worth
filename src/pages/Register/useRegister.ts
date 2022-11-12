import { useNavigate } from "react-router-dom";
import { useAuthService } from "../../services/AuthService";

export const useRegister = () => {
  const authService = useAuthService();
  const navigate = useNavigate();

  return {
    registerWithEmailAndPassword: async (email: string, password: string) => {
      await authService.createWithEmailAndPassword(email, password);
      navigate("/portfolios");
    },
  } as const;
};
