// init
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Modal from "../../../../components/Architect/Modal";

import PreviewFileModal from "./PreviewFileModal";

// Reports
import {
  exportDOCXSimpleCCTP,
  exportDOCXTradesCCTP,
  exportDOCXTradesAndTranchesCCTP,
} from "../ReportsGen/genDocx";

import { toast } from "react-toastify";

function ReportCCTPModal(props) {
  const { projectWorkData, currentProject } = props;

  const [openFilePreviewModal, setOpenFilePreviewModal] = useState(false);
  const handleOpenFilePreviewModal = () => {
    setOpenFilePreviewModal(!openFilePreviewModal);
  };

  const [blob, setBlob] = useState(null);
  const [filename, setFilename] = useState(null);
  const [filetype, setFiletype] = useState(null);

  async function generateWord() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = await exportDOCXSimpleCCTP(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportDOCXTradesCCTP(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportDOCXTradesAndTranchesCCTP(
          projectWorkData,
          currentProject
        );
      } else {
        console.trace("Show me");
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setFiletype("docx");
      handleOpenFilePreviewModal();
    } catch (e) {
      toast.error("Could not generate report successfully.");
      console.trace(e);
    }
  }

  return (
    <div style={{ width: "30vw" }}>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="Word" onClick={generateWord}>
          <TextSnippetIcon />
        </IconButton>
      </Stack>
      <Modal
        title={filename}
        open={openFilePreviewModal}
        onClose={handleOpenFilePreviewModal}
        component={
          <PreviewFileModal
            handleOpen={handleOpenFilePreviewModal}
            blob={blob}
            filename={filename}
            filetype={filetype}
          />
        }
      />
    </div>
  );
}

export default ReportCCTPModal;
