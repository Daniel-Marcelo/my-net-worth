import { subYears } from "date-fns";
import { useEffect, useState } from "react";
import { useCalculateYearsToDividends } from "../../components/DividendDiscountModel/useCalculateYearsToDividends";
import { PriceChartTimeRange as Range, rangeToYearsMap } from "../../models";
import { ViewType } from "../../types";
import { YFDividendHistory } from "../../types/yahoo-finance.d";

export const useCalculateFilteredDividendHistory = (
  history: YFDividendHistory.HistoryList[],
  viewType: ViewType,
  selectedTimeFrame: Range
) => {
  const [filteredHistory, setFilteredHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const calcYearsToDividends = useCalculateYearsToDividends();

  const setFilteredHistoryBasedOnYear = (timeframe: Range) => {
    const minimumYear = new Date().getFullYear() - rangeToYearsMap.get(timeframe);
    const [yearsToDividends] = calcYearsToDividends(history);
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

  useEffect(() => {
    generateFilteredHistory(selectedTimeFrame, viewType);
  }, [viewType, selectedTimeFrame, history]);

  return filteredHistory;
};
