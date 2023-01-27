import { PriceChartTimeRange as Range } from ".";

export const rangeToYearsMap = new Map([
    [Range.OneYear, 1],
    [Range.TwoYears, 2],
    [Range.FiveYears, 5],
    [Range.TenYears, 10],
    [Range.Max, 100],
  ]);
  export type Year = "1" | "3" | "5" | "8" | "10" | "15" | "20";
