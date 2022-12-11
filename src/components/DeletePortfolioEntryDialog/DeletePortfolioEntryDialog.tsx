import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface DeletePortfolioDialog {
  open: boolean;
  ticker: string;
  closeDialog: () => void;
  onClickConfirmDelete: (ticker: string) => void;
}
export function DeletePortfolioEntryDialog({ ticker, open, closeDialog, onClickConfirmDelete }: DeletePortfolioDialog) {
  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Are you sure you want to remove all holdings of {ticker} from this portfolio?</DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={() => onClickConfirmDelete(ticker)}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
