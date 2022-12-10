import { PriceChartInterval, PriceChartTimeRange, Quote, QuoteSummary, QuoteType, SummaryProfile } from "../models";
import { Finance } from "./useFinance";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const useYahooFinance = (): Finance => {
  const getPriceHistory = async (
    ticker: string,
    range = PriceChartTimeRange.OneDay,
    interval = PriceChartInterval.FifteenMins
  ) => {
    const response = await fetch(
      `/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`
    );
    const data = await response.json();
    const timestamps = data.chart.result[0].timestamp as number[];
    const prices = data.chart.result[0].indicators.quote[0].close as number[];
    return [timestamps, prices.map((price) => Math.round(price * 100) / 100)];
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
    getPriceHistory,
    searchForTicker,
    getSummaryProfile,
  } as const;
};
