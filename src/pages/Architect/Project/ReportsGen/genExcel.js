import XLSX from 'xlsx-js-style';

import {
  headGen,
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

// Styles
const Font2 = {
  font: {
    italic: true,
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

const textAlignment1 = {
  alignment: {
    horizontal: 'left',
  },
};

const textAlignment2 = {
  alignment: {
    horizontal: 'center',
  },
};

const textAlignment3 = {
  alignment: {
    horizontal: 'right',
  },
};

const exportXLSXSimpleEstimation = (data, currentProject, noPrice) => {
  const header = headGen(!noPrice ? 'Estim' : 'DQE', currentProject.name);
  const rows = rowsGenSimpleEstimation(data, noPrice);

  let xlsxParsedData = [];
  const xlsxParsedBodyData = xlsxParsedDataGenSimpleEstimation(rows);
  const footerDataFloatsArr = footerDataGenSimpleEstimation(data, currentProject, noPrice, true);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimation);

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedBodyData);
  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [[header[0], header[1], '', '', '', header[2]]]);
  XLSX.utils.sheet_add_json(ws, xlsxParsedData, { origin: 'A3' });

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 3;
  let stopAt;

  // Header row style
  applyRowStyle(ws, 1, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });
  ws['A1'].s.alignment = { horizontal: 'center', vertical: 'center' };
  applyRowStyle(ws, cursor, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });

  // Apply styling to body
  stopAt = rows.length + cursor + 1;
  for (let i = cursor + 1; i < stopAt; i++) {
    applyRowStyle(
      ws,
      i,
      BorderRestAll,
      'WorkAndWorkDetail3',
      {
        ...Font2,
        ...BorderRestAll,
      },
      {
        ...textAlignment2,
        ...BorderRestAll,
      },
      {
        ...textAlignment3,
        ...BorderRestAll,
      }
    );
    cursor = cursor + 1;
  }

  // Apply styling to footer
  stopAt = footerDataFloatsArr.length + cursor + 1;
  for (let i = cursor + 1; i < stopAt; i++) {
    applyRowStyle(ws, i, { ...textAlignment3, ...Font1, ...BorderFirst2 });
  }

  // Make merger object
  const merge = [
    {
      s: { r: 0, c: 1 },
      e: { r: 0, c: 4 },
    },
    {
      s: { r: 1, c: 1 },
      e: { r: 1, c: 5 },
    },
  ];

  stopAt = cursor;
  for (let i = 0; i < footerDataFloatsArr.length; i++) {
    let obj = {
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
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}.xlsx`;
  return { blob, filename };
};

const exportXLSXTradesEstimation = (data, currentProject, noPrice) => {
  const header = headGen(!noPrice ? 'Estim' : 'DQE', currentProject.name);
  const rows = rowsGenTradesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  let xlsxParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesEstimation(data, currentProject, noPrice, false);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimationNoSpace);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowXLSXParsedData = xlsxParsedDataGenTradesEstimation(currentRow, i + 1, noPrice);
    xlsxParsedData = xlsxParsedData.concat(currentRowXLSXParsedData);
  }

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [[header[0], header[1], '', '', '', header[2]]]);
  XLSX.utils.sheet_add_json(ws, xlsxParsedData, { origin: 'A3' });

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 3;

  // Header row style
  applyRowStyle(ws, 1, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });
  ws['A1'].s.alignment = { horizontal: 'center', vertical: 'center' };
  applyRowStyle(ws, cursor, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });

  const merge = [
    {
      s: { r: 0, c: 1 },
      e: { r: 0, c: 4 },
    },
    {
      s: { r: 1, c: 1 },
      e: { r: 1, c: 5 },
    },
  ];

  // Trades styling
  for (let i = 0; i < rows.length; i++) {
    const tradeRow = rows[i];
    // Trade label row style
    applyRowStyle(ws, cursor, { ...Fill2, ...BorderFirst2 });
    cursor = cursor + 1;
    const workAndWorkDetailsRows = tradeRow.rows;
    for (let j = 0; j < workAndWorkDetailsRows.length + 1; j++) {
      // This is not supposed to work
      // WorkAndWorkDetail row style
      applyRowStyle(
        ws,
        cursor,
        BorderRestAll,
        'WorkAndWorkDetail2',
        {
          ...Font2,
          ...BorderRestAll,
        },
        {
          ...textAlignment2,
          ...BorderRestAll,
        },
        {
          ...textAlignment3,
          ...BorderRestAll,
        }
      );
      cursor = cursor + 1;
    }
    // Trade total row style
    applyRowStyle(ws, cursor, { ...textAlignment3, ...Fill5, ...BorderFirst2 });
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
    applyRowStyle(ws, i, { ...textAlignment3, ...Font1, ...BorderFirst2 });
  }

  // Merge footer cells - Merge must be done after styling
  ws['!merges'] = merge;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Sheet_1`);

  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}.xlsx`;
  return { blob, filename };
};

const exportXLSXTradesAndTranchesEstimation = (data, currentProject, noPrice) => {
  const header = headGen(!noPrice ? 'Estim' : 'DQE', currentProject.name);
  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  let xlsxParsedData = [];
  const footerDataFloatsArr = footerDataGenTradesAndTranchesEstimation(data, currentProject, noPrice, false);
  const xlsxParsedFooterData = xlsxParsedFooterDataGenEstimation(footerDataFloatsArr, footerColumnsSimpleEstimationNoSpace);

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowXLSXParsedData = xlsxParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1, noPrice);
    xlsxParsedData = xlsxParsedData.concat(currentRowXLSXParsedData);
  }

  xlsxParsedData = xlsxParsedData.concat(xlsxParsedFooterData);

  const ws = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [[header[0], header[1], '', '', '', header[2]]]);
  XLSX.utils.sheet_add_json(ws, xlsxParsedData, { origin: 'A3' });

  // Set column widths
  const wscols = calculateWSCols(xlsxParsedData);
  ws['!cols'] = wscols;

  let cursor = 3;

  // Header row style
  applyRowStyle(ws, 1, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });
  ws['A1'].s.alignment = { horizontal: 'center', vertical: 'center' };
  applyRowStyle(ws, cursor, { ...textAlignment1, ...Fill1, ...BorderFirst2 }, 'header', {
    ...textAlignment2,
    ...Fill1,
    ...BorderFirst2,
  });

  const merge = [
    {
      s: { r: 0, c: 1 },
      e: { r: 0, c: 4 },
    },
    {
      s: { r: 1, c: 1 },
      e: { r: 1, c: 5 },
    },
  ];

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
      applyRowStyle(ws, cursor, { ...Font1, ...Fill3, ...BorderFirst2 });
      cursor = cursor + 1;
      const workAndWorkDetailsRows = tranchRow.rows;
      for (let k = 0; k < workAndWorkDetailsRows.length; k++) {
        // WorkAndWorkDetail row style
        applyRowStyle(
          ws,
          cursor,
          BorderRestAll,
          'WorkAndWorkDetail',
          {
            ...Font2,
            ...BorderRestAll,
          },
          {
            ...textAlignment2,
            ...BorderRestAll,
          },
          {
            ...textAlignment3,
            ...BorderRestAll,
          }
        );
        cursor = cursor + 1;
      }
      // Tranch total row style
      applyRowStyle(ws, cursor, { ...textAlignment3, ...Fill4, ...BorderFirst2 });
      merge.push({
        s: { r: cursor - 1, c: 1 },
        e: { r: cursor - 1, c: 4 },
      });
      cursor = cursor + 1;
    }
    // Trade total row style
    applyRowStyle(ws, cursor, { ...textAlignment3, ...Fill5, ...BorderFirst2 });
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
    applyRowStyle(ws, i, { ...textAlignment3, ...Font1, ...BorderFirst2 });
  }

  // Merge footer cells - Merge must be done after styling
  ws['!merges'] = merge;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Sheet_1`);

  const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}.xlsx`;
  return { blob, filename };
};

function applyRowStyle(ws, rownum, style, type, style2, style3, style4) {
  let rowType = 'trade';
  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    let char = ABC[i];
    if (type === 'header') {
      if (i === 0 || i === 1) {
        ws[`${char}${rownum}`].s = style;
      } else {
        ws[`${char}${rownum}`].s = style2;
      }
    } else if (type === 'WorkAndWorkDetail' || type === 'WorkAndWorkDetail2' || type === 'WorkAndWorkDetail3') {
      if (char === 'A') {
        if (type === 'WorkAndWorkDetail') {
          if (ws[`${char}${rownum}`].v.length >= 7) {
            rowType = 'tranch';
          } else {
            rowType = 'trade';
          }
        } else if (type === 'WorkAndWorkDetail2') {
          if (ws[`${char}${rownum}`].v.length >= 5) {
            rowType = 'tranch';
          } else {
            rowType = 'trade';
          }
        } else if (type === 'WorkAndWorkDetail3') {
          if (ws[`${char}${rownum}`].v.length >= 3) {
            rowType = 'tranch';
          } else {
            rowType = 'trade';
          }
        }
      }
      if (rowType === 'tranch') {
        if (char === 'B') {
          ws[`${char}${rownum}`].v = `  ${ws[`${char}${rownum}`].v}`;
          ws[`${char}${rownum}`].s = style2;
        } else if (char === 'A') {
          ws[`${char}${rownum}`].s = style2;
        } else if (char === 'C') {
          ws[`${char}${rownum}`].s = style3;
        } else {
          ws[`${char}${rownum}`].s = style4;
        }
      } else {
        if (char === 'A' || char === 'B') {
          ws[`${char}${rownum}`].s = style;
        } else if (char === 'C') {
          ws[`${char}${rownum}`].s = style3;
        } else {
          if (type === 'WorkAndWorkDetail') {
            if (ws[`A${rownum + 1}`].v.length >= 7) {
              ws[`${char}${rownum}`].v = ``;
            }
            ws[`${char}${rownum}`].s = style4;
          } else if (type === 'WorkAndWorkDetail2') {
            if (ws[`A${rownum + 1}`].v.length >= 5) {
              ws[`${char}${rownum}`].v = ``;
            }
            ws[`${char}${rownum}`].s = style4;
          } else if (type === 'WorkAndWorkDetail3') {
            if (ws[`A${rownum + 1}`].v.length >= 3) {
              ws[`${char}${rownum}`].v = ``;
            }
            ws[`${char}${rownum}`].s = style4;
          }
        }
      }
    } else {
      ws[`${char}${rownum}`].s = style;
    }
  }
}

export { exportXLSXSimpleEstimation, exportXLSXTradesEstimation, exportXLSXTradesAndTranchesEstimation };
