import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { marginBottom, x } from "@xstyled/styled-components";
import pluralize from "pluralize";

interface PortfolioEntryCardProps {
  ticker: string;
  name: string;
  date?: string;
  numberOfShares: number;
}

export function PortfolioEntryCard({ ticker, name, numberOfShares }: PortfolioEntryCardProps) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <x.div display="flex" justifyContent="space-between">
          <x.div>
            {ticker} - {name}
          </x.div>
          <x.div>
            {numberOfShares} {pluralize("share", numberOfShares)}
          </x.div>
        </x.div>
        <x.div mt={2}>Fri 5th Oct 2022</x.div>
      </CardContent>
    </Card>
  );
}
