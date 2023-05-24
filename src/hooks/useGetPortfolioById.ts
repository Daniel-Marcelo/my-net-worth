import { useNavigate } from "react-router-dom";
import { usePortfolioService } from "../services";
import { toast } from "../utils";
import { usePortfolioIdFromUrl } from "./usePortfolioIdFromUrl";
import { useMyQuery } from "./useMyQuery";
import { QueryKey } from "../types";

export const useGetPortfolioById = () => {
  const id = usePortfolioIdFromUrl();
  const portfolioService = usePortfolioService();
  const navigate = useNavigate();

  return useMyQuery({
    queryKey: [id, QueryKey.GetPortfolioById],
    queryFn: () => portfolioService.get(id),
    onError: () => {
      toast.error("Portfolio does not exist");
      navigate("/portfolios");
    },
  });
};
