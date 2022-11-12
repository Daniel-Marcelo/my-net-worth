import { FirebaseItem } from "./Firebase";

export interface PortfolioEntry extends FirebaseItem {
  ticker: string;
  portfolioId: string;
  name: string;
  numberOfShares: number;
  createdAt: Date;
}

export interface GroupedPortfolioEntry extends FirebaseItem {
  ticker: string;
  name: string;
  totalShares: number;
  lastUpdated: Date[];
}
