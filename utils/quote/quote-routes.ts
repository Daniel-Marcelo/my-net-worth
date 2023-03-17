/* eslint-disable import/no-relative-packages */
import * as express from "express";
import { QuoteType } from "../models/yahoo-finance";
import { PriceChartInterval, PriceChartTimeRange } from "../models/yahoo-finance/price-history";
import { yahooFinanceService } from "../services/yahoo-finance-service";

const router = express.Router();
router.get("/ticker", async (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const tickerSearchResponse = await yahooFinanceService.searchForTicker(req.query.q as string);
  res.end(
    JSON.stringify(
      tickerSearchResponse.quotes
        .filter((quote) => [QuoteType.Etf, QuoteType.Equity].includes(quote.quoteType as QuoteType))
        .map((quote) => ({
          ticker: quote.symbol,
          name: quote.shortname,
          exchangeDisplay: quote.exchDisp,
        }))
    )
  );
});

const enum FinanceModule {
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

const FinanceModules = [
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

router.get("/modules/:ticker", async (req, res) => {
  const priceHistoryResponse = await yahooFinanceService.getModules(req.params.ticker, FinanceModules);
  res.end(JSON.stringify(priceHistoryResponse));
});

router.get("/events/:ticker", async (req, res) => {
  const eventsResponse = await yahooFinanceService.getEvents(req.params.ticker);
  res.end(JSON.stringify(eventsResponse));
});

router.get("/price-history/:ticker", async (req, res) => {
  const priceHistoryResponse = await yahooFinanceService.getPriceHistory(
    req.params.ticker,
    req.query.range as PriceChartTimeRange,
    req.query.interval as PriceChartInterval
  );
  res.end(JSON.stringify(priceHistoryResponse.chart.result[0]));
});

export default router;
