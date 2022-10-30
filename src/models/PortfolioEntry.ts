import { FirebaseItem } from "./Firebase";

export interface PortfolioEntry extends FirebaseItem {
  ticker: string;
  portfolioId: string;
}
