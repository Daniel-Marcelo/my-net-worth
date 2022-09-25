import { PriceChartInterval, PriceChartTimeRange, Quote } from "../models";
import { DoUseLocalStorage } from "../utils/localStorage";
import { useLocalFinance } from "./useLocalFinance";
import { useYahooFinance } from "./useYahooFinance";

export interface Finance {
  getPriceHistory: (ticker: string, range?: PriceChartTimeRange, interval?: PriceChartInterval) => Promise<number[][]>;
  searchForTicker: (text: string) => Promise<Quote[]>;
}
export const useFinance = () => {
  const yahooFinance = useYahooFinance();
  const localFinance = useLocalFinance();

  return DoUseLocalStorage() ? localFinance : yahooFinance;
};
