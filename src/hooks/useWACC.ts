/* eslint-disable no-console */
import { useFinanceStore } from "../stores/finance.store";
import { useCAPM } from "./useCAPM";

export const useWACC = () => {
  const { waccData } = useFinanceStore();
  const capmFormula = useCAPM();

  const run2 = () => {
    const formula = (wd: number, rd: number, t: number, we: number, re: number) => wd * rd * (100 - t) + we * re;

    if (waccData) {
      console.log("");
      const wd = waccData.weightOfDebt / 100;
      console.log(`wd ${wd}`);
      const rd = waccData.rateOfInterest / 100;
      console.log(`rd ${rd}`);
      const t = waccData.calculatedEffectiveTaxRate / 100;
      console.log(`t ${t}`);
      console.log(`taxAdjustedCostOfDebt ${rd * (1 - t)}`);
      const we = waccData.weightOfEquity / 100;
      console.log(`we ${we}`);
      console.log("determining cost of equity using new formula:");
      console.log(waccData.dividendPerShare / waccData.currentPrice);
      // const costOfEquity = ((waccData.dividendPerShare/waccData.currentPrice)*1.05);
      const costOfEquity = capmFormula(waccData.beta);
      console.log(`re ${costOfEquity}`);
      const re = costOfEquity / 100;
      console.log("");
      return formula(wd, rd, t, we, re);
    }
    return null;
  };
  // useEffect(() => {
  //     const run2 = async () => {
  //         const wd = waccData.weightOfDebt;
  //         const rd = waccData.interestExpense;
  //         const t = waccData.calculatedEffectiveTaxRate;
  //         const we = waccData.weightOfEquity;
  //         const costOfEquity = capmFormula(waccData.beta);
  //         const re = costOfEquity;
  //         formula(wd, rd, t, we, re);
  //     }
  //     if (waccData) {
  //         run2();
  //     }
  // const run = async () => {

  //     const capitalAssetPricingModel = (riskFreeRate: number, beta: number, returnOnTheMarket = 10) => {
  //         const returnOnEquity = riskFreeRate+(beta*(returnOnTheMarket-riskFreeRate))
  //         return returnOnEquity;
  //     }
  //     const incomeStatement = moduleData?.incomeStatementHistory?.incomeStatementHistory[0];
  //     const balanceSheet = moduleData?.balanceSheetHistory?.balanceSheetStatements[0];

  //     if (incomeStatement) {
  //         const interestExpense = incomeStatement.interestExpense.raw;
  //         const shortTermDebt = balanceSheet.shortLongTermDebt.raw;
  //         const longTermDebt = balanceSheet.longTermDebt.raw;
  //         const totalDebt = shortTermDebt + longTermDebt;
  //         const interestRate = Math.abs((interestExpense / totalDebt) * 100);
  //         console.log('Interest rate ' + interestRate);

  //         const incomeBeforeTax = incomeStatement.incomeBeforeTax.raw;
  //         const incomeTaxExpense = incomeStatement.incomeTaxExpense.raw;
  //         const calculatedEffectiveTaxRate = Math.abs((incomeTaxExpense / incomeBeforeTax) * 100)

  //         // console.log('calculatedEffectiveTaxRate ' + calculatedEffectiveTaxRate)

  //         const taxAdjustedCostOfDebt = interestRate * (1 - (calculatedEffectiveTaxRate / 100));
  //         console.log('taxAdjustedCostOfDebt ' + taxAdjustedCostOfDebt);

  //         // Get cost of equity
  //         const tenYearBondData = await finance.getPriceHistory('^TNX');
  //         const prices = tenYearBondData.indicators.quote[0].close;
  //         const TenYearBondRate = prices[prices.length - 1];
  //         const rf = TenYearBondRate;
  //         console.log('rf '+rf)
  //         const beta = moduleData.summaryDetail.beta.raw;
  //         console.log('beta '+beta);

  //         console.log('capitalAssetPricingModel '+capitalAssetPricingModel(rf, beta, 10))
  //         const re=capitalAssetPricingModel(rf, beta, 10);
  //         console.log('re ' +re)

  //         const marketCap = moduleData.summaryDetail.marketCap.raw;
  //         const totalAmount: number = (  marketCap  + totalDebt);
  //         // console.log('totalDebt '+totalDebt)

  //         // console.log('totalAmount '+totalAmount)
  //         const wd = (totalDebt /totalAmount)*100;
  //         const we = (marketCap /totalAmount)*100
  //         console.log('wd '+wd)
  //         console.log('we '+we);
  //         console.log(`multiplying ${wd} by ${taxAdjustedCostOfDebt}`)
  //         console.log('WACC '+(wd*taxAdjustedCostOfDebt)+(we*re))
  //     }
  // }
  // run();
  // }, [waccData])
  return run2;
};
