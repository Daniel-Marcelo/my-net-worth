import { FirebaseItem } from "./Firebase";

export interface PortfolioEntry extends FirebaseItem {
  ticker: string;
  portfolioId: string;
  name: string;
  numberOfShares: number;
  createdAt: string;
  website: string;
}

export interface GroupedPortfolioEntry extends FirebaseItem {
  ticker: string;
  name: string;
  totalShares: number;
  lastUpdated: string[];
  website: string;
}
