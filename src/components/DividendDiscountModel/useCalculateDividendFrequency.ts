import { useEffect, useState } from "react";
import { YFDividendHistory } from "../../types/yahoo-finance.d";
import { DividendFrequency } from "../../types";
import { DividendFrequencyToDisplay } from "../../models";

export const useCalculateDividendFrequency = (history: YFDividendHistory.HistoryList[]) => {
  const [dividendFrequency, setDividendFrequency] = useState<DividendFrequency>();
  const orderedHistory: YFDividendHistory.HistoryList[] = history.slice(-30);

  useEffect(() => {
    const updatedYearToDividendCount: { [key: number]: number } = orderedHistory.reduce(
      (acc, item) => ({
        ...acc,
        [item.year]: acc[item.year] ? acc[item.year] + 1 : 1,
      }),
      {}
    );

    const data: { [key: number]: number } = Object.entries(updatedYearToDividendCount).reduce(
      (acc, [, value]) => ({
        ...acc,
        [value]: acc[value] ? acc[value] + 1 : 1,
      }),
      {}
    );

    const frequency = +Object.entries(data).reduce((acc, [key, value]) => {
      if (data[acc]) {
        return +value > +data[acc] ? key : acc;
      }
      return key;
    }, "0");

    setDividendFrequency(DividendFrequencyToDisplay.get(frequency));
  }, [history]);

  return dividendFrequency;
};
