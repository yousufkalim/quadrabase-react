// init
import React from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";

// component
import { Button } from "@mui/material";
import ChapList from "../component/ChapList";

const EditChap0Part2 = ({
  handleOpenEditChap0Part2Modal,
  editChap0Part2,
  handleOpenEditChapModal,
  handleOpenDeleteChapModal,
  currentProject,
  setEditChap0Part2,
  handleOpenAddChapModal,
  setParentChap,
}) => {
  const { t } = useTranslation();

  return (
    <div style={{ width: "45vw", maxHeight: 600, overflow: "auto" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav" aria-labelledby="nested-list-subheader">
        {editChap0Part2.map((item) => {
          return (
            <ChapList
              editChap0Part2={item}
              handleOpenEditChapModal={handleOpenEditChapModal}
              handleOpenDeleteChapModal={handleOpenDeleteChapModal}
              currentProject={currentProject}
              setEditChap0Part2={setEditChap0Part2}
              handleOpenAddChapModal={handleOpenAddChapModal}
              setParentChap={setParentChap}
            />
          );
        })}
      </List>
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
