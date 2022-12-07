import { useEffect, useState } from "react";
import { GroupedPortfolioEntry } from "../../models";

export const usePortfolioStatsCalculator = (
  tickerToPriceMap: Map<string, number>,
  groupedEntries: GroupedPortfolioEntry[]
) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (groupedEntries.length && tickerToPriceMap && tickerToPriceMap.keys().next().value) {
      let subTotal = 0;
      groupedEntries.forEach((entry) => {
        const mostRecentPrice = tickerToPriceMap.get(entry.ticker);
        const value = entry.totalShares * mostRecentPrice;
        subTotal += value;
      });
      setTotal(subTotal);
    }
  }, [groupedEntries, tickerToPriceMap]);

  return [total] as const;
};
