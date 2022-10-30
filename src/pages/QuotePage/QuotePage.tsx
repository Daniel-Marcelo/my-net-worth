import format from "date-fns/format";
import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { PriceChartToolbar } from "../../components/PriceChartToolbar";
import { TickerSearch } from "../../components/TickerSearch/TickerSearch";
import { PriceChart } from "../../components/PriceChart/PriceChart";
import { useFinance } from "../../services";
import { PriceChartInterval, PriceChartTimeRange } from "../../models";

export function QuotePage() {
  const [selectedTicker, setSelectedTicker] = useState("");
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useState([]);
  const finance = useFinance();

  const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
    setSelectedTimeFrame(range);
    const [timestamps, prices] = await finance.getPriceHistory(selectedTicker, range, interval);
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

  useEffect(() => {
    if (selectedTicker) {
      fetchHistory();
    }
  }, [selectedTicker]);

  return (
    <x.div p={8}>
      <TickerSearch setSelectedTicker={setSelectedTicker} selectedTicker={selectedTicker} />
      {selectedTicker && (
        <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
          <x.div mb={8}>
            <PriceChartToolbar
              selectedTicker={selectedTicker}
              setSelectedTimeFrame={setSelectedTimeFrame}
              selectedTimeFrame={selectedTimeframe}
              setChartData={setChartData}
            />
          </x.div>
          {chartData.length ? <PriceChart selectedTicker={selectedTicker} chartData={chartData} /> : ""}
        </x.div>
      )}
    </x.div>
  );
}
