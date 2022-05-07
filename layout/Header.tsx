import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { sections } from "../config/constants";
import { useRouter } from "next/router";
import useHash from "../hooks/useHash";
import { IPageSection } from "../types";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavItem = ({
  nav,
  value,
  onChange,
}: {
  nav: IPageSection;
  value: string;
  onChange: (e: React.MouseEvent<HTMLButtonElement>, newValue: string) => any;
}) => {
  const isActive = [nav.hash, ...nav.other_hashes].indexOf(value) > -1;
  return (
    <Button
      key={nav.hash}
      // color={isActive ? "primary" : "inherit"}

      onClick={(e) => onChange(e, nav.hash)}
      sx={{
        my: 2,
        display: "block",
        color: isActive ? "primary.main" : "inherit",
      }}
    >
      {nav.title}
    </Button>
  );
};

const Header = () => {
  const { hash, setHash } = useHash();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (value: string = "") => {
    setAnchorElNav(null);
    if (value) {
      setHash(value);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              variant={"selectedMenu"}
              defaultValue={hash}
              onClose={() => handleCloseNavMenu()}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {sections.map((page) => (
                <MenuItem
                  key={page.hash}
                  value={page.hash}
                  onClick={(e) => handleCloseNavMenu(page.hash)}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {sections.map((nav) => (
              <NavItem
                key={nav.hash}
                nav={nav}
                onChange={() => {
                  setHash(nav.hash);
                }}
                value={hash}
              />
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
