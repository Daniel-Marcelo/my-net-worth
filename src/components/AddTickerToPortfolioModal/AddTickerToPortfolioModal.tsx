import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useState } from "react";

interface AddTickerToPortfolioModalProps {
  setOpen: (value: boolean) => void;
  open: boolean;
  onClickAdd: (value: number) => void;
  ticker: string;
}
export function AddTickerToPortfolioModal({ setOpen, open, onClickAdd, ticker }: AddTickerToPortfolioModalProps) {
  const [numberOfShares, setNumberOfShares] = useState<number>();
  const [clickedSave, setClickedSave] = useState(false);
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Enter how many shares of {ticker} you hold</DialogTitle>
      <x.div p={8}>
        <x.div mt={4}>
          <TextField
            fullWidth
            type="number"
            value={numberOfShares}
            onChange={(event) => setNumberOfShares(+event.target.value)}
            label="Number of shares"
            variant="outlined"
            helperText={clickedSave && !numberOfShares && "Please enter a valid name"}
            error={clickedSave && !numberOfShares}
          />
        </x.div>

        <x.div mt={4}>
          <Button
            size="large"
            variant="contained"
            disabled={!numberOfShares}
            onClick={async () => {
              await onClickAdd(numberOfShares);
              setClickedSave(true);
            }}
            sx={{
              width: "100%",
            }}
          >
            <x.span px={16}>Add</x.span>
          </Button>
        </x.div>
      </x.div>
    </Dialog>
  );
}
