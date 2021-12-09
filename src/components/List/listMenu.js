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
  const handleClick = (text) => {
    props.parentLevel == true
      ? props.onAdd("level0", text)
      : props.onAdd(props.level, text);
  };
  if (props.parentLevel == true) {
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
          <div style={{ paddingLeft: "0.6rem" }}>
            {props.text && (
              <>
                <MenuItem onClick={() => handleClick(props.text)}>
                  {props.text.replace("_", " ")}
                </MenuItem>
              </>
            )}
          </div>
        </StyledMenu>
      </div>
    );
  }
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
        <MenuItem onClick={() => handleClick("Edit")} disableRipple>
          <FontAwesomeIcon sx={{ fontSize: "1rem" }} icon={faEdit} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleClick("Delete")} disableRipple>
          <FontAwesomeIcon sx={{ fontSize: "1rem" }} icon={faTrash} />
          Delete
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <div style={{ paddingLeft: "0.6rem" }}>
          <MenuItem onClick={props.onClose} disableRipple>
            Up
          </MenuItem>
          <MenuItem onClick={props.onClose} disableRipple>
            Down
          </MenuItem>
          <MenuItem onClick={props.onClose} disableRipple>
            Rise
          </MenuItem>
          <MenuItem onClick={props.onClose} disableRipple>
            Go Down
          </MenuItem>
          {props.text && (
            <>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem onClick={() => handleClick(props.text)}>
                {props.text.replace("_", " ")}
              </MenuItem>
            </>
          )}
        </div>
      </StyledMenu>
    </div>
  );
}
