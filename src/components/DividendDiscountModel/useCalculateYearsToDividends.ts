import range from "lodash/range";
import { PriceChartTimeRange as Range, rangeToYearsMap } from "../../models";
import { YearToNumber } from "../../types";
import { YFDividendHistory } from "../../types/yahoo-finance";

export const useCalculateYearsToDividends = () => {
  const currentYear = new Date().getFullYear();

  const calcYearsToDividends = (history: YFDividendHistory.HistoryList[]) => {
    const yearsToGoBack = rangeToYearsMap.get(Range.Max);
    const yearsInRange = range(0, yearsToGoBack + 1).map((count) => currentYear - count);
    const yearToDividends = {} as YearToNumber;
    history.forEach((historyItem) => {
      const year = historyItem.date.getFullYear();
      if (yearsInRange.includes(year)) {
        const currentDividendForYear = yearToDividends[year] || 0;
        yearToDividends[year] = currentDividendForYear + historyItem.amount;
      }
    });
    console.log(yearToDividends);
    yearToDividends[2023] = undefined;
    return yearToDividends;
  };

  return calcYearsToDividends;
};
