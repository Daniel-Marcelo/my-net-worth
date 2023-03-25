import { useEffect } from "react";
import { financeApi } from "../services";
import { useRiskFreeRateStore } from "../stores";

export const useGetRiskFreeRate = () => {
  const { setRiskFreeRate } = useRiskFreeRateStore();
  useEffect(() => {
    const get = async () => {
      const tenYearBondData = await financeApi.getPriceHistory("^TNX");
      const prices = tenYearBondData.indicators.quote[0].close;
      const TenYearBondRate = prices[prices.length - 1];
      setRiskFreeRate(TenYearBondRate);
    };
    get();
  }, []);
};
