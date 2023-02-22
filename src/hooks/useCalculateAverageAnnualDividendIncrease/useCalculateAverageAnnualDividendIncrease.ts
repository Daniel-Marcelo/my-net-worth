import { useEffect, useState } from "react";
import reverse from "lodash/reverse";
import sum from "lodash/sum";
import { useCalculateYearsToDividends } from "../../components/DividendDiscountModel/useCalculateYearsToDividends";
import { YearToNumber } from "../../types";
import { YFDividendHistory } from "../../types/yahoo-finance.d";

const yearsAgo = [1, 3, 5, 8, 10, 15, 20];

export const useCalculateAverageAnnualDividendIncrease = (history: YFDividendHistory.HistoryList[]) => {
  const calcYearsToDividends = useCalculateYearsToDividends();
  const [averageAnnualIncrease, setAverageAnnualIncrease] = useState({} as YearToNumber);

  const generateAverageAnnualIncreases = (divs: YearToNumber) => {
    const data = reverse(
      Object.entries(divs)
        .map(([, value], index) => {
          if (index !== Object.entries(divs).length - 1) {
            const currentDiv = value;
            const nextDiv = Object.entries(divs)[index + 1][1];
            return +(((nextDiv - currentDiv) / currentDiv) * 100).toFixed(3);
          }
          return null;
        })
        .filter((i) => !!i)
    );
    const updatedAverageAnnualIncrease = yearsAgo.reduce((acc, ago) => {
      const yearlyDivs = data.slice(0, ago);
      return {
        ...acc,
        [ago]: +(sum(yearlyDivs) / ago).toFixed(2),
      };
    }, {} as YearToNumber);
    setAverageAnnualIncrease(updatedAverageAnnualIncrease);
  };

  useEffect(() => {
    console.log("in history use effect");
    const yearsToDividends = calcYearsToDividends(history);
    generateAverageAnnualIncreases(yearsToDividends);
  }, [history]);

  return averageAnnualIncrease;
};
