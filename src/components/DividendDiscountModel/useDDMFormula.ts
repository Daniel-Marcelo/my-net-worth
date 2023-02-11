export const useDDMFormula = () => {
  const numerator = (dividendLast12Months: number, dividendAverageAnnualGrowthRate: number) =>
    dividendLast12Months * (1 + dividendAverageAnnualGrowthRate);
  const demoninator = (dividendAverageAnnualGrowthRate: number, requiredRateOfReturn = 0.08) =>
    requiredRateOfReturn - dividendAverageAnnualGrowthRate;
  const formula = (
    dividendLast12Months: number,
    dividendAverageAnnualGrowthRate: number,
    requiredRateOfReturn = 0.08
  ) => {
    console.log(`dividendLast12Months ${dividendLast12Months}`);
    console.log(`(1 + dividendAverageAnnualGrowthRate) ${1 + dividendAverageAnnualGrowthRate}`);
    console.log(`numerator ${numerator(dividendLast12Months, dividendAverageAnnualGrowthRate)}`);
    console.log(`demoninator ${demoninator(dividendAverageAnnualGrowthRate, requiredRateOfReturn)}`);
    console.log(`requiredRateOfReturn ${requiredRateOfReturn}`);
    console.log(
      `dividing ${numerator(dividendLast12Months, dividendAverageAnnualGrowthRate)} by ${demoninator(
        dividendAverageAnnualGrowthRate,
        requiredRateOfReturn
      )}`
    );
    return (
      numerator(dividendLast12Months, dividendAverageAnnualGrowthRate) /
      demoninator(dividendAverageAnnualGrowthRate, requiredRateOfReturn)
    );
  };
  return formula;
};
