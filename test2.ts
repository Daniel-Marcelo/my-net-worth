import { initializeApp } from "firebase/app";
import axios from "axios";
import { getFirestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { tickers } from "./tickers";

const app = initializeApp({
  apiKey: "AIzaSyA3yFNfYzc43jEg0coAdW8aFN3wqBbCstA",
  authDomain: "my-net-worth-74297.firebaseapp.com",
  projectId: "my-net-worth-74297",
  storageBucket: "my-net-worth-74297.appspot.com",
  messagingSenderId: "645211709733",
  appId: "1:645211709733:web:cba05ed048f6d9f267bacc",
  measurementId: "G-ZW7S39KRD7",
});

export const db = getFirestore(app);

export const firebaseService = <
  T extends {
    id?: string;
  }
>(
  collectionName: string
) => ({
  create: async (item: T) => {
    await addDoc(collection(db, collectionName), item);
  },
  delete: async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  },
  get: async (id: string) => {
    const document = await getDoc(doc(db, collectionName, id));
    const item = document.data() as T;

    if (item) {
      return {
        id: document.id,
        ...item,
      } as T;
    }
    throw new Error("Document does not exist");
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

const url = (ticker = "AAPL") =>
  `https://api.polygon.io/v1/meta/symbols/${ticker}/company?&apiKey=mC3m6fxRhXbP8FkbBBpgqc2IpxoF5orr`;

const service = firebaseService("symbolsV1");

const missingTickers = [] as string[];

const test2 = async (ticker?: string) => {
  const symbol = ticker;
  const ref = collection(db, "symbolsV1");
  try {
    const querySnapshot = await getDocs(query(ref, where("symbol", "==", symbol)));

    if (!querySnapshot.empty) {
      console.log(`✅ ${symbol}.`);
      if (tickers.length > 1) {
        test2(tickers.shift());
      }
    } else {
      // console.log(`No data - ${symbol}.`);
      axios
        .get(url(symbol))
        .then((response) => {
          console.log(`Downloaded from polygon ${symbol}`);
          service.create(response.data).then(() => console.log(`Stored ${symbol}`));
        })
        .catch(() => {
          console.log(`Polygon has no data - ${symbol}`);
          missingTickers.push(symbol || "");
        });
    }
  } catch (error) {
    console.error(error);
  }

  // if (tickers.length <= 1) {
  //   console.log("Missing tickers");
  //   console.log(missingTickers);
  // }
};
setInterval(() => test2(tickers.shift()), 13000);
