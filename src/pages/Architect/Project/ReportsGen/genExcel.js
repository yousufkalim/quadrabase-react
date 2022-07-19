import XLSX from 'xlsx-js-style';

import {
  rowsGenSimpleEstimation,
  rowsGenTradesEstimation,
  rowsGenTradesAndTranchesEstimation,
  xlsxParsedDataGenSimpleEstimation,
  xlsxParsedDataGenTradesEstimation,
  xlsxParsedDataGenTradesAndTranchesEstimation,
  xlsxParsedFooterDataGenEstimation,
  calculateWSCols,
  footerDataGenSimpleEstimation,
  footerDataGenTradesEstimation,
  footerDataGenTradesAndTranchesEstimation,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
} from './data.js';

const ABC = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

// Styles
const Font1 = {
  font: {
    bold: true,
  },
};

const Fill1 = {
  fill: {
    fgColor: { rgb: 'FFBFBFBF' },
  },
  ...Font1,
};

// For trades
const Fill2 = {
  fill: {
    fgColor: { rgb: 'FFD3D3D3' },
  },
  ...Font1,
};

// For trades and tranches
const Fill3 = {
  fill: {
    fgColor: { rgb: 'FFF2F2F2' },
  },
};

// For trades total
const Fill4 = {
  fill: {
    fgColor: { rgb: 'FFFFFFFF' },
  },
  ...Font1,
};

// For tranch total
const Fill5 = {
  fill: {
    fgColor: { rgb: 'FFFFFFFF' },
  },
  ...Font1,
};

const BorderFirst2 = {
  border: {
    top: {
      style: 'thin',
    },
    bottom: {
      style: 'thin',
    },
    left: {
      style: 'thin',
    },
    right: {
      style: 'thin',
    },
  },
};

const BorderRestAll = {
  border: {
    top: {
      style: 'dotted',
    },
    bottom: {
      style: 'dotted',
    },
    left: {
      style: 'thin',
    },
    right: {
      style: 'thin',
    },
  },
};

const exportXLSXSimpleEstimation = (data, currentProject, noPrice) => {
  const rows = rowsGenSimpleEstimation(data, noPrice);

  let xlsxParsedData = [];
  const xlsxParsedBodyData = xlsxParsedDataGenSimpleEstimation(rows);
  const footerDataFloatsArr = footerDataGenSimpleEstimation(data, currentProject, noPrice, true);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimation);

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedBodyData);
  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.json_to_sheet(xlsxParsedData);

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 1;
  let stopAt;

  // Header row style
  applyRowStyle(ws, cursor, { ...Fill1, ...BorderFirst2 });

  // Apply styling to body
  stopAt = rows.length + cursor + 1;
  for (let i = cursor + 1; i < stopAt; i++) {
    applyRowStyle(ws, i, BorderRestAll);
    cursor = cursor + 1;
  }

  // Apply styling to footer
  stopAt = footerDataFloatsArr.length + cursor + 1;
  for (let i = cursor + 1; i < stopAt; i++) {
    applyRowStyle(ws, i, { ...Font1, ...BorderFirst2 });
  }

  // Make merger object
  const merge = [];
  stopAt = cursor;
  for (let i = 0; i < footerDataFloatsArr.length; i++) {
    const obj = {
      s: { r: stopAt + i, c: 1 },
      e: { r: stopAt + i, c: 4 },
    };
    merge.push(obj);
  }

  // Merge footer cells - Merge must be done after styling
  ws['!merges'] = merge;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');

  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estimation'}.xlsx`;
  return { blob, filename };
};

