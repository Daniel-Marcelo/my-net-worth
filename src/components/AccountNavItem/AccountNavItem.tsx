import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useAuth";
import { RoutePath } from "../../types/routes";

export function AccountNavItem() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggedIn] = login;
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLoggedIn ? (
          <MenuItem onClick={() => logout.mutate()}>Logout</MenuItem>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(RoutePath.Login);
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate(RoutePath.Register);
                handleClose();
              }}
            >
              Register
            </MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
}
