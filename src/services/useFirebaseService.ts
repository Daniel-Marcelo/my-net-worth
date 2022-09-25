import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "..";
import { DBService } from "./useDBService";

export const useFirebaseService = <T>(collectionName: string): DBService<T> => ({
  create: async (item: T) => {
    await addDoc(collection(db, collectionName), item);
  },
  delete: async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  },
  get: async (id: string) => {
    const document = await getDoc(doc(db, collectionName, id));
    const item = document.data() as T;
    return {
      id: document.id,
      ...item,
    } as T;
  },
  getList: async () => {
    const list = [] as T[];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((document) => {
      const item = document.data() as T;
      list.push({
        id: document.id,
        ...item,
      });
    });
    return list;
  },
});
