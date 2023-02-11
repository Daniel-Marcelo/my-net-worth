import { create } from "zustand";
import { YFModule } from "../types/yahoo-finance";

interface RangeData {
  start: number;
  end: number;
  currentValue: number;
  currentValueLabel: string;
}

interface WaccData {
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
interface FinanceStoreData {
  moduleData?: YFModule.Result;
  setModuleData: (moduleData: YFModule.Result) => void;
  tickerSummaryItems1: TickerSummaryItem[];
  tickerSummaryItems2: TickerSummaryItem[];
  rangeData: RangeData;
  waccData: WaccData;
}


class TickerSummaryItem {
  constructor(public label: string, public value: string) { }
}

const getBalanceSheet = (statements: YFModule.BalanceSheetStatement[]) => {
  if (statements[0].shortLongTermDebt) {
    return statements[0]
  }
  return statements[1]
}
export const useFinanceStore = create<FinanceStoreData>((set) => ({
  rangeData: null,
  waccData: {
    moduleData: null,
    beta: null,
    totalDebt: null,
    interestExpense: null,
    incomeBeforeTax: null,
    incomeTaxExpense: null,
    marketCap: null,
    weightOfDebt: null,
    weightOfEquity: null,
    rateOfInterest: null,
    calculatedEffectiveTaxRate: null,
    dividendPerShare: null,
    currentPrice: null
  },
  setModuleData: (moduleData) => {
    const { summaryDetail, defaultKeyStatistics, financialData } = moduleData;
    const balanceSheet = getBalanceSheet(moduleData?.balanceSheetHistory?.balanceSheetStatements);
    const incomeStatement = moduleData?.incomeStatementHistory?.incomeStatementHistory[0];
    console.log(moduleData);
    const highLowDiff = summaryDetail.fiftyTwoWeekHigh.raw - summaryDetail.fiftyTwoWeekLow.raw;
    console.log(((financialData.currentPrice.raw - summaryDetail.fiftyTwoWeekLow.raw) / highLowDiff) * 100);
    const rangeData = {
      start: summaryDetail.fiftyTwoWeekLow.raw,
      end: summaryDetail.fiftyTwoWeekHigh.raw,
      currentValue: ((financialData.currentPrice.raw - summaryDetail.fiftyTwoWeekLow.raw) / highLowDiff) * 100,
      currentValueLabel: financialData.currentPrice.fmt,
    } as RangeData;

    const incomeBeforeTax = incomeStatement.incomeBeforeTax.raw;
    const incomeTaxExpense = incomeStatement.incomeTaxExpense.raw;
    const calculatedEffectiveTaxRate = Math.abs((incomeTaxExpense / incomeBeforeTax) * 100)
    const interestExpense = incomeStatement.interestExpense.raw;
    const totalDebt = balanceSheet.shortLongTermDebt.raw + balanceSheet.longTermDebt.raw;
    const marketCap = summaryDetail.marketCap.raw;
    const totalAmount = marketCap + totalDebt;
    const rateOfInterest = interestExpense ? Math.abs((interestExpense / totalDebt) * 100) : 0;
    set({
      waccData: {
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
      },
      rangeData,
      moduleData,
      tickerSummaryItems1: [
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
      ],
      tickerSummaryItems2: [
        new TickerSummaryItem("PE", summaryDetail.trailingPE.fmt),
        new TickerSummaryItem("EPS", defaultKeyStatistics.trailingEps.fmt),
        new TickerSummaryItem("Dividend Yield", summaryDetail.dividendYield.fmt),
        new TickerSummaryItem("Ex. Dividend Date", summaryDetail.exDividendDate.fmt),
        new TickerSummaryItem("Dividend Rate", summaryDetail.dividendRate.fmt),
        new TickerSummaryItem("5 yr Average Div Yield", summaryDetail.fiveYearAvgDividendYield.fmt),
        new TickerSummaryItem("Trailing Annual Div Yield", summaryDetail.trailingAnnualDividendYield.fmt),
      ],
    });
  },
  tickerSummaryItems1: [],
  tickerSummaryItems2: [],
}));
