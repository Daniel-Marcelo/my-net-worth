import { useQuery } from "react-query";
import { financeApi } from "../services";
import { QueryKey } from "../types";

export const useGetRiskFreeRate = () => {
  const query = useQuery({
    queryKey: [QueryKey.GetRiskFreeRate],
    queryFn: () => financeApi.getPriceHistory("^TNX"),
  });

  return {
    ...query,
    getRate: () => {
      if (query.data) {
        const prices = query.data?.indicators.quote[0].close;
        return prices[prices.length - 1];
      }
      return null;
    },
  };
};
