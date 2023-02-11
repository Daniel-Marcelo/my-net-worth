import { useCallback, useEffect, useState } from "react";
import format from "date-fns/format";
import subYears from "date-fns/subYears";
import reverse from "lodash/reverse";
import sum from "lodash/sum";
import { useFinance } from "../../services";
import { YFDividendHistory } from "../../types/yahoo-finance.d";
import { PriceChartTimeRange as Range, rangeToYearsMap } from "../../models";
import { ViewType, YearToNumber } from "../../types";
import { useCalculateYearsToDividends } from "./useCalculateYearsToDividends";

const yearsAgo = [1, 3, 5, 8, 10, 15, 20];
const currentYear = new Date().getFullYear();

export const useGetDividendHistory = (ticker: string, selectedTimeFrame: Range, viewType: ViewType) => {
  const finance = useFinance();
  const [history, setHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [averageAnnualIncrease, setAverageAnnualIncrease] = useState({} as YearToNumber);
  const [compoundedAnnualIncrease, setCompoundedAnnualIncrease] = useState({} as YearToNumber);
  const calcYearsToDividends = useCalculateYearsToDividends();

  const setFilteredHistoryBasedOnYear = (timeframe: Range) => {
    const minimumYear = new Date().getFullYear() - rangeToYearsMap.get(timeframe);
    const yearsToDividends = calcYearsToDividends(history);
    const yearlyHistory = Object.entries(yearsToDividends).map(
      ([key, value]) =>
        ({
          dateString: key,
          year: key,
          amount: +value.toFixed(3),
        } as YFDividendHistory.HistoryList)
    );
    setFilteredHistory([...yearlyHistory.filter((item) => +item.dateString >= minimumYear)]);
  };

  const generateFilteredHistory = (range: Range, updatedViewType: ViewType) => {
    const limit = subYears(new Date(), rangeToYearsMap.get(range));
    if (updatedViewType === ViewType.Normal) {
      setFilteredHistory(history.filter((historyItem) => historyItem.date > limit));
    } else {
      setFilteredHistoryBasedOnYear(range);
    }
  };

  const getHistory = useCallback(async () => {
    const data = await finance.getDividendHistory(ticker);
    const freshHistory = Object.entries(data).map(([key, value]) => {
      const t = new Date(1970, 0, 1);
      t.setSeconds(+key);
      return {
        date: t,
        dateString: format(t, "MMM yyyy"),
        amount: value.amount,
        year: format(t, "yyyy"),
      } as YFDividendHistory.HistoryList;
    });
    setHistory(freshHistory);
  }, [ticker]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

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
    generateFilteredHistory(selectedTimeFrame, viewType);
  }, [viewType, selectedTimeFrame]);

  useEffect(() => {
    generateFilteredHistory(selectedTimeFrame, viewType);
    const yearsToDividends = calcYearsToDividends(history);
    const mostRecentYear = yearsToDividends[currentYear] ? currentYear : currentYear - 1;
    const mostRecentDividend = yearsToDividends[mostRecentYear];
    const compoundedDivDiff = yearsAgo.reduce((acc, ago) => {
      // console.log(ago);
      const value = (
        ((mostRecentDividend - yearsToDividends[mostRecentYear - ago]) / yearsToDividends[mostRecentYear - ago]) *
        100
      ).toFixed(2);
      return {
        ...acc,
        [ago]: value,
      };
    }, {} as YearToNumber);

    setCompoundedAnnualIncrease(compoundedDivDiff);
    generateAverageAnnualIncreases(yearsToDividends);
  }, [history]);

  return { averageAnnualIncrease, compoundedAnnualIncrease, history, filteredHistory } as const;
};
