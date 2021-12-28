import React from "react";
import FontAwesomeIcon from "../FontAwesomeIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

import {
  faBookmark,
  faAngleDown,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
export default function subList(props) {
  let { handleanchorEl, name, _id } = props;

  return (
    <>
      <ListItem key={_id} button>
        <ListItemText sx={{ paddingLeft: "10px" }} primary={name} />
        <FontAwesomeIcon
          icon={faEllipsisV}
          onClick={(e) => handleanchorEl(e, _id)}
          id="unit-customized-button"
        />
      </ListItem>
    </>
  );
}
