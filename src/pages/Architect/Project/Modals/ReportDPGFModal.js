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
import { exportPDFSimpleDPGF, exportPDFTradesDPGF, exportPDFTradesAndTrancesDPGF } from '../ReportsGen/genPDF';
import { exportDOCXSimpleDPGF, exportDOCXTradesDPGF, exportDOCXTradesAndTranchesDPGF } from '../ReportsGen/genDocx';
import { downloadBlob } from '../ReportsGen/data';

import { toast } from 'react-toastify';

function ReportDPGFModal(props) {
  const { projectWorkData, currentProject, viewBlob, viewFileName, onClose } = props;

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
        res = await exportPDFSimpleDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportPDFTradesDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportPDFTradesAndTrancesDPGF(projectWorkData, currentProject);
      } else {
        console.trace('Show me');
        return;
      }
      downloadBlob(res.blob, res.filename);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  async function generateWord() {
    try {
      let res;
      if (currentProject.market_type == 'Simple' || currentProject.market_type == 'PurchaseOrder') {
        res = await exportDOCXSimpleDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'Trades') {
        res = await exportDOCXTradesDPGF(projectWorkData, currentProject);
      } else if (currentProject.market_type == 'TradesAndTranches') {
        res = await exportDOCXTradesAndTranchesDPGF(projectWorkData, currentProject);
      } else {
        console.trace('Show me');
        return;
      }
      downloadBlob(res.blob, res.filename);
    } catch (e) {
      toast.error('Could not generate report successfully.');
      console.trace(e);
    }
  }

  return (
    <>
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
          <IconButton aria-label="PDF" onClick={generateWord}>
            <TextSnippetIcon />
          </IconButton>
        </Stack>
        {pdfs.length > 0 && (
          <>
            <DocViewer documents={pdfs} style={{ maxHeight: '200px' }} />
          </>
        )}
      </div>
    </>
  );
}

export default ReportDPGFModal;
