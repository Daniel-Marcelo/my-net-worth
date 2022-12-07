import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Portfolio } from "../../models";
import { usePortfolioService } from "../../services";
import { toastConfig } from "../../utils";

export const useGetPortfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const portfolioService = usePortfolioService();

  const getPortfolios = useCallback(async () => {
    try {
      const myPortfolios = await portfolioService.getList();
      setPortfolios(myPortfolios);
    } catch (error) {
      toast.error("Failed to get list of portfolios. Please contact support!", toastConfig);
    }
  }, []);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  return [portfolios, getPortfolios] as const;
};
