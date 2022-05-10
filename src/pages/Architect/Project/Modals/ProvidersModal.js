import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import noLogo from "../../../../assets/nologo.png";

const ProviderModal = ({ handleOpenProviderModal, providers }) => {
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
          {providers.map((item) => {
            return (
              <li
                style={{
                  cursor: item.url && "pointer",
                  display: "flex",
                  marginBottom: 10,
                  alignItems: "center",
                }}
                onClick={() => {
                  if (item.url) {
                    window.open(item.url, "_blank");
                  }
                }}
              >
                <img src={item.logo ? item.logo : noLogo} width="65" />
                &nbsp;&nbsp;
                {item.establishment}
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
