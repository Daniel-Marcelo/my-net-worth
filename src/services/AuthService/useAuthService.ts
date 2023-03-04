/* eslint-disable no-alert */
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
import { LocalStorageUtil } from "../../utils/localStorage";
import { LocalUser } from "./AuthService.model";

export interface AuthService {
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  createWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  loginWithEmailPassword: (email: string, password: string) => Promise<UserCredential | boolean>;
}

const collection = "users";

const useLocalAuthService = (): AuthService => ({
  logout: async () => {},
  loginWithGoogle: async () => {
    alert("Cannot login with Google when offline!");
  },
  createWithEmailAndPassword: async (email: string, password: string): Promise<UserCredential> => {
    const users = LocalStorageUtil.GetList<LocalUser>(collection);
    const userExists = users.find((user) => user.email === email);
    if (!userExists) {
      const newUser = {
        email,
        password,
      } as LocalUser;
      users.push(newUser);
      LocalStorageUtil.Set(collection, users);
    }
    return {} as UserCredential;
  },
  loginWithEmailPassword: async (email: string, password: string): Promise<UserCredential | boolean> => {
    const users = LocalStorageUtil.Get<LocalUser[]>(collection);
    const isValid = users.some((user) => user.email === email && user.password === password);
    return isValid;
  },
});

const provider = new GoogleAuthProvider();

const auth = () => getAuth();

const useGoogleAuthService = (): AuthService => ({
  logout: async () => {
    await signOut(auth());
  },
  loginWithGoogle: async () => {
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    const result = await signInWithPopup(auth(), provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log("result", result);
    console.log("credential", credential);
  },
  createWithEmailAndPassword: async (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth(), email, password),
  loginWithEmailPassword: async (email: string, password: string): Promise<UserCredential> =>
    createUserWithEmailAndPassword(auth(), email, password),
});

export const useAuthService = (): AuthService => {
  const localStorageService = useLocalAuthService();
  const firebaseService = useGoogleAuthService();

  return LocalStorageUtil.DoUse() ? localStorageService : firebaseService;
};
