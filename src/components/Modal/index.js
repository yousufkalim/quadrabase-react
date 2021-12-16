import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

export default function BasicModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    width: props.width ? props.width : "60%",
    height: props.height ? props.height : "60%",

    bgcolor: "background.paper",
    border: "none",
    borderRadius: "12px",
    outlineColor: "#fff",
    outline: "none",
    boxShadow: 24,
    p: 2,
  };
  return (
    <Modal open={props.open}>
      <Box sx={style}>
        <div className="flex justify-center">
          <h2 className="text-gray-600 capitalize font-semibold text-3xl">
            {props.translate ? props.translate(`${props.title}`) : props.title}
          </h2>
        </div>
        {props.component}
      </Box>
    </Modal>
  );
}
