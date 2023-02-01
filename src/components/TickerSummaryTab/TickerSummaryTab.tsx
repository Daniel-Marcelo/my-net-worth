import { marginLeft, x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { Box, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { PriceChartInterval, PriceChartTimeRange } from "../../models";
import { useChartData } from "../../pages/QuotePage/useChartData";
import { useFinance } from "../../services";
import { PriceChart } from "../PriceChart";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { useFinanceStore } from "../../stores/finance.store";
import { PriceRangeBar } from "../PriceRangeBar";

interface TickerSummaryTabProps {
  ticker: string;
}
export function TickerSummaryTab({ ticker }: TickerSummaryTabProps) {
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useChartData();
  const finance = useFinance();
  const { tickerSummaryItems1, tickerSummaryItems2 } = useFinanceStore((state) => state);

  useEffect(() => {
    if (ticker) {
      fetchHistory();
    }
  }, [ticker]);

  const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
    setSelectedTimeFrame(range);
    if (ticker) {
      const result = await finance.getPriceHistory(ticker, range, interval);
      setChartData(result);
    }
  };

  return (
    <x.div display="flex">
      <x.div display="flex" flexDirection="column" flex={1}>
        <x.div mb={8} display="flex" justifyContent="center">
          <PriceChartToolbar selectedTimeFrame={selectedTimeframe} fetchHistory={fetchHistory} />
        </x.div>
        <x.div ml={-6} flex={1}>
          {chartData.length ? <PriceChart selectedTicker={ticker} chartData={chartData} /> : ""}
        </x.div>
      </x.div>
      <x.div display="flex" flex={1} flexDirection="column">
        <x.div mb={8}>
          <PriceRangeBar />
        </x.div>

        <x.div display="flex" flex={1} justifyContent="center">
          <Box sx={{ marginLeft: "2rem" }}>
            <List sx={{ p: 0 }}>
              {tickerSummaryItems1.map((item) => (
                <>
                  <ListItem sx={{ bgcolor: "background.paper" }}>
                    <ListItemText>
                      <x.div display="flex" justifyContent="space-between">
                        <x.div fontSize="sm" pr={12}>
                          {item.label}
                        </x.div>
                        <x.div fontSize="sm">{item.value}</x.div>
                      </x.div>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>

          <Box sx={{ marginLeft: "4rem" }}>
            <List sx={{ p: 0 }}>
              {tickerSummaryItems2.map((item) => (
                <>
                  <ListItem sx={{ bgcolor: "background.paper" }}>
                    <ListItemText>
                      <x.div display="flex" justifyContent="space-between">
                        <x.div fontSize="sm" pr={12}>
                          {item.label}
                        </x.div>
                        <x.div fontSize="sm">{item.value}</x.div>
                      </x.div>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </x.div>
      </x.div>
    </x.div>
  );
}
