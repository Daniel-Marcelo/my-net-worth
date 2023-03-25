import { where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { MultiplesTableRow, PolySymbolV1 } from "../../models";
import { financeApi, usePolySymbolV1Service } from "../../services";
import { useLoadFinanceModules } from "../useLoadFinanceModules";
import { useMyQuery } from "../useMyQuery";

export const useGetSimilarCompanies = (ticker: string) => {
  const symbolsApi = usePolySymbolV1Service();
  const [rowData, setRowData] = useState<MultiplesTableRow[]>([]);
  const { getModuleData } = useLoadFinanceModules();
  const moduleData = getModuleData();
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
              price: tempModuleData.price.regularMarketPrice?.fmt,
              eps: tempModuleData.defaultKeyStatistics.trailingEps?.fmt,
              pe: tempModuleData.summaryDetail.trailingPE?.fmt,
            },
          ]);
        })
      );
    }
  }, [query.data]);
  useEffect(() => callback(), [callback]);

  return [rowData, setRowData, callback] as const;
};
