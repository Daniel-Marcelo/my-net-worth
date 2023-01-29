export const useDDMFormula = () => {
  const numerator = (dividendLast12Months: number, dividendAverageAnnualGrowthRate: number) =>
    dividendLast12Months * (1 + dividendAverageAnnualGrowthRate);
  const demoninator = (dividendAverageAnnualGrowthRate: number, requiredRateOfReturn = 0.09) =>
    requiredRateOfReturn - dividendAverageAnnualGrowthRate;
  const formula = (dividendLast12Months: number, dividendAverageAnnualGrowthRate: number) =>
    numerator(dividendLast12Months, dividendAverageAnnualGrowthRate) / demoninator(dividendAverageAnnualGrowthRate);
  return formula;
};
