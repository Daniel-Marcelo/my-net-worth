import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { GroupedPortfolioEntry, PortfolioEntry } from "../../models";

interface PortfolioEntryCardProps {
  portfolioEntry: GroupedPortfolioEntry;
}

export function PortfolioEntryCard({ portfolioEntry }: PortfolioEntryCardProps) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <x.div display="flex" justifyContent="space-between">
          <x.div>
            {portfolioEntry.ticker} - {portfolioEntry.name}
          </x.div>
          <x.div>
            {portfolioEntry.totalShares} {pluralize("share", portfolioEntry.totalShares)}
          </x.div>
        </x.div>
        {/* <x.div mt={2}>{portfolioEntry ? portfolioEntry.date : '-'}</x.div> */}
      </CardContent>
    </Card>
  );
}
