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

async function exportPDFSimpleEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`, `${currentProject?.name ?? 'N/A'}`);
  const bodyArr = rowsGenSimpleEstimation(data, noPrice); // It's the same thing in case of pdf plugin.
  const footerArr = footerDataGenSimpleEstimation(data, currentProject, noPrice);

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: bodyArr,
    footerKeysArr: footerColumnsSimpleEstimation,
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
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`, `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);
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
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`, `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);
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
    str = str.concat(`<p style="font-weight: 600">${workSecondCol.title}`);
    str = str.concat(`${workSecondCol.text}`);
    str = str.concat(`</p>`);
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
      str = str.concat(`<p style="font-weight: 600">${workSecondCol.title}`);
      str = str.concat(`${workSecondCol.text}`);
      str = str.concat(`</p>`);
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
        str = str.concat(`<p style="font-weight: 600">${workSecondCol.title}`);
        str = str.concat(`${workSecondCol.text}`);
        str = str.concat(`</p>`);
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
          arr.push(`<strong>${_.title}</strong><br><p>${_.bpu}</p>`);
        } else {
          arr.push(`<p>${_}</p>`);
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
          arr.push(`<strong>${_.title}</strong><br><p>${_.bpu}</p>`);
        } else {
          arr.push(`<p>${_}</p>`);
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
          arr.push(`<strong>${_.title}</strong><br><p>${_.bpu}</p>`);
        } else {
          arr.push(`<p>${_}</p>`);
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
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenSimpleCCTP(data, currentProject, selectedCCTPIndexes);

  const { chap0, cctps } = rows;

  let pdfParsedData = [];

  if (chap0) {
    let strChap0part1 = _parseChap0part1(chap0.part1);
    let strChap0part2 = _parseChap0part2(chap0.part2);
    pdfParsedData.push(strChap0part1);
    pdfParsedData.push(strChap0part2);
  }

  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    let str = '';
    str = str.concat(`<p style="background-color: #C0C0C0"><strong>${_.title}</strong><br>`);
    for (let j = 0; j < _.arr.length; j++) {
      const trade = _.arr[j];
      str = str.concat(`<p style="font-weight: 600">${trade.title}</p>`);
      for (let k = 0; k < trade.arr.length; k++) {
        const tranch = trade.arr[k];
        str = str.concat(`<p style="font-weight: 600">${tranch.title}</p>`);
        for (let l = 0; l < tranch.arr.length; l++) {
          const work = tranch.arr[l];
          str = str.concat(`<p style="font-weight: 600">${work.title}</p>`);
          str = str.concat(`${work.text}`);
        }
      }
    }
    str = str.concat(`</p>`);
    pdfParsedData.push(str);
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api('post', `/Reports/cctp`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesCCTP(data, currentProject, selectedCCTPIndexes) {
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesCCTP(data, currentProject, selectedCCTPIndexes);

  const { chap0, cctps } = rows;

  let pdfParsedData = [];

  if (chap0) {
    let strChap0part1 = _parseChap0part1(chap0.part1);
    let strChap0part2 = _parseChap0part2(chap0.part2);
    pdfParsedData.push(strChap0part1);
    pdfParsedData.push(strChap0part2);
  }

  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    let str = '';
    str = str.concat(`<p style="background-color: #C0C0C0"><strong>${_.title}</strong><br>`);
    for (let j = 0; j < _.arr.length; j++) {
      const trade = _.arr[j];
      str = str.concat(`<p style="font-weight: 600">${trade.title}</p>`);
      for (let k = 0; k < trade.arr.length; k++) {
        const tranch = trade.arr[k];
        str = str.concat(`<p style="font-weight: 600">${tranch.title}</p>`);
        for (let l = 0; l < tranch.arr.length; l++) {
          const work = tranch.arr[l];
          str = str.concat(`<p style="font-weight: 600">${work.title}</p>`);
          str = str.concat(`${work.text}`);
        }
      }
    }
    str = str.concat(`</p>`);
    pdfParsedData.push(str);
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api('post', `/Reports/cctp`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes) {
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);
  const rows = rowsGenTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes);

  const { chap0, cctps } = rows;

  let pdfParsedData = [];

  if (chap0) {
    let strChap0part1 = _parseChap0part1(chap0.part1);
    let strChap0part2 = _parseChap0part2(chap0.part2);
    pdfParsedData.push(strChap0part1);
    pdfParsedData.push(strChap0part2);
  }

  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    let str = '';
    str = str.concat(`<p style="background-color: #C0C0C0"><strong>${_.title}</strong><br>`);
    for (let j = 0; j < _.arr.length; j++) {
      const trade = _.arr[j];
      str = str.concat(`<p style="font-weight: 600">${trade.title}</p>`);
      for (let k = 0; k < trade.arr.length; k++) {
        const tranch = trade.arr[k];
        str = str.concat(`<p style="font-weight: 600">${tranch.title}</p>`);
        for (let l = 0; l < tranch.arr.length; l++) {
          const work = tranch.arr[l];
          str = str.concat(`<p style="font-weight: 600">${work.title}</p>`);
          str = str.concat(`${work.text}`);
        }
      }
    }
    str = str.concat(`</p>`);
    pdfParsedData.push(str);
  }

  const body = {
    headerArr: headArr,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api('post', `/Reports/cctp`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

function _parseChap0part1(part1) {
  let str = '';
  str = str.concat(`<p style="background-color: #C0C0C0"><strong>CHAP 0 - CLAUSES GENERALES</strong><br>`);
  str = str.concat(`<p><strong>0.1 DESCRIPTION DU MARCHE</strong></p>`);
  str = str.concat(`<p><strong>0.1.1 OBJET DU MARCHE</strong></p>`);
  str = str.concat(`<p>Le présent Cahier des Clauses Techniques Particulières (C.C.T.P.) concerne les travaux ci-après :</p>`);
  str = str.concat(`<p>${part1.description}</p>`);
  str = str.concat(`<p><strong>0.1.2 INTERVENANTS DU MARCHE</strong></p>`);
  str = str.concat(`<p><strong>Maitre d'Ouvrage:</strong></p>`);
  str = str.concat(`<p>    ${part1.client}</p>`);
  str = str.concat(`<p><strong>Maitre d'Oeuvre:</strong></p>`);
  str = str.concat(`<p>    ${part1.prescriber}</p>`);
  str = str.concat(`<p><strong>0.1.3 TYPE DE MARCHE</strong></p>`);
  str = str.concat(`<p>${part1.market_type}</p>`);
  str = str.concat(`<p><strong>Intervenants</strong></p>`);
  str = str.concat(`<ul>`);
  for (let i = 0; i < part1.stakeholders.length; i++) {
    const _ = part1.stakeholders[i];
    str = str.concat(`<li>${_}</li>`);
  }
  str = str.concat(`</ul>`);
  str = str.concat(`</p>`);
  return str;
}

function _parseChap0part2(part2) {
  let str = '';
  for (let i = 0; i < part2.length; i++) {
    const _ = part2[i];
    str = str.concat(`<p><strong>${_.title}</strong><br>`);
    if (_.text) {
      str = str.concat(`<p>${_.text}</p><br>`);
    }
    for (let j = 0; j < _.lvl2.length; j++) {
      const __ = _.lvl2[j];
      str = str.concat(`<p><strong>${__.title}</strong><br>`);
      if (__.text) {
        str = str.concat(`<p>${__.text}</p><br>`);
      }
      for (let k = 0; k < __.lvl3.length; k++) {
        const ___ = __.lvl3[k];
        str = str.concat(`<p><strong>${___.title}</strong><br>`);
        if (___.text) {
          str = str.concat(`<p>${___.text}</p><br>`);
        }
      }
    }
    str = str.concat(`</p>`);
  }
  return str;
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
