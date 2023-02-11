import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolioService } from "../services";
import { toast } from "../utils";
import { usePortfolioIdFromUrl } from "./usePortfolioIdFromUrl";

export const useGetPortfolioById = () => {
  const id = usePortfolioIdFromUrl();
  const portfolioService = usePortfolioService();
  const navigate = useNavigate();

  const getPortfolio = useCallback(async () => {
    if (id) {
      try {
        return await portfolioService.get(id);
      } catch (error) {
        toast.error("Portolio does not exist.");
        return navigate("/portfolios");
      }
    }
    return null;
  }, [id]);

  return getPortfolio;
};
