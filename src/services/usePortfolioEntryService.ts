import { PortfolioEntry } from "../models";
import { DBService, useDBService } from "./useDBService";

const portfolioCollection = "portfolioEntry";
export const usePortfolioEntryService = (): DBService<PortfolioEntry> => {
  const dbService = useDBService<PortfolioEntry>(portfolioCollection);

  return {
    ...dbService,
  };
};