const exportXLSXTradesEstimation = (data, currentProject, noPrice) => {
  const rows = rowsGenTradesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  let xlsxParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesEstimation(data, currentProject, noPrice, false);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimationNoSpace);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowXLSXParsedData = xlsxParsedDataGenTradesEstimation(currentRow, i + 1);
    xlsxParsedData = xlsxParsedData.concat(currentRowXLSXParsedData);
  }

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.json_to_sheet(xlsxParsedData);

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 1;
  const merge = [];

  // Header row style
  applyRowStyle(ws, cursor, { ...Fill1, ...BorderFirst2 });
  cursor = cursor + 1;

  // Trades styling
  for (let i = 0; i < rows.length; i++) {
    const tradeRow = rows[i];
    // Trade label row style
    applyRowStyle(ws, cursor, { ...Fill2, ...BorderFirst2 });
    cursor = cursor + 1;
    const workAndWorkDetailsRows = tradeRow.rows;
    for (let j = 0; j < workAndWorkDetailsRows.length; j++) {
      // WorkAndWorkDetail row style
      applyRowStyle(ws, cursor, BorderRestAll);
      cursor = cursor + 1;
    }
    // Trade total row style
    applyRowStyle(ws, cursor, { ...Fill5, ...BorderFirst2 });
    merge.push({
      s: { r: cursor - 1, c: 1 },
      e: { r: cursor - 1, c: 4 },
    });
    cursor = cursor + 1;
  }

  let stopAt = cursor - 1;
  for (let i = 0; i < footerDataFloatsArr.length; i++) {
    const obj = {
      s: { r: stopAt + i, c: 1 },
      e: { r: stopAt + i, c: 4 },
    };
    merge.push(obj);
  }

  // Apply styling to footer
  stopAt = footerDataFloatsArr.length + cursor;
  for (let i = cursor; i < stopAt; i++) {
    applyRowStyle(ws, i, { ...Font1, ...BorderFirst2 });
  }

  // Merge footer cells - Merge must be done after styling
  ws['!merges'] = merge;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Sheet_1`);

  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estimation'}.xlsx`;
  return { blob, filename };
};

const exportXLSXTradesAndTranchesEstimation = (data, currentProject, noPrice) => {
  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  let xlsxParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesAndTranchesEstimation(data, currentProject, noPrice, false);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimationNoSpace);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowXLSXParsedData = xlsxParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1);
    xlsxParsedData = xlsxParsedData.concat(currentRowXLSXParsedData);
  }

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.json_to_sheet(xlsxParsedData);

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 1;
  const merge = [];

  // Header row style
  applyRowStyle(ws, cursor, { ...Fill1, ...BorderFirst2 });
  cursor = cursor + 1;

  // Trades styling
  for (let i = 0; i < rows.length; i++) {
    const tradeRow = rows[i];
    // Trade label row style
    applyRowStyle(ws, cursor, { ...Fill2, ...BorderFirst2 });
    cursor = cursor + 1;
    const trancheRows = tradeRow.rows;
    for (let j = 0; j < trancheRows.length; j++) {
      const tranchRow = trancheRows[j];
      // Tranch label row style
      applyRowStyle(ws, cursor, { ...Fill3, ...BorderFirst2 });
      cursor = cursor + 1;
      const workAndWorkDetailsRows = tranchRow.rows;
      for (let k = 0; k < workAndWorkDetailsRows.length; k++) {
        // WorkAndWorkDetail row style
        applyRowStyle(ws, cursor, BorderRestAll);
        cursor = cursor + 1;
      }
      // Tranch total row style
      applyRowStyle(ws, cursor, { ...Fill4, ...BorderFirst2 });
      merge.push({
        s: { r: cursor - 1, c: 1 },
        e: { r: cursor - 1, c: 4 },
      });
      cursor = cursor + 1;
    }
    // Trade total row style
    applyRowStyle(ws, cursor, { ...Fill5, ...BorderFirst2 });
    merge.push({
      s: { r: cursor - 1, c: 1 },
      e: { r: cursor - 1, c: 4 },
    });
    cursor = cursor + 1;
  }

  let stopAt = cursor - 1;
  for (let i = 0; i < footerDataFloatsArr.length; i++) {
    const obj = {
      s: { r: stopAt + i, c: 1 },
      e: { r: stopAt + i, c: 4 },
    };
    merge.push(obj);
  }

  // Apply styling to footer
  stopAt = footerDataFloatsArr.length + cursor;
  for (let i = cursor; i < stopAt; i++) {
    applyRowStyle(ws, i, { ...Font1, ...BorderFirst2 });
  }

  // Merge footer cells - Merge must be done after styling
  ws['!merges'] = merge;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Sheet_1`);

  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estimation'}.xlsx`;
  return { blob, filename };
};

function applyRowStyle(ws, rownum, style) {
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    let char = ABC[i];
    ws[`${char}${rownum}`].s = style;
  }
}

export { exportXLSXSimpleEstimation, exportXLSXTradesEstimation, exportXLSXTradesAndTranchesEstimation };
