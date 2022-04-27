import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CircleIcon from "@mui/icons-material/Circle";

const ProviderModal = ({ handleOpenProviderModal, providers }) => {
  const { t } = useTranslation();
  return (
    <div style={{ width: "45vw", maxHeight: "80vh", overflow: "auto" }}>
      {console.log("providers", providers)}

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
          {providers.map((item) => {
            return (
              <li
                style={{ cursor: item.url && "pointer" }}
                onClick={() => {
                  if (item.url) {
                    window.open(item.url, "_blank");
                  }
                }}
              >
                <CircleIcon style={{ fontSize: 8 }} />
                &nbsp;&nbsp;
                {item.name}
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
          onClick={handleOpenProviderModal}
        >
          {t("Close")}
        </Button>
      </div>
    </div>
  );
};

export default ProviderModal;
