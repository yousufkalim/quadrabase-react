import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FolderIcon from "@mui/icons-material/Folder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
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

const screenSize = window.innerWidth;

const NestedList = (props) => {
  const { t } = useTranslation();
  // for level 1
  const [openLevel1, setOpenLevel1] = React.useState("");

  const handleClick = (id) => {
    if (id) {
      setOpenLevel1(id);
    } else {
      setOpenLevel1("");
    }
  };

  // for level 2
  const [openLevel2, setOpenLevel2] = React.useState("");

  const handleClicklevel2 = (id) => {
    if (id) {
      setOpenLevel2(id);
    } else {
      setOpenLevel2("");
    }
  };

  // dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItem, setMenuItem] = React.useState([]);
  const openLevel = Boolean(anchorEl);
  const handleAnchorElClick = (event, item) => {
    setMenuItem(item);
    setAnchorEl(event.currentTarget);
  };
  const handleAnchorElClose = () => {
    setAnchorEl(null);
  };

  return (
    <List
      sx={{
        width: props.width,
        maxHeight: props.maxHeight,
        minHeight: "2vh",
        postion: "relative",
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "#e3e2e5",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        paddingTop: 0,
        paddingBottom: 0,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <StyledMenu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openLevel}
        onClose={handleAnchorElClose}
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
        {menuItem?.bpu_text?.length >= 1 &&
          menuItem?.bpu_text?.map((bpu, index) => {
            if (bpu) {
              return (
                <MenuItem
                  onClick={() => {
                    props.openCctpModal(bpu, "BPU");
                    handleAnchorElClose();
                  }}
                >
                  Text BPU
                </MenuItem>
              );
            }
          })}
        {menuItem?.cctp_text?.length >= 1 &&
          menuItem?.cctp_text?.map((cctp, index) => {
            if (cctp) {
              return (
                <MenuItem
                  onClick={() => {
                    props.openCctpModal(cctp, "CCTP");
                    handleAnchorElClose();
                  }}
                >
                  Text CCTP {index + 1}
                </MenuItem>
              );
            }
          })}
        {menuItem?.providers?.length >= 1 &&
          menuItem?.providers[0]?.documents?.length >= 1 && (
            <>
              <Divider />
              <MenuItem
                onClick={() => {
                  window.open(
                    menuItem?.providers[0].documents[0].uri,
                    "_blank"
                  );
                  handleAnchorElClose();
                }}
              >
                {t("Technical Doc")}
              </MenuItem>
            </>
          )}
        {menuItem?.providers?.length >= 1 && (
          <>
            <Divider />
            <MenuItem
              onClick={() => {
                props.handleOpenProvidersModal(menuItem.providersList);
                handleAnchorElClose();
              }}
            >
              {t("Providers")}
            </MenuItem>
          </>
        )}
        {menuItem?.cctp_text?.length === 0 &&
          (typeof menuItem?.bpu_text === "undefined" ||
            menuItem?.bpu_text?.length === 0) &&
          (typeof menuItem?.providers === "undefined" ||
            menuItem?.providers?.length === 0) && (
            <MenuItem disabled>No texts</MenuItem>
          )}
      </StyledMenu>
      {props.level1?.map((item) => {
        let open = openLevel1 === item._id;
        return (
          <>
            <ListItem
              sx={{
                height: 28,
              }}
            >
              <ListItemIcon>
                <FolderIcon
                  sx={{
                    color: "#f1966c",
                    fontSize: 20,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <div
                    style={{
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      fontWeight: 900,
                    }}
                  >
                    <div
                      onClick={() => {
                        if (!open) {
                          handleClick(item._id);
                          props.getLevel2(item._id);
                        } else {
                          handleClick();
                          handleClicklevel2();
                          props.setLevel2([]);
                          props.setLevel3([]);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {screenSize > 1600 ? (
                        <>
                          {item?.name?.substring(0, 30)}
                          {item?.name?.length > 30 && "..."}
                        </>
                      ) : screenSize > 1500 ? (
                        <>
                          {item?.name?.substring(0, 26)}
                          {item?.name?.length > 26 && "..."}
                        </>
                      ) : screenSize > 1400 ? (
                        <>
                          {item?.name?.substring(0, 22)}
                          {item?.name?.length > 22 && "..."}
                        </>
                      ) : screenSize > 1300 ? (
                        <>
                          {item?.name?.substring(0, 20)}
                          {item?.name?.length > 20 && "..."}
                        </>
                      ) : screenSize > 1200 ? (
                        <>
                          {item?.name?.substring(0, 16)}
                          {item?.name?.length > 16 && "..."}
                        </>
                      ) : screenSize > 1100 ? (
                        <>
                          {item?.name?.substring(0, 14)}
                          {item?.name?.length > 14 && "..."}
                        </>
                      ) : (
                        <>
                          {item?.name?.substring(0, 12)}
                          {item?.name?.length > 12 && "..."}
                        </>
                      )}
                    </div>
                    <ArrowDropDownIcon
                      id="demo-positioned-button"
                      aria-controls={
                        openLevel ? "demo-positioned-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openLevel ? "true" : undefined}
                      onClick={(e) => handleAnchorElClick(e, item)}
                      sx={{
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                }
              />
              {open ? (
                <ExpandLess
                  sx={{
                    color: "#f1966c",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClick();
                    handleClicklevel2();
                    props.setLevel2([]);
                    props.setLevel3([]);
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    color: "#f1966c",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClick(item._id);
                    props.getLevel2(item._id);
                  }}
                />
              )}
            </ListItem>
            {props.loading === item._id && <LinearProgress color="inherit" />}
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {props.level2?.map((item2) => {
                  let open2 = openLevel2 === item2._id;
                  return (
                    <>
                      <ListItem sx={{ pl: 4, height: 28 }}>
                        <ListItemIcon>
                          {open2 ? (
                            <ExpandLess
                              sx={{
                                color: "#f1966c",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                props.setLevel3([]);
                                handleClicklevel2();
                              }}
                            />
                          ) : (
                            <ExpandMore
                              sx={{
                                color: "#f1966c",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleClicklevel2(item2._id);
                                props.getLevel3(item2._id);
                              }}
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <div
                              style={{
                                fontSize: 13,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div
                                onClick={() => {
                                  if (!open2) {
                                    handleClicklevel2(item2._id);
                                    props.getLevel3(item2._id);
                                  } else {
                                    props.setLevel3([]);
                                    handleClicklevel2();
                                  }
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {screenSize > 1600 ? (
                                  <>
                                    {item2?.name?.substring(0, 32)}
                                    {item2?.name?.length > 32 && "..."}
                                  </>
                                ) : screenSize > 1500 ? (
                                  <>
                                    {item2?.name?.substring(0, 28)}
                                    {item2?.name?.length > 28 && "..."}
                                  </>
                                ) : screenSize > 1400 ? (
                                  <>
                                    {item2?.name?.substring(0, 24)}
                                    {item2?.name?.length > 24 && "..."}
                                  </>
                                ) : screenSize > 1300 ? (
                                  <>
                                    {item2?.name?.substring(0, 20)}
                                    {item2?.name?.length > 20 && "..."}
                                  </>
                                ) : screenSize > 1200 ? (
                                  <>
                                    {item2?.name?.substring(0, 16)}
                                    {item2?.name?.length > 16 && "..."}
                                  </>
                                ) : (
                                  <>
                                    {item2?.name?.substring(0, 12)}
                                    {item2?.name?.length > 12 && "..."}
                                  </>
                                )}
                              </div>

                              <ArrowDropDownIcon
                                id="demo-positioned-button"
                                aria-controls={
                                  openLevel ? "demo-positioned-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={openLevel ? "true" : undefined}
                                onClick={(e) => handleAnchorElClick(e, item2)}
                                sx={{
                                  fontSize: 18,
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          }
                        />
                      </ListItem>
                      {props.loading === item2._id && (
                        <LinearProgress color="inherit" />
                      )}
                      <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {props.level3?.map((item3) => {
                            return (
                              <>
                                <ListItem sx={{ pl: 8, height: 28 }}>
                                  <ListItemIcon>
                                    <BookmarkBorderOutlinedIcon
                                      sx={{
                                        color: "#f1966c",
                                        fontSize: 20,
                                      }}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={
                                      <div
                                        style={{
                                          fontSize: 13,
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {screenSize > 1600 ? (
                                          <>
                                            {item3?.name?.substring(0, 34)}
                                            {item3?.name?.length > 34 && "..."}
                                          </>
                                        ) : screenSize > 1500 ? (
                                          <>
                                            {item3?.name?.substring(0, 30)}
                                            {item3?.name?.length > 30 && "..."}
                                          </>
                                        ) : screenSize > 1400 ? (
                                          <>
                                            {item3?.name?.substring(0, 26)}
                                            {item3?.name?.length > 26 && "..."}
                                          </>
                                        ) : screenSize > 1300 ? (
                                          <>
                                            {item3?.name?.substring(0, 22)}
                                            {item3?.name?.length > 22 && "..."}
                                          </>
                                        ) : screenSize > 1200 ? (
                                          <>
                                            {item3?.name?.substring(0, 18)}
                                            {item3?.name?.length > 18 && "..."}
                                          </>
                                        ) : (
                                          <>
                                            {item3?.name?.substring(0, 14)}
                                            {item3?.name?.length > 14 && "..."}
                                          </>
                                        )}
                                        <ArrowDropDownIcon
                                          id="demo-positioned-button"
                                          aria-controls={
                                            openLevel
                                              ? "demo-positioned-menu"
                                              : undefined
                                          }
                                          aria-haspopup="true"
                                          aria-expanded={
                                            openLevel ? "true" : undefined
                                          }
                                          onClick={(e) =>
                                            handleAnchorElClick(e, item3)
                                          }
                                          sx={{
                                            fontSize: 18,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </div>
                                    }
                                  />
                                  <AddCircleRoundedIcon
                                    sx={{
                                      color: "#f1966c",
                                      fontSize: 20,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => props.openModal(item3)}
                                  />
                                </ListItem>
                              </>
                            );
                          })}
                        </List>
                      </Collapse>
                    </>
                  );
                })}
              </List>
            </Collapse>
          </>
        );
      })}
    </List>
  );
};

export default NestedList;
