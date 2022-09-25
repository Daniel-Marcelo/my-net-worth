import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useEffect, useState } from "react";

interface CreatePortfolioModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClickCreate: (portfolioName: string) => Promise<void>;
}
export function CreatePortfolioModal({ open, setOpen, onClickCreate }: CreatePortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState("");
  const [clickedSave, setClickedSave] = useState(false);

  useEffect(() => {
    if (open) {
      setClickedSave(false);
      setPortfolioName("");
    }
  }, [open]);

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Create Portfolio</DialogTitle>
      <x.div p={8}>
        <x.div mt={4}>
          <TextField
            fullWidth
            type="text"
            value={portfolioName}
            onChange={(event) => setPortfolioName(event.target.value)}
            label="Portfolio Name"
            variant="outlined"
            helperText={clickedSave && "Please enter a valid name"}
            error={clickedSave && !portfolioName}
          />
        </x.div>

        <x.div mt={4}>
          <Button
            size="large"
            variant="contained"
            disabled={!portfolioName}
            onClick={async () => {
              await onClickCreate(portfolioName);
              setClickedSave(true);
            }}
          >
            <x.span px={16}>Create</x.span>
          </Button>
        </x.div>
      </x.div>
    </Dialog>
  );
}
