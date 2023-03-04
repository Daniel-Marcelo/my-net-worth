import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { PortfolioEntry } from "../models";
import { LocalStorageUtil } from "../utils/localStorage";
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

  const localGetAllByPortfolioId = async (portfolioId: string): Promise<PortfolioEntry[]> => {
    const entries = await dbService.getList();
    return entries.filter((entry) => +entry.portfolioId === +portfolioId);
  };

  const portfolioEntryService = {
    ...dbService,
    getAllByPortfolioId: LocalStorageUtil.DoUse() ? localGetAllByPortfolioId : firebaseGetAllByPortfolioId,
  };

  return portfolioEntryService;
};
