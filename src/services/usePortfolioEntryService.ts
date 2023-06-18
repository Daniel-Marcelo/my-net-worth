import axios from "axios";
import { PortfolioEntry } from "../models";
import { DBService, useDBService } from "./useDBService";

interface PortfolioEntryService extends DBService<PortfolioEntry> {
  getAllByPortfolioId: (portfolioId: string) => Promise<PortfolioEntry[]>;
}
const portfolioCollection = "portfolioEntry";
export const usePortfolioEntryService = (): PortfolioEntryService => {
  const dbService = useDBService<PortfolioEntry>(portfolioCollection);

  const firebaseGetAllByPortfolioId = async (portfolioId: string) => {
    const response = await axios.get<PortfolioEntry[]>(
      `${process.env.REACT_APP_API_URL}/portfolio-entries/${portfolioId}`
    );
    return response.data;
  };

  const portfolioEntryService = {
    ...dbService,
    getAllByPortfolioId: firebaseGetAllByPortfolioId,
  };

  return portfolioEntryService;
};
