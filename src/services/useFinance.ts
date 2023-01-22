import { PriceChartInterval, PriceChartTimeRange, Quote, SummaryProfile } from "../models";
import { YF, YFModule } from "../types/yahoo-finance";
import { LocalStorageUtil } from "../utils/localStorage";
import { useLocalFinance } from "./useLocalFinance";
import { useYahooFinance } from "./useYahooFinance";

export interface Finance {
  getPriceHistory: (ticker: string, range?: PriceChartTimeRange, interval?: PriceChartInterval) => Promise<YF.Result>;
  getTimesAndPrices: (
    ticker: string,
    range?: PriceChartTimeRange,
    interval?: PriceChartInterval
  ) => Promise<number[][]>;
  searchForTicker: (text: string) => Promise<Quote[]>;
  getSummaryProfile: (stock: string) => Promise<SummaryProfile>;
  getModules: (stock: string) => Promise<YFModule.RootObject>;
}
export const useFinance = (): Finance => {
  const yahooFinance = useYahooFinance();
  const localFinance = useLocalFinance();

  return LocalStorageUtil.DoUse() ? localFinance : yahooFinance;
};
