export const useDDMRequiredRateOfReturn = () => {
  const formula = (currentDividendPayment: number, stockPrice: number, forecastedDividendGrowthRate: number) => {
    const nextYearsDividend = currentDividendPayment * (1 + forecastedDividendGrowthRate);
    return nextYearsDividend / stockPrice + forecastedDividendGrowthRate;
  };

  return formula;
};
