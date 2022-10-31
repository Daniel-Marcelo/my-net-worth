import { AuthService } from "../../Auth.service";
import { useAuthContext } from "../../context/AuthContext";

export const useLogin = () => {
  const { login, auth } = useAuthContext();
  const [, setAuthContext] = auth;
  const [, setIsLoggedIn] = login;

  const loginWithGoogle = async () => {
    const data = await AuthService.loginV2();
    setAuthContext(data);
    setIsLoggedIn(true);
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    await AuthService.loginWithEmailPassword(email, password);
    setIsLoggedIn(true);
  };

  return [loginWithGoogle, loginWithEmailPassword] as const;
};