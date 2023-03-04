import { DividendFrequencyToDisplay } from "../../models";

export const useCalculateDividendFrequency = () => {
  const calculateDividendFrequency = (dividendYearHistorys: string[]) => {
    const updatedYearToDividendCount: { [key: number]: number } = dividendYearHistorys.reduce(
      (acc, item) => ({
        ...acc,
        [item]: acc[item] ? acc[item] + 1 : 1,
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

    return [frequency, DividendFrequencyToDisplay.get(frequency)] as const;
  };
  return calculateDividendFrequency;
};
