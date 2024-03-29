import { useCalculateYearsToDividends } from "../../components/DividendDiscountModel/useCalculateYearsToDividends";
import { YearToNumber } from "../../types";
import { YFDividendHistory } from "../../types/yahoo-finance.d";

const yearsAgo = [1, 3, 5, 8, 10, 15, 20];
const currentYear = new Date().getFullYear();

export const useCalculateCompoundedAnnualDividendIncrease = (history: YFDividendHistory.HistoryList[]) => {
  const calcYearsToDividends = useCalculateYearsToDividends();
  let compoundedAnnualIncrease = {} as YearToNumber;

  const [yearsToDividends] = calcYearsToDividends(history);
  const mostRecentYear = yearsToDividends[currentYear] ? currentYear : currentYear - 1;
  const mostRecentDividend = yearsToDividends[mostRecentYear];
  compoundedAnnualIncrease = yearsAgo.reduce((acc, ago) => {
    const value = (
      ((mostRecentDividend - yearsToDividends[mostRecentYear - ago]) / yearsToDividends[mostRecentYear - ago]) *
      100
    ).toFixed(2);
    return {
      ...acc,
      [ago]: value,
    };
  }, {} as YearToNumber);

  return compoundedAnnualIncrease;
};
