import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { blueGrey, red } from "@mui/material/colors";

const ColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "myProp",
})(({ theme, myProp, defaultTheme, backgroundColor }) => ({
  color: theme.palette.getContrastText(blueGrey[500]),
  backgroundColor: defaultTheme == false ? backgroundColor[500] : blueGrey[500],
  borderColor: blueGrey[500],
  borderRadius: "6px",
  textTransform: "none",
  padding: "5px 20px",
  "&:hover": {
    backgroundColor:
      defaultTheme == false ? backgroundColor[700] : blueGrey[700],
    borderColor: theme.palette.getContrastText(blueGrey[700]),
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: blueGrey[500],
    borderColor: blueGrey[500],
  },
}));

export default function CustomizedButtons(props) {
  return (
    <ColorButton
      startIcon={props.startIcon}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
      variant={props.variant}
      defaultTheme={props.default}
      backgroundColor={props.backgroundColor}
    >
      {props.label}
    </ColorButton>
  );
}
