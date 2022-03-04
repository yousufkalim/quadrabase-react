import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Quadralogo from "../assets/images/Quadralogo.svg";

import { useHistory } from "react-router-dom";

const pages = [
  // {
  //   title: "Présentation",
  //   path: null
  // },
  {
    title: "Supports pédagogiques",
    path: "/auth/support",
  },
  {
    title: "Documentation",
    path: "/auth/documentation",
  },
  {
    title: "Fabricants",
    path: null,
  },
  // {
  //   title: "Commande",
  //   path: null
  // },
];

const ResponsiveAppBar = (props) => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navTo = (path) => {
    if (path) {
      history.push(path);
    }
  };

  return (
    <AppBar position="static" className="spc_appbardiv">
      <Container maxWidth="lg" className="spc_containerdiv">
        <Toolbar disableGutters>
          <Typography
            variant=""
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img src={props.logo} onClick={() => navTo("/auth/home")}></img>
          </Typography>
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
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    navTo(page.path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", md: "none" },
            }}
          >
            <img src={Quadralogo}></img>
          </Typography>
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none !important", md: "flex !important" },
            }}
            className="spc_navitems"
          >
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  navTo(page.path);
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: props.dark ? "black" : "white",
                  padding: "0 1% 0 1%",
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              className="spc_Appbar_contct_btn"
              sx={{ marginRight: "3%" }}
            >
              Contact
            </Button>
            <Button
              className="spc_Appbar_connect_btn"
              onClick={() => navTo("/auth/login")}
            >
              Connect
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
