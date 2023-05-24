import axios from "axios";

export const portfolioEntriesApi = {
  getGroupedEntries: (portfolioId: string) => axios.get(`${process.env.REACT_APP_API_URL}/books`),
} as const;
