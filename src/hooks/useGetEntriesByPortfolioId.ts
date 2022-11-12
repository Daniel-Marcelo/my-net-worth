import { useCallback, useEffect, useState } from "react";
import { PortfolioEntry } from "../models";
import { usePortfolioEntryService } from "../services";
import { usePortfolioIdFromUrl } from "./usePortfolioIdFromUrl";

export const useGetEntriesByPortfolioId = () => {
  const id = usePortfolioIdFromUrl();
  const portfolioEntryService = usePortfolioEntryService();
  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([]);

  const getPortfolioEntries = useCallback(async () => {
    try {
      const entries = await portfolioEntryService.getAllByPortfolioId(id);
      setPortfolioEntries(entries);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getPortfolioEntries();
  }, [id]);

  return [portfolioEntries, getPortfolioEntries] as const;
};
