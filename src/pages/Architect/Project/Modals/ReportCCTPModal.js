// init
import React, { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DocViewer from '../../ProjectLibraries/component/DocViewer';
import api from '../../../../api';
import CloseIcon from '@mui/icons-material/Close';

// Reports
import { exportPDFSimpleCCTP, exportPDFTradesCCTP, exportPDFTradesAndTranchesCCTP } from '../ReportsGen/genPDF';
import { exportDOCXSimpleCCTP, exportDOCXTradesCCTP, exportDOCXTradesAndTranchesCCTP } from '../ReportsGen/genDocx';
import { downloadBlob } from '../ReportsGen/data';

import { toast } from 'react-toastify';

function ReportCCTPModal(props) {
  const { projectWorkData, currentProject, selectedCCTPIndexes, viewBlob, viewFileName, onClose } = props;

  const [pdfs, setPdfs] = useState([]);
  useEffect(() => {
    uploadFile();
  }, []);

  const uploadFile = async () => {
    const formData = new FormData();
    const file = new File([viewBlob], viewFileName + '.pdf');
    formData.append(`file`, file);
    const response = await api('post', `/fileUploader`, formData);
    setPdfs(response.data.files);
  };

  async function generatePDF() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportPDFSimpleCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTranchesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else {
        console.trace('Show me');
        return;
      }
      downloadBlob(res.blob, res.filename);
    } catch (e) {
      toast.error('Impossible de générer le rapport avec succès.');
      console.trace(e);
    }
  }

  async function generateWord() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportDOCXSimpleCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportDOCXTradesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportDOCXTradesAndTranchesCCTP(projectWorkData, currentProject, selectedCCTPIndexes);
      } else {
        console.trace('Show me');
        return;
      }
      downloadBlob(res.blob, res.filename);
    } catch (e) {
      toast.error('Impossible de générer le rapport avec succès.');
      console.trace(e);
    }
  }

  return (
    <div style={{ width: '60vw', maxHeight: '85vh', overflow: 'auto' }}>
      <CloseIcon
        fontSize="medium"
        style={{ position: 'absolute', top: '2%', right: '2%', cursor: 'pointer' }}
        onClick={onClose}
      />
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="PDF" onClick={generatePDF}>
          <PictureAsPdfIcon />
        </IconButton>
        <IconButton aria-label="DOCX" onClick={generateWord}>
          <TextSnippetIcon />
        </IconButton>
      </Stack>
      {pdfs.length > 0 && (
        <>
          <DocViewer documents={pdfs} style={{ maxHeight: '200px' }} />
        </>
      )}
    </div>
  );
}

export default ReportCCTPModal;
