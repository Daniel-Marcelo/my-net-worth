import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { PortfolioEntry } from "../models";
import { DBService, useDBService } from "./useDBService";

interface PortfolioEntryService extends DBService<PortfolioEntry> {
  getAllByPortfolioId: (portfolioId: string) => Promise<PortfolioEntry[]>;
}
const portfolioCollection = "portfolioEntry";
export const usePortfolioEntryService = (): PortfolioEntryService => {
  const dbService = useDBService<PortfolioEntry>(portfolioCollection);

  const firebaseGetAllByPortfolioId = async (portfolioId: string) => {
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
  };

  const portfolioEntryService = {
    ...dbService,
    getAllByPortfolioId: firebaseGetAllByPortfolioId,
  };

  return portfolioEntryService;
};
