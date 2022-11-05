import { AuthService } from "../../Auth.service";
import { useAuthContext } from "../../context/AuthContext";
import { useAuthService } from "../../services/AuthService";

export const useLogin = () => {
  const { login, auth } = useAuthContext();
  const authService = useAuthService();
  const [, setAuthContext] = auth;
  const [, setIsLoggedIn] = login;

  const loginWithGoogle = async () => {
    const data = await authService.loginWithGoogleV2();
    setAuthContext(data);
    setIsLoggedIn('email@mail.com');
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    await authService.loginWithEmailPassword(email, password);
    setIsLoggedIn(email);
  };

  return [loginWithGoogle, loginWithEmailPassword] as const;
};
