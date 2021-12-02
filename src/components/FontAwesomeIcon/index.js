import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";

export default function index(props) {
  return (
    <IconButton id={props.id} onClick={props.onClick} aria-label="Example">
      <FontAwesomeIcon icon={props.icon} />
    </IconButton>
  );
}
