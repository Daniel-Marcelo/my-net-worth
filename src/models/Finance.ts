export interface SummaryProfile {
  address1: string;
  city: string;
  companyOfficers: string[];
  country: string;
  fullTimeEmployees: number;
  industry: string;
  longBusinessSummary: string;
  maxAge: number;
  phone: string;
  sector: string;
  state: string;
  website: string;
  zip: string;
}

export interface QuoteSummary {
  error?: Error;
  result: [Module];
}

export interface Module {
  summaryProfile?: SummaryProfile;
}

export const Modules = [
  "assetProfile",
  "summaryProfile",
  "summaryDetail",
  "esgScores",
  "price",
  "incomeStatementHistory",
  "incomeStatementHistoryQuarterly",
  "balanceSheetHistory",
  "balanceSheetHistoryQuarterly",
  "cashflowStatementHistory",
  "cashflowStatementHistoryQuarterly",
  "defaultKeyStatistics",
  "financialData",
  "calendarEvents",
  "secFilings",
  "recommendationTrend",
  "upgradeDowngradeHistory",
  "institutionOwnership",
  "fundOwnership",
  "majorDirectHolders",
  "majorHoldersBreakdown",
  "insiderTransactions",
  "insiderHolders",
  "netSharePurchaseActivity",
  "earnings",
  "earningsHistory",
  "earningsTrend",
  "industryTrend",
  "indexTrend",
  "sectorTrend",
];
