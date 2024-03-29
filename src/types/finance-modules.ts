export interface RangeData {
  start: number;
  end: number;
  currentValue: number;
  currentValueLabel: string;
}

export interface WaccData {
  beta: number;
  totalDebt: number;
  interestExpense: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  marketCap: number;
  weightOfDebt: number;
  weightOfEquity: number;
  rateOfInterest: number;
  calculatedEffectiveTaxRate: number;
  dividendPerShare: number;
  currentPrice: number;
}

export class TickerSummaryItem {
  public label: string;

  public value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

export const enum FinanceModule {
  assetProfile = "assetProfile",
  summaryProfile = "summaryProfile",
  summaryDetail = "summaryDetail",
  esgScores = "esgScores",
  price = "price",
  incomeStatementHistory = "incomeStatementHistory",
  incomeStatementHistoryQuarterly = "incomeStatementHistoryQuarterly",
  balanceSheetHistory = "balanceSheetHistory",
  balanceSheetHistoryQuarterly = "balanceSheetHistoryQuarterly",
  cashflowStatementHistory = "cashflowStatementHistory",
  cashflowStatementHistoryQuarterly = "cashflowStatementHistoryQuarterly",
  defaultKeyStatistics = "defaultKeyStatistics",
  financialData = "financialData",
  calendarEvents = "calendarEvents",
  secFilings = "secFilings",
  recommendationTrend = "recommendationTrend",
  upgradeDowngradeHistory = "upgradeDowngradeHistory",
  institutionOwnership = "institutionOwnership",
  fundOwnership = "fundOwnership",
  majorDirectHolders = "majorDirectHolders",
  majorHoldersBreakdown = "majorHoldersBreakdown",
  insiderTransactions = "insiderTransactions",
  insiderHolders = "insiderHolders",
  netSharePurchaseActivity = "netSharePurchaseActivity",
  earnings = "earnings",
  earningsHistory = "earningsHistory",
  earningsTrend = "earningsTrend",
  industryTrend = "industryTrend",
  indexTrend = "indexTrend",
  sectorTrend = "sectorTrend",
}

export const FinanceModules = [
  FinanceModule.assetProfile,
  FinanceModule.summaryProfile,
  FinanceModule.summaryDetail,
  FinanceModule.esgScores,
  FinanceModule.price,
  FinanceModule.incomeStatementHistory,
  FinanceModule.incomeStatementHistoryQuarterly,
  FinanceModule.balanceSheetHistory,
  FinanceModule.balanceSheetHistoryQuarterly,
  FinanceModule.cashflowStatementHistory,
  FinanceModule.cashflowStatementHistoryQuarterly,
  FinanceModule.defaultKeyStatistics,
  FinanceModule.financialData,
  FinanceModule.calendarEvents,
  FinanceModule.secFilings,
  FinanceModule.recommendationTrend,
  FinanceModule.upgradeDowngradeHistory,
  FinanceModule.institutionOwnership,
  FinanceModule.fundOwnership,
  FinanceModule.majorDirectHolders,
  FinanceModule.majorHoldersBreakdown,
  FinanceModule.insiderTransactions,
  FinanceModule.insiderHolders,
  FinanceModule.netSharePurchaseActivity,
  FinanceModule.earnings,
  FinanceModule.earningsHistory,
  FinanceModule.earningsTrend,
  FinanceModule.industryTrend,
  FinanceModule.indexTrend,
  FinanceModule.sectorTrend,
];
