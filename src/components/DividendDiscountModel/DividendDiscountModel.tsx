import { Box, Divider, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
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
  const [priceDifference, setPriceDifference] = useState<number>();
  const capmFormula = useCAPM();
  const DDMFormula = useDDMFormula();

  useEffect(() => {
    if (waccData?.beta) {
      console.log(`CAPM ${capmFormula(waccData.beta)}`);
      setRequiredRateOfReturn(capmFormula(waccData.beta));
    }
  }, [waccData]);

  useEffect(() => {
    if (trueValue) {
      const currentPrice = moduleData.financialData.currentPrice.raw;
      setPriceDifference(((trueValue - currentPrice) / trueValue) * 100);
    }
  }, [trueValue]);

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
        <x.div mr={16}>
          <ToggleButtonGroup
            color="primary"
            value={viewType}
            exclusive
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
        </x.div>
        <PriceChartToolbar
          ranges={chartRanges}
          selectedTimeFrame={selectedTimeFrame}
          onClick={(range) => setSelectedTimeFrame(range)}
        />
      </x.div>
      <Example history={filteredHistory} />

      <Box sx={{ width: "100%", bgcolor: "background.paper", marginBottom: "2rem", marginTop: "2rem" }}>
        <Divider variant="middle" />
      </Box>

      <x.div display="flex" justifyContent="space-between" w="100%">
        <x.div>
          <Typography textAlign="center" variant="subtitle1" mb={2}>
            Average Annual Growth
          </Typography>
          <Box sx={{ bgcolor: "background.paper" }}>
            <List sx={{ p: 0 }}>
              {Object.entries(averageAnnualIncrease).map(([key, value]) => (
                <>
                  <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                    <ListItemText>
                      <x.span mr={16}>{`${key} ${pluralize("Year", +key)}`}</x.span>
                      <x.span float="right">{value}%</x.span>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </x.div>

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
                  {priceDifference && (
                    <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                      <ListItemText>
                        <x.span mr={16}>Difference</x.span>
                        <x.span float="right">{priceDifference.toFixed(2)}%</x.span>
                      </ListItemText>
                    </ListItem>
                  )}
                </>
              )}
            </List>
          </Box>
        </x.div>
        <x.div>
          <Typography textAlign="center" variant="subtitle1" mb={2}>
            Compounded Dividends
          </Typography>
          <Box sx={{ bgcolor: "background.paper" }}>
            <List sx={{ p: 0, borderRadius: 8 }}>
              {Object.entries(compoundedAnnualIncrease).map(([key, value]) => (
                <>
                  <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                    <ListItemText>
                      <x.span mr={16}>{`${key} ${pluralize("Year", +key)}`}</x.span>
                      <x.span float="right">{value}%</x.span>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
            </List>
          </Box>
        </x.div>
      </x.div>
    </>
  );
}
