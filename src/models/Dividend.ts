import { PriceChartTimeRange as Range } from ".";
import { DividendFrequency } from "../types";

export const rangeToYearsMap = new Map([
  [Range.OneYear, 1],
  [Range.TwoYears, 2],
  [Range.FiveYears, 5],
  [Range.TenYears, 10],
  [Range.Max, 100],
]);
export type Year = "1" | "3" | "5" | "8" | "10" | "15" | "20";

export const DividendFrequencyToDisplay = new Map([
  [12, DividendFrequency.Monthly],
  [4, DividendFrequency.Quarterly],
  [2, DividendFrequency.BiAnnually],
  [1, DividendFrequency.Annually],
]);

export const DividendFrequencyToCount = new Map([
  [DividendFrequency.Monthly, 12],
  [DividendFrequency.Quarterly, 3],
  [DividendFrequency.BiAnnually, 6],
  [DividendFrequency.Annually, 1],
]);
