// init
import React from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Modal from "../../../../components/Architect/Modal";

import PreviewFileModal from "./PreviewFileModal";
import FileViewer from "react-file-viewer";

// Reports
import { exportDOCXSimpleCCTP, exportDOCXTradesCCTP, exportDOCXTradesAndTranchesCCTP } from "../ReportsGen/genDocx";
import { downloadBlob } from "../ReportsGen/data";

import { toast } from "react-toastify";

function ReportCCTPModal(props) {
  const { projectWorkData, currentProject, viewBlob, viewFileName, viewFileType } = props;
  const blobURL = URL.createObjectURL(props.viewBlob);

  async function generateWord() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = await exportDOCXSimpleCCTP(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportDOCXTradesCCTP(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportDOCXTradesAndTranchesCCTP(projectWorkData, currentProject);
      } else {
        console.trace("Show me");
        return;
      }
      downloadBlob(res.blob, res.filename);
    } catch (e) {
      toast.error("Could not generate report successfully.");
      console.trace(e);
    }
  }

  return (
    <div style={{ width: "60vw", maxHeight: "85vh", overflow: "auto" }}>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="DOCX" onClick={generateWord}>
          <TextSnippetIcon />
        </IconButton>
      </Stack>
      {props.viewFileType == "docx" && <FileViewer fileType={props.viewFileType} filePath={blobURL} />}
    </div>
  );
}

export default ReportCCTPModal;
