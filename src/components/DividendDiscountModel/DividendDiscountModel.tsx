import { Box, Divider, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { x } from "@xstyled/styled-components";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimeRange as Range } from "../../models";
import { useGetDividendHistory } from "./useGetDividendHistory";
import { ViewType } from "../../types";
import { useDDMFormula } from "./useDDMFormula";
import { useCalculateDividendFrequency } from "./useCalculateDividendFrequency";
import { WACC } from "../WACC/WACC";
import { useCAPM } from "../../hooks/useCAPM";
import { useFinanceStore } from "../../stores";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { YearToNumberList } from "../YearToNumberList";

interface DividendDiscountModelProps {
  ticker: string;
}

const chartRanges = [Range.OneYear, Range.TwoYears, Range.FiveYears, Range.TenYears, Range.Max];

export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const [viewType, setViewType] = useState(ViewType.Normal);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const { averageAnnualIncrease, compoundedAnnualIncrease, history, filteredHistory } = useGetDividendHistory(
    ticker,
    selectedTimeFrame,
    viewType
  );
  useCalculateDividendFrequency(history);
  const { moduleData, waccData } = useFinanceStore();
  const [dividendGrowthRate, setDividendGrowthRate] = useState<number>();
  const [requiredRateOfReturn, setRequiredRateOfReturn] = useState<number>();
  const [trueValue, setTrueValue] = useState<number>();
  const capmFormula = useCAPM();
  const DDMFormula = useDDMFormula();
  const currentPrice = moduleData.financialData.currentPrice.raw;

  useEffect(() => {
    if (waccData?.beta) {
      console.log(`CAPM ${capmFormula(waccData.beta)}`);
      setRequiredRateOfReturn(capmFormula(waccData.beta));
    }
  }, [waccData]);

  useEffect(() => {
    if (averageAnnualIncrease && averageAnnualIncrease[5]) {
      setDividendGrowthRate(+(averageAnnualIncrease[5] / 100).toFixed(3));
    }
  }, [averageAnnualIncrease]);

  const onBlur = () => {
    const last4Dividends = filteredHistory.slice(filteredHistory.length - 5, filteredHistory.length - 1);
    const total = last4Dividends.reduce((acc, div) => acc + div.amount, 0);
    setTrueValue(DDMFormula(total, dividendGrowthRate, requiredRateOfReturn));
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
          <WACC
            onBlur={onBlur}
            g={dividendGrowthRate}
            r={requiredRateOfReturn}
            setG={setDividendGrowthRate}
            setR={setRequiredRateOfReturn}
          />
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
                  {trueValue && currentPrice && (
                    <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                      <ListItemText>
                        <x.span mr={16}>Difference</x.span>
                        <x.span float="right">{(((trueValue - currentPrice) / trueValue) * 100).toFixed(2)}%</x.span>
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
