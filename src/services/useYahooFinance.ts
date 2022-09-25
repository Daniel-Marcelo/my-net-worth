import { PriceChartInterval, PriceChartTimeRange, Quote, QuoteType } from "../models";
import { Finance } from "./useFinance";

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
      }));
  };

  return {
    getPriceHistory,
    searchForTicker,
  } as const;
};
