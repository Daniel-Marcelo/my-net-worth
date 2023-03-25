import { format } from "date-fns";
import { useState } from "react";
import { financeApi } from "../services";
import { QueryKey } from "../types";
import { YFDividendHistory } from "../types/yahoo-finance.d";
import { useMyQuery } from "./useMyQuery";

export const useGetHistoryQuery = (ticker: string) => {
  const [history, setHistory] = useState<YFDividendHistory.HistoryList[]>([]);

  useMyQuery({
    queryKey: [QueryKey.GetHistory, ticker],
    queryFn: () => financeApi.getDividendHistory(ticker),
    onSuccess: (data) => {
      const updatedHistory = Object.entries(data).map(([key, value]) => {
        const t = new Date(1970, 0, 1);
        t.setSeconds(+key);
        return {
          date: t,
          dateString: format(t, "MMM yyyy"),
          amount: value.amount,
          year: format(t, "yyyy"),
        } as YFDividendHistory.HistoryList;
      });
      setHistory(updatedHistory);
    },
  });

  return history;
};
