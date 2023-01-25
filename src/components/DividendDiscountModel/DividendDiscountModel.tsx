import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import format from "date-fns/format";
import { x } from "@xstyled/styled-components";
import subYears from "date-fns/subYears";
import { useFinance } from "../../services";
import { YFDividendHistory } from "../../types/yahoo-finance";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";
import { PriceChartTimeRange as Range } from "../../models";

interface DividendDiscountModelProps {
  ticker: string;
}
export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const finance = useFinance();
  const [history, setHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const getHistory = useCallback(async () => {
    const data = await finance.getDividendHistory(ticker);
    setHistory(
      Object.entries(data).map(([key, value]) => {
        const t = new Date(1970, 0, 1);
        t.setSeconds(+key);
        return {
          date: t,
          dateString: format(t, "MMM yyyy"),
          amount: value.amount,
        };
      })
    );
  }, [ticker]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const map = new Map([
    [Range.OneYear, 1],
    [Range.TwoYears, 2],
    [Range.FiveYears, 5],
    [Range.TenYears, 10],
    [Range.Max, 40],
  ]);

  useEffect(() => {
    const limit = subYears(new Date(), map.get(selectedTimeFrame));
    setFilteredHistory(history.filter((historyItem) => historyItem.date > limit));
  }, [history]);

  const onClick = async (range: Range) => {
    setSelectedTimeFrame(range);
    const limit = subYears(new Date(), map.get(range));
    console.log(limit);
    console.log(history.filter((historyItem) => historyItem.date > limit));
    setFilteredHistory(history.filter((historyItem) => historyItem.date > limit));
  };

  const isActive = (range: Range) => selectedTimeFrame === range;

  return (
    <>
      <x.div mb={8}>
        <PriceChartTimePeriod isActive={isActive} range={Range.OneYear} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.TwoYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.FiveYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.TenYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.Max} onClick={onClick} />
      </x.div>

      <Example history={filteredHistory} />
      {/* <Typography variant="subtitle1">Dividend Data</Typography> */}
      {/* <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <>
                    <List sx={{ p: 0 }}>
                        {Object.entries(history).map(([key, value]) =>
                            <>
                                <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                                    <ListItemText>
                                        <x.span>
                                            {calc(+key)}
                                        </x.span>
                                        <x.span float="right">
                                            {value.amount}
                                        </x.span></ListItemText>
                                </ListItem>

                                <Divider />
                            </>

                        )}
                    </List>
                </>
            </Box> */}
    </>
  );
}
