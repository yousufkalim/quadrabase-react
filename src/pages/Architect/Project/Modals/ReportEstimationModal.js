// init
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Modal from "../../../../components/Architect/Modal";

import PreviewFileModal from "./PreviewFileModal";

// Reports
import {
  exportXLSXSimpleEstimation,
  exportXLSXTradesEstimation,
  exportXLSXTradesAndTranchesEstimation,
} from "../ReportsGen/genExcel";
import {
  exportPDFSimpleEstimation,
  exportPDFTradesEstimation,
  exportPDFTradesAndTranchesEstimation,
} from "../ReportsGen/genPDF";
import {
  exportDOCXSimpleEstimation,
  exportDOCXTradesEstimation,
  exportDOCXTradesAndTranchesEstimation,
} from "../ReportsGen/genDocx";

import { toast } from "react-toastify";

function ReportEstimationModal(props) {
  const { projectWorkData, currentProject } = props;

  const [openFilePreviewModal, setOpenFilePreviewModal] = useState(false);
  const handleOpenFilePreviewModal = () => {
    setOpenFilePreviewModal(!openFilePreviewModal);
  };

  const [blob, setBlob] = useState(null);
  const [filename, setFilename] = useState(null);
  const [filetype, setFiletype] = useState(null);

  function generateExcel() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = exportXLSXSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = exportXLSXTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = exportXLSXTradesAndTranchesEstimation(
          projectWorkData,
          currentProject
        );
      } else {
        console.trace("Show me");
        return;
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setFiletype("xlsx");
      handleOpenFilePreviewModal();
    } catch (e) {
      toast.error("Could not generate report successfully.");
      console.trace(e);
    }
  }

  function generatePDF() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = exportPDFSimpleEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = exportPDFTradesEstimation(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = exportPDFTradesAndTranchesEstimation(
          projectWorkData,
          currentProject
        );
      } else {
        console.trace("Show me");
        return;
      }
      setBlob(res.blob);
      setFilename(res.filename);
      setFiletype("pdf");
      handleOpenFilePreviewModal();
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
        res = await exportDOCXTradesAndTranchesEstimation(
          projectWorkData,
          currentProject
        );
      } else {
        console.trace("Show me");
        return;
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
    <>
      <div style={{ width: "30vw" }}>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="Excel" onClick={generateExcel}>
            <SummarizeIcon />
          </IconButton>
          <IconButton aria-label="PDF" onClick={generatePDF}>
            <PictureAsPdfIcon />
          </IconButton>
          <IconButton aria-label="Word" onClick={generateWord}>
            <TextSnippetIcon />
          </IconButton>
        </Stack>
        <Modal
          title={"File Preview"}
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
    </>
  );
}

export default ReportEstimationModal;
