import {
  Modules,
  PriceChartInterval,
  PriceChartTimeRange,
  Quote,
  QuoteSummary,
  QuoteType,
  SummaryProfile,
} from "../models";
import { YF, YFDividendHistory, YFModule } from "../types/yahoo-finance";
import { Finance } from "./useFinance";
import * as mockDividendHistory from "./dividend-history.json";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

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
    const response = await fetch(`/search?q=${text}`);
    const data = await response.json();
    return data.quotes
      .filter((quote) => [QuoteType.Etf, QuoteType.Equity].includes(quote.quoteType))
      .map((quote) => ({
        ticker: quote.symbol,
        name: quote.shortname,
        exchangeDisplay: quote.exchDisp,
      }));
  };

  const getModules = async (stock: string): Promise<YFModule.RootObject> => {
    const url = `query1.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${Modules.join(",")}`;
    const response = await fetch(proxyurl + url);
    return await response.json();
  };

  const getSummaryProfile = async (stock: string): Promise<SummaryProfile> => {
    const data = await getModules(stock);
    console.log(data);
    return data.quoteSummary.result[0].summaryProfile;
  };

  const getEvents = async(stock: string): Promise<YFDividendHistory.RootObject> => {
    // const url = `query1.finance.yahoo.com/v8/finance/chart/${stock}?interval=1d&period1=0&period2=1674432000&events=div`;
    // const response = await fetch(proxyurl + url);
    // return await response.json();
    return mockDividendHistory;
  }

  const getDividendHistory = async (stock: string) => {
    const data = await getEvents(stock);
    return data.chart.result[0].events.dividends;
  }

  return {
    getPriceHistory,
    getTimesAndPrices,
    searchForTicker,
    getSummaryProfile,
    getModules,
    getEvents,
    getDividendHistory
  } as const;
};
