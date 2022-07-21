import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Quadralogo from '../assets/images/Quadralogo.svg';
import Quadralogo2 from '../assets/images/Quadralogo2.svg';

import { useHistory } from 'react-router-dom';

const pages = [
  // {
  //   title: "Présentation",
  //   path: null
  // },
  {
    title: 'Supports pédagogiques',
    path: '/auth/support',
  },
  {
    title: 'Documentation',
    path: '/auth/documentation',
  },
  {
    title: 'Fabricants',
    path: '/auth/fabricant',
  },
  {
    title: 'Bibliothèques',
    path: '/auth/libraries',
  },
  {
    title: 'Produits',
    path: '/auth/services',
  },
  // {
  //   title: "Commande",
  //   path: null
  // },
];

const ResponsiveAppBar = (props) => {
  const history = useHistory();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  let [scroll, setScroll] = React.useState(false);

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

  //Handle Scroll
  const handleScroll = () => {
    if (window.scrollY > 2) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  //useEffect to Event Listen
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      className="spc_appbardiv"
      sx={{
        background: !scroll
          ? props.backgroundColor
            ? props.backgroundColor
            : '#8c1244'
          : '#8c1244',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg" className="spc_containerdiv">
        <Toolbar disableGutters>
          <Typography
            variant=""
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src={!scroll ? props.logo : Quadralogo2} onClick={() => navTo('/auth/home')}></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
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
              display: { xs: 'none', sm: 'flex', md: 'none' },
            }}
          >
            <img src={Quadralogo}></img>
          </Typography>
          <Box
            sx={{
              flexGrow: 2,
              display: { xs: 'none !important', md: 'flex !important' },
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
                  color: props.dark ? 'black' : 'white',
                  padding: '0 1% 0 1%',
                  textTransform: 'capitalize',
                  fontSize: '14px',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Button className="spc_Appbar_contct_btn" onClick={() => navTo('/auth/contact')}>
              Nous contacter
            </Button>
            <Button className="spc_Appbar_connect_btn" onClick={() => navTo('/auth/login')}>
              Se connecter
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
