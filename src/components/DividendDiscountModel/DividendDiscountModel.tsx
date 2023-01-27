import { Box, Divider, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";
import { PriceChartTimeRange as Range } from "../../models";
import { useGetDividendHistory } from "./useGetDividendHistory";
import { ViewType } from "../../types";

interface DividendDiscountModelProps {
  ticker: string;
}

export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const [viewType, setViewType] = useState(ViewType.Normal);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const { averageAnnualIncrease, compoundedAnnualIncrease, filteredHistory } = useGetDividendHistory(
    ticker,
    selectedTimeFrame,
    viewType
  );

  const isActive = (range: Range) => selectedTimeFrame === range;

  return (
    <>
      <x.div mb={12}>
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
      <x.div mb={8}>
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
        <PriceChartTimePeriod isActive={isActive} range={Range.Max} onClick={(range) => setSelectedTimeFrame(range)} />
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
