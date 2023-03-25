import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuoteStore } from "../../stores";
import { useNumberOfShares } from "./useNumberOfShares";

interface FormDialogProps {
  onAdd: (numberOfShares: number) => void;
}
export function FormDialog({ onAdd }: FormDialogProps) {
  const [numberOfShares, setNumberOfShares] = useNumberOfShares();
  const { quote: selectedQuote, setQuote: setSelectedQuote } = useQuoteStore();

  return (
    <Dialog open={!!selectedQuote} onClose={() => setSelectedQuote(undefined)}>
      <DialogTitle>
        How many shares of {selectedQuote?.name} ({selectedQuote?.ticker}) do you want to add?
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd(numberOfShares);
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            id="numberOfShares"
            label="Number of Shares"
            type="number"
            fullWidth
            value={numberOfShares}
            onChange={(event) => setNumberOfShares(+event.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedQuote(undefined)}>Cancel</Button>
          <Button type="submit" value="Submit" disabled={!numberOfShares}>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
