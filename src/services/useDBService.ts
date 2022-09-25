import { FirebaseItem } from "../models/Firebase";
import { DoUseLocalStorage } from "../utils/localStorage";
import { useFirebaseService } from "./useFirebaseService";
import { useLocalStorageService } from "./useLocalStorageService";

export interface DBService<T extends FirebaseItem> {
  create: (item: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<T>;
  getList: () => Promise<T[]>;
}

export const useDBService = <T>(collectionName: string): DBService<T> => {
  const localStorageService = useLocalStorageService<T>(collectionName);
  const firebaseService = useFirebaseService<T>(collectionName);

  return DoUseLocalStorage() ? localStorageService : firebaseService;
};
