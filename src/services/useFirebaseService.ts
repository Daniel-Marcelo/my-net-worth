import axios from "axios";
import { collection, getDocs, query, QueryConstraint } from "firebase/firestore";
import { db } from "../firebase";
import { DBService } from "./useDBService";

export const useFirebaseService = <T>(collectionName: string, baseUrl = ""): DBService<T> => ({
  create: (item: T) => axios.post(`${baseUrl}`, item),
  delete: (id: string) => axios.delete(`${baseUrl}/${id}`),
  delete2: (...ids: string[]) => axios.delete(`${baseUrl}`, { data: { ids } }),
  get: (id: string) => axios.get(`${baseUrl}/${id}`),
  getByQuery: async (...queryConstraints: QueryConstraint[]) => {
    const list = [] as T[];
    const querySnapshot = await getDocs(query(collection(db, collectionName), ...queryConstraints));

    querySnapshot.forEach((document) => {
      const item = document.data() as T;
      list.push({
        id: document.id,
        ...item,
      });
    });
    return list;
  },
  getList: async () => (await axios.get(`${baseUrl}`)).data,
});
