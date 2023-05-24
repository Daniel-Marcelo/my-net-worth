import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { x } from "@xstyled/styled-components";
import { useAuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useAuth";

interface NavBarLinkProps {
  ml?: number;
  text: string;
  onClick: () => void;
}
function NavBarLink({ text, onClick, ml = 4 }: NavBarLinkProps) {
  return (
    <x.span ml={ml} cursor="pointer" onClick={onClick}>
      <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
        {text}
      </Typography>
    </x.span>
  );
}

export function NavBar() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { login } = useAuthContext();
  const [isLoggedIn] = login;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <NavBarLink ml={0} text="Quote" onClick={() => navigate("/quote")} />
          <NavBarLink text="Calculator" onClick={() => navigate("/calc")} />
          {isLoggedIn ? (
            <>
              <NavBarLink text="Portfolios" onClick={() => navigate("/adasdasdasd")} />
              <x.span display="flex" flex={1} justifyContent="end">
                <NavBarLink text="Logout" onClick={logout.mutate} />
              </x.span>
            </>
          ) : (
            ""
          )}
          {!isLoggedIn ? (
            <x.span display="flex" flex={1} justifyContent="end">
              <NavBarLink text="Register" onClick={() => navigate("/register")} />
              <NavBarLink text="Login" onClick={() => navigate("/login")} />
            </x.span>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
