import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { x } from "@xstyled/styled-components";
import { TickerSearch } from "../../components/TickerSearch";
import { usePortfolioEntryService, usePortfolioService } from "../../services";
import { FormDialog } from "../../components/AddTickerDialog";
import { PortfolioEntry } from "../../models";

export function PortfolioPage() {
  const params = useParams();
  const ref = useRef();
  const [id, setId] = useState("");
  const [selectedTicker, setSelectedTicker] = useState("");
  const portfolioService = usePortfolioService();
  const portfolioEntryService = usePortfolioEntryService();

  useEffect(() => {
    if (params.id && params.id !== id) {
      setId(params.id);
      portfolioService.get(params.id).then((dsd) => console.log(dsd));
    }
  }, [params]);

  const onClose = () => {
    setSelectedTicker("");
  };

  const onChoseTicker = (ticker: string) => {
    setSelectedTicker(ticker);
  };

  const onAdd = async (numberOfShares: number) => {
    const portfolioEntry = {
      ticker: selectedTicker,
      portfolioId: `${id}`,
      numberOfShares,
    } as PortfolioEntry;
    await portfolioEntryService.create(portfolioEntry);
    setSelectedTicker("");
  };

  return (
    <x.div p={8}>
      <h2 />
      <x.div mb={4} textAlign="center">
        Select a ticker to add to this portfolio
      </x.div>
      <TickerSearch ref={ref} setSelectedTicker={onChoseTicker} selectedTicker={selectedTicker} />
      <FormDialog onClose={onClose} selectedTicker={selectedTicker} onAdd={onAdd} />
    </x.div>
  );
}
