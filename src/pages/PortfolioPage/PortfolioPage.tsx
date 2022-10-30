import { useRef, useState } from "react";
import { x } from "@xstyled/styled-components";
import { TickerSearch } from "../../components/TickerSearch";
import { usePortfolioEntryService } from "../../services";
import { FormDialog } from "../../components/AddTickerDialog";
import { PortfolioEntry, Quote } from "../../models";
import { Button } from "@mui/material";
import { UpdatesDrawer } from "../../components/UpdatesDrawer";
import { usePortfolioIdFromUrl } from "../../hooks";

export function PortfolioPage() {
  const ref = useRef();
  const id = usePortfolioIdFromUrl();
  const [selectedQuote, setSelectedQuote] = useState<Quote>();
  const portfolioEntryService = usePortfolioEntryService();

  const [updatesOpen, setUpdatesOpen] = useState(false);

  const onClose = () => {
    setSelectedQuote(undefined);
  };

  const onChoseTicker = (selectedQuote: Quote) => {
    setSelectedQuote(selectedQuote);
  };

  const onAdd = async (numberOfShares: number) => {
    const portfolioEntry = {
      ticker: selectedQuote.ticker,
      name: selectedQuote.name,
      portfolioId: `${id}`,
      numberOfShares,
    } as PortfolioEntry;
    await portfolioEntryService.create(portfolioEntry);
    setSelectedQuote(undefined);
  };

  const onOpenUpdates = () => {
    setUpdatesOpen(true)
  }

  return (
    <x.div p={8}>
      <h2 />
      <x.div mb={4} textAlign="center">
        Select a ticker to add to this portfolio
      </x.div>
      <TickerSearch ref={ref} setSelectedQuote={onChoseTicker} selectedQuote={selectedQuote} />
      <x.div mt={4} display="flex" justifyContent="end">
      <Button variant="contained" onClick={onOpenUpdates}>Updates</Button>
      </x.div>
      <UpdatesDrawer open={updatesOpen} onClose={() => setUpdatesOpen(false)}/>
      <FormDialog onClose={onClose} selectedQuote={selectedQuote} onAdd={onAdd} />
    </x.div>
  );
}
