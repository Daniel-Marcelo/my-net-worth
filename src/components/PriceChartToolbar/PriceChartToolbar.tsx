import { PriceChartInterval as Interval, PriceChartTimeRange as Range } from "../../models";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";

interface PriceChartToolbarProps {
  selectedTimeFrame: string;
  fetchHistory: (range?: Range, interval?: Interval) => Promise<void>;
}
export function PriceChartToolbar({
  selectedTimeFrame,
  fetchHistory,
}: PriceChartToolbarProps) {
  const isActive = (range: Range) => selectedTimeFrame === range;

  return (
    <>
      <PriceChartTimePeriod isActive={isActive} range={Range.OneDay} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.FiveDays} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.OneMonth} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.SixMonths} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.YearToDate} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.OneYear} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.TwoYears} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.FiveYears} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.TenYears} onClick={fetchHistory} />
      <PriceChartTimePeriod isActive={isActive} range={Range.Max} onClick={fetchHistory} />
    </>
  );
}
