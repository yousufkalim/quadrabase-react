import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Que from '../assets/Que.png';
import Quadralogo from '../assets/Quadralogo.png';
import { useHistory } from 'react-router-dom';
import { UpdateStore } from '../StoreContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import Modal from './Architect/Modal';
import { Button } from '@mui/material';

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const updateStore = UpdateStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('');
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [warningModal, setWarningModal] = React.useState(false);
  const [path, setPath] = React.useState('');

  React.useEffect(() => {
    let temp = location.pathname.split('/');
    temp = temp[temp.length - 1].charAt(0).toUpperCase() + temp[temp.length - 1].slice(1);
    if (temp === 'Index') {
      setCurrentPage('Dashboard');
    } else if (temp === 'Projects') {
      setCurrentPage('My Projects');
    } else {
      setCurrentPage(temp);
    }
  }, [location.pathname]);

  // for language dropdown menu

  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   logout function
  const onLogout = () => {
    localStorage.removeItem('token');
    updateStore({ loggedIn: false, user: {} });
    history.push('/auth/home');
  };

  // open warning modal
  const handleWarningModal = () => setWarningModal(!warningModal);

  const drawer = (
    <div>
      <div
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ lineHeight: '80%' }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {props.user.name} {props.user.firstname}
          </span>
          <br />
          <span style={{ fontSize: 12, color: '#8C1244' }}>{t('Provider')}</span>
        </div>
        <LogoutIcon style={{ cursor: 'pointer' }} onClick={() => onLogout()} />
      </div>
      <Divider />
      <List>
        {props.routes.map(
          (item, index) =>
            item.layout === '/provider' && (
              <ListItem
                button
                key={item?.text}
                onClick={() => {
                  let warning = localStorage.getItem('warning');
                  if (warning === 'true') {
                    handleWarningModal();
                    setPath(item.layout + item.path);
                  } else {
                    if (props.user.authorized.toUpperCase() !== 'NO') {
                      history.push(item.layout + item.path);
                    }
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(item?.text)} />
              </ListItem>
            )
        )}
      </List>
      <img
        src={Quadralogo}
        alt=""
        width={130}
        height={50}
        style={{ position: 'absolute', left: 20, bottom: 110 }}
      />
      <img src={Que} alt="" style={{ position: 'absolute', left: 0, bottom: 0 }} />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <Modal
        title={t('Warning')}
        open={warningModal}
        onClose={handleWarningModal}
        component={
          <div style={{ width: '30vw' }}>
            <div style={{ margin: '15px 0' }}>
              Êtes-vous sûr de vouloir quitter cette page ? Des modifications n’ont pas été
              enregistrés, merci de cliquer sur “Mettre à jour” pour les prendre en compte.
            </div>

            <div style={{ width: '100%', textAlign: 'right' }}>
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#8C1244',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                  ':hover': {
                    backgroundColor: '#8C1244',
                  },
                }}
                onClick={handleWarningModal}
              >
                {t('Close')}
              </Button>
              &nbsp;&nbsp;
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#8C1244',
                  borderRadius: 2,
                  whiteSpace: 'nowrap',
                  ':hover': {
                    backgroundColor: '#8C1244',
                  },
                }}
                onClick={() => {
                  localStorage.removeItem('warning');
                  history.push(path);
                  handleWarningModal();
                }}
              >
                {t('Continue')}
              </Button>
            </div>
          </div>
        }
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'rgb(238, 238, 238)',
          color: 'black',
          boxShadow: 'none !important',
          borderBottom: '1px solid white',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 1,
                ml: 1,
                display: { md: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              {t(currentPage)}
            </Typography>
          </div>
          <IconButton
            id="demo-positioned-button"
            aria-controls={open2 ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? 'true' : undefined}
            onClick={handleClick2}
            style={{ color: '#3b373c' }}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ mt: 2.5 }}
          >
            <MenuItem
              style={{
                width: 200,
                height: 30,
              }}
              onClick={() => {
                i18n.changeLanguage('en');
                handleClose2();
              }}
            >
              {t('English')}
            </MenuItem>
            <MenuItem
              style={{
                width: 200,
                height: 30,
              }}
              onClick={() => {
                i18n.changeLanguage('fr');
                handleClose2();
              }}
            >
              {t('French')}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 50.14%, rgba(165, 165, 165, 0.14) 60.59%), #FFFFFF',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
