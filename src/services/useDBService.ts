import { QueryConstraint } from "firebase/firestore";
import { FirebaseItem } from "../models/Firebase";
import { useFirebaseService } from "./useFirebaseService";

export interface DBService<T extends FirebaseItem> {
  create: (item: T) => Promise<void>;
  delete: (id: string) => Promise<void>;
  delete2: (...ids: string[]) => Promise<void>;
  get: (id: string) => Promise<T>;
  getByQuery: (...queryConstraints: QueryConstraint[]) => Promise<T[]>;
  getList: () => Promise<T[]>;
  // deleteList: () => Promise<void>
}

export const useDBService = <T>(collectionName: string, baseUrl = ""): DBService<T> => {
  const firebaseService = useFirebaseService<T>(collectionName, `${process.env.REACT_APP_API_URL}/${baseUrl}`);

  return firebaseService;
};
