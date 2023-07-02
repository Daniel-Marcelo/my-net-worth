import { FirebaseService } from "../services/firebase-service";
import { Portfolio } from "./Portfolio";

class PortfolioService extends FirebaseService<Portfolio> {
  constructor() {
    super("portfolios");
  }
}
export const portfolioService = new PortfolioService();
