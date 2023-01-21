import format from "date-fns/format";
import { PriceChartInterval as Interval, PriceChartTimeRange as Range } from "../../models";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";
import { useFinance } from "../../services";

interface PriceChartToolbarProps {
  selectedTimeFrame: string;
  selectedTicker: string;
  setChartData: (data: any[]) => void;
  setSelectedTimeFrame: (timeframe: string) => void;
}
export function PriceChartToolbar({
  selectedTimeFrame,
  setSelectedTimeFrame,
  selectedTicker,
  setChartData,
}: PriceChartToolbarProps) {
  const yahooFinance = useFinance();

  const fetchHistory = async (range = Range.OneDay, interval = Interval.OneMonth) => {
    setSelectedTimeFrame(range);
    const [timestamps, prices] = await yahooFinance.getTimesAndPrices(selectedTicker, range, interval);
    const dates = timestamps.map((t) => {
      const date = new Date(0);
      date.setUTCSeconds(t);
      return date;
    });
    const data = dates.map((date, index) => ({
      name: format(date, "MM/dd/yyyy"),
      price: prices[index],
    }));
    setChartData(data);
  };

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
