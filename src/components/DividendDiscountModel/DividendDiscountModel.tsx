import { Box, Divider, List, ListItem, ListItemText, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimeRange as Range } from "../../models";
import { ViewType, YearToNumber } from "../../types";
import { useDDMFormula } from "./useDDMFormula";
import { PriceChartToolbar } from "../PriceChartToolbar";
import { LabelValueList } from "../LabelValueList";
import {
  useCalculateAverageAnnualDividendIncrease,
  useCalculateCompoundedAnnualDividendIncrease,
  useCalculateFilteredDividendHistory,
  useDividendGrowthRate,
} from "../../hooks";
import { useGetHistoryQuery } from "../../hooks/useGetHistoryQuery";
import { useLoadFinanceModules } from "../../hooks/useLoadFinanceModules";

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

  const { getModuleData } = useLoadFinanceModules();
  const moduleData = getModuleData();
  const [requiredRateOfReturn, setRequiredRateOfReturn] = useState<number>(0.08);
  const [marginOfSafety, setMarginOfSafety] = useState<number>(0.1);
  const DDMFormula = useDDMFormula();

  const currentPrice = moduleData?.financialData?.currentPrice?.raw;
  const last4DividendsTotal = history
    .slice(history.length - 5, history.length - 1)
    .reduce((acc, div) => acc + div.amount, 0);

  const createYearToNumberLabelValueList = (yearToNumber: YearToNumber) =>
    Object.entries(yearToNumber).map(([key, value]) => ({
      label: `${key} ${pluralize("Year", +key)}`,
      value: `${value}%`,
    }));

  const getDifferenceColor = (diff: number) => {
    if (diff === 0) {
      return "black";
    }
    return diff > 0 ? "green" : "red";
  };

  // eslint-disable-next-line arrow-body-style
  const getFontWeight = (diff: number) => {
    return diff === 0 ? "normal" : "semibold";
  };

  const trueValue = currentPrice && DDMFormula(last4DividendsTotal, dividendGrowthRate, requiredRateOfReturn);
  const difference = currentPrice && ((trueValue - currentPrice) / trueValue) * 100;
  const differenceMos =
    currentPrice && ((trueValue * (1 - marginOfSafety) - currentPrice) / (trueValue * (1 - marginOfSafety))) * 100;

  return (
    <>
      <x.div display="flex">
        <x.div>
          <x.div display="flex" justifyContent="center" mb={4}>
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
        </x.div>

        <x.div display="flex" flex={1} gap={4} justifyContent="center">
          <LabelValueList
            title="Average Annual Dividend Growth"
            list={createYearToNumberLabelValueList(averageAnnualIncrease)}
            cardProps={{ flex: 1 }}
          />
          <LabelValueList
            title="Compounded Dividend Growth"
            list={createYearToNumberLabelValueList(compoundedAnnualIncrease)}
            cardProps={{ flex: 1 }}
          />

          <x.span flex={1}>
            {!Number.isNaN(dividendGrowthRate) && (
              <TextField
                sx={{ marginBottom: 4 }}
                label="Predicted average annual dividend growth rate"
                value={dividendGrowthRate}
                type="number"
                onChange={(e) => {
                  setDividendGrowthRate(+e.target.value);
                }}
              />
            )}
            <TextField
              sx={{ marginBottom: 4 }}
              label="Required rate of return"
              value={requiredRateOfReturn}
              type="number"
              onChange={(e) => {
                setRequiredRateOfReturn(+e.target.value);
              }}
            />
            <TextField
              sx={{ marginBottom: 4 }}
              label="Margin of safety"
              value={marginOfSafety}
              type="number"
              onChange={(e) => {
                setMarginOfSafety(+e.target.value);
              }}
            />
          </x.span>
        </x.div>
      </x.div>

      <Box sx={{ width: "100%", bgcolor: "background.paper", marginBottom: 4, marginTop: 4 }}>
        <Divider variant="middle" />
      </Box>
      <x.div display="flex" justifyContent="space-between" w="100%">
        <x.div display="flex" flexDirection="column">
          <Box>
            <List sx={{ p: 0, borderRadius: 8, display: "flex", gap: 4 }}>
              <ListItem sx={{ bgcolor: "background.paper" }}>
                <ListItemText>
                  <x.span mr={16}>Current price</x.span>
                  <x.span float="right">{moduleData.financialData.currentPrice.fmt}</x.span>
                </ListItemText>
              </ListItem>
              {trueValue && (
                <>
                  <ListItem sx={{ bgcolor: "background.paper" }}>
                    <ListItemText>
                      <x.span mr={16}>True Value</x.span>
                      <x.span float="right">{trueValue.toFixed(2)}</x.span>
                    </ListItemText>
                  </ListItem>
                  {currentPrice && (
                    <ListItem sx={{ bgcolor: "background.paper" }}>
                      <ListItemText>
                        <x.span mr={16}>Difference</x.span>
                        <x.span
                          float="right"
                          fontWeight={getFontWeight(difference)}
                          color={getDifferenceColor(difference)}
                        >
                          {difference.toFixed(2)}%
                        </x.span>
                      </ListItemText>
                    </ListItem>
                  )}
                  <ListItem sx={{ bgcolor: "background.paper" }}>
                    <ListItemText>
                      <x.span mr={16}>True Value (M.o.S)</x.span>
                      <x.span float="right">{(trueValue * (1 - marginOfSafety)).toFixed(2)}</x.span>
                    </ListItemText>
                  </ListItem>
                  {currentPrice && (
                    <ListItem sx={{ bgcolor: "background.paper" }}>
                      <ListItemText>
                        <x.span mr={16}>Difference (M.o.S)</x.span>
                        <x.span
                          float="right"
                          fontWeight={getFontWeight(differenceMos)}
                          color={getDifferenceColor(differenceMos)}
                        >
                          {differenceMos.toFixed(2)}%
                        </x.span>
                      </ListItemText>
                    </ListItem>
                  )}
                </>
              )}
            </List>
          </Box>
        </x.div>
      </x.div>
    </>
  );
}
