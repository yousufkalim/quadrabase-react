// init
import React from "react";

import Checkbox from "@mui/material/Checkbox";

function ReportSelectCCTPModal({ selectedCCTPIndexes, setSelectedCCTPIndexes }) {
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
        {[
          "Chapitre 1 – DOCUMENTS DE REFERENCE CONTRACTUELS",
          "Chapitre 2 – PROVENANCES ET SPECIFICATIONS DES MATERIAUX ET PRODUITS",
          "Chapitre 3 – MODE D’EXECUTION DES TRAVAUX ET PRESTATIONS",
          "Chapitre 4 – ESSAIS – CONTRÔLES – RECEPTION",
        ].map((_, __) => (
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
      </div>
    </div>
  );
}

export default ReportSelectCCTPModal;
