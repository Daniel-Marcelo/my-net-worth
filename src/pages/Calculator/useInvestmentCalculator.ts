import { BarChartEntry, ContributionPeriodValue } from "../../models/Calculator";

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

      const normalizedContributions = +(thisYearContributions + y === 1 ? 0 : allYearsContributions);
      const interest = +(total - normalizedContributions - startingAmount).toFixed(0);
      items.push({
        name: `Year ${y}`,
        startingAmount,
        interest,
        contributions: +normalizedContributions.toFixed(0),
        total: startingAmount + interest + normalizedContributions,
      });
    }
    return [items, total] as const;
  };
};
