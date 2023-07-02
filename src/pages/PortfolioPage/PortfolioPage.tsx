import { ReactNode, useEffect, useRef, useState } from "react";
import { x } from "@xstyled/styled-components";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { TickerSearch } from "../../components/TickerSearch";
import { financeApi, usePortfolioEntryService } from "../../services";
import { FormDialog } from "../../components/AddTickerDialog";
import { GroupedPortfolioEntry, PortfolioEntry, Quote } from "../../models";
import { UpdatesDrawer } from "../../components/UpdatesDrawer";
import { useGetEntriesByPortfolioId, usePortfolioIdFromUrl } from "../../hooks";
import { PortfolioEntryCard } from "../../components/PortfolioEntryCard";
import { useGroupedEntries } from "./useGroupedEntries";
import { PortfolioSummary } from "../../components/PortfolioSummary/PortfolioSummary";
import { useGetTickerPrices } from "./useGetTickerPrices";
import { TickerHistoryDialog } from "../../components/TickerHistoryDialog";
import { DeletePortfolioEntryDialog } from "../../components/DeletePortfolioEntryDialog";
import { DividendCalendarTab } from "../../components/DividendCalendarTab";
import { useQuoteStore } from "../../stores";

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

export function PortfolioPage() {
  const id = usePortfolioIdFromUrl();
  const { quote, setQuote } = useQuoteStore();
  const portfolioEntryService = usePortfolioEntryService();
  const getEntriesByPortfolioIdQuery = useGetEntriesByPortfolioId();
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [deleteEntryOpen, setDeleteEntryOpen] = useState(false);
  const groupedEntries = useGroupedEntries();
  const tickerToPriceMap = useGetTickerPrices(groupedEntries);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [selectedGroupEntry, setSelectedGroupEntry] = useState<GroupedPortfolioEntry>();
  const [value, setValue] = useState(0);

  const onAdd = async (numberOfShares: number) => {
    const summaryProfile = await financeApi.getSummaryProfile(quote.ticker);
    const portfolioEntry = {
      ticker: quote.ticker,
      name: quote.name,
      portfolioId: `${id}`,
      createdAt: new Date().toISOString(),
      numberOfShares,
      website: summaryProfile.website,
    } as PortfolioEntry;
    await portfolioEntryService.create(portfolioEntry);
    getEntriesByPortfolioIdQuery.refetch();
  };
  const onUpdatesDrawerClose = async () => {
    setUpdatesOpen(false);
    getEntriesByPortfolioIdQuery.refetch();
  };

  const onClickCard = (ticker: string) => {
    setSelectedTicker(ticker);
  };

  const onClickConfirmDelete = async () => {
    await portfolioEntryService.delete2(...selectedGroupEntry.ids);
  };

  return (
    <x.div p={8}>
      {selectedGroupEntry && (
        <DeletePortfolioEntryDialog
          onClickConfirmDelete={onClickConfirmDelete}
          open={deleteEntryOpen}
          closeDialog={() => setDeleteEntryOpen(false)}
          ticker={selectedGroupEntry.ticker}
        />
      )}
      <TickerHistoryDialog
        ticker={selectedTicker}
        portfolioEntries={getEntriesByPortfolioIdQuery?.data || []}
        open={!!selectedTicker}
        closeDialog={() => setSelectedTicker("")}
      />
      <PortfolioSummary tickerToPriceMap={tickerToPriceMap} groupedEntries={groupedEntries} />
      <x.div mb={4} textAlign="center">
        Select a ticker to add to this portfolio
      </x.div>
      <TickerSearch setSelectedQuote={setQuote} selectedQuote={quote} />
      <x.div mt={4} display="flex" justifyContent="end">
        <Button variant="contained" onClick={() => setUpdatesOpen(true)}>
          Updates
        </Button>
      </x.div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="basic tabs example">
          <Tab label="Entries" {...a11yProps(0)} />
          <Tab label="Dividend Calendar" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <x.div mt={4}>
          {groupedEntries.map((portfolioEntry) => (
            <PortfolioEntryCard
              onClickDelete={() => {
                setSelectedGroupEntry(portfolioEntry);
                setDeleteEntryOpen(true);
              }}
              onClickCard={onClickCard}
              tickerToPriceMap={tickerToPriceMap}
              portfolioEntry={portfolioEntry}
            />
          ))}
        </x.div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DividendCalendarTab groupedEntries={groupedEntries} />
      </TabPanel>
      <UpdatesDrawer
        portfolioEntries={getEntriesByPortfolioIdQuery?.data || []}
        open={updatesOpen}
        onClose={onUpdatesDrawerClose}
      />
      <FormDialog onAdd={onAdd} />
    </x.div>
  );
}
