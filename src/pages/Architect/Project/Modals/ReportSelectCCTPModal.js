// init
import React from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

import { useTranslation } from "react-i18next";

import { cctpArr } from "../../../../utils/Constants";

function ReportSelectCCTPModal(props) {
  const { selectedCCTPIndexes, setSelectedCCTPIndexes, handleClose, handleSubmit } = props;

  const { t } = useTranslation();

  const handleIndex = (_) => {
    const contains = selectedCCTPIndexes.includes(_);
    const cp = [...selectedCCTPIndexes];
    if (contains) {
      const index = cp.indexOf(_);
      if (index > -1) {
        cp.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      cp.push(_);
    }
    setSelectedCCTPIndexes(cp);
  };

  return (
    <div style={{ width: "60vw", maxHeight: "85vh", overflow: "auto", display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          height: "100%",
          width: "100%",
        }}
      >
        {cctpArr.map((_, __) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
              width: "100%",
            }}
          >
            <Checkbox sx={{ marginRight: "20px" }} checked={selectedCCTPIndexes.includes(__)} onChange={(e) => handleIndex(__)} />
            <p style={{ fontSize: "14px" }}>{_}</p>
          </div>
        ))}
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3B373C",
              height: "35px !important",
            }}
            onClick={handleClose}
          >
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8C1244",
              height: "35px !important",
            }}
            onClick={handleSubmit}
          >
            {t("Create")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportSelectCCTPModal;
