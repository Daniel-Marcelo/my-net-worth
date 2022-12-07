import { Portfolio } from "../models/Portfolio";
import { DBService, useDBService } from "./useDBService";

const portfolioCollection = "portfolios";
export const usePortfolioService = (): DBService<Portfolio> => {
  const dbService = useDBService<Portfolio>(portfolioCollection);

  return dbService;
};
