import { Button } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useNavigate } from "react-router-dom";
import { DividendCalendar } from "../../components/DividendCalendar";
import { useAuthContext } from "../../context/AuthContext";

export function HomePage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [isLoggedIn] = login;
  const onClickLogin = () => navigate("/login");
  const onClickPortfolios = () => navigate("/portfolios");

  return (
    <x.div h="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" pt={32}>
      <DividendCalendar rowData={[]} />
      <x.div letterSpacing="10px" fontSize="58px">
        MY NET WORTH
      </x.div>

      <x.div mt={32}>
        {isLoggedIn ? (
          <Button size="large" variant="contained" onClick={onClickPortfolios}>
            <x.span px={48}>PORTFOLIOS</x.span>
          </Button>
        ) : (
          <Button size="large" variant="contained" onClick={onClickLogin}>
            <x.span px={48}>LOGIN</x.span>
          </Button>
        )}
      </x.div>
    </x.div>
  );
}
