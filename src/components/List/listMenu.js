import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from "../FontAwesomeIcon";
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
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
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

export default function CustomizedMenus(props) {
  const {
    onAdd,
    parentLevel,
    onEdit,
    onDelete,
    handleTop,
    handleBottom,
    handleDown,
    handleUp,
    translate,
  } = props;

  const handleClick = (text) => {
    onAdd(text);
  };

  return (
    <div>
      <StyledMenu
        id={props.id}
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        MenuListProps={{
          "aria-labelledby": props.id,
        }}
      >
        {parentLevel == false ? (
          <>
            <MenuItem onClick={onEdit} disableRipple>
              <FontAwesomeIcon sx={{ fontSize: "1rem" }} icon={faEdit} />
              {translate("Edit")}
            </MenuItem>
            <MenuItem onClick={onDelete} disableRipple>
              <FontAwesomeIcon sx={{ fontSize: "1rem" }} icon={faTrash} />
              {translate("Delete")}
            </MenuItem>
            <div style={{ paddingLeft: "0.6rem" }}>
              <MenuItem onClick={handleTop} disableRipple>
                {translate("Top")}
              </MenuItem>
              <MenuItem onClick={handleUp} disableRipple>
                {translate("Up")}
              </MenuItem>
              <MenuItem onClick={handleDown} disableRipple>
                {translate("Down")}
              </MenuItem>
              <MenuItem onClick={handleBottom} disableRipple>
                {translate("Bottom")}
              </MenuItem>
            </div>
          </>
        ) : (
          <div style={{ paddingLeft: "0.6rem" }}>
            <MenuItem onClick={props.onAddModal}>{props.title}</MenuItem>
          </div>
        )}
      </StyledMenu>
    </div>
  );
}
