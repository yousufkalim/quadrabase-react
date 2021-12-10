import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import {
  faAngleRight,
  faAngleDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
export default function subList(props) {
  let { level, handleanchorEl, name, open, nodeKey, handleClick, Index, _id } =
    props;
  let obj = {};
  obj[`${nodeKey}`] = nodeKey;
  obj[nodeKey] = !open;
  return (
    <>
      <ListItem key={_id} button>
        {open ? (
          <FontAwesomeIcon
            icon={faAngleDown}
            onClick={() => handleClick(level, _id, obj)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faAngleRight}
            onClick={() => handleClick(level, _id, obj)}
          />
        )}
        <ListItemText
          inset
          primary={name}
          onClick={() => handleClick(level, _id, obj)}
        />
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleanchorEl(e, _id, level, Index)}
          id="demo-customized-button"
        />
      </ListItem>
    </>
  );
}
