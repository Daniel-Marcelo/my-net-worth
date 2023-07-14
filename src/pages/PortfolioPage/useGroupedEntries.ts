import { useEffect, useState } from "react";
import { GroupedPortfolioEntry } from "../../models";
import { useGetEntriesByPortfolioId } from "../../hooks";

export const useGroupedEntries = () => {
  const getEntriesByPortfolioIdQuery = useGetEntriesByPortfolioId();
  const [groupedEntries, setGroupedEntries] = useState<GroupedPortfolioEntry[]>([]);

  useEffect(() => {
    if (getEntriesByPortfolioIdQuery.data?.length) {
      const groupedEntryList = getEntriesByPortfolioIdQuery.data.reduce((acc, entry) => {
        if (acc[entry.ticker]) {
          acc[entry.ticker].totalShares += entry.numberOfShares;
          acc[entry.ticker].lastUpdated.push(entry.createdAt);
          acc[entry.ticker].ids.push(entry.id);
        } else {
          acc[entry.ticker] = {
            ids: [entry.id],
            ticker: entry.ticker,
            totalShares: entry.numberOfShares,
            name: entry.name,
            lastUpdated: [entry.createdAt],
            website: entry.website,
          } as GroupedPortfolioEntry;
        }
        return acc;
      }, {});
      setGroupedEntries(Object.values(groupedEntryList));
    }
  }, [getEntriesByPortfolioIdQuery.data]);

  return groupedEntries;
};
