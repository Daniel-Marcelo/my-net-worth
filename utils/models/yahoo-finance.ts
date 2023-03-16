export interface Quote {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  index: string;
  score: number;
  typeDisp: string;
  longname: string;
  exchDisp: string;
  sector: string;
  industry: string;
  dispSecIndFlag: boolean;
  isYahooFinance: boolean;
}

export interface Resolution {
  url: string;
  width: number;
  height: number;
  tag: string;
}

export interface Thumbnail {
  resolutions: Resolution[];
}

export interface News {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  type: string;
  thumbnail: Thumbnail;
  relatedTickers: string[];
}

export interface TickerSearchResponse {
  explains: any[];
  count: number;
  quotes: Quote[];
  news: News[];
  nav: any[];
  lists: any[];
  researchReports: any[];
  screenerFieldResults: any[];
  totalTime: number;
  timeTakenForQuotes: number;
  timeTakenForNews: number;
  timeTakenForAlgowatchlist: number;
  timeTakenForPredefinedScreener: number;
  timeTakenForCrunchbase: number;
  timeTakenForNav: number;
  timeTakenForResearchReports: number;
  timeTakenForScreenerField: number;
  timeTakenForCulturalAssets: number;
}

export enum QuoteType {
  Option = "OPTION",
  Future = "FUTURE",
  Equity = "EQUITY",
  Etf = "ETF",
}
