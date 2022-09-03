import { Box, Button, Dialog, DialogTitle, Modal, TextField, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useCallback, useEffect, useState } from "react";
import { usePortfolioContext } from "../../context/PortfolioContext";
import { PortfoliosService } from "../../services/PortfoliosService";

export function PortfoliosPage() {
  const { portfolioData } = usePortfolioContext();
  const [portfolios, setPortfolios] = portfolioData;
  const [open, setOpen] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");

  const getPortfolios = useCallback(async () => {
    const myPortfolios = await PortfoliosService.getPortfolios();
    setPortfolios(myPortfolios);
  }, [open]);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  const onClickCreate = async () => {
    setClickedSave(true);
    await PortfoliosService.createPortfolio(portfolioName);
    setOpen(false);
  };

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" p={8}>
      <x.div mt={4}>
        <x.div letterSpacing="5px" fontSize="32px">
          PORTFOLIOS
        </x.div>
      </x.div>
      <x.div alignSelf="flex-start">
        <Button onClick={() => setOpen(true)} size="large" variant="contained">
          <x.span>CREATE PORTFOLIO</x.span>
        </Button>
      </x.div>

      {portfolios.length ? (
        <x.div mt={48}>
          You currently have no portfolios created. Please{" "}
          <x.span textDecoration="underline" color="blue" cursor="pointer" onClick={() => setOpen(true)}>
            create a portfolio to continue.
          </x.span>
        </x.div>
      ) : (
        <x.div />
      )}
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
            <Button size="large" variant="contained" onClick={onClickCreate}>
              <x.span px={16}>Create</x.span>
            </Button>
          </x.div>
        </x.div>
      </Dialog>
    </x.div>
  );
}
