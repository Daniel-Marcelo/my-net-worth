import { PriceChartInterval, PriceChartTimeRange, Quote, SummaryProfile } from "../models";
import { YF, YFDividendHistory, YFModule } from "../types/yahoo-finance.d";
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
  getIncomeSheet: (stock: string) => Promise<YFModule.IncomeStatementHistory2[]>;
  getModules: (stock: string) => Promise<YFModule.Result>;
  getEvents: (stock: string) => Promise<YFDividendHistory.RootObject>;
  getDividendHistory: (stock: string) => Promise<YFDividendHistory.Dividends>;
}
export const useFinance = (): Finance => {
  const yahooFinance = useYahooFinance();
  const localFinance = useLocalFinance();

  return LocalStorageUtil.DoUse() ? localFinance : yahooFinance;
};
