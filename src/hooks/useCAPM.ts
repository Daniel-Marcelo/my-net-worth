import { useRiskFreeRateStore } from "../stores";

export const useCAPM = () => {
  const { riskFreeRate } = useRiskFreeRateStore((state) => state);
  const capitalAssetPricingModel = (beta: number, returnOnTheMarket = 0.08) => {
    console.log(`riskFreeRate ${riskFreeRate}`);
    console.log(`returnOnTheMarket ${returnOnTheMarket}`);
    return riskFreeRate / 100 + beta * (returnOnTheMarket - riskFreeRate / 100);
  };
  return capitalAssetPricingModel;
};
