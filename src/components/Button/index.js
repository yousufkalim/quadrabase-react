import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { blueGrey } from "@mui/material/colors";

const ColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "myProp",
})(
  ({ theme, defaultTheme, backgroundColor, color, borderColor, paddingY }) => ({
    color:
      defaultTheme == false
        ? color
          ? color
          : theme.palette.getContrastText(blueGrey[500])
        : theme.palette.getContrastText(blueGrey[500]),
    backgroundColor:
      defaultTheme == false
        ? backgroundColor
          ? backgroundColor[500]
          : blueGrey[500]
        : blueGrey[500],
    borderColor:
      defaultTheme == false
        ? borderColor
          ? borderColor
          : blueGrey[500]
        : blueGrey[500],
    borderRadius: "26px",
    border: defaultTheme == false ? "0.1px solid " : "none",
    textTransform: "none",
    margin:
      defaultTheme == false ? (paddingY ? "0px 20px 0px 0px" : "") : "",
    padding:
      defaultTheme == false ? (paddingY ? "0px 35px" : "5px 20px") : "5px 20px",
    "&:hover": {
      backgroundColor:
        defaultTheme == false
          ? backgroundColor
            ? backgroundColor[700]
            : blueGrey[700]
          : blueGrey[700],
      borderColor:
        defaultTheme == false
          ? borderColor
            ? borderColor
            : theme.palette.getContrastText(blueGrey[700])
          : theme.palette.getContrastText(blueGrey[700]),
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: blueGrey[500],
      borderColor: blueGrey[500],
    },
  })
);

export default function CustomizedButtons(props) {
  return (
    <ColorButton
      startIcon={props.startIcon}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
      variant={props.variant}
      color={props.color}
      defaultTheme={props.default}
      borderColor={props.borderColor}
      paddingY={props.paddingY}
      backgroundColor={props.backgroundColor}
    >
      {props.translate ? props.translate(`${props.label}`) : props.label}
    </ColorButton>
  );
}
