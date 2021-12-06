import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";

export default function index(props) {
  return (
    <IconButton
      className={props.className}
      id={props.id}
      sx={props.sx}
      onClick={props.onClick}
      aria-label="Example"
    >
      <FontAwesomeIcon icon={props.icon} />
    </IconButton>
  );
}
