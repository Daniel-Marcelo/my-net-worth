import { Button, Card, CardContent, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { SyntheticEvent, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { usePortfolioService } from "../../services";
import { CreatePortfolioModal } from "../../components/CreatePortfolioModal";
import { usePortfolios } from "./usePortfolios";

export function PortfoliosPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const portfolioService = usePortfolioService();
  const [portfolios, getPortfolios] = usePortfolios();

  const onClickCreate = async (name: string) => {
    await portfolioService.create({ name });
    await getPortfolios();
    setOpen(false);
  };

  const onClickDelete = async (id?: string) => {
    if (id) {
      await portfolioService.delete(id);
      await getPortfolios();
    }
  };

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" p={8}>
      <x.div mt={4}>
        <x.div letterSpacing="5px" fontSize="32px">
          PORTFOLIOS
        </x.div>
      </x.div>
      <x.div my={8}>
        <Button onClick={() => setOpen(true)} size="large" variant="contained">
          <x.span>CREATE PORTFOLIO</x.span>
        </Button>
      </x.div>

      {!portfolios.length ? (
        <x.div mt={48}>
          You currently have no portfolios created. Please{" "}
          <x.span textDecoration="underline" color="blue" cursor="pointer" onClick={() => setOpen(true)}>
            create a portfolio to continue.
          </x.span>
        </x.div>
      ) : (
        <>
          {portfolios.map((portfolio) => (
            <x.div mt={4} key={portfolio.id} cursor="pointer">
              <Card sx={{ minWidth: 400 }} onClick={() => navigate(`/portfolio/${portfolio.id}`, { replace: true })}>
                <CardContent>
                  <x.div display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      {portfolio.name}
                    </Typography>
                    <x.span
                      onClick={(e: SyntheticEvent<HTMLSpanElement>) => {
                        console.log(e);
                        e.preventDefault();
                        e.stopPropagation();
                        onClickDelete(portfolio.id);
                      }}
                      alignSelf="center"
                      cursor="pointer"
                    >
                      <DeleteIcon color="error" />
                    </x.span>
                  </x.div>
                </CardContent>
                {/* <CardActions>
            <Button size="medium" color="error"></Button>
          </CardActions> */}
              </Card>
            </x.div>
          ))}
        </>
      )}
      <CreatePortfolioModal open={open} setOpen={setOpen} onClickCreate={onClickCreate} />
    </x.div>
  );
}
