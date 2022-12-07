import { useEffect, useState } from "react";
import { GroupedPortfolioEntry, PortfolioEntry } from "../../models";

export const useGroupedEntries = (portfolioEntries: PortfolioEntry[]) => {
  const [groupedEntries, setGroupedEntries] = useState<GroupedPortfolioEntry[]>([]);

  useEffect(() => {
    if (portfolioEntries.length) {
      const groupedEntries = portfolioEntries.reduce((acc, entry) => {
        if (acc[entry.ticker]) {
          acc[entry.ticker].totalShares += entry.numberOfShares;
          acc[entry.ticker].lastUpdated.push(entry.createdAt);
        } else {
          acc[entry.ticker] = {
            ticker: entry.ticker,
            totalShares: entry.numberOfShares,
            name: entry.name,
            lastUpdated: [entry.createdAt],
          } as GroupedPortfolioEntry;
        }
        return acc;
      }, {});
      setGroupedEntries(Object.values(groupedEntries));
    }
  }, [portfolioEntries]);

  return groupedEntries;
};
