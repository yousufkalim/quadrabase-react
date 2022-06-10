// init
import React, { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DocViewer from "../../ProjectLibraries/component/DocViewer";
import api from "../../../../api";

// Reports
import {
  exportXLSXSimpleEstimation,
  exportXLSXTradesEstimation,
  exportXLSXTradesAndTranchesEstimation,
} from "../ReportsGen/genExcel";
import { exportPDFSimpleEstimation, exportPDFTradesEstimation, exportPDFTradesAndTranchesEstimation } from "../ReportsGen/genPDF";
import {
  exportDOCXSimpleEstimation,
  exportDOCXTradesEstimation,
  exportDOCXTradesAndTranchesEstimation,
} from "../ReportsGen/genDocx";
import { downloadBlob } from "../ReportsGen/data";

import { toast } from "react-toastify";

function ReportEstimationModal(props) {
  const { projectWorkData, currentProject, viewBlob, viewFileName, viewFileType } = props;

  const [pdf, setPdf] = useState([]);

  useEffect(() => {
    uploadFile();
  }, []);

  const uploadFile = async () => {
    if (viewFileType === "pdf") {
      let form_data = new FormData();
      var file = new File([viewBlob], viewFileName + ".pdf");
      form_data.append(`file`, file);
      const response = await api("post", `/fileUploader`, form_data);
      setPdf(response.data.files);
    }
  };

  function generateExcel() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = exportXLSXSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = exportXLSXTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = exportXLSXTradesAndTranchesEstimation(projectWorkData, currentProject);
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

  async function generatePDF() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = await exportPDFSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportPDFTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportPDFTradesAndTranchesEstimation(projectWorkData, currentProject);
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
        res = await exportDOCXSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportDOCXTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportDOCXTradesAndTranchesEstimation(projectWorkData, currentProject);
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
    <>
      <div style={{ width: "60vw", maxHeight: "85vh", overflow: "auto" }}>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="XLSX" onClick={generateExcel}>
            <SummarizeIcon />
          </IconButton>
          <IconButton aria-label="PDF" onClick={generatePDF}>
            <PictureAsPdfIcon />
          </IconButton>
          <IconButton aria-label="DOCX" onClick={generateWord}>
            <TextSnippetIcon />
          </IconButton>
        </Stack>
        {pdf.length > 0 && (
          <>
            <DocViewer documents={pdf} style={{ maxHeight: "200px" }} />
          </>
        )}
      </div>
    </>
  );
}

export default ReportEstimationModal;
