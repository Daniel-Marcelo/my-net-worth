import { ButtonGroup } from "@mui/material";
import { PriceChartInterval as Interval, PriceChartTimeRange as Range } from "../../models";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";

interface PriceChartToolbarProps {
  selectedTimeFrame: string;
  onClick: (range?: Range, interval?: Interval) => Promise<void> | void;
  ranges?: Range[];
}

const defaultRanges = [
  Range.OneDay,
  Range.FiveDays,
  Range.OneMonth,
  Range.SixMonths,
  Range.YearToDate,
  Range.OneYear,
  Range.TwoYears,
  Range.FiveYears,
  Range.TenYears,
  Range.Max,
];
export function PriceChartToolbar({ selectedTimeFrame, onClick, ranges = defaultRanges }: PriceChartToolbarProps) {
  const isActive = (range: Range) => selectedTimeFrame === range;

  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      {ranges.map((range) => (
        <PriceChartTimePeriod isActive={isActive} range={range} onClick={onClick} />
      ))}
    </ButtonGroup>
  );
}
