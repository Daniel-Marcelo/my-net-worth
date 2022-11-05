import { FirebaseItem } from "../models/Firebase";
import { LocalStorageUtil } from "../utils/localStorage";
import { DBService } from "./useDBService";

const generateId = () => {
  let id = "";
  for (let i = 0; i < 20; i += 1) {
    id += `${Math.floor(i * Math.random())}`;
  }
  return id;
};

export const useLocalStorageService = <T extends FirebaseItem>(collectionName: string): DBService<T> => {

  return {
    get: async (id: string) => LocalStorageUtil.GetList<T>(collectionName).find((item) => item.id === id),
    getList: async () => LocalStorageUtil.GetList<T>(collectionName),
    create: async (item: T) => {
      const array = LocalStorageUtil.GetList<T>(collectionName);
      const newItem = {
        ...item,
        id: generateId(),
      };
      array.push(newItem);
      LocalStorageUtil.Set(collectionName, array);
    },
    delete: async (id: string) => {
      const array = LocalStorageUtil.GetList<T>(collectionName);
      const updatedArray = array.filter((item) => item.id !== id);
      LocalStorageUtil.Set(collectionName, updatedArray);
    },
  };
};
