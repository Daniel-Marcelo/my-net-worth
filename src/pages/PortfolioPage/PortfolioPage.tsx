import { useRef, useState } from "react";
import { x } from "@xstyled/styled-components";
import { Button } from "@mui/material";
import { TickerSearch } from "../../components/TickerSearch";
import { useFinance, usePortfolioEntryService } from "../../services";
import { FormDialog } from "../../components/AddTickerDialog";
import { PortfolioEntry, Quote } from "../../models";
import { UpdatesDrawer } from "../../components/UpdatesDrawer";
import { useGetEntriesByPortfolioId, usePortfolioIdFromUrl } from "../../hooks";
import { PortfolioEntryCard } from "../../components/PortfolioEntryCard";
import { useGroupedEntries } from "./useGroupedEntries";
import { PortfolioSummary } from "../../components/PortfolioSummary/PortfolioSummary";
import { useGetTickerPrices } from "./useGetTickerPrices";
import { TickerHistoryDialog } from "../../components/TickerHistoryDialog";

export function PortfolioPage() {
  const ref = useRef();
  const id = usePortfolioIdFromUrl();
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const portfolioEntryService = usePortfolioEntryService();
  const financeService = useFinance();
  const [portfolioEntries, getPortfolioEntries] = useGetEntriesByPortfolioId();
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const groupedEntries = useGroupedEntries(portfolioEntries);
  const tickerToPriceMap = useGetTickerPrices(groupedEntries);
  const [selectedTicker, setSelectedTicker] = useState("");

  const onAdd = async (numberOfShares: number) => {
    const summaryProfile = await financeService.getSummaryProfile(selectedQuote.ticker);
    const portfolioEntry = {
      ticker: selectedQuote.ticker,
      name: selectedQuote.name,
      portfolioId: `${id}`,
      createdAt: new Date().toISOString(),
      numberOfShares,
      website: summaryProfile.website,
    } as PortfolioEntry;
    await portfolioEntryService.create(portfolioEntry);
    await getPortfolioEntries();
    setSelectedQuote(undefined);
  };

  const onUpdatesDrawerClose = async () => {
    setUpdatesOpen(false);
    await getPortfolioEntries();
  };

  const onClickCard = (ticker: string) => {
    setSelectedTicker(ticker);
  };

  return (
    <x.div p={8}>
      <TickerHistoryDialog
        ticker={selectedTicker}
        portfolioEntries={portfolioEntries}
        open={!!selectedTicker}
        closeDialog={() => setSelectedTicker("")}
      />
      <PortfolioSummary tickerToPriceMap={tickerToPriceMap} groupedEntries={groupedEntries} />
      <x.div mb={4} textAlign="center">
        Select a ticker to add to this portfolio
      </x.div>
      <TickerSearch ref={ref} setSelectedQuote={(quote) => setSelectedQuote(quote)} selectedQuote={selectedQuote} />
      <x.div mt={4} display="flex" justifyContent="end">
        <Button variant="contained" onClick={() => setUpdatesOpen(true)}>
          Updates
        </Button>
      </x.div>
      <x.div mt={4}>
        {groupedEntries.map((portfolioEntry) => (
          <PortfolioEntryCard
            onClickCard={onClickCard}
            tickerToPriceMap={tickerToPriceMap}
            portfolioEntry={portfolioEntry}
          />
        ))}
      </x.div>
      <UpdatesDrawer portfolioEntries={portfolioEntries} open={updatesOpen} onClose={onUpdatesDrawerClose} />
      <FormDialog onClose={() => setSelectedQuote(undefined)} selectedQuote={selectedQuote} onAdd={onAdd} />
    </x.div>
  );
}
