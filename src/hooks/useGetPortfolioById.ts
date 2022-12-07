import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePortfolioService } from "../services";
import { toastConfig } from "../utils";
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
        toast.error("Portolio does not exist! Please select a valid portfolio", toastConfig);
        navigate("/portfolios");
      }
    }
  }, [id]);

  return getPortfolio;
};
