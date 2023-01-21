import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { PriceChartToolbar } from "../../components/PriceChartToolbar";
import { TickerSearch } from "../../components/TickerSearch/TickerSearch";
import { PriceChart } from "../../components/PriceChart/PriceChart";
import { useFinance } from "../../services";
import { PriceChartInterval, PriceChartTimeRange, Quote } from "../../models";
import { useChartData } from "./useChartData";

export function QuotePage() {
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useChartData();
  const finance = useFinance();

  const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
    setSelectedTimeFrame(range);
    const result = await finance.getPriceHistory(selectedQuote ? selectedQuote?.ticker || "" : "", range, interval);
    setChartData(result);
  };

  useEffect(() => {
    if (selectedQuote) {
      fetchHistory();
    }
  }, [selectedQuote]);

  return (
    <x.div p={8}>
      <TickerSearch setSelectedQuote={setSelectedQuote} selectedQuote={selectedQuote} />
      {selectedQuote && (
        <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
          <x.div mb={8}>
            <PriceChartToolbar selectedTimeFrame={selectedTimeframe} fetchHistory={fetchHistory} />
          </x.div>
          {chartData.length ? <PriceChart selectedTicker={selectedQuote.ticker} chartData={chartData} /> : ""}
        </x.div>
      )}
    </x.div>
  );
}
