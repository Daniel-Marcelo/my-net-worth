import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface FormDialogProps {
  selectedTicker: string;
  onAdd: (numberOfShares: number) => void;
  onClose: () => void;
}
export function FormDialog({ selectedTicker, onAdd, onClose }: FormDialogProps) {
  const [numberOfShares, setNumberOfShares] = React.useState<number>();
  return (
    <div>
      <Dialog open={!!selectedTicker} onClose={onClose}>
        <DialogTitle>How many shares of {selectedTicker} do you want to add?</DialogTitle>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => onAdd(numberOfShares)} disabled={!numberOfShares}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
