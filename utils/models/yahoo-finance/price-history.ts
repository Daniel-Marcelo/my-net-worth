export interface Pre {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}

export interface Regular {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}

export interface Post {
  timezone: string;
  end: number;
  start: number;
  gmtoffset: number;
}

export interface CurrentTradingPeriod {
  pre: Pre;
  regular: Regular;
  post: Post;
}

export interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  tradingPeriods: any[][];
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface Quote {
  open: number[];
  volume: number[];
  high: number[];
  close: number[];
  low: number[];
}

export interface Indicators {
  quote: [Quote];
}

export interface Result {
  meta: Meta;
  timestamp: number[];
  indicators: Indicators;
}

export interface Chart {
  result: [Result];
}

export interface PriceHistoryResponse {
  chart: Chart;
}

export const enum PriceChartTimeRange {
  OneDay = "1d",
  FiveDays = "5d",
  OneMonth = "1mo",
  SixMonths = "6mo",
  YearToDate = "ytd",
  OneYear = "1y",
  TwoYears = "2y",
  FiveYears = "5y",
  TenYears = "10y",
  Max = "max",
}

export const enum PriceChartInterval {
  TwoMins = "2m",
  FifteenMins = "15m",
  OneHour = "1h",
  OneDay = "1d",
  OneWeek = "1w",
  OneMonth = "1mo",
}
