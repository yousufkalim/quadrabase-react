import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListMenu from "./listMenu";

import {
  faAngleRight,
  faAngleDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
export default function subList(props) {
  let {
    level,
    handleanchorEl,
    handleClose,
    openanchorEl,
    anchorEl,
    text,
    label,
    open,
    nodeKey,
    handleClick,
  } = props;
  let obj = {};
  obj[`${nodeKey}`] = nodeKey;
  obj[nodeKey] = !open;

  return (
    <>
      <ListMenu
        onClick={handleanchorEl}
        onClose={handleClose}
        open={openanchorEl}
        anchorEl={anchorEl}
        text={text}
      />
      <ListItem key={nodeKey} button>
        {open ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} />
        )}
        <ListItemText
          inset
          primary={label}
          onClick={() => handleClick(level, obj)}
        />
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleanchorEl(e, level)}
          id="demo-customized-button"
        />
      </ListItem>
    </>
  );
}
