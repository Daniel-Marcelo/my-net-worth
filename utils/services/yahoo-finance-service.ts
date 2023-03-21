import axios from "axios";
import { TickerSearchResponse } from "../models/yahoo-finance";
import { GetEventsResponse } from "../models/events";
import { GetModulesResponse } from "../models/finance-modules";
import { PriceChartInterval, PriceChartTimeRange, PriceHistoryResponse } from "../models/price-history";

const searchForTicker = async (ticker: string) => {
  const response = await axios.get<TickerSearchResponse>(
    `https://query2.finance.yahoo.com/v1/finance/search?q=${ticker}`
  );
  return response.data;
};

const getPriceHistory = async (
  ticker: string,
  range = PriceChartTimeRange.OneDay,
  interval = PriceChartInterval.FifteenMins
) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`;
  const response = await axios.get<PriceHistoryResponse>(url);
  return response.data;
};

const getModules = async (stock: string, modules: string[]): Promise<GetModulesResponse> => {
  const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${modules.join(",")}`;
  const response = await axios.get<GetModulesResponse>(url);
  return response.data;
};

const getEvents = async (stock: string): Promise<GetEventsResponse> => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock}?interval=1d&period1=0&period2=1674432000&events=div`;
  const response = await axios.get<GetEventsResponse>(url);
  return response.data;
};

export const yahooFinanceService = {
  searchForTicker,
  getPriceHistory,
  getModules,
  getEvents,
} as const;
