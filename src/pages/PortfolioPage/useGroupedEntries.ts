import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GroupedPortfolioEntry } from "../../models";
import { useGetEntriesByPortfolioId, usePortfolioIdFromUrl } from "../../hooks";
import { portfolioEntriesApi } from "../../services/portfolio-entries.api";

export const useGroupedEntries = () => {
  const id = usePortfolioIdFromUrl();
  const getEntriesByPortfolioIdQuery = useGetEntriesByPortfolioId();
  const [groupedEntries, setGroupedEntries] = useState<GroupedPortfolioEntry[]>([]);

  const m = useMutation({
    mutationKey: [id, "groiped"],
    mutationFn: () => portfolioEntriesApi.getGroupedEntries(id),
  });

  useEffect(() => {
    if (getEntriesByPortfolioIdQuery.data?.length) {
      m.mutate();
      const groupedEntryList = getEntriesByPortfolioIdQuery.data.reduce((acc, entry) => {
        if (acc[entry.ticker]) {
          acc[entry.ticker].totalShares += entry.numberOfShares;
          acc[entry.ticker].lastUpdated.push(entry.createdAt);
        } else {
          acc[entry.ticker] = {
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
