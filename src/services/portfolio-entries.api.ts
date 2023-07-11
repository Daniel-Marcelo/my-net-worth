import axios from "axios";
import { Api } from "./api";
import { PortfolioEntry } from "../models";

export const portfolioEntriesApi = {} as const;

export class PortfolioEntryService extends Api<PortfolioEntry> {
  constructor() {
    super("portfolioEntry");
  }

  getAllByPortfolioId(portfolioId: string) {
    axios.get<PortfolioEntry[]>(`${this.baseUrl}/?portfolioId=${portfolioId}`);
  }
}
