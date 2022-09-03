import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthService } from "../../Auth.service";
import { useAuthContext } from "../../context/AuthContext";

export const useLogin = () => {
  const { login } = useAuthContext();
  const [, setIsLoggedIn] = login;

  const loginWithGoogle = async () => {
    await AuthService.loginV2();
    setIsLoggedIn(true);
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    await AuthService.loginWithEmailPassword(email, password);
    setIsLoggedIn(true);
  };

  return [loginWithGoogle, loginWithEmailPassword] as const;
};
