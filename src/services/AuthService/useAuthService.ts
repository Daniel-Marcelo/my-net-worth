import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { LocalStorageUtil } from "../../utils/localStorage";
import { LocalUser } from "./AuthService.model";

export interface AuthService {
  loginWithGoogleV2: () => Promise<void>;
  createWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  loginWithEmailPassword: (email: string, password: string) => Promise<UserCredential | boolean>;
  login: () => void;
}

const collection = "users";

const useLocalAuthService = (): AuthService => ({
  loginWithGoogleV2: async () => {
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
    } else {
    }
    return {} as UserCredential;
  },
  loginWithEmailPassword: async (email: string, password: string): Promise<UserCredential | boolean> => {
    const users = LocalStorageUtil.Get<LocalUser[]>(collection);
    const isValid = users.some((user) => user.email === email && user.password === password);
    return isValid;
  },
  login: (): void => {},
});

const useGoogleAuthService = (): AuthService => ({
  loginWithGoogleV2: async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    console.log(auth);
  },
  createWithEmailAndPassword: async (email: string, password: string): Promise<UserCredential> => {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {} as UserCredential;
  },
  loginWithEmailPassword: async (email: string, password: string): Promise<UserCredential> => ({} as UserCredential),
  login: (): void => {},
});

export const useAuthService = (): AuthService => {
  const localStorageService = useLocalAuthService();
  const firebaseService = useGoogleAuthService();

  return LocalStorageUtil.DoUse() ? localStorageService : firebaseService;
};
