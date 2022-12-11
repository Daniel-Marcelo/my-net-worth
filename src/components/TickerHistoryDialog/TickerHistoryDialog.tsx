import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { PortfolioEntry } from "../../models";
import { UpdateEntry } from "../UpdateEntry";

interface TickerHistoryDialogProps {
  open: boolean;
  ticker: string;
  portfolioEntries: PortfolioEntry[];
  closeDialog: () => void;
}
export function TickerHistoryDialog({ open, closeDialog, ticker, portfolioEntries }: TickerHistoryDialogProps) {
  return (
    <Dialog fullWidth open={open} onClose={closeDialog}>
      <DialogTitle>{ticker} history</DialogTitle>
      <DialogContent>
        <x.div>
          {portfolioEntries
            .filter((entry) => entry.ticker === ticker)
            .map((portfolioEntry) => (
              <UpdateEntry portfolioEntry={portfolioEntry} />
            ))}
        </x.div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
