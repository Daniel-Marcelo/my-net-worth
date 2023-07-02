import { Portfolio } from "../models/Portfolio";
import { useDBService } from "./useDBService";

export const usePortfolioService = () => useDBService<Portfolio>("portfolios", "portfolios");
