import { TickerSearchResponse } from "../models/yahoo-finance.js";
import { GetEventsResponse } from "../models/yahoo-finance/events.js";
import { FinanceModules, GetModulesResponse } from "../models/yahoo-finance/finance-modules.js";
import {
  PriceChartInterval,
  PriceChartTimeRange,
  PriceHistoryResponse,
} from "../models/yahoo-finance/price-history.js";
import { myFetch } from "../utils/fetch.js";

const searchForTicker = async (ticker: string) => {
  const response = await myFetch(`https://query2.finance.yahoo.com/v1/finance/search?q=${ticker}`);
  return (await response.json()) as TickerSearchResponse;
};

const getPriceHistory = async (
  ticker = "AAPL",
  range = PriceChartTimeRange.OneDay,
  interval = PriceChartInterval.FifteenMins
) => {
  const response = await myFetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`
  );
  return (await response.json()) as PriceHistoryResponse;
};

const getModules = async (stock: string, modules = FinanceModules): Promise<GetModulesResponse> => {
  const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${modules.join(",")}`;
  const response = await myFetch(url);
  return (await response.json()) as GetModulesResponse;
};

const getEvents = async (stock: string): Promise<GetEventsResponse> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock}?interval=1d&period1=0&period2=1674432000&events=div`;
  const response = await myFetch(url);
  return (await response.json()) as GetEventsResponse;
};

export const yahooFinanceService = {
  searchForTicker,
  getPriceHistory,
  getModules,
  getEvents,
} as const;
