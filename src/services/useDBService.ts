import { QueryConstraint } from "firebase/firestore";
import { FirebaseItem } from "../models/Firebase";
import { useFirebaseService } from "./useFirebaseService";

export interface DBService<T extends FirebaseItem> {
  create: (item: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  get: (id: string) => Promise<T>;
  getByQuery: (...queryConstraints: QueryConstraint[]) => Promise<T[]>;
  getList: () => Promise<T[]>;
  // deleteList: () => Promise<void>
}

export const useDBService = <T>(collectionName: string): DBService<T> => {
  const firebaseService = useFirebaseService<T>(collectionName);

  return firebaseService;
};
