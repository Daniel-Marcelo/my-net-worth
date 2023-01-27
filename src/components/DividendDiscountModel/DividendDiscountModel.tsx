import { Box, Divider, List, ListItem, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import format from "date-fns/format";
import { x } from "@xstyled/styled-components";
import subYears from "date-fns/subYears";
import range from "lodash/range";
import pluralize from "pluralize";
import { useFinance } from "../../services";
import { YFDividendHistory } from "../../types/yahoo-finance";
import { Example } from "../DividendHistoryChart";
import { PriceChartTimePeriod } from "../PriceChartTimePeriod";
import { PriceChartTimeRange as Range } from "../../models";
import reverse from 'lodash/reverse';
import sum from 'lodash/sum'
interface DividendDiscountModelProps {
  ticker: string;
}

type Year = '1' | '3' | '5' | '8' | '10' | '15' | '20';
type YearToNumber = {
  [key in Year]: number;
}
const enum ViewType {
  Normal = "normal",
  Yearly = "yearly",
}
const yearsAgo = [1, 3, 5, 8, 10, 15, 20];
const currentYear = new Date().getFullYear();

const map = new Map([
  [Range.OneYear, 1],
  [Range.TwoYears, 2],
  [Range.FiveYears, 5],
  [Range.TenYears, 10],
  [Range.Max, 100],
]);

export function DividendDiscountModel({ ticker }: DividendDiscountModelProps) {
  const finance = useFinance();
  const [history, setHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(Range.FiveYears);
  const [viewType, setViewType] = useState(ViewType.Normal);
  const [yearsToDividends, setYearsToDividends] = useState({} as YearToNumber);
  const [dividendYearCagr, setDividendYearCagr] = useState({} as YearToNumber);
  const [compoundedYearDividends, setCompoundedYearDividends] = useState({} as YearToNumber)
  const [yearlyHistory, setYearlyHistory] = useState<YFDividendHistory.HistoryList[]>([]);
  const getHistory = useCallback(async () => {
    const data = await finance.getDividendHistory(ticker);
    const freshHistory = Object.entries(data).map(([key, value]) => {
      const t = new Date(1970, 0, 1);
      t.setSeconds(+key);
      return {
        date: t,
        dateString: format(t, "MMM yyyy"),
        amount: value.amount,
      };
    });
    setHistory(freshHistory);
  }, [ticker]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const generateFilteredHistory = (range = selectedTimeFrame, updatedViewType = viewType) => {
    const limit = subYears(new Date(), map.get(range));
    if (updatedViewType === ViewType.Normal) {
      setFilteredHistory(history.filter((historyItem) => historyItem.date > limit));
    } else {
      setFilteredHistoryBasedOnYear(range);
    }
  };

  const generateYearlyDividends = (yearsToDividends: YearToNumber) => {
    const updatedFilteredHistory = Object.entries(yearsToDividends).map(
      ([key, value]) =>
      ({
        dateString: key,
        amount: +value.toFixed(3),
      } as YFDividendHistory.HistoryList)
    );

    setYearlyHistory(updatedFilteredHistory);
  };

  const generateCagrs = (divs: YearToNumber) => {
    const data = Object.entries(divs)
      .map(([key, value], index) => {
        if (index !== Object.entries(divs).length - 1) {
          const currentDiv = value;
          const nextDiv = Object.entries(divs)[index + 1][1];
          return +(((nextDiv - currentDiv) / currentDiv) * 100).toFixed(3);
        }
      })
      .filter((i) => !!i);
    reverse(data)
    const divCagr = yearsAgo.reduce((acc, ago) => {
      const yearlyDivs = data.slice(0, ago);
      return {
        ...acc,
        [ago]: +(sum(yearlyDivs) / ago).toFixed(2)
      }
    }, {} as YearToNumber)
    setDividendYearCagr(divCagr)
  };

  useEffect(() => {
    generateFilteredHistory();
    const yearsToDividends = calcYearsToDividends();
    console.log(yearsToDividends);

    let mostRecentYear = yearsToDividends[currentYear] ? currentYear : currentYear - 1;
    let mostRecentDividend = yearsToDividends[mostRecentYear];

    const compoundedDivDiff = yearsAgo.reduce((acc, ago) => {
      console.log(ago);
      const value = (((mostRecentDividend - yearsToDividends[mostRecentYear - ago]) / yearsToDividends[mostRecentYear - ago]) * 100).toFixed(2);
      return {
        ...acc,
        [ago]: value
      }
    }, {} as YearToNumber);
    console.log(compoundedDivDiff)
    console.log(mostRecentYear)
    setCompoundedYearDividends(compoundedDivDiff)
    setYearsToDividends(yearsToDividends);
    generateYearlyDividends(yearsToDividends);
    generateCagrs(yearsToDividends);
  }, [history]);

  const onClick = async (range: Range) => {
    setSelectedTimeFrame(range);
    generateFilteredHistory(range);
  };

  const isActive = (range: Range) => selectedTimeFrame === range;

  const calcYearsToDividends = () => {
    const yearsToGoBack = map.get(Range.Max);
    const yearsInRange = range(0, yearsToGoBack + 1).map((count) => currentYear - count);
    const yearToDividends = {} as YearToNumber;
    history.forEach((historyItem) => {
      const year = historyItem.date.getFullYear();
      if (yearsInRange.includes(year)) {
        const currentDividendForYear = yearToDividends[year] || 0;
        yearToDividends[year] = currentDividendForYear + historyItem.amount;
      }
    });
    return yearToDividends;
  };

  const setFilteredHistoryBasedOnYear = (timeframe = selectedTimeFrame) => {
    const minimumYear = new Date().getFullYear() - map.get(timeframe);
    setFilteredHistory([...yearlyHistory.filter((item) => +item.dateString >= minimumYear)]);
  };

  const updateViewType = (newValue?: ViewType) => {
    if (newValue) {
      generateFilteredHistory(selectedTimeFrame, newValue);
      setViewType(newValue);
    }
  };

  return (
    <>
      <x.div mb={12}>
        <ToggleButtonGroup
          color="primary"
          value={viewType}
          exclusive
          onChange={(event, newValue?: ViewType) => updateViewType(newValue)}
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
        <PriceChartTimePeriod isActive={isActive} range={Range.OneYear} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.TwoYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.FiveYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.TenYears} onClick={onClick} />
        <PriceChartTimePeriod isActive={isActive} range={Range.Max} onClick={onClick} />
      </x.div>

      <Example history={filteredHistory} />

<Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: '2rem', marginTop: '2rem' }}>

<Divider variant="middle" />
</Box>

      <x.div display="flex" justifyContent="space-between" w="100%">
        <x.div>
          <Typography textAlign="center" variant="subtitle1" mb={2}>Average Annual Growth</Typography>
          <Box sx={{ bgcolor: "background.paper" }}>
            <List sx={{ p: 0 }}>
              {Object.entries(dividendYearCagr).map(([key, value]) => (
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
          <Typography textAlign="center" variant="subtitle1" mb={2}>Compounded Dividends</Typography>
          <Box sx={{ bgcolor: "background.paper" }}>
            <List sx={{ p: 0, borderRadius: 8 }} >
              {Object.entries(compoundedYearDividends).map(([key, value]) => (
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
