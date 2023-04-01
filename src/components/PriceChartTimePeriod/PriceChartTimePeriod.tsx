import { Button } from "@mui/material";
import { PriceChartInterval as Interval, PriceChartTimeRange as Range } from "../../models";

interface PriceChartTimePeriodProps {
  isActive: (range: Range) => boolean;
  range: Range;
  onClick: (range?: Range, interval?: Interval) => Promise<void> | void;
}

const rangeToInterval = new Map([
  [Range.OneDay, Interval.TwoMins],
  [Range.FiveDays, Interval.FifteenMins],
  [Range.OneMonth, Interval.OneHour],
  [Range.SixMonths, Interval.OneDay],
  [Range.YearToDate, Interval.OneDay],
  [Range.OneYear, Interval.OneDay],
  [Range.TwoYears, Interval.OneDay],
  [Range.FiveYears, Interval.OneMonth],
  [Range.TenYears, Interval.OneMonth],
  [Range.Max, Interval.OneMonth],
]);

const rangeToLabel = new Map([
  [Range.OneDay, "1D"],
  [Range.FiveDays, "5D"],
  [Range.OneMonth, "1M"],
  [Range.SixMonths, "6M"],
  [Range.YearToDate, "YTD"],
  [Range.OneYear, "1Y"],
  [Range.TwoYears, "2Y"],
  [Range.FiveYears, "5Y"],
  [Range.TenYears, "10Y"],
  [Range.Max, "MAX"],
]);

export function PriceChartTimePeriod({ isActive, range, onClick }: PriceChartTimePeriodProps) {
  const interval = rangeToInterval.get(range);
  const label = rangeToLabel.get(range);
  return (
    <Button variant={isActive(range) ? "contained" : "outlined"} size="small" onClick={() => onClick(range, interval)}>
      {label}
    </Button>
  );
}
