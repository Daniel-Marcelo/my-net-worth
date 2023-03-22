import axios from "axios";
import { TickerSearchResponse } from "../models/ticker-search";
import { GetEventsResponse } from "../models/events";
import { GetModulesResponse } from "../models/finance-modules";
import { PriceChartInterval, PriceChartTimeRange, PriceHistoryResponse } from "../models/price-history";

const cors = "corsDomain=finance.yahoo.com";
const tsrc = ".tsrc=finance";
const baseUrl = (queryVersion = 1, apiVersion = 8) =>
  `https://query${queryVersion}.finance.yahoo.com/v${apiVersion}/finance`;

const searchForTicker = async (ticker: string) => {
  const response = await axios.get<TickerSearchResponse>(`${baseUrl(2, 1)}/search?q=${ticker}`);
  return response.data;
};

const getPriceHistory = async (
  ticker: string,
  range = PriceChartTimeRange.OneDay,
  interval = PriceChartInterval.FifteenMins
) => {
  const url = `${baseUrl()}/chart/${ticker}?rangez=${range}&includePrePost=false&interval=${interval}&${cors}&${tsrc}`;
  const response = await axios.get<PriceHistoryResponse>(url);
  return response.data;
};

const getModules = async (stock: string, modules: string[]): Promise<GetModulesResponse> => {
  const url = `${baseUrl(1, 10)}/quoteSummary/${stock}?modules=${modules.join(",")}`;
  const response = await axios.get<GetModulesResponse>(url);
  return response.data;
};

const getEvents = async (stock: string): Promise<GetEventsResponse> => {
  const url = `${baseUrl()}/chart/${stock}?interval=1d&period1=0&period2=1674432000&events=div`;
  const response = await axios.get<GetEventsResponse>(url);
  return response.data;
};

export const yahooFinanceService = {
  searchForTicker,
  getPriceHistory,
  getModules,
  getEvents,
} as const;
