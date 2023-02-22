import { Box, Divider, List, ListItem, ListItemText, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { x } from "@xstyled/styled-components";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimeRange as Range } from "../../models";
import { ViewType } from "../../types";
import { useDDMFormula } from "./useDDMFormula";
import { useCalculateDividendFrequency } from "./useCalculateDividendFrequency";
import { useFinanceStore } from "../../stores";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { YearToNumberList } from "../YearToNumberList";
import {
  useCalculateAverageAnnualDividendIncrease,
  useCalculateCompoundedAnnualDividendIncrease,
  useCalculateFilteredDividendHistory,
  useDividendGrowthRate,
} from "../../hooks";
import { useGetHistoryQuery } from "../../hooks/useGetHistoryQuery";

interface DividendDiscountModelProps {
  ticker: string;
}

const chartRanges = [Range.OneYear, Range.TwoYears, Range.FiveYears, Range.TenYears, Range.Max];

export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const [viewType, setViewType] = useState(ViewType.Normal);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const history = useGetHistoryQuery(ticker);
  const filteredHistory = useCalculateFilteredDividendHistory(history, viewType, selectedTimeFrame);
  const compoundedAnnualIncrease = useCalculateCompoundedAnnualDividendIncrease(history);
  const averageAnnualIncrease = useCalculateAverageAnnualDividendIncrease(history);
  const [dividendGrowthRate, setDividendGrowthRate] = useDividendGrowthRate(averageAnnualIncrease, 5);

  const { moduleData } = useFinanceStore();
  const [requiredRateOfReturn, setRequiredRateOfReturn] = useState<number>(0.08);
  const [trueValue, setTrueValue] = useState<number>();
  const [marginOfSafety, setMarginOfSafety] = useState<number>(0.1);
  const DDMFormula = useDDMFormula();
  useCalculateDividendFrequency(history);

  const currentPrice = moduleData.financialData.currentPrice.raw;
  const last4DividendsTotal = history
    .slice(history.length - 5, history.length - 1)
    .reduce((acc, div) => acc + div.amount, 0);

  const onChangeDividendGrowthRate = (newGrowthRate: number) => {
    setDividendGrowthRate(newGrowthRate);
    const trueV = DDMFormula(last4DividendsTotal, newGrowthRate, requiredRateOfReturn);
    setTrueValue(trueV);
  };

  const onChangeRequiredRateOfReturn = (newRateOfReturn: number) => {
    setRequiredRateOfReturn(newRateOfReturn);
    const trueV = DDMFormula(last4DividendsTotal, dividendGrowthRate, newRateOfReturn);
    setTrueValue(trueV);
  };

  return (
    <>
      <x.div display="flex" alignItems="center" mb={12}>
        <ToggleButtonGroup
          color="primary"
          value={viewType}
          exclusive
          sx={{ marginRight: 4 }}
          onChange={(event, newValue?: ViewType) => newValue && setViewType(newValue)}
          aria-label="Platform"
        >
          <ToggleButton value="normal" sx={{ background: "white" }}>
            Standard
          </ToggleButton>
          <ToggleButton value="yearly" sx={{ background: "white" }}>
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
        <PriceChartToolbar
          ranges={chartRanges}
          selectedTimeFrame={selectedTimeFrame}
          onClick={(range) => setSelectedTimeFrame(range)}
        />
      </x.div>
      <Example history={filteredHistory} />
      <Box sx={{ width: "100%", bgcolor: "background.paper", marginBottom: 8, marginTop: 8 }}>
        <Divider variant="middle" />
      </Box>
      <x.div display="flex" justifyContent="space-between" w="100%">
        <YearToNumberList title="Average Annual Growth" yearToNumber={averageAnnualIncrease} />
        <x.div display="flex" flexDirection="column">
          <x.div display="flex" flexDirection="column" position="relative">
            <x.div mb={4}>
              <TextField
                label="Predicted average annual dividend growth rate"
                value={dividendGrowthRate}
                type="number"
                onChange={(e) => {
                  onChangeDividendGrowthRate(+e.target.value);
                }}
              />
            </x.div>

            <x.div mb={4}>
              <TextField
                label="Required rate of return"
                value={requiredRateOfReturn}
                type="number"
                onChange={(e) => {
                  onChangeRequiredRateOfReturn(+e.target.value);
                }}
              />
            </x.div>
            <x.div mb={4}>
              <TextField
                label="Margin of safety"
                value={marginOfSafety}
                type="number"
                onChange={(e) => {
                  setMarginOfSafety(+e.target.value);
                }}
              />
            </x.div>
          </x.div>
          <Box sx={{ bgcolor: "background.paper" }}>
            <List sx={{ p: 0, borderRadius: 8 }}>
              <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                <ListItemText>
                  <x.span mr={16}>Current price</x.span>
                  <x.span float="right">{moduleData.financialData.currentPrice.fmt}</x.span>
                </ListItemText>
              </ListItem>
              {trueValue && (
                <>
                  <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                    <ListItemText>
                      <x.span mr={16}>True Value</x.span>
                      <x.span float="right">{trueValue.toFixed(2)}</x.span>
                    </ListItemText>
                  </ListItem>
                  {currentPrice && (
                    <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                      <ListItemText>
                        <x.span mr={16}>Difference</x.span>
                        <x.span float="right">{(((trueValue - currentPrice) / trueValue) * 100).toFixed(2)}%</x.span>
                      </ListItemText>
                    </ListItem>
                  )}
                  <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                    <ListItemText>
                      <x.span mr={16}>True Value (M.o.S)</x.span>
                      <x.span float="right">{(trueValue * (1 - marginOfSafety)).toFixed(2)}</x.span>
                    </ListItemText>
                  </ListItem>
                  {currentPrice && (
                    <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                      <ListItemText>
                        <x.span mr={16}>Difference (M.o.S)</x.span>
                        <x.span float="right">
                          {(
                            ((trueValue * (1 - marginOfSafety) - currentPrice) / (trueValue * (1 - marginOfSafety))) *
                            100
                          ).toFixed(2)}
                          %
                        </x.span>
                      </ListItemText>
                    </ListItem>
                  )}
                </>
              )}
            </List>
          </Box>
        </x.div>
        <YearToNumberList title="Compounded Dividends" yearToNumber={compoundedAnnualIncrease} />
      </x.div>
    </>
  );
}
