import { Box, Divider, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";
import { PriceChartTimeRange as Range } from "../../models";
import { useGetDividendHistory } from "./useGetDividendHistory";
import { ViewType } from "../../types";
import { useDDMFormula } from "./useDDMFormula";
import { useCalculateDividendFrequency } from "./useCalculateDividendFrequency";
import { useWACC } from "../../hooks/useWACC";
import { WACC } from "../WACC/WACC";
import { useCAPM } from "../../hooks/useCAPM";
import { useFinanceStore } from "../../stores";

interface DividendDiscountModelProps {
  ticker: string;
}

export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const [viewType, setViewType] = useState(ViewType.Normal);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const { averageAnnualIncrease, compoundedAnnualIncrease, history, filteredHistory } = useGetDividendHistory(
    ticker,
    selectedTimeFrame,
    viewType
  );
  useCalculateDividendFrequency(history);
  const waccFormula = useWACC();
  const { moduleData, waccData } = useFinanceStore();
  const wacc = waccFormula();
  const [g, setG] = useState<number>();
  const [r, setR] = useState<number>();
  const [trueValue, setTrueValue] = useState<number>();
  const [priceDifference, setPriceDifference] = useState<number>();
  const capmFormula = useCAPM();

  const currentPrice = moduleData.financialData.currentPrice.raw;
  // useEffect(() => {
  //   if (wacc) {
  //     setR(+wacc.toFixed(2))
  //   }
  // }, [wacc]);

  useEffect(() => {
    if (waccData?.beta) {
      console.log(`CAPM ${capmFormula(waccData.beta)}`);
      setR(capmFormula(waccData.beta));
    }
  }, [waccData]);

  useEffect(() => {
    if (trueValue) {
      setPriceDifference(((trueValue - currentPrice) / trueValue) * 100);
    }
  }, [trueValue]);

  // if(waccData?.beta) {
  //   console.log('WithCAPM as R');

  // }

  useEffect(() => {
    if (averageAnnualIncrease && averageAnnualIncrease[5]) {
      setG(+((averageAnnualIncrease[5] / 100) * 0.66).toFixed(3));
    }
  }, [averageAnnualIncrease]);

  console.log(`Wacc ${wacc}`);
  const formula = useDDMFormula();

  const onBlur = () => {
    const last4Dividends = filteredHistory.slice(filteredHistory.length - 5, filteredHistory.length - 1);
    const total = last4Dividends.reduce((acc, div) => acc + div.amount, 0);

    console.log(`**************DDM PRICE ${formula(total, g, r)}`);

    setTrueValue(formula(total, g, r));
  };

  // useEffect(() => {
  //   // console.log(averageAnnualIncrease)
  //   const averageDividendGrowthRateLast10Years = averageAnnualIncrease && averageAnnualIncrease[10];
  //   if (ticker && averageDividendGrowthRateLast10Years) {
  //     console.log('averageDividendGrowthRateLast10Years ' +averageDividendGrowthRateLast10Years);
  //     const last4Dividends = filteredHistory.slice(filteredHistory.length - 5, filteredHistory.length - 1);
  //     console.log('last4Dividends '+last4Dividends)
  //     const total = last4Dividends.reduce((acc, div) => acc + div.amount, 0);
  //     console.log('total last 4 dividends ' +total);

  //     console.log('averageDividendGrowthRateLast10Years ' + (averageDividendGrowthRateLast10Years) / 100);
  //     console.log('**************DDM PRICE '+formula(total,  averageDividendGrowthRateLast10Years/100, wacc));
  //     console.log(' ')
  //   }
  // }, [ticker, averageAnnualIncrease]);

  const isActive = (range: Range) => selectedTimeFrame === range;

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
        <x.div>
          <PriceChartTimePeriod
            isActive={isActive}
            range={Range.OneYear}
            onClick={(range) => setSelectedTimeFrame(range)}
          />
          <PriceChartTimePeriod
            isActive={isActive}
            range={Range.TwoYears}
            onClick={(range) => setSelectedTimeFrame(range)}
          />
          <PriceChartTimePeriod
            isActive={isActive}
            range={Range.FiveYears}
            onClick={(range) => setSelectedTimeFrame(range)}
          />
          <PriceChartTimePeriod
            isActive={isActive}
            range={Range.TenYears}
            onClick={(range) => setSelectedTimeFrame(range)}
          />
          <PriceChartTimePeriod
            isActive={isActive}
            range={Range.Max}
            onClick={(range) => setSelectedTimeFrame(range)}
          />
        </x.div>
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
          <WACC onBlur={onBlur} g={g} r={r} setG={setG} setR={setR} />
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
