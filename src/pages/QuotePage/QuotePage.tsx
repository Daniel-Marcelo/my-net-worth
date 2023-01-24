import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";
import { Box, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { PriceChartToolbar } from "../../components/PriceChartToolbar";
import { TickerSearch } from "../../components/TickerSearch/TickerSearch";
import { PriceChart } from "../../components/PriceChart/PriceChart";
import { useFinance } from "../../services";
import { PriceChartInterval, PriceChartTimeRange, Quote } from "../../models";
import { useChartData } from "./useChartData";
import { DividendDiscountModel } from "../../components/DividendDiscountModel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export function QuotePage() {
  const [value, setValue] = useState(0);
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useChartData();
  const finance = useFinance();

  const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
    setSelectedTimeFrame(range);
    if (selectedQuote?.ticker) {
      const result = await finance.getPriceHistory(selectedQuote.ticker, range, interval);
      setChartData(result);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  useEffect(() => {
    if (selectedQuote) {
      fetchHistory();
    }
  }, [selectedQuote]);

  return (
    <x.div p={8}>
      <TickerSearch setSelectedQuote={setSelectedQuote} selectedQuote={selectedQuote} />

      {selectedQuote && (
        <Box sx={{ width: '100%', marginTop: '1rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Chart" {...a11yProps(0)} />
              <Tab label="DDM" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
              <x.div mb={8}>
                <PriceChartToolbar selectedTimeFrame={selectedTimeframe} fetchHistory={fetchHistory} />
              </x.div>
              {chartData.length ? <PriceChart selectedTicker={selectedQuote.ticker} chartData={chartData} /> : ""}
            </x.div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DividendDiscountModel ticker={selectedQuote.ticker}/>
          </TabPanel>
        </Box>
      )}

      {/* <Typography variant="subtitle1">Dividend Data</Typography> */}
      {/* <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List sx={{ p: 0 }}>
          <ListItem sx={{ "&:hover": { bgcolor: "red" } }}>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
      </Box> */}
    </x.div>
  );
}
