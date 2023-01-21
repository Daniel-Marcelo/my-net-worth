import { PriceChartInterval, PriceChartTimeRange, Quote, QuoteSummary, QuoteType, SummaryProfile } from "../models";
import { YF } from "../types/yahoo-finance";
import { Finance } from "./useFinance";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const getRoundedPrices = (result: YF.Result) => {
  return result.indicators.quote[0].close.map((price) => Math.round(price * 100) / 100)
}
export const useYahooFinance = (): Finance => {
  const getTimesAndPrices = async (
    ticker: string,
    range = PriceChartTimeRange.OneDay,
    interval = PriceChartInterval.FifteenMins
  ) => {
    const response = await fetch(
      `/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`
    );
    const data: YF.PriceHistoryResponse = (await response.json());
    console.log(data)
    const result = data.chart.result[0];
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
  const getSummaryProfile = async (stock: string): Promise<SummaryProfile> => {
    const url = `query1.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=summaryProfile,earningsHistory`;
    const response = await fetch(proxyurl + url);
    const data = await response.json();
    return data.quoteSummary.result[0].summaryProfile;
  };

  return {
    getTimesAndPrices,
    searchForTicker,
    getSummaryProfile,
  } as const;
};
