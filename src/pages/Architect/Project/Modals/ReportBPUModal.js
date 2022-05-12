// init
import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Modal from "../../../../components/Architect/Modal";

import PreviewFileModal from "./PreviewFileModal";

// Reports
import {
  exportPDFSimpleBPU,
  exportPDFTradesBPU,
  exportPDFTradesAndTranchesBPU,
} from "../ReportsGen/genPDF";
import {
  exportDOCXSimpleBPU,
  exportDOCXTradesBPU,
  exportDOCXTradesAndTranchesBPU,
} from "../ReportsGen/genDocx";

import { toast } from "react-toastify";

function ReportBPUModal(props) {
  const { projectWorkData, currentProject } = props;

  const [openFilePreviewModal, setOpenFilePreviewModal] = useState(false);
  const handleOpenFilePreviewModal = () => {
    setOpenFilePreviewModal(!openFilePreviewModal);
  };

  const [blob, setBlob] = useState(null);
  const [filename, setFilename] = useState(null);
  const [filetype, setFiletype] = useState(null);

  function generatePDF() {
    try {
      let res;
      if (currentProject.market_type == "Simple") {
        res = exportPDFSimpleBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = exportPDFTradesBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = exportPDFTradesAndTranchesBPU(projectWorkData, currentProject);
      } else {
        console.trace("Show me");
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
        res = await exportDOCXSimpleBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "Trades") {
        res = await exportDOCXTradesBPU(projectWorkData, currentProject);
      } else if (currentProject.market_type == "TradesAndTranches") {
        res = await exportDOCXTradesAndTranchesBPU(
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
        {/* <IconButton aria-label="PDF" onClick={generatePDF}>
          <PictureAsPdfIcon />
        </IconButton> */}
        <IconButton aria-label="PDF" onClick={generateWord}>
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
  );
}

export default ReportBPUModal;
