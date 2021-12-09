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
    name,
    open,
    nodeKey,
    handleClick,
    onAdd,
    parentLevel,
    _id,
  } = props;
  let obj = {};
  obj[`${nodeKey}`] = nodeKey;
  obj[nodeKey] = !open;
  return (
    <>
      <ListMenu
        onClick={handleanchorEl}
        onClose={handleClose}
        onAdd={onAdd}
        open={openanchorEl}
        anchorEl={anchorEl}
        text={text}
        parentLevel={parentLevel}
        level={level}
        id={"demo-customized-button"}
        _id={_id}
      />
      <ListItem key={_id} button>
        {open ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} />
        )}
        <ListItemText
          inset
          primary={name}
          onClick={() => handleClick(level, obj)}
        />
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleanchorEl(e, _id, level)}
          id="demo-customized-button"
        />
      </ListItem>
    </>
  );
}
