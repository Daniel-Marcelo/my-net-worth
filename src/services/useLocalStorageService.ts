import { FirebaseItem } from "../models/Firebase";
import { DBService } from "./useDBService";

const generateId = () => {
  let id = "";
  for (let i = 0; i < 20; i += 1) {
    id += `${Math.floor(i * Math.random())}`;
  }
  return id;
};

export const useLocalStorageService = <T extends FirebaseItem>(collectionName: string): DBService<T> => {
  const getCollection = () => (JSON.parse(localStorage.getItem(collectionName)) as T[]) || [];
  const setCollection = (array: T[]) => localStorage.setItem(collectionName, JSON.stringify(array));

  return {
    get: async (id: string) => getCollection().find((item) => item.id === id),
    getList: async () => getCollection(),
    create: async (item: T) => {
      const array = getCollection();
      const newItem = {
        ...item,
        id: generateId(),
      };
      array.push(newItem);
      setCollection(array);
    },
    delete: async (id: string) => {
      const array = getCollection();
      const updatedArray = array.filter((item) => item.id !== id);
      setCollection(updatedArray);
    },
  };
};
