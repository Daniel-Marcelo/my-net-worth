import { useAuthService } from "../../services/AuthService";

export const useLogin = () => {
  const authService = useAuthService();
  const loginWithGoogle = async () => {
    await authService.loginWithGoogleV2();
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    await authService.loginWithEmailPassword(email, password);
  };

  return [loginWithGoogle, loginWithEmailPassword] as const;
};
