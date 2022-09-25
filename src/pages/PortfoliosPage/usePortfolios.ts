import { useCallback, useEffect } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import { usePortfolioService } from "../../services";

export const usePortfolios = () => {
  const { portfolioData } = usePortfolioContext();
  const [portfolios, setPortfolios] = portfolioData;
  const portfolioService = usePortfolioService();

  const getPortfolios = useCallback(async () => {
    const myPortfolios = await portfolioService.getList();
    setPortfolios(myPortfolios);
  }, []);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  return [portfolios, getPortfolios] as const;
};
