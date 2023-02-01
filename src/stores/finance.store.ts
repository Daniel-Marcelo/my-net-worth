import { create } from "zustand";
import { YFModule } from "../types/yahoo-finance";

interface RangeData {
  start: number;
  end: number;
  currentValue: number;
  currentValueLabel: string;
}
interface FinanceStoreData {
  moduleData?: YFModule.Result;
  setModuleData: (moduleData: YFModule.Result) => void;
  tickerSummaryItems1: TickerSummaryItem[],
  tickerSummaryItems2: TickerSummaryItem[],
  rangeData: RangeData,
}

class TickerSummaryItem {
  constructor(public label: string, public value: string) {}
}
export const useFinanceStore = create<FinanceStoreData>((set) => ({
  moduleData: null,
  rangeData: null,
  setModuleData: (moduleData) => {
    const summaryDetail = moduleData.summaryDetail;
    const defaultKeyStatistics = moduleData.defaultKeyStatistics;
    const financialData = moduleData.financialData;
    console.log(moduleData)
    set({ moduleData })
    const highLowDiff = (summaryDetail.fiftyTwoWeekHigh.raw - summaryDetail.fiftyTwoWeekLow.raw);
    console.log( ((financialData.currentPrice.raw - summaryDetail.fiftyTwoWeekLow.raw)/highLowDiff)*100)
    const rangeData = {
      start: summaryDetail.fiftyTwoWeekLow.raw,
      end: summaryDetail.fiftyTwoWeekHigh.raw,
      currentValue: ((financialData.currentPrice.raw - summaryDetail.fiftyTwoWeekLow.raw)/highLowDiff)*100,
      currentValueLabel: financialData.currentPrice.fmt
    } as RangeData

    set({rangeData})
    set({ tickerSummaryItems1: [ 
      new TickerSummaryItem('Current Price', financialData.currentPrice.fmt),
      new TickerSummaryItem('Previous Close', summaryDetail.previousClose.fmt),
      new TickerSummaryItem('Open', summaryDetail.open.fmt),
      new TickerSummaryItem('Days Range', `${summaryDetail.dayLow.fmt} - ${summaryDetail.dayHigh.fmt}`),
      new TickerSummaryItem('52 Week Range', `${summaryDetail.fiftyTwoWeekLow.fmt} - ${summaryDetail.fiftyTwoWeekHigh.fmt}`),
      new TickerSummaryItem('Market Cap', summaryDetail.marketCap.fmt),
      new TickerSummaryItem('Beta', summaryDetail.beta.fmt),
    ]})

    set({ tickerSummaryItems2: [ 
      new TickerSummaryItem('PE', summaryDetail.trailingPE.fmt),
      new TickerSummaryItem('EPS', defaultKeyStatistics.trailingEps.fmt),
      new TickerSummaryItem('Dividend Yield', summaryDetail.dividendYield.fmt),
      new TickerSummaryItem('Ex. Dividend Date', summaryDetail.exDividendDate.fmt),
      new TickerSummaryItem('Dividend Rate', summaryDetail.dividendRate.fmt),
      new TickerSummaryItem('5 yr Average Div Yield', summaryDetail.fiveYearAvgDividendYield.fmt),
      new TickerSummaryItem('Trailing Annual Div Yield', summaryDetail.trailingAnnualDividendYield.fmt),
    ]})
  },
  tickerSummaryItems1: [],
  tickerSummaryItems2: [],
}));
