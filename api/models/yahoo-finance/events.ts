export interface HistoryList {
  dateString: string;
  amount: number;
  date: Date;
  year: string;
}
export interface Pre {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface Regular {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface Post {
  timezone: string;
  start: number;
  end: number;
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
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}
export interface DividendEntry {
  amount: number;
  date: number;
}

export interface Dividends {
  [key: number]: DividendEntry;
}

export interface Events {
  dividends: Dividends;
}

export interface Quote {
  high: number[];
  low: number[];
  volume: any[];
  open: number[];
  close: number[];
}

export interface Adjclose {
  adjclose: number[];
}

export interface Indicators {
  quote: Quote[];
  adjclose: Adjclose[];
}

export interface Result {
  meta: Meta;
  timestamp: number[];
  events: Events;
  indicators: Indicators;
}

export interface Chart {
  result: Result[];
  error?: any;
}

export interface GetEventsResponse {
  chart: Chart;
}
