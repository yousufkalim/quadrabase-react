import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "tp",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 150,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    border: "1px solid lightgray",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function NestedList({
  editChap0Part2,
  handleOpenEditChapModal,
  handleOpenDeleteChapModal,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState("");
  const [anchorElLevel0, setAnchorElLevel0] = React.useState(null);
  const [menuItem0, setMenuItem0] = React.useState({});

  const openLevel0 = Boolean(anchorElLevel0);
  const handleAnchorElLevel0Click = (event, item, type) => {
    setMenuItem0({ item, type });
    setAnchorElLevel0(event.currentTarget);
  };
  const handleAnchorElLevel0Close = () => {
    setAnchorElLevel0(null);
  };

  const handleClick = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
      setOpen2("");
    }
  };
  const handleClick2 = (id) => {
    if (id) {
      setOpen2(id);
    } else {
      setOpen2("");
    }
  };

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <StyledMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElLevel0}
        open={openLevel0}
        onClose={handleAnchorElLevel0Close}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenEditChapModal(menuItem0);
            handleAnchorElLevel0Close();
          }}
        >
          {t("To Modify")}
        </MenuItem>
        {menuItem0.type !== "level0" && (
          <>
            <MenuItem
              onClick={() => {
                handleOpenDeleteChapModal(menuItem0);
                handleAnchorElLevel0Close();
              }}
            >
              {t("To Delete")}
            </MenuItem>
            <MenuItem>{t("Up")}</MenuItem>
            <MenuItem>{t("Down")}</MenuItem>
          </>
        )}
      </StyledMenu>

      <ListItem>
        <ListItemIcon style={{ cursor: "pointer" }} onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
        <ListItemText
          primary={
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {editChap0Part2.id.title}
            </div>
          }
        />
        <IconButton
          onClick={(e) =>
            handleAnchorElLevel0Click(e, editChap0Part2.id, "level0")
          }
        >
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {editChap0Part2.id.level2.map((item) => {
            return (
              <>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (item._id !== open2) {
                        handleClick2(item._id);
                      } else {
                        handleClick2();
                      }
                    }}
                  >
                    {open2 === item._id ? <ExpandLess /> : <ExpandMore />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (item._id !== open2) {
                            handleClick2(item._id);
                          } else {
                            handleClick2();
                          }
                        }}
                      >
                        {item.title}
                      </div>
                    }
                  />
                  <IconButton
                    onClick={(e) =>
                      handleAnchorElLevel0Click(e, item, "level1")
                    }
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
                <Collapse in={open2 === item._id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.level3.map((item2) => {
                      return (
                        <ListItem sx={{ pl: 8 }}>
                          <ListItemIcon>
                            <FiberManualRecordIcon />
                          </ListItemIcon>
                          <ListItemText primary={item2.title} />
                          <IconButton
                            onClick={(e) =>
                              handleAnchorElLevel0Click(e, item2, "level2")
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
