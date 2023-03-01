import { where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { MultiplesTableRow, PolySymbolV1 } from "../../models";
import { useFinance, usePolySymbolV1Service } from "../../services";
import { useFinanceStore } from "../../stores";
import { useMyQuery } from "../useMyQuery";

export const useGetSimilarCompanies = (ticker: string) => {
  const financeApi = useFinance();
  const symbolsApi = usePolySymbolV1Service();
  const [rowData, setRowData] = useState<MultiplesTableRow[]>([]);
  const { moduleData } = useFinanceStore();
  const query = useMyQuery<PolySymbolV1[]>({
    queryKey: ["getSymbolV1", ticker],
    queryFn: () => symbolsApi.getByQuery(where("symbol", "==", ticker)),
  });

  useEffect(() => {
    setRowData([]);
  }, [ticker]);

  const callback = useCallback(() => {
    if (query.data) {
      setRowData([
        {
          ticker,
          price: moduleData.price.regularMarketPrice.fmt,
          eps: moduleData.defaultKeyStatistics.trailingEps.fmt,
          pe: moduleData.summaryDetail.trailingPE.fmt,
        },
      ]);
      const similarTickers = query.data[0]?.similar || [];

      similarTickers.forEach((simTicker) =>
        financeApi.getModules(simTicker).then((tempModuleData) => {
          setRowData((old) => [
            ...old,
            {
              ticker: simTicker,
              price: tempModuleData.quoteSummary?.result[0].price.regularMarketPrice?.fmt,
              eps: tempModuleData.quoteSummary.result[0].defaultKeyStatistics.trailingEps?.fmt,
              pe: tempModuleData.quoteSummary.result[0].summaryDetail.trailingPE?.fmt,
            },
          ]);
        })
      );
    }
  }, [query.data]);
  useEffect(() => callback(), [callback]);

  return [rowData, setRowData, callback] as const;
};
