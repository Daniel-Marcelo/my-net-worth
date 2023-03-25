import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { PriceChartInterval, PriceChartTimeRange } from "../../models";
import { useChartData } from "../../pages/QuotePage/useChartData";

import { PriceChart } from "../PriceChart";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { useFinanceStore } from "../../stores/finance.store";
import { PriceRangeBar } from "../PriceRangeBar";
import { LabelValueList } from "../LabelValueList";
import { financeApi } from "../../services";

interface TickerSummaryTabProps {
  ticker: string;
}
export function TickerSummaryTab({ ticker }: TickerSummaryTabProps) {
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useChartData();

  const { tickerSummaryItems1, tickerSummaryItems2 } = useFinanceStore((state) => state);

  const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
    setSelectedTimeFrame(range);
    if (ticker) {
      const result = await financeApi.getPriceHistory(ticker, range, interval);
      setChartData(result);
    }
  };

  useEffect(() => {
    if (ticker) {
      fetchHistory();
    }
  }, [ticker]);

  return (
    <x.div display="flex">
      <x.div display="flex" flexDirection="column" flex={1}>
        <x.div mb={8} display="flex" justifyContent="center">
          <PriceChartToolbar selectedTimeFrame={selectedTimeframe} onClick={fetchHistory} />
        </x.div>
        <x.div ml={-6} flex={1}>
          {chartData.length ? <PriceChart selectedTicker={ticker} chartData={chartData} /> : ""}
        </x.div>
      </x.div>
      <x.div display="flex" flex={1} flexDirection="column">
        <x.div mb={8}>
          <PriceRangeBar />
        </x.div>

        <x.div display="flex" justifyContent="center">
          <LabelValueList list={tickerSummaryItems1} cardProps={{ marginLeft: "2rem" }} />
          <LabelValueList list={tickerSummaryItems2} cardProps={{ marginLeft: "4rem" }} />
        </x.div>
      </x.div>
    </x.div>
  );
}
