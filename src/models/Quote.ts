export enum QuoteType {
  Option = "OPTION",
  Future = "FUTURE",
  Equity = "EQUITY",
  Etf = "ETF",
}

export interface Quote {
  ticker: string;
  name: string;
}

export interface YFQuote {
  exchDisp: string;
  exchange: string;
  index: string;
  quoteType: string;
  score: number;
  shortname: string;
  symbol: string;
  typeDisp: string;
}
