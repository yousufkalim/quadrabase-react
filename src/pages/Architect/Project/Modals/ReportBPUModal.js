// init
import React from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FileViewer from "react-file-viewer";

// Reports
import { exportPDFSimpleBPU, exportPDFTradesBPU, exportPDFTradesAndTranchesBPU } from "../ReportsGen/genPDF";
import { exportDOCXSimpleBPU, exportDOCXTradesBPU, exportDOCXTradesAndTranchesBPU } from "../ReportsGen/genDocx";
import { downloadBlob } from "../ReportsGen/data";

import { toast } from "react-toastify";

function ReportBPUModal(props) {
  const { projectWorkData, currentProject } = props;
  const blobURL = URL.createObjectURL(props.viewBlob);

  async function generatePDF() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = await exportPDFSimpleBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportPDFTradesBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportPDFTradesAndTranchesBPU(projectWorkData, currentProject);
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

  async function generateWord() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = await exportDOCXSimpleBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportDOCXTradesBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportDOCXTradesAndTranchesBPU(projectWorkData, currentProject);
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
        <IconButton aria-label="PDF" onClick={generatePDF}>
          <PictureAsPdfIcon />
        </IconButton>
        <IconButton aria-label="DOCX" onClick={generateWord}>
          <TextSnippetIcon />
        </IconButton>
      </Stack>
      {props.viewFileType == "docx" && <FileViewer fileType={props.viewFileType} filePath={blobURL} />}
    </div>
  );
}

export default ReportBPUModal;
