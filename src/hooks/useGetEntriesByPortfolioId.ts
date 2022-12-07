import { useCallback, useEffect, useState } from "react";
import { PortfolioEntry } from "../models";
import { usePortfolioEntryService, usePortfolioService } from "../services";
import { usePortfolioIdFromUrl } from "./usePortfolioIdFromUrl";
import { useGetPortfolioById } from "./useGetPortfolioById";
import { toast } from "react-toastify";
import { toastConfig } from "../utils";

export const useGetEntriesByPortfolioId = () => {
  const id = usePortfolioIdFromUrl();
  const portfolioEntryService = usePortfolioEntryService();
  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([]);
  const getPortfolio = useGetPortfolioById();

  const getPortfolioEntries = useCallback(async () => {
    try {
      await getPortfolio();
      const entries = await portfolioEntryService.getAllByPortfolioId(id);
      setPortfolioEntries(entries);
    } catch (error) {
      toast.error('Error getting portfolio entries. Please contact support!', toastConfig)
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getPortfolioEntries();
    }
  }, [getPortfolioEntries, id]);

  return [portfolioEntries, getPortfolioEntries] as const;
};
