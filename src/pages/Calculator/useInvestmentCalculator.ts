import { BarChartEntry, ContributionPeriodValue } from "./Calculator.model";

export const useInvestmentCalculator = () => {

  const periods = {
    [ContributionPeriodValue.Weekly]: 52,
    [ContributionPeriodValue.BiWeekly]: 26,
    [ContributionPeriodValue.Monthly]: 12,
    [ContributionPeriodValue.Annually]: 1,
  };

  return (
    contributionPeriod: ContributionPeriodValue,
    rateOfReturn: number,
    startingAmount: number,
    years: number,
    additionalContribution: number
  ) => {
    const items = [] as BarChartEntry[];
    const period = periods[contributionPeriod];
    const periodicalInterestRate = rateOfReturn / 100 / period;
    let allYearsContributions = 0;
    let total = startingAmount;

    for (let y = 1; y <= years; y += 1) {
      let thisYearContributions = 0;
      for (let i = 1; i <= period; i += 1) {
        total += total * periodicalInterestRate;
        total += additionalContribution;
        thisYearContributions += additionalContribution;
      }
      allYearsContributions += thisYearContributions;

      if (y === 1) {
        console.log(thisYearContributions);
        console.log(allYearsContributions);
      }

      console.log(`Total for year ${y} is ${total}`)
      console.log(`contributions for year ${y} is ${thisYearContributions}`)

      const normalizedContributions = +(thisYearContributions + y === 1 ? 0 : allYearsContributions);
      items.push({
        name: `Year ${y}`,
        startingAmount,
        interest: +(total - normalizedContributions - startingAmount).toFixed(2),
        contributions: normalizedContributions.toFixed(2),
      });
    }

    return [items, total] as const;
  };
};