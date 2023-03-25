import { x } from "@xstyled/styled-components";
import { ReactNode, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TickerSearch } from "../../components/TickerSearch/TickerSearch";
import { DividendDiscountModel } from "../../components/DividendDiscountModel";
import { useLoadFinanceModules } from "../../hooks/useLoadFinanceModules";
import { TickerSummaryTab } from "../../components/TickerSummaryTab";
import { useQuoteStore } from "../../stores/quote.store";
import { useGetRiskFreeRate } from "../../hooks";
import { MultiplesTab } from "../../components/MultiplesTab";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: ReactNode;
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
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function QuotePage() {
  const [value, setValue] = useState(0);
  const { selectedQuote, setSelectedQuote } = useQuoteStore();
  useLoadFinanceModules(selectedQuote?.ticker);
  useGetRiskFreeRate();

  return (
    <x.div p={8}>
      <TickerSearch setSelectedQuote={setSelectedQuote} selectedQuote={selectedQuote} />
      {selectedQuote?.ticker && (
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="basic tabs example">
              <Tab label="Chart" {...a11yProps(0)} />
              <Tab label="DDM" {...a11yProps(1)} />
              <Tab label="Multiples" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <x.div display="flex" flexDirection="column" flex="1" mt={8}>
              {selectedQuote?.ticker && <TickerSummaryTab ticker={selectedQuote.ticker} />}
            </x.div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <x.div display="flex" flexDirection="column" flex="1" mt={4}>
              <DividendDiscountModel ticker={selectedQuote.ticker} />
            </x.div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <x.div display="flex" flexDirection="column" flex="1" mt={4}>
              <MultiplesTab ticker={selectedQuote.ticker} />
            </x.div>
          </TabPanel>
        </Box>
      )}
    </x.div>
  );
}
