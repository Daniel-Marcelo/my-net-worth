import { useEffect, useState } from "react";
import { GroupedPortfolioEntry } from "../../models";
import { useFinance } from "../../services";

export const useGetTickerPrices = (groupedEntries: GroupedPortfolioEntry[]) => {
  const [tickerToPriceMap, setTickerToPriceMap] = useState(new Map<string, number>());
  const financeApi = useFinance();

  const setMostRecentPrice = async (values: Map<string, number>, ticker: string, tickers: string[]) => {
    const [, prices] = await financeApi.getPriceHistory(ticker);
    values.set(ticker, prices[0]);
    if (tickers.indexOf(ticker) === tickers.length - 1) {
      setTickerToPriceMap(values);
    }
  };

  const setMostRecentPrices = (tickers: string[]) => {
    const values = new Map<string, number>();
    tickers.forEach((ticker) => {
      setMostRecentPrice(values, ticker, tickers);
    });
    return values;
  };

  useEffect(() => {
    if (groupedEntries.length) {
      setMostRecentPrices(groupedEntries.map((entry) => entry.ticker));
    }
  }, [groupedEntries]);

  return tickerToPriceMap;
};
