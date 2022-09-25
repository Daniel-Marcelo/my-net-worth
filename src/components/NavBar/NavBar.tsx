import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { x } from "@xstyled/styled-components";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <x.span cursor="pointer" onClick={() => navigate("/quote")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quote
            </Typography>
          </x.span>
          <x.span ml={4} cursor="pointer" onClick={() => navigate("/calc")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Calculator
            </Typography>
          </x.span>
          <x.span ml={4} cursor="pointer" onClick={() => navigate("/register")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Register
            </Typography>
          </x.span>
          <x.span ml={4} cursor="pointer" onClick={() => navigate("/login")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Login
            </Typography>
          </x.span>
          <x.span ml={4} cursor="pointer" onClick={() => navigate("/portfolios")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Portfolios
            </Typography>
          </x.span>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
