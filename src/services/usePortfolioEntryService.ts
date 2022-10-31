import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "..";
import { PortfolioEntry } from "../models";
import { DBService, useDBService } from "./useDBService";

interface PortfolioEntryService {
  getAllByPortfolioId: (portfolioId: string) => Promise<PortfolioEntry[]>;
}
const portfolioCollection = "portfolioEntry";
export const usePortfolioEntryService = (): DBService<PortfolioEntry> & PortfolioEntryService => {
  const dbService = useDBService<PortfolioEntry>(portfolioCollection);

  return {
    ...dbService,
    getAllByPortfolioId: async (portfolioId: string) => {
      const q = query(collection(db, portfolioCollection), where("portfolioId", "==", portfolioId));
      const querySnapshot = await getDocs(q);
      const items = [] as PortfolioEntry[];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...(doc.data() as PortfolioEntry),
        });
      });
      return items;
    },
  };
};
