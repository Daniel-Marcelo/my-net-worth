import { usePortfolioEntryService } from "../services";
import { usePortfolioIdFromUrl } from "./usePortfolioIdFromUrl";
import { toast } from "../utils";
import { useMyQuery } from "./useMyQuery";
import { QueryKey } from "../types";

export const useGetEntriesByPortfolioId = () => {
  const id = usePortfolioIdFromUrl();
  const portfolioEntryService = usePortfolioEntryService();

  return useMyQuery({
    queryKey: [id, QueryKey.GetPortfolioEntriesByPortfolioId],
    queryFn: () => portfolioEntryService.getAllByPortfolioId(id),
    onError: () => toast.error("Error getting portfolio entries."),
  });
};
