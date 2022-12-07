import { x } from "@xstyled/styled-components";
import { useUserSettingsContext } from "../../context/UserSettingsContext";
import { useFormatNumber } from "../../hooks/useFormatNumber";
import { GroupedPortfolioEntry } from "../../models";
import { usePortfolioStatsCalculator } from "../../pages/PortfolioPage/usePortfolioStatsCalculator";

interface PortfolioSummaryProps {
  tickerToPriceMap: Map<string, number>;
  groupedEntries: GroupedPortfolioEntry[];
}
export function PortfolioSummary({ groupedEntries, tickerToPriceMap }: PortfolioSummaryProps) {
  const [total] = usePortfolioStatsCalculator(tickerToPriceMap, groupedEntries);
  const { baseCurrency } = useUserSettingsContext();
  const format = useFormatNumber();
  return (
    <x.div>
      <div>Total</div>
      <div>
        {baseCurrency}
        {format(total)}
      </div>
    </x.div>
  );
}
