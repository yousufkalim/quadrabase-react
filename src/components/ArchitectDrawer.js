import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Que from "../assets/Que.png";
import Quadralogo from "../assets/Quadralogo.png";
import { useHistory } from "react-router-dom";
import { UpdateStore } from "../StoreContext";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const history = useHistory();
  const updateStore = UpdateStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //   logout function
  const onLogout = () => {
    localStorage.removeItem("token");
    updateStore({ loggedIn: false, user: {} });
    history.push("/auth/home");
  };

  const drawer = (
    <div>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ lineHeight: "80%" }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>
            {props.user.first_name} {props.user.last_name}
          </span>
          <br />
          <span style={{ fontSize: 12, color: "#8C1244" }}>Architect</span>
        </div>
        <LogoutIcon style={{ cursor: "pointer" }} onClick={() => onLogout()} />
      </div>
      <Divider />
      <List>
        {props.routes.map(
          (item, index) =>
            item.layout === "/architect" &&
            item?.text !== "ProjectView" &&
            item?.text !== "Success" && (
              <ListItem
                button
                key={item?.text}
                onClick={() => history.push(item.layout + item.path)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item?.text} />
              </ListItem>
            )
        )}
      </List>
      <img
        src={Quadralogo}
        alt=""
        width={130}
        height={50}
        style={{ position: "absolute", left: 20, bottom: 110 }}
      />
      <img
        src={Que}
        alt=""
        style={{ position: "absolute", left: 0, bottom: 0 }}
      />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 1,
            ml: 1,
            display: { md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>

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
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 50.14%, rgba(165, 165, 165, 0.14) 60.59%), #FFFFFF",
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
        {props.children}
      </Box>
    </Box>
  );
}
