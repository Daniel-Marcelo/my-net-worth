import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { x } from "@xstyled/styled-components";
import { TickerSearch } from "../../components/TickerSearch";
import { usePortfolioService } from "../../services";

export function PortfolioPage() {
  const params = useParams();
  const [id, setId] = useState<number>();
  const [selectedTicker, setSelectedTicker] = useState("");
  const portfolioService = usePortfolioService();

  useEffect(() => {
    if (params.id && +params.id !== id) {
      const id = +params.id;
      setId(id);
      portfolioService.get(params.id).then((dsd) => console.log(dsd));
    }
  }, [params]);

  return (
    <x.div p={8}>
      <h2 />
      <x.div mb={4} textAlign="center">
        Select a ticker to add to this portfolio
      </x.div>
      <TickerSearch setSelectedTicker={setSelectedTicker} />
    </x.div>
  );
}
