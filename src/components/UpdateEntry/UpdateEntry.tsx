import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import format from "date-fns/format";
import { PortfolioEntry } from "../../models";

interface UpdateEntryProps {
  portfolioEntry: PortfolioEntry;
}
export function UpdateEntry({ portfolioEntry }: UpdateEntryProps) {
  return (
    <x.div fontSize="xs" py={4} borderBottomWidth="1px" borderStyle="solid" borderColor="blue-gray-300">
      <x.div display="flex" justifyContent="space-between">
        <x.div>
          {portfolioEntry.ticker} - {portfolioEntry.name}
        </x.div>
        <x.div>
          {portfolioEntry.numberOfShares} {pluralize("share", portfolioEntry.numberOfShares)}
        </x.div>
      </x.div>
      <x.div mt={2}>{format(new Date(portfolioEntry.createdAt), "MM/dd/yyyy")}</x.div>
    </x.div>
  );
}
