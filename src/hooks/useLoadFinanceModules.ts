import { useQuery } from "@tanstack/react-query";
import { financeApi } from "../services";
import { useQuoteStore } from "../stores";
import { QueryKey, RangeData, TickerSummaryItem, WaccData } from "../types";
import { YFModule } from "../types/yahoo-finance.d";

const getBalanceSheet = (statements: YFModule.BalanceSheetStatement[]) =>
  statements[0]?.shortLongTermDebt ? statements[0] : statements[1];

const getWaccData = (moduleData: YFModule.Result): WaccData => {
  const { summaryDetail, financialData } = moduleData;
  const balanceSheet = getBalanceSheet(moduleData?.balanceSheetHistory?.balanceSheetStatements);
  const incomeStatement = moduleData?.incomeStatementHistory?.incomeStatementHistory[0];
  const incomeBeforeTax = incomeStatement.incomeBeforeTax.raw;
  const incomeTaxExpense = incomeStatement.incomeTaxExpense.raw;
  const calculatedEffectiveTaxRate = Math.abs((incomeTaxExpense / incomeBeforeTax) * 100);
  const interestExpense = incomeStatement.interestExpense.raw;
  const totalDebt = balanceSheet.shortLongTermDebt.raw + balanceSheet.longTermDebt.raw;
  const marketCap = summaryDetail.marketCap.raw;
  const totalAmount = marketCap + totalDebt;
  const rateOfInterest = interestExpense ? Math.abs((interestExpense / totalDebt) * 100) : 0;
  return {
    marketCap,
    rateOfInterest,
    calculatedEffectiveTaxRate,
    totalDebt,
    beta: summaryDetail.beta.raw,
    interestExpense: incomeStatement.interestExpense.raw || 0,
    incomeBeforeTax: incomeStatement.incomeBeforeTax.raw,
    incomeTaxExpense: incomeStatement.incomeTaxExpense.raw,
    weightOfDebt: (totalDebt / totalAmount) * 100,
    weightOfEquity: (marketCap / totalAmount) * 100,
    dividendPerShare: summaryDetail.dividendRate.raw,
    currentPrice: financialData.currentPrice.raw,
  };
};

const getRangeData = ({ summaryDetail, financialData }: YFModule.Result): RangeData => {
  const highLowDiff = summaryDetail.fiftyTwoWeekHigh.raw - summaryDetail.fiftyTwoWeekLow.raw;
  return {
    start: summaryDetail.fiftyTwoWeekLow.raw,
    end: summaryDetail.fiftyTwoWeekHigh.raw,
    currentValue: ((financialData.currentPrice.raw - summaryDetail.fiftyTwoWeekLow.raw) / highLowDiff) * 100,
    currentValueLabel: financialData.currentPrice.fmt,
  };
};

const getSummaryItems1 = ({ summaryDetail, financialData }: YFModule.Result) => [
  new TickerSummaryItem("Current Price", financialData.currentPrice.fmt),
  new TickerSummaryItem("Previous Close", summaryDetail.previousClose.fmt),
  new TickerSummaryItem("Open", summaryDetail.open.fmt),
  new TickerSummaryItem("Days Range", `${summaryDetail.dayLow.fmt} - ${summaryDetail.dayHigh.fmt}`),
  new TickerSummaryItem(
    "52 Week Range",
    `${summaryDetail.fiftyTwoWeekLow.fmt} - ${summaryDetail.fiftyTwoWeekHigh.fmt}`
  ),
  new TickerSummaryItem("Market Cap", summaryDetail.marketCap.fmt),
  new TickerSummaryItem("Beta", summaryDetail.beta.fmt),
];

const getSummaryItems2 = ({ summaryDetail, defaultKeyStatistics }: YFModule.Result) => [
  new TickerSummaryItem("PE", summaryDetail.trailingPE.fmt),
  new TickerSummaryItem("EPS", defaultKeyStatistics.trailingEps.fmt),
  new TickerSummaryItem("Dividend Yield", summaryDetail.dividendYield.fmt),
  new TickerSummaryItem("Ex. Dividend Date", summaryDetail.exDividendDate.fmt),
  new TickerSummaryItem("Dividend Rate", summaryDetail.dividendRate.fmt),
  new TickerSummaryItem("5 yr Average Div Yield", `${summaryDetail.fiveYearAvgDividendYield.fmt}%`),
  new TickerSummaryItem("Trailing Annual Div Yield", summaryDetail.trailingAnnualDividendYield.fmt),
];

export const useLoadFinanceModules = () => {
  const { ticker } = useQuoteStore();

  const query = useQuery({
    enabled: !!ticker,
    queryKey: [QueryKey.GetFinanceModules, ticker],
    queryFn: () => financeApi.getModules(ticker),
  });

  return {
    ...query,
    waccData: query?.data ? getWaccData(query.data) : null,
    rangeData: query?.data ? getRangeData(query.data) : null,
    moduleData: query.data,
    summaryItems1: query?.data ? getSummaryItems1(query.data) : null,
    summaryItems2: query?.data ? getSummaryItems2(query.data) : null,
  };
};
