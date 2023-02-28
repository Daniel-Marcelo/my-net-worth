import { QueryConstraint } from "firebase/firestore";
import { FirebaseItem } from "../models/Firebase";
import { LocalStorageUtil } from "../utils/localStorage";
import { useFirebaseService } from "./useFirebaseService";
import { useLocalStorageService } from "./useLocalStorageService";

export interface DBService<T extends FirebaseItem> {
  create: (item: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<T>;
  getByQuery: (...queryConstraints: QueryConstraint[]) => Promise<T[]>;
  getList: () => Promise<T[]>;
  // deleteList: () => Promise<void>
}

export const useDBService = <T>(collectionName: string): DBService<T> => {
  const localStorageService = useLocalStorageService<T>(collectionName);
  const firebaseService = useFirebaseService<T>(collectionName);

  return LocalStorageUtil.DoUse() ? localStorageService : firebaseService;
};
