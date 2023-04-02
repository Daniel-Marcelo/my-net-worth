import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { PriceChartInterval, PriceChartTimeRange } from "../../models";
import { useChartData } from "../../pages/QuotePage/useChartData";

import { PriceChart } from "../PriceChart";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { PriceRangeBar } from "../PriceRangeBar";
import { LabelValueList } from "../LabelValueList";
import { financeApi } from "../../services";
import { useLoadFinanceModules } from "../../hooks/useLoadFinanceModules";

interface TickerSummaryTabProps {
  ticker: string;
}
export function TickerSummaryTab({ ticker }: TickerSummaryTabProps) {
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useChartData();

  const { summaryItems1: tickerSummaryItems1, summaryItems2: tickerSummaryItems2 } = useLoadFinanceModules();

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
    <x.div>
      <x.div>
        <x.div display="flex" justifyContent="center">
          <PriceChartToolbar selectedTimeFrame={selectedTimeframe} onClick={fetchHistory} />
        </x.div>
        <x.div h="50vh" w="100%" mt={4}>
          {chartData.length ? <PriceChart selectedTicker={ticker} chartData={chartData} /> : ""}
        </x.div>
      </x.div>
      <x.div display="flex" w="100%" flexDirection="column">
        <x.div my={4}>
          <PriceRangeBar />
        </x.div>

        <x.div mt={4} width="100%" mx={1}>
          <LabelValueList list={tickerSummaryItems1} />
        </x.div>
        <x.div mt={4} width="100%" mx={1}>
          <LabelValueList list={tickerSummaryItems2} />
        </x.div>
      </x.div>
    </x.div>
  );
}
