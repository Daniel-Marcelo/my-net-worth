import { useEffect } from "react";
import { useFinance } from "../services";
import { useFinanceStore } from "../stores/finance.store";
import { FinanceModule } from "../types";
import { useLoadFinanceModules } from "./useLoadFinanceModules";

export const useWACC = () => {
    const { moduleData } = useFinanceStore();
    const finance = useFinance();
    useEffect(() => {
        const run = async () => {

            const capitalAssetPricingModel = (rf: number, beta: number, rm: number) => {
                return rf + (beta * (rm - rf))
            }
            const incomeStatement = moduleData?.incomeStatementHistory?.incomeStatementHistory[3];
            const balanceSheet = moduleData?.balanceSheetHistory?.balanceSheetStatements[3];

            if (incomeStatement) {
                const interestExpense = incomeStatement.interestExpense.raw;
                const shortTermDebt = balanceSheet.shortLongTermDebt.raw;
                const longTermDebt = balanceSheet.longTermDebt.raw;
                const totalDebt = shortTermDebt + longTermDebt;
                const interestRate = Math.abs((interestExpense / totalDebt) * 100);
                console.log('Interest rate ' + interestRate);

                const incomeBeforeTax = incomeStatement.incomeBeforeTax.raw;
                const incomeTaxExpense = incomeStatement.incomeTaxExpense.raw;
                const calculatedEffectiveTaxRate = Math.abs((incomeTaxExpense / incomeBeforeTax) * 100)

                console.log('calculatedEffectiveTaxRate ' + calculatedEffectiveTaxRate)

                const taxAdjustedCostOfDebt = interestRate * (1 - (calculatedEffectiveTaxRate / 100));
                console.log('taxAdjustedCostOfDebt ' + taxAdjustedCostOfDebt);

                // Get cost of equity
                const data = await finance.getPriceHistory('^TNX');
                const prices = data.indicators.quote[0].close;
                const TenYearBondRate = prices[prices.length - 1];
                const rf = TenYearBondRate;
                console.log('rf '+rf)
                const beta = moduleData.summaryDetail.beta.raw;
                console.log('beta '+beta);

                console.log('capitalAssetPricingModel '+capitalAssetPricingModel(rf, beta, 10))
                const re=capitalAssetPricingModel(rf, beta, 10);
                console.log('re ' +re)

                const marketCap = moduleData.summaryDetail.marketCap.raw;
                const totalAmount: number = (marketCap + totalDebt);
                console.log('totalDebt '+totalDebt)

                console.log('totalAmount '+totalAmount)
                const wd = (totalDebt /totalAmount)*100;
                const we = (marketCap /totalAmount)*100
                console.log('wd '+wd)
                console.log('we '+we);
                console.log('WACC '+(wd*taxAdjustedCostOfDebt)+(we*re))
            }
        }
        run();
    }, [moduleData])
    const formula = (wd: number, rd: number, t: number, we: number, re: number) => {
        return (wd * wd) * (1 - t) + (we * re)
    }
    return formula
}