import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "..";
import { Portfolio } from "../models/Portfolio";

export const PortfoliosService = {
  getPortfolios: async (): Promise<Portfolio[]> => {
    const portfolios = [] as Portfolio[];
    const querySnapshot = await getDocs(collection(db, "portfolios"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const portfolio = doc.data() as Portfolio;
      portfolios.push({
        id: doc.id,
        name: portfolio.name,
      });
    });
    return portfolios;
  },
  createPortfolio: async (name: string) => {
    // await setDoc(doc(db, "portfolios"), {
    //     name
    // } as Portfolio);
    await addDoc(collection(db, "portfolios"), {
      name,
    } as Portfolio);
  },
};
