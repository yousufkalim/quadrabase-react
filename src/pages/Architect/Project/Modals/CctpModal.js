import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const CctpModal = ({ handleOpenCctpModal, cctp_text }) => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "45vw", maxHeight: "80vh", overflow: "auto" }}>
      <div
        style={{
          fontSize: 18,
          border: "1px solid lightgray",
          padding: 15,
          height: 250,
          overflowX: "hidden",
          overflowY: "scroll",
        }}
        dangerouslySetInnerHTML={{
          __html: cctp_text.length > 5 ? cctp_text : "No text",
        }}
      ></div>
      <br />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3b373c",
            marginRight: "10px !important",
            height: "35px !important",
          }}
          onClick={handleOpenCctpModal}
        >
          {t("Close")}
        </Button>
      </div>
    </div>
  );
};

export default CctpModal;
