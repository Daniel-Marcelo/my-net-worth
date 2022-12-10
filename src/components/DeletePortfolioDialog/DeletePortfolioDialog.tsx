import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Portfolio } from "../../models";

interface DeletePortfolioDialog {
    open: boolean,
    portfolio: Portfolio
    closeDialog: () => void;
    onClickConfirmDelete: (id: string) => void;
}
export function DeletePortfolioDialog({ portfolio, open, closeDialog, onClickConfirmDelete }: DeletePortfolioDialog) {

  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>
          Are you sure you want to delete the portfolio {portfolio.name}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={() => onClickConfirmDelete(portfolio.id)}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
