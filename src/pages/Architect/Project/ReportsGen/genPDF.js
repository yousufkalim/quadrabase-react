import api from '../../../../api';

import {
  headGen,
  rowsGenSimpleEstimation,
  rowsGenTradesEstimation,
  rowsGenTradesAndTranchesEstimation,
  rowsGenSimpleBPU,
  rowsGenTradesBPU,
  rowsGenTradesAndTranchesBPU,
  rowsGenSimpleDPGF,
  rowsGenTradesDPGF,
  rowsGenTradesAndTranchesDPGF,
  rowsGenSimpleCCTP,
  rowsGenTradesCCTP,
  rowsGenTradesAndTranchesCCTP,
  pdfParsedDataGenTradesEstimation,
  pdfParsedDataGenTradesAndTranchesEstimation,
  docxParsedDataGenTradesDPGF,
  docxParsedDataGenTradesAndTranchesDPGF,
  footerDataGenSimpleEstimation,
  footerDataGenTradesEstimation,
  footerDataGenTradesAndTranchesEstimation,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
  blobFromURL,
} from './data.js';

import { exportDOCXSimpleDPGF, exportDOCXSimpleCCTP, exportDOCXTradesCCTP, exportDOCXTradesAndTranchesCCTP } from './genDocx';

async function exportPDFSimpleEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'.toUpperCase()}`, `${currentProject?.name ?? 'N/A'}`);
  const bodyArr = rowsGenSimpleEstimation(data, noPrice); // It's the same thing in case of pdf plugin.
  const footerArr = footerDataGenSimpleEstimation(data, currentProject, noPrice);
  const footerColumnsSimpleEstimationdata = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationdata[2] = `${footerColumnsSimpleEstimationdata[2]} (${currentProject?.vat?.value}%) :`;

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: bodyArr,
    footerKeysArr: footerColumnsSimpleEstimationdata,
    footerValuesArr: footerArr,
  };

  const response = await api('post', `/Reports/simple_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`.toUpperCase(), `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace[2] = `${footerColumnsSimpleEstimationNoSpace[2]} (${currentProject?.vat?.value}%) :`;
  footerColumnsSimpleEstimationNoSpace.splice(0, 1);
  let pdfParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesEstimation(data, currentProject, noPrice, false);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = pdfParsedDataGenTradesEstimation(currentRow, i + 1, noPrice);
    pdfParsedData = pdfParsedData.concat(currentRowPDFParsedData);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
    footerKeysArr: footerColumnsSimpleEstimationNoSpace,
    footerValuesArr: footerDataFloatsArr,
    type: 'trades',
  };

  const response = await api('post', `/Reports/tt_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesEstimation(_data, currentProject, noPrice) {
  const data = structuredClone(_data);
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`.toUpperCase(), `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace[2] = `${footerColumnsSimpleEstimationNoSpace[2]} (${currentProject?.vat?.value}%) :`;
  footerColumnsSimpleEstimationNoSpace.splice(0, 1);
  let pdfParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesAndTranchesEstimation(data, currentProject, noPrice, false);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = pdfParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1, noPrice);
    pdfParsedData = pdfParsedData.concat(currentRowPDFParsedData);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
    footerKeysArr: footerColumnsSimpleEstimationNoSpace,
    footerValuesArr: footerDataFloatsArr,
    type: 'tranches',
  };

  const response = await api('post', `/Reports/tt_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFSimpleBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);
  const pdfParsedData = rowsGenSimpleBPU(data, 'pdf');

  for (let i = 0; i < pdfParsedData.length; i++) {
    const work = pdfParsedData[i];
    const workSecondCol = work[1];

    let str = '';

    if (workSecondCol.type == 'workDetail') {
      str = str.concat(
        `<p style="font-weight: 600; font-style: italic; padding: 7px">${
          workSecondCol.title
        } <br> <span style="font-weight: 600; font-style: normal"> ${workSecondCol.text.toUpperCase()} (EN TOUTES LETTRES) </span> :</p>`
      );
    } else {
      str = str.concat(
        `<p style="font-weight: 600; padding: 7px">${
          workSecondCol.title
        } <br> <span style="font-weight: 400; font-style: normal">${workSecondCol.text.substring(
          3,
          workSecondCol.text.length - 5
        )}</span> <br> ${
          workSecondCol.unit
            ? `<span style="font-weight: 600">${workSecondCol.unit.toUpperCase()} (EN TOUTES LETTRES) : </span>`
            : ''
        } </p>`
      );
    }

    work[1] = str;
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api('post', `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);
  const pdfParsedData = rowsGenTradesBPU(data, 'pdf');

  const pdfHTMLData = [];
  for (let i = 0; i < pdfParsedData.length; i++) {
    const trade = pdfParsedData[i];
    const tradeSecondCol = trade.rows[1];

    let str = '';
    str = str.concat(`<p>${tradeSecondCol}</p>`);
    trade.rows[1] = str;
    pdfHTMLData.push(trade.rows);

    for (let j = 0; j < trade.arr.length; j++) {
      const work = trade.arr[j];
      const workSecondCol = work[1];

      let str = '';

      if (workSecondCol.type == 'workDetail') {
        str = str.concat(
          `<p style="font-weight: 600; font-style: italic; padding: 7px">${
            workSecondCol.title
          } <br> <span style="font-weight: 600; font-style: normal"> ${workSecondCol.text.toUpperCase()} (EN TOUTES LETTRES) </span> :</p>`
        );
      } else {
        str = str.concat(
          `<p style="font-weight: 600; padding: 7px">${
            workSecondCol.title
          } <br> <span style="font-weight: 400; font-style: normal">${workSecondCol.text.substring(
            3,
            workSecondCol.text.length - 5
          )}</span> <br> ${
            workSecondCol.unit
              ? `<span style="font-weight: 600">${workSecondCol.unit.toUpperCase()} (EN TOUTES LETTRES) : </span>`
              : ''
          } </p>`
        );
      }

      work[1] = str;
      pdfHTMLData.push(work);
    }
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfHTMLData,
    type: 'trades',
  };

  const response = await api('post', `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);
  const pdfParsedData = rowsGenTradesAndTranchesBPU(data, 'pdf');

  const pdfHTMLData = [];
  for (let i = 0; i < pdfParsedData.length; i++) {
    const trade = pdfParsedData[i];
    const tradeSecondCol = trade.rows[1];

    let str = '';
    str = str.concat(`<p>${tradeSecondCol}</p>`);
    trade.rows[1] = str;
    pdfHTMLData.push(trade.rows);

    for (let j = 0; j < trade.arr.length; j++) {
      const tranch = trade.arr[j];
      const tranchSecondCol = tranch.rows[1];

      let str = '';
      str = str.concat(`<p>${tranchSecondCol}</p>`);
      tranch.rows[1] = str;
      pdfHTMLData.push(tranch.rows);

      for (let k = 0; k < tranch.arr.length; k++) {
        const work = tranch.arr[k];
        const workSecondCol = work[1];

        let str = '';

        if (workSecondCol.type == 'workDetail') {
          str = str.concat(
            `<p style="font-weight: 600; font-style: italic; padding: 7px">${
              workSecondCol.title
            } <br> <span style="font-weight: 600; font-style: normal"> ${workSecondCol.text.toUpperCase()} (EN TOUTES LETTRES) </span> :</p>`
          );
        } else {
          str = str.concat(
            `<p style="font-weight: 600; padding: 7px">${
              workSecondCol.title
            } <br> <span style="font-weight: 400; font-style: normal">${workSecondCol.text.substring(
              3,
              workSecondCol.text.length - 5
            )}</span> <br> ${
              workSecondCol.unit
                ? `<span style="font-weight: 600">${workSecondCol.unit.toUpperCase()} (EN TOUTES LETTRES) : </span>`
                : ''
            } </p>`
          );
        }

        work[1] = str;
        pdfHTMLData.push(work);
      }
    }
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfHTMLData,
    type: 'tranches',
  };

  const response = await api('post', `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFSimpleDPGF(data, currentProject) {
  const headArr = headGen('DPGF', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenSimpleDPGF(data);
  let pdfParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const arr = [];
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const _ = row[j];
      if (j == 1) {
        if (typeof _ == 'object') {
          arr.push(
            `<p style="font-weight: 600;">${_.title} <br> <span style="font-weight: 400; font-style: normal">${_.bpu.substring(
              3,
              _.bpu.length - 5
            )}</span></p>`
          );
        } else {
          arr.push(`<p style="font-style: italic;">${_}</p>`);
        }
      } else {
        arr.push(_);
      }
    }
    pdfParsedData.push(arr);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api('post', `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesDPGF(data, currentProject) {
  const headArr = headGen('DPGF', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesDPGF(data);
  let interArr = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = docxParsedDataGenTradesDPGF(currentRow, i + 1);
    interArr = interArr.concat(currentRowPDFParsedData);
  }

  let pdfParsedData = [];

  for (let i = 0; i < interArr.length; i++) {
    const arr = [];
    const row = interArr[i];
    for (let j = 0; j < row.length; j++) {
      const _ = row[j];
      if (j == 1) {
        if (typeof _ == 'object') {
          arr.push(
            `<p style="font-weight: 600;">${_.title} <br> <span style="font-weight: 400; font-style: normal">${_.bpu.substring(
              3,
              _.bpu.length - 5
            )}</span></p>`
          );
        } else {
          arr.push(`<p style="font-style: italic;">${_}</p>`);
        }
      } else {
        arr.push(_);
      }
    }
    pdfParsedData.push(arr);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
    type: 'trades',
  };

  const response = await api('post', `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTrancesDPGF(data, currentProject) {
  const headArr = headGen('DPGF', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesAndTranchesDPGF(data);
  let interArr = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = docxParsedDataGenTradesAndTranchesDPGF(currentRow, i + 1);
    interArr = interArr.concat(currentRowPDFParsedData);
  }

  let pdfParsedData = [];

  for (let i = 0; i < interArr.length; i++) {
    const arr = [];
    const row = interArr[i];
    for (let j = 0; j < row.length; j++) {
      const _ = row[j];
      if (j == 1) {
        if (typeof _ == 'object') {
          arr.push(
            `<p style="font-weight: 600;">${_.title} <br> <span style="font-weight: 400; font-style: normal">${_.bpu.substring(
              3,
              _.bpu.length - 5
            )}</span></p>`
          );
        } else {
          arr.push(`<p style="font-style: italic;">${_}</p>`);
        }
      } else {
        arr.push(_);
      }
    }
    pdfParsedData.push(arr);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
    type: 'tranches',
  };

  const response = await api('post', `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFSimpleCCTP(data, currentProject, selectedCCTPIndexes) {
  const docxRes = await exportDOCXSimpleCCTP(data, currentProject, selectedCCTPIndexes);
  const file = new File([docxRes.blob], docxRes.filename);

  const formData = new FormData();
  formData.append('buffer', file);

  const response = await api('post', `/Reports/docx_to_pdf`, formData);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    url,
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesCCTP(data, currentProject, selectedCCTPIndexes) {
  const docxRes = await exportDOCXTradesCCTP(data, currentProject, selectedCCTPIndexes);
  const file = new File([docxRes.blob], docxRes.filename);

  const formData = new FormData();
  formData.append('buffer', file);

  const response = await api('post', `/Reports/docx_to_pdf`, formData);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    url,
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes) {
  const docxRes = await exportDOCXTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes);
  const file = new File([docxRes.blob], docxRes.filename);

  const formData = new FormData();
  formData.append('buffer', file);

  const response = await api('post', `/Reports/docx_to_pdf`, formData);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    url,
    blob,
    filename,
  };

  return obj;
}

export {
  exportPDFSimpleEstimation,
  exportPDFTradesEstimation,
  exportPDFTradesAndTranchesEstimation,
  exportPDFSimpleBPU,
  exportPDFTradesBPU,
  exportPDFTradesAndTranchesBPU,
  exportPDFSimpleDPGF,
  exportPDFTradesDPGF,
  exportPDFTradesAndTrancesDPGF,
  exportPDFSimpleCCTP,
  exportPDFTradesCCTP,
  exportPDFTradesAndTranchesCCTP,
};
