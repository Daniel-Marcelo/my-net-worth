import { Button, Card, CardContent, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { SyntheticEvent, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { usePortfolioService } from "../../services";
import { CreatePortfolioModal } from "../../components/CreatePortfolioModal";
import { useGetPortfolios } from "./usePortfolios";
import { DeletePortfolioDialog } from "../../components/DeletePortfolioDialog";
import { Portfolio } from "../../models";

const Root = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
}));

export function PortfoliosPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const portfolioService = usePortfolioService();
  const [portfolios, getPortfolios] = useGetPortfolios();
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // const bla = async () => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   const url = `apple.com/`;
    //   const response = await fetch(`${proxyurl + url}favicon/ico`);
    //   console.log(await response.text());
    // };
    // bla();
  }, []);
  const onClickCreate = async (name: string) => {
    await portfolioService.create({ name });
    await getPortfolios();
    setOpen(false);
  };

  const onClickDelete = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setDeleteDialogOpen(true);
  };

  const onClickConfirmDelete = async (id: string) => {
    await portfolioService.delete(id);
    await getPortfolios();
    setDeleteDialogOpen(false);
  };

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" p={8}>
      {selectedPortfolio && (
        <DeletePortfolioDialog
          onClickConfirmDelete={onClickConfirmDelete}
          open={deleteDialogOpen}
          closeDialog={() => setDeleteDialogOpen(false)}
          portfolio={selectedPortfolio}
        />
      )}
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
            <Root>
              <Card
                sx={{ width: "100%", cursor: "pointer", marginTop: 2 }}
                onClick={() => navigate(`/portfolio/${portfolio.id}`, { replace: true })}
              >
                <CardContent>
                  <x.div display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="div">
                      {portfolio.name}
                    </Typography>
                    <x.span
                      onClick={(e: SyntheticEvent<HTMLSpanElement>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClickDelete(portfolio);
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
            </Root>
          ))}
        </>
      )}
      <CreatePortfolioModal open={open} setOpen={setOpen} onClickCreate={onClickCreate} />
    </x.div>
  );
}
