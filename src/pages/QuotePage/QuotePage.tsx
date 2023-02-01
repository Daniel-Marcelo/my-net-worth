import { x } from "@xstyled/styled-components";
import { useState } from "react";
import { Box, Divider, List, ListItem, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import { TickerSearch } from "../../components/TickerSearch/TickerSearch";
import { Quote } from "../../models";
import { DividendDiscountModel } from "../../components/DividendDiscountModel";
import { useLoadFinanceModules } from "../../hooks/useLoadFinanceModules";
import { TickerSummaryTab } from "../../components/TickerSummaryTab";
import { useFinanceStore } from "../../stores/finance.store";
import {PriceRangeBar} from "../../components/PriceRangeBar";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
  useLoadFinanceModules(selectedQuote?.ticker);
  const { tickerSummaryItems } = useFinanceStore(state => state)

  return (
    <x.div p={8}>
      <TickerSearch setSelectedQuote={setSelectedQuote} selectedQuote={selectedQuote} />
      {selectedQuote && (
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={(e, value) => setValue(value)} aria-label="basic tabs example">
              <Tab label="Chart" {...a11yProps(0)} />
              <Tab label="DDM" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
              {selectedQuote?.ticker && <TickerSummaryTab ticker={selectedQuote.ticker} />}
              <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                <List sx={{ p: 0 }}>
                  {tickerSummaryItems.map(item =>
                    <>
                      <ListItem>
                        <ListItemText>
                          <x.div display="flex" justifyContent="space-between">
                            <x.span>{item.label}</x.span>
                            <x.span>{item.value}</x.span>
                          </x.div>
                        </ListItemText>
                      </ListItem>
                      <Divider />
                    </>

                  )}
                </List>
              </Box>

              <PriceRangeBar />
            </x.div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={4}>
              <DividendDiscountModel ticker={selectedQuote.ticker} />
            </x.div>
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
