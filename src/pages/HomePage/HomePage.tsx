import { Button } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function HomePage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [isLoggedIn] = login;
  const onClickLogin = () => navigate("/login");
  const onClickPortfolios = () => navigate("/portfolios");
  return (
    <x.div
      className="homePage"
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex="1"
      justifyContent="center"
    >
      <x.div letterSpacing="widest" fontSize={{ sm: "3xl", md: "5xl" }}>
        MY NET WORTH
      </x.div>

      <x.div mt={24}>
        {isLoggedIn ? (
          <Button size="large" variant="contained" onClick={onClickPortfolios}>
            <x.span>PORTFOLIOS</x.span>
          </Button>
        ) : (
          <Button size="large" variant="contained" onClick={onClickLogin}>
            <x.span>LOGIN</x.span>
          </Button>
        )}
      </x.div>
    </x.div>
  );
}
