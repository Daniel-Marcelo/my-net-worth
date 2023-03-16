import axios from "axios";
import { PriceChartInterval, PriceChartTimeRange, Quote, SummaryProfile } from "../models";
import { YF, YFDividendHistory, YFModule } from "../types/yahoo-finance.d";
import { Finance } from "./useFinance";
import { FinanceModule, FinanceModules } from "../types";

export const getRoundedPrices = (result: YF.Result) =>
  result.indicators.quote[0].close.map((price) => Math.round(price * 100) / 100);
export const useYahooFinance = (): Finance => {
  const getPriceHistory = async (
    ticker: string,
    range = PriceChartTimeRange.OneDay,
    interval = PriceChartInterval.FifteenMins
  ): Promise<YF.Result> =>
    (
      await axios.get(
        `${process.env.REACT_APP_API_URL}/quote/price-history/${ticker}?range=${range}&interval=${interval}`
      )
    ).data;

  const getTimesAndPrices = async (
    ticker: string,
    range = PriceChartTimeRange.OneDay,
    interval = PriceChartInterval.FifteenMins
  ) => {
    const result = await getPriceHistory(ticker, range, interval);
    return [result.timestamp, getRoundedPrices(result)];
  };

  const searchForTicker = async (text: string): Promise<Quote[]> =>
    (await axios.get(`${process.env.REACT_APP_API_URL}/quote/ticker?q=${text}`)).data;
  const getModules = async (stock: string, modules = FinanceModules): Promise<YFModule.RootObject> =>
    (await axios.get(`${process.env.REACT_APP_API_URL}/quote/modules/${stock}`)).data;

  const getSummaryProfile = async (stock: string): Promise<SummaryProfile> => {
    const data = await getModules(stock, [FinanceModule.summaryProfile]);
    return data.quoteSummary.result[0].summaryProfile;
  };

  const getIncomeSheet = async (stock: string): Promise<YFModule.IncomeStatementHistory2[]> => {
    const data = await getModules(stock, [FinanceModule.incomeStatementHistory]);
    return data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory;
  };

  const getEvents = async (stock: string): Promise<YFDividendHistory.RootObject> =>
    (await axios.get(`${process.env.REACT_APP_API_URL}/quote/events/${stock}`)).data;

  const getDividendHistory = async (stock: string) => {
    const data = await getEvents(stock);
    return data.chart.result[0].events.dividends;
  };

  return {
    getPriceHistory,
    getTimesAndPrices,
    searchForTicker,
    getSummaryProfile,
    getModules,
    getEvents,
    getDividendHistory,
    getIncomeSheet,
  } as const;
};
