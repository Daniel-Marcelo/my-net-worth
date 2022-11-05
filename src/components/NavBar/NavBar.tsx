import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { x } from "@xstyled/styled-components";
import { useAuthContext } from "../../context/AuthContext";

interface NavBarLinkProps {
  ml?: number;
  text: string,
  route: string,

}
const NavBarLink = ({
  text,
  route,
  ml = 4,
}: NavBarLinkProps) => {
  const navigate = useNavigate();

  return <x.span ml={ml} cursor="pointer" onClick={() => navigate(route)}>
    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
      {text}
    </Typography>
  </x.span>
}

export function NavBar() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [isLoggedIn] = login;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <NavBarLink ml={0} text="Quote" route="/quote" />
          <NavBarLink text="Calculator" route="/calc" />
          {isLoggedIn ? <NavBarLink text="Portfolios" route="/portfolios" /> : ''}
          {!isLoggedIn ? <x.span display="flex" flex={1} justifyContent="end">
            <NavBarLink text="Register" route="/register" />
            <NavBarLink text="Login" route="/login" />
          </x.span> : ''}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
