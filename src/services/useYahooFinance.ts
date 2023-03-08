import { PriceChartInterval, PriceChartTimeRange, Quote, QuoteType, SummaryProfile } from "../models";
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
  ) => {
    const response = await fetch(
      `/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`
    );
    const data: YF.PriceHistoryResponse = await response.json();
    const result = data.chart.result[0];
    return result;
  };
  const getTimesAndPrices = async (
    ticker: string,
    range = PriceChartTimeRange.OneDay,
    interval = PriceChartInterval.FifteenMins
  ) => {
    const result = await getPriceHistory(ticker, range, interval);
    return [result.timestamp, getRoundedPrices(result)];
  };

  const searchForTicker = async (text: string): Promise<Quote[]> => {
    const response = await fetch(`/search?q=${text}&corsDomain=finance.yahoo.com&.tsrc=finance`);
    const data = await response.json();
    return data.quotes
      .filter((quote) => [QuoteType.Etf, QuoteType.Equity].includes(quote.quoteType))
      .map((quote) => ({
        ticker: quote.symbol,
        name: quote.shortname,
        exchangeDisplay: quote.exchDisp,
      }));
  };

  const getModules = async (stock: string, modules = FinanceModules): Promise<YFModule.RootObject> => {
    const url = `/quoteSummary/${stock}?modules=${modules.join(",")}&corsDomain=finance.yahoo.com&.tsrc=finance`;
    const response = await fetch(url);
    return response.json();
  };

  const getSummaryProfile = async (stock: string): Promise<SummaryProfile> => {
    const data = await getModules(stock, [FinanceModule.summaryProfile]);
    return data.quoteSummary.result[0].summaryProfile;
  };

  const getIncomeSheet = async (stock: string): Promise<YFModule.IncomeStatementHistory2[]> => {
    const data = await getModules(stock, [FinanceModule.incomeStatementHistory]);
    return data.quoteSummary.result[0].incomeStatementHistory.incomeStatementHistory;
  };

  const getEvents = async (stock: string): Promise<YFDividendHistory.RootObject> => {
    const url = `/chart/${stock}?interval=1d&period1=0&period2=1674432000&events=div&corsDomain=finance.yahoo.com&.tsrc=finance`;
    const response = await fetch(url);
    return response.json();
  };

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
