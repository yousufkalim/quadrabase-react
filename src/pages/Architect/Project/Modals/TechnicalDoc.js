import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const TechnicalDoc = ({ handleDocModal, technicalDoc }) => {
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
      >
        <ul>
          {technicalDoc?.map((item, index) => {
            let name = item.split("/");
            name = name[name.length - 1];
            name = name.slice(14);
            return (
              <li
                style={{
                  cursor: "pointer",
                  display: "flex",
                  marginBottom: 10,
                  alignItems: "center",
                }}
                onClick={() => {
                  window.open(item, "_blank");
                }}
              >
                {index + 1} - {name}
              </li>
            );
          })}
        </ul>
      </div>
      <br />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3b373c",
            marginRight: "10px !important",
            height: "35px !important",
          }}
          onClick={handleDocModal}
        >
          {t("Close")}
        </Button>
      </div>
    </div>
  );
};

export default TechnicalDoc;
