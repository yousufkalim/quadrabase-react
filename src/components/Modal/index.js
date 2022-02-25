import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import { red } from "@mui/material/colors";

export default function BasicModal(props) {
  const { titleUpperCase, translate } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: props.left ? props.left : "55%",
    transform: "translate(-50%, -50%)",
    width: props.width ? props.width : "60%",
    // height: props.height ? props.height : "100%",

    bgcolor: "background.paper",
    border: "none",
    borderRadius: "12px",
    outlineColor: "#fff",
    outline: "none",
    boxShadow: 24,
    p: 2,
    maxHeight: "95vh",
    overflow: "auto",
  };
  return (
    <Modal open={props.open}>
      <Box sx={style}>
        {props.addWork && props.addWork == true ? (
          <div className="px-5 py-1">
            <div className="flex justify-center">
              <h2
                className={`text-gray-600 ${
                  titleUpperCase ? "uppercase" : ""
                } font-semibold text-3xl`}
              >
                {props.translate
                  ? props.translate(`${props.title}`)
                  : props.title}
              </h2>
            </div>
            {props.component}
            {(props.delete && props.delete == true) ||
            (props.library && props.library == true) ? (
              ""
            ) : (
              <div className="flex pb-2 justify-end ">
                <div className="">
                  <Button
                    onClick={props.onClose}
                    label={translate("Close")}
                    backgroundColor={red}
                    default={false}
                    translate={props.translate}
                  />
                </div>
                <div className=" ml-3">
                  {props.buttonLabel && (
                    <Button
                      onClick={props.onSubmit}
                      label={props.buttonLabel}
                      default={true}
                      translate={props.translate}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-center">
              <h2
                className={`text-gray-600 ${
                  titleUpperCase ? "uppercase" : ""
                } font-semibold text-3xl`}
              >
                {props.translate
                  ? props.translate(`${props.title}`)
                  : props.title}
              </h2>
            </div>
            {props.component}
            {(props.delete && props.delete == true) ||
            (props.library && props.library == true) ? (
              ""
            ) : (
              <div className="flex pb-2 justify-end ">
                <div className="">
                  <Button
                    onClick={props.onClose}
                    label={translate("Close")}
                    backgroundColor={red}
                    default={false}
                    translate={props.translate}
                  />
                </div>
                <div className=" ml-3">
                  {props.buttonLabel && (
                    <Button
                      onClick={props.onSubmit}
                      label={props.buttonLabel}
                      default={true}
                      translate={props.translate}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
}
