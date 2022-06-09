import api from "../../../../api";

import {
  headGen,
  rowsGenSimpleEstimation,
  rowsGenTradesEstimation,
  rowsGenTradesAndTranchesEstimation,
  rowsGenSimpleDPGF,
  rowsGenTradesDPGF,
  rowsGenTradesAndTranchesDPGF,
  pdfParsedDataGenTradesEstimation,
  pdfParsedDataGenTradesAndTranchesEstimation,
  docxParsedDataGenTradesDPGF,
  docxParsedDataGenTradesAndTranchesDPGF,
  footerDataGenSimpleEstimation,
  rowsGenSimpleBPU,
  rowsGenTradesBPU,
  rowsGenTradesAndTranchesBPU,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
  dataColumnsBPU,
  blobFromURL,
} from "./data.js";

async function exportPDFSimpleEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);
  const bodyArr = rowsGenSimpleEstimation(data, noPrice); // It's the same thing in case of pdf plugin.
  const footerArr = footerDataGenSimpleEstimation(data, currentProject, noPrice);

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: bodyArr,
    footerKeysArr: footerColumnsSimpleEstimation,
    footerValuesArr: footerArr,
  };

  const response = await api("post", `/Reports/simple_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);
  const rows = rowsGenTradesEstimation(data, noPrice);
  let pdfParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = pdfParsedDataGenTradesEstimation(currentRow, i + 1);
    pdfParsedData = pdfParsedData.concat(currentRowPDFParsedData);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api("post", `/Reports/tt_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);
  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  let pdfParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowPDFParsedData = pdfParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1);
    pdfParsedData = pdfParsedData.concat(currentRowPDFParsedData);
  }

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsEstimation,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api("post", `/Reports/tt_estimation`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFSimpleBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);
  const pdfParsedData = rowsGenSimpleBPU(data);

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsBPU,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api("post", `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);
  const pdfParsedData = rowsGenTradesBPU(data);

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsBPU,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api("post", `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTranchesBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);
  const pdfParsedData = rowsGenTradesAndTranchesBPU(data);

  const body = {
    headerArr: headArr,
    bodyKeysArr: dataColumnsBPU,
    bodyValuesArr: pdfParsedData,
  };

  const response = await api("post", `/Reports/bpu`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFSimpleDPGF(data, currentProject) {
  const headArr = headGen("DPGF", `${currentProject?.name ?? "N/A"}`);
  const rows = rowsGenSimpleDPGF(data);
  let pdfParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const arr = [];
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const _ = row[j];
      if (j == 1) {
        if (typeof _ == "object") {
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

  const response = await api("post", `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - DPGF`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesDPGF(data, currentProject) {
  const headArr = headGen("DPGF", `${currentProject?.name ?? "N/A"}`);
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
        if (typeof _ == "object") {
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

  const response = await api("post", `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - DPGF`;

  const obj = {
    blob,
    filename,
  };

  return obj;
}

async function exportPDFTradesAndTrancesDPGF(data, currentProject) {
  const headArr = headGen("DPGF", `${currentProject?.name ?? "N/A"}`);
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
        if (typeof _ == "object") {
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

  const response = await api("post", `/Reports/dpgf`, body);
  const url = response.data.path;

  const blob = await blobFromURL(url);
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - DPGF`;

  const obj = {
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
};
