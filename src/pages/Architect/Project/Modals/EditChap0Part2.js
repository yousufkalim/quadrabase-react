// init
import React from "react";
import { useTranslation } from "react-i18next";

// component
import { Button } from "@mui/material";
import ChapList from "../component/ChapList";

const EditChap0Part2 = ({
  handleOpenEditChap0Part2Modal,
  editChap0Part2,
  handleOpenEditChapModal,
}) => {
  const { t } = useTranslation();

  return (
    <div style={{ width: "45vw", maxHeight: 600, overflow: "auto" }}>
      <ChapList
        editChap0Part2={editChap0Part2}
        handleOpenEditChapModal={handleOpenEditChapModal}
      />
      {/* create button */}
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3b373c",
            height: "35px",
          }}
          onClick={handleOpenEditChap0Part2Modal}
        >
          {t("Close")}
        </Button>
      </div>
    </div>
  );
};

export default EditChap0Part2;
