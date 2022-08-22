import {
  Packer,
  WidthType,
  convertInchesToTwip,
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TableOfContents,
  ShadingType,
} from 'docx';

import {
  headGen,
  rowsGenSimpleEstimation,
  rowsGenTradesEstimation,
  rowsGenTradesAndTranchesEstimation,
  rowsGenSimpleDPGF,
  rowsGenTradesDPGF,
  rowsGenTradesAndTranchesDPGF,
  docxParsedDataGenTradesEstimation,
  docxParsedDataGenTradesAndTranchesEstimation,
  docxParsedDataGenTradesDPGF,
  docxParsedDataGenTradesAndTranchesDPGF,
  rowsGenSimpleBPU,
  rowsGenTradesBPU,
  rowsGenTradesAndTranchesBPU,
  rowsGenSimpleCCTP,
  rowsGenTradesCCTP,
  rowsGenTradesAndTranchesCCTP,
  footerDataGenSimpleEstimation,
  footerDataGenTradesEstimation,
  footerDataGenTradesAndTranchesEstimation,
  footerDataGenSimpleDPGF,
  textRunsSplitGen,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
} from './data.js';

import {
  l4Font,
  l3Font,
  l2Font,
  l1Font,
  docText,
  l4Text,
  l3Text,
  l2Text,
  l1Text,
  lineBreak,
  fontType,
  l0Text,
  ln1Font,
  l0Font,
} from './docxFormatting';

const Spacer = new Paragraph({
  text: '',
});

async function exportDOCXSimpleEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`.toUpperCase(), `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenSimpleEstimation(data, noPrice);
  const footerData = footerDataGenSimpleEstimation(data, currentProject, noPrice, true);

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: i === 0 || i === 1 ? AlignmentType.LEFT : AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 22,
              bold: 'true',
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: {
        fill: '#DCDADA',
      },
      columnSpan: i === 1 && 2,
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      const tableCell = new TableCell({
        children: [
          new Paragraph({
            alignment:
              j === 0 || j === 1
                ? currentRow[0].length === 0
                  ? AlignmentType.RIGHT
                  : AlignmentType.LEFT
                : j === 2
                ? AlignmentType.CENTER
                : AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: currentRow[0].length === 3 && j === 1 ? `  ${currentRow[j]}` : `${currentRow[j]}`,
                size: 16,
                italics: currentRow[0].length === 3 && (j === 1 || j === 0) ? true : false,
              }),
            ],
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
        margins: normalMargin,
        shading: i == 0 ? firstRowShade : null,
        columnSpan: j === 1 && 2,
      });
      tableRowCells.push(tableCell);
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const tableFooterRows = [];

  for (let i = 0; i < footerColumnsSimpleEstimation.length; i++) {
    const tableRowCells = [];
    const tableCell1 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: footerColumnsSimpleEstimation[i],
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: i == 0 ? firstRowShade : null,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    const tableCell2 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: `${footerData[i]}`,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: i == 0 ? firstRowShade : null,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    tableRowCells.push(tableCell1);
    tableRowCells.push(tableCell2);
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableFooterRows.push(tableRow);
  }

  const tableFooter = [
    new Table({
      alignment: AlignmentType.RIGHT,
      rows: [...tableFooterRows],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody, Spacer, ...tableFooter];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;
  return { blob, filename };
}

async function exportDOCXTradesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`.toUpperCase(), `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesEstimation(data, noPrice);
  const footerData = footerDataGenTradesEstimation(data, currentProject, noPrice, false);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesEstimation(currentRow, i + 1, noPrice);
    docxParsedData = docxParsedData.concat(currentRowDOCXParsedData);
  }

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: i === 0 || i === 1 ? AlignmentType.LEFT : AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 22,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: {
        fill: '#DCDADA',
      },
      columnSpan: i === 1 && 2,
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    if (currentRow[0].length === 0) {
      for (let j = 0; j < currentRow.length; j++) {
        if (j === 0 || j === 1 || j === currentRow.length - 1) {
          const tableCell = new TableCell({
            children: [
              new Paragraph({
                alignment:
                  j === 0 || j === 1
                    ? currentRow[0].length === 0
                      ? AlignmentType.RIGHT
                      : AlignmentType.LEFT
                    : j === 2
                    ? AlignmentType.CENTER
                    : AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${currentRow[j]}`,
                    size: 16,
                    bold: currentRow[0].length === 1 || currentRow[0].length === 0 ? true : false,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            margins: normalMargin,
            columnSpan: j === 1 && 5,
          });
          tableRowCells.push(tableCell);
        }
      }
    } else {
      for (let j = 0; j < currentRow.length; j++) {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment:
                j === 0 || j === 1
                  ? currentRow[0].length === 0
                    ? AlignmentType.RIGHT
                    : AlignmentType.LEFT
                  : j === 2
                  ? AlignmentType.CENTER
                  : AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: currentRow[0].length === 5 && j === 1 ? `  ${currentRow[j]}` : `${currentRow[j]}`,
                  size: 16,
                  italics: currentRow[0].length === 5 && (j === 1 || j === 0) ? true : false,
                  bold: currentRow[0].length === 1 || currentRow[0].length === 0 ? true : false,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
          columnSpan: j === 1 && 2,
        });
        tableRowCells.push(tableCell);
      }
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const tableFooterRows = [];

  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  for (let i = 0; i < footerColumnsSimpleEstimationNoSpace.length; i++) {
    const tableRowCells = [];
    const tableCell1 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: footerColumnsSimpleEstimationNoSpace[i],
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: firstRowShade,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    const tableCell2 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: `${footerData[i]}`,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: null,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    tableRowCells.push(tableCell1);
    tableRowCells.push(tableCell2);
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableFooterRows.push(tableRow);
  }

  const tableFooter = [
    new Table({
      alignment: AlignmentType.RIGHT,
      rows: [...tableFooterRows],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody, Spacer, ...tableFooter];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? 'DQE' : 'Estim'}`.toUpperCase(), `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);
  const footerData = footerDataGenTradesAndTranchesEstimation(data, currentProject, noPrice, false);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1, noPrice);
    docxParsedData = docxParsedData.concat(currentRowDOCXParsedData);
  }

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: i === 0 || i === 1 ? AlignmentType.LEFT : AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 22,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: {
        fill: '#DCDADA',
      },
      columnSpan: i === 1 && 2,
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    if (currentRow[0].length === 0) {
      for (let j = 0; j < currentRow.length; j++) {
        if (j === 0 || j === 1 || j === currentRow.length - 1) {
          const tableCell = new TableCell({
            children: [
              new Paragraph({
                alignment:
                  j === 0 || j === 1
                    ? currentRow[0].length === 0
                      ? AlignmentType.RIGHT
                      : AlignmentType.LEFT
                    : j === 2
                    ? AlignmentType.CENTER
                    : AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${currentRow[j]}`,
                    size: 16,
                    bold: currentRow[0].length === 1 || currentRow[0].length === 3 || currentRow[0].length === 0 ? true : false,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            margins: normalMargin,
            columnSpan: j === 1 && 5,
          });
          tableRowCells.push(tableCell);
        }
      }
    } else {
      for (let j = 0; j < currentRow.length; j++) {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment:
                j === 0 || j === 1
                  ? currentRow[0].length === 0
                    ? AlignmentType.RIGHT
                    : AlignmentType.LEFT
                  : j === 2
                  ? AlignmentType.CENTER
                  : AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: currentRow[0].length === 7 && j === 1 ? `  ${currentRow[j]}` : `${currentRow[j]}`,
                  size: 16,
                  italics: currentRow[0].length === 7 && (j === 1 || j === 0) ? true : false,
                  bold: currentRow[0].length === 1 || currentRow[0].length === 3 || currentRow[0].length === 0 ? true : false,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
          columnSpan: j === 1 && 2,
        });
        tableRowCells.push(tableCell);
      }
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const tableFooterRows = [];

  const footerColumnsSimpleEstimationNoSpace = [...footerColumnsSimpleEstimation];
  footerColumnsSimpleEstimationNoSpace.splice(1, 1);

  for (let i = 0; i < footerColumnsSimpleEstimationNoSpace.length; i++) {
    const tableRowCells = [];
    const tableCell1 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: footerColumnsSimpleEstimationNoSpace[i],
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: firstRowShade,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    const tableCell2 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: footerData[i],
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: normalMargin,
      shading: null,
      width: { size: 50, type: WidthType.PERCENTAGE },
    });
    tableRowCells.push(tableCell1);
    tableRowCells.push(tableCell2);
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableFooterRows.push(tableRow);
  }

  const tableFooter = [
    new Table({
      alignment: AlignmentType.RIGHT,
      rows: [...tableFooterRows],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody, Spacer, ...tableFooter];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - ${noPrice ? 'DQE' : 'Estim'}`;
  return { blob, filename };
}

async function exportDOCXSimpleBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenSimpleBPU(data);

  const tableHeader = _parseHead(headArr);

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      const work = currentRow[j];
      let docxObjs;
      if (j == 0) {
        docxObjs = [
          new Paragraph({
            children: [
              new TextRun({
                text: work,
                font: fontType,
                size: l0Font,
                italics: currentRow[2].length > 0 ? true : false,
              }),
            ],
          }),
        ];
      } else if (j == 1) {
        docxObjs = [
          new Paragraph({
            children: [
              new TextRun({
                text: work.title,
                font: fontType,
                size: l0Font,
                bold: true,
                italics: currentRow[2].length > 0 ? true : false,
              }),
            ],
          }),
          ...(currentRow[2].length > 0
            ? [l0Text(`${work.text.toUpperCase()} (EN TOUTES LETTRES) :`, true)]
            : await textRunsSplitGen(work.text, ln1Font)),
          work.unit && l0Text(`${work.unit.toUpperCase()} (EN TOUTES LETTRES) :`, true),
          l0Text(''),
        ];
      } else if (j == 2) {
        if (work) {
          docxObjs = [...(await textRunsSplitGen(work, l0Font))];
        } else {
          docxObjs = [lineBreak()];
        }
      }
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.TOP,
        margins: normalMargin,
      });
      tableRowCells.push(tableCell);
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      rows: [...tableBodyRows],
    }),
  ];

  const children = [...tableHeader, ...tableBody, ...BPUSignatureSection];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;
  return { blob, filename };
}

async function exportDOCXTradesBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesBPU(data);

  const tableHeader = _parseHead(headArr);

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const trade = rows[i];

    const tradeTableRowCells = [];
    for (let j = 0; j < trade.rows.length; j++) {
      const tradeCurrentRow = trade.rows[j];
      let docxObjs = [l0Text(tradeCurrentRow, true)];
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.TOP,
        margins: normalMargin,
        shading: {
          fill: '#C0C0C0',
        },
      });
      tradeTableRowCells.push(tableCell);
    }
    const tradeTableRow = new TableRow({
      children: tradeTableRowCells,
    });
    tableBodyRows.push(tradeTableRow);

    for (let j = 0; j < trade.arr.length; j++) {
      const work = trade.arr[j];
      const workTableRowCells = [];
      for (let k = 0; k < work.length; k++) {
        const workCurrentRow = work[k];
        let docxObjs;
        if (k == 0) {
          docxObjs = [
            new Paragraph({
              children: [
                new TextRun({
                  text: workCurrentRow,
                  font: fontType,
                  size: l0Font,
                  italics: work[2].length > 0 ? true : false,
                }),
              ],
            }),
          ];
        } else if (k == 1) {
          docxObjs = [
            new Paragraph({
              children: [
                new TextRun({
                  text: workCurrentRow.title,
                  font: fontType,
                  size: l0Font,
                  bold: true,
                  italics: work[2].length > 0 ? true : false,
                }),
              ],
            }),
            ...(work[2].length > 0
              ? [l0Text(`${workCurrentRow.text.toUpperCase()} (EN TOUTES LETTRES) :`, true)]
              : await textRunsSplitGen(workCurrentRow.text, ln1Font)),
            workCurrentRow.unit && l0Text(`${workCurrentRow.unit.toUpperCase()} (EN TOUTES LETTRES) :`, true),
            l0Text(''),
          ];
        } else if (k == 2) {
          if (workCurrentRow) {
            docxObjs = [...(await textRunsSplitGen(workCurrentRow, l0Font))];
          } else {
            docxObjs = [lineBreak()];
          }
        }
        const tableCell = new TableCell({
          children: docxObjs,
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        workTableRowCells.push(tableCell);
      }
      const workTableRow = new TableRow({
        children: workTableRowCells,
      });
      tableBodyRows.push(workTableRow);
    }
  }

  const tableBody = [
    new Table({
      rows: [...tableBodyRows],
    }),
  ];

  const children = [...tableHeader, ...tableBody, ...BPUSignatureSection];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesBPU(data, currentProject) {
  const headArr = headGen('BPU', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesAndTranchesBPU(data);

  const tableHeader = _parseHead(headArr);

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const trade = rows[i];

    const tradeTableRowCells = [];
    for (let j = 0; j < trade.rows.length; j++) {
      const tradeCurrentRow = trade.rows[j];
      let docxObjs = [l0Text(tradeCurrentRow, true)];
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.TOP,
        margins: normalMargin,
        shading: {
          fill: '#C0C0C0',
        },
      });
      tradeTableRowCells.push(tableCell);
    }
    const tradeTableRow = new TableRow({
      children: tradeTableRowCells,
    });
    tableBodyRows.push(tradeTableRow);

    for (let j = 0; j < trade.arr.length; j++) {
      const tranch = trade.arr[j];

      const tranchTableRowCells = [];
      for (let k = 0; k < tranch.rows.length; k++) {
        const tranchCurrentRow = tranch.rows[k];
        let docxObjs = [l0Text(tranchCurrentRow, true)];
        const tableCell = new TableCell({
          children: docxObjs,
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        tranchTableRowCells.push(tableCell);
      }
      const tranchTableRow = new TableRow({
        children: tranchTableRowCells,
      });
      tableBodyRows.push(tranchTableRow);

      for (let k = 0; k < tranch.arr.length; k++) {
        const work = tranch.arr[k];
        const workTableRowCells = [];
        for (let l = 0; l < work.length; l++) {
          const workCurrentRow = work[l];
          let docxObjs;
          if (l == 0) {
            docxObjs = [
              new Paragraph({
                children: [
                  new TextRun({
                    text: workCurrentRow,
                    font: fontType,
                    size: l0Font,
                    italics: work[2].length > 0 ? true : false,
                  }),
                ],
              }),
            ];
          } else if (l == 1) {
            docxObjs = [
              new Paragraph({
                children: [
                  new TextRun({
                    text: workCurrentRow.title,
                    font: fontType,
                    size: l0Font,
                    bold: true,
                    italics: work[2].length > 0 ? true : false,
                  }),
                ],
              }),
              ...(work[2].length > 0
                ? [l0Text(`${workCurrentRow.text.toUpperCase()} (EN TOUTES LETTRES) :`, true)]
                : await textRunsSplitGen(workCurrentRow.text, ln1Font)),
              workCurrentRow.unit && l0Text(`${workCurrentRow.unit.toUpperCase()} (EN TOUTES LETTRES) :`, true),
              l0Text(''),
            ];
          } else if (l == 2) {
            if (workCurrentRow) {
              docxObjs = [...(await textRunsSplitGen(workCurrentRow, l0Font))];
            } else {
              docxObjs = [lineBreak()];
            }
          }
          const tableCell = new TableCell({
            children: docxObjs,
            verticalAlign: VerticalAlign.TOP,
            margins: normalMargin,
          });
          workTableRowCells.push(tableCell);
        }
        const workTableRow = new TableRow({
          children: workTableRowCells,
        });
        tableBodyRows.push(workTableRow);
      }
    }
  }

  const tableBody = [
    new Table({
      rows: [...tableBodyRows],
    }),
  ];

  const children = [...tableHeader, ...tableBody, ...BPUSignatureSection];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - BPU`;
  return { blob, filename };
}

const BPUSignatureSection = [
  new Paragraph({
    children: [
      new TextRun({
        text: ``,
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: `                 Fait à :                                   Le : `,
        font: fontType,
        size: l0Font,
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: `                 L'entrepreneur soussigné`,
        font: fontType,
        size: l0Font,
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: `                 Cachet et signature`,
        font: fontType,
        size: l0Font,
      }),
    ],
  }),
];

async function exportDOCXSimpleCCTP(data, currentProject, selectedCCTPIndexes) {
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenSimpleCCTP(data, currentProject, selectedCCTPIndexes);
  const { chap0, cctps } = rows;

  // Parse head
  const parsedHead = _parseHead(headArr);

  const tableOfContent = new TableOfContents('Summary', {
    hyperlink: true,
    headingStyleRange: '1-5',
  });

  const tableOfContentSection = [
    Spacer,
    new Paragraph({
      children: [
        new TextRun({
          text: localStorage.getItem('i18nextLng') == 'en' ? 'Table of Contents' : 'Table des matières',
          size: l4Font,
          font: fontType,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
    }),
    tableOfContent,
    Spacer,
  ];

  // Parse Chap0
  let parsedChap0part1 = [];
  let parsedChap0part2 = [];
  if (chap0) {
    parsedChap0part1 = _parseChap0part1(chap0.part1);
    parsedChap0part2 = await _parseChap0part2(chap0.part2);
  }

  // Parse CCTPs
  const parsedCCTPs = [];
  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    parsedCCTPs.push(
      new Paragraph({
        shading: {
          color: 'D9D9D9',
          type: ShadingType.SOLID,
          fill: 'D9D9D9',
        },
        spacing: {
          before: i == 0 ? 6 * 20 : 4 * 20,
          after: 3 * 20,
        },
        children: [
          new TextRun({
            text: _.title,
            size: l4Font,
            bold: true,
            font: fontType,
            color: '000000',
          }),
        ],
        heading: HeadingLevel.HEADING_1,
      })
    );
    const cctpArr = _.arr;
    for (let j = 0; j < cctpArr.length; j++) {
      const lib = cctpArr[j];
      parsedCCTPs.push(l3Text(lib.title, null, { before: 12 * 20, after: 12 * 20 }));
      for (let k = 0; k < lib.arr.length; k++) {
        const cat = lib.arr[k];
        parsedCCTPs.push(l2Text(cat.title, null, { before: 6 * 20, after: 12 * 20 }));
        for (let l = 0; l < cat.arr.length; l++) {
          const work = cat.arr[l];
          parsedCCTPs.push(l2Text(work.title, null, { before: 6 * 20, after: 12 * 20 }));
          let docxObjs = await textRunsSplitGen(work.text);
          parsedCCTPs.push(...docxObjs);
        }
      }
    }
  }

  const children = [...parsedHead, ...tableOfContentSection, ...parsedChap0part1, ...parsedChap0part2, ...parsedCCTPs];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    features: {
      updateFields: true,
    },
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

async function exportDOCXTradesCCTP(data, currentProject, selectedCCTPIndexes) {
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesCCTP(data, currentProject, selectedCCTPIndexes);
  const { chap0, cctps } = rows;

  // Parse head
  const parsedHead = _parseHead(headArr);

  const tableOfContent = new TableOfContents('Summary', {
    hyperlink: true,
    headingStyleRange: '1-5',
  });

  const tableOfContentSection = [
    Spacer,
    new Paragraph({
      children: [
        new TextRun({
          text: localStorage.getItem('i18nextLng') == 'en' ? 'Table of Contents' : 'Table des matières',
          size: l4Font,
          font: fontType,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
    }),
    tableOfContent,
    Spacer,
  ];

  // Parse Chap0
  let parsedChap0part1 = [];
  let parsedChap0part2 = [];
  if (chap0) {
    parsedChap0part1 = _parseChap0part1(chap0.part1);
    parsedChap0part2 = await _parseChap0part2(chap0.part2);
  }

  // Parse CCTPs
  const parsedCCTPs = [];
  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    parsedCCTPs.push(
      new Paragraph({
        shading: {
          color: 'D9D9D9',
          type: ShadingType.SOLID,
          fill: 'D9D9D9',
        },
        spacing: {
          before: i == 0 ? 6 * 20 : 4 * 20,
          after: 3 * 20,
        },
        children: [
          new TextRun({
            text: _.title,
            size: l4Font,
            bold: true,
            font: fontType,
            color: '000000',
          }),
        ],
        heading: HeadingLevel.HEADING_1,
      })
    );
    const cctpArr = _.arr;
    for (let j = 0; j < cctpArr.length; j++) {
      const lib = cctpArr[j];
      parsedCCTPs.push(l3Text(lib.title, null, { before: 12 * 20, after: 12 * 20 }));
      for (let k = 0; k < lib.arr.length; k++) {
        const cat = lib.arr[k];
        parsedCCTPs.push(l2Text(cat.title, null, { before: 6 * 20, after: 12 * 20 }));
        for (let l = 0; l < cat.arr.length; l++) {
          const work = cat.arr[l];
          parsedCCTPs.push(l2Text(work.title, null, { before: 6 * 20, after: 12 * 20 }));
          let docxObjs = await textRunsSplitGen(work.text);
          parsedCCTPs.push(...docxObjs);
        }
      }
    }
  }

  const children = [...parsedHead, ...tableOfContentSection, ...parsedChap0part1, ...parsedChap0part2, ...parsedCCTPs];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    features: {
      updateFields: true,
    },
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes) {
  const headArr = headGen('CCTP', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesAndTranchesCCTP(data, currentProject, selectedCCTPIndexes);
  const { chap0, cctps } = rows;

  // Parse head
  const parsedHead = _parseHead(headArr);

  const tableOfContent = new TableOfContents('Summary', {
    hyperlink: true,
    headingStyleRange: '1-5',
  });

  const tableOfContentSection = [
    Spacer,
    new Paragraph({
      children: [
        new TextRun({
          text: localStorage.getItem('i18nextLng') == 'en' ? 'Table of Contents' : 'Table des matières',
          size: l4Font,
          font: fontType,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
    }),
    tableOfContent,
    Spacer,
  ];

  // Parse Chap0
  let parsedChap0part1 = [];
  let parsedChap0part2 = [];
  if (chap0) {
    parsedChap0part1 = _parseChap0part1(chap0.part1);
    parsedChap0part2 = await _parseChap0part2(chap0.part2);
  }

  // Parse CCTPs
  const parsedCCTPs = [];
  for (let i = 0; i < cctps.length; i++) {
    const _ = cctps[i];
    parsedCCTPs.push(
      new Paragraph({
        shading: {
          color: 'D9D9D9',
          type: ShadingType.SOLID,
          fill: 'D9D9D9',
        },
        spacing: {
          before: i == 0 ? 6 * 20 : 4 * 20,
          after: 3 * 20,
        },
        children: [
          new TextRun({
            text: _.title,
            size: l4Font,
            bold: true,
            font: fontType,
            color: '000000',
          }),
        ],
        heading: HeadingLevel.HEADING_1,
      })
    );
    const cctpArr = _.arr;
    for (let j = 0; j < cctpArr.length; j++) {
      const lib = cctpArr[j];
      parsedCCTPs.push(l3Text(lib.title, null, { before: 12 * 20, after: 12 * 20 }));
      for (let k = 0; k < lib.arr.length; k++) {
        const cat = lib.arr[k];
        parsedCCTPs.push(l2Text(cat.title, null, { before: 6 * 20, after: 12 * 20 }));
        for (let l = 0; l < cat.arr.length; l++) {
          const work = cat.arr[l];
          parsedCCTPs.push(l2Text(work.title, null, { before: 6 * 20, after: 12 * 20 }));
          let docxObjs = await textRunsSplitGen(work.text);
          parsedCCTPs.push(...docxObjs);
        }
      }
    }
  }

  const children = [...parsedHead, ...tableOfContentSection, ...parsedChap0part1, ...parsedChap0part2, ...parsedCCTPs];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    features: {
      updateFields: true,
    },
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

function _parseHead(headArr) {
  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      font: fontType,
                      size: l2Font,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      font: fontType,
                      size: l2Font,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              width: { size: 100, type: WidthType.PERCENTAGE },
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      font: fontType,
                      size: l2Font,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];
  return tableHeader;
}

function _parseChap0part1(part1) {
  const arr = [];
  arr.push(
    l4Text(
      'CHAP 0 - CLAUSES GENERALES',
      null,
      { before: 6 * 20, after: 18 * 20 },
      {
        color: 'D9D9D9',
        type: ShadingType.SOLID,
        fill: 'D9D9D9',
      }
    )
  );
  arr.push(l3Text('0.1 DESCRIPTION DU MARCHE', null, { before: 12 * 20, after: 12 * 20 }));
  arr.push(l2Text('0.1.1 OBJET DU MARCHE', null, { before: 6 * 20, after: 12 * 20 }));
  arr.push(l1Text('Le présent Cahier des Clauses Techniques Particulières (C.C.T.P.) concerne les travaux ci-après :'));
  arr.push(l1Text(part1.description, true));
  arr.push(l2Text('0.1.2 INTERVENANTS DU MARCHE', null, { before: 6 * 20, after: 12 * 20 }));
  arr.push(l1Text("Maitre d'Ouvrage:", true));
  arr.push(l1Text(`    ${part1.client.address}`));
  arr.push(l1Text(`   ${part1.client.name}`));
  arr.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '   ',
          font: fontType,
          size: l1Font,
        }),
        new TextRun({
          text: `${part1.client.email}`,
          font: fontType,
          size: l1Font,
          color: '4472C4',
          underline: true,
        }),
      ],
    })
  );
  arr.push(l1Text(`   ${part1.client.phone}`));
  arr.push(l1Text("Maitre d'Oeuvre:", true));
  arr.push(l1Text(`    ${part1.prescriber.address}`));
  arr.push(l1Text(`   ${part1.prescriber.name}`));
  arr.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '   ',
          font: fontType,
          size: l1Font,
        }),
        new TextRun({
          text: `${part1.prescriber.email}`,
          font: fontType,
          size: l1Font,
          color: '4472C4',
          underline: true,
        }),
      ],
    })
  );
  arr.push(l1Text(`   ${part1.prescriber.phone}`));
  arr.push(l2Text('0.1.3 TYPE DE MARCHE', null, { before: 6 * 20, after: 12 * 20 }));
  arr.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Le marché est un marché à : ',
          size: l1Font,
          font: fontType,
          color: '000000',
        }),
        new TextRun({
          text: part1.market_type,
          size: l1Font,
          bold: true,
          italics: true,
          font: fontType,
          color: '000000',
        }),
      ],
    })
  );
  return arr;
}

async function _parseChap0part2(part2) {
  const arr = [];
  for (let i = 0; i < part2.length; i++) {
    const _ = part2[i];
    arr.push(l3Text(_.title, null, { before: 12 * 20, after: 12 * 20 }));
    if (_.text) {
      let docxObjs = await textRunsSplitGen(_.text);
      arr.push(...docxObjs);
    }
    for (let j = 0; j < _.lvl2.length; j++) {
      const __ = _.lvl2[j];
      arr.push(l2Text(__.title, null, { before: 6 * 20, after: 12 * 20 }));
      if (__.text) {
        let docxObjs = await textRunsSplitGen(__.text);
        arr.push(...docxObjs);
      }
      for (let k = 0; k < __.lvl3.length; k++) {
        const ___ = __.lvl3[k];
        arr.push(l2Text(___.title, null, { before: 6 * 20, after: 6 * 20 }));
        if (___.text) {
          let docxObjs = await textRunsSplitGen(___.text);
          arr.push(...docxObjs);
        }
      }
    }
  }
  return arr;
}

async function exportDOCXSimpleDPGF(data, currentProject) {
  const headArr = headGen('DPGF', `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenSimpleDPGF(data);

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 26,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.TOP,
      margins:
        i != 1
          ? normalMargin
          : {
              top: convertInchesToTwip(0.06),
              bottom: convertInchesToTwip(0.06),
              left: convertInchesToTwip(0.72),
              right: convertInchesToTwip(0.72),
            },
      shading: {
        fill: '#DCDADA',
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == 'object') {
        const docxObjs = await textRunsSplitGen(currentRow[j].bpu);
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j].title}`,
                  size: 22,
                  bold: true,
                }),
              ],
            }),
            ...docxObjs,
            new Paragraph({
              text: '',
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j]}`,
                  bold: currentRow[0].length === 3 ? true : false,
                  italics: currentRow[0].length === 3 && j === 1 ? true : false,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      }
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.TOP,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody, Spacer];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;
  return { blob, filename };
}

async function exportDOCXTradesDPGF(data, currentProject) {
  const headArr = headGen(`DPGF`, `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesDPGF(data);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesDPGF(currentRow, i + 1);
    docxParsedData = docxParsedData.concat(currentRowDOCXParsedData);
  }

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 26,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.TOP,
      margins:
        i != 1
          ? normalMargin
          : {
              top: convertInchesToTwip(0.06),
              bottom: convertInchesToTwip(0.06),
              left: convertInchesToTwip(0.72),
              right: convertInchesToTwip(0.72),
            },
      shading: {
        fill: '#DCDADA',
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == 'object') {
        const docxObjs = await textRunsSplitGen(currentRow[j].bpu);
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j].title}`,
                  size: 22,
                  bold: true,
                }),
              ],
            }),
            ...docxObjs,
            new Paragraph({
              text: '',
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j]}`,
                  bold: currentRow[0].length === 1 || (currentRow[0].length === 5 && j === 1) ? true : false,
                  italics: currentRow[0].length === 5 && j === 1 ? true : false,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
          shading: currentRow[0].length === 1 ? firstRowShade : null,
        });
        tableRowCells.push(tableCell);
      }
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesDPGF(data, currentProject) {
  const headArr = headGen(`${'DPGF'}`, `${currentProject?.name ?? 'N/A'}`);

  const rows = rowsGenTradesAndTranchesDPGF(data);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesAndTranchesDPGF(currentRow, i + 1);
    docxParsedData = docxParsedData.concat(currentRowDOCXParsedData);
  }

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: headArr[1],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.24),
                right: convertInchesToTwip(0.24),
              },
              shading: {
                fill: '#C4C8CC',
              },
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                      bold: true,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: '#C4C8CC',
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsEstimation.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: dataColumnsEstimation[i],
              size: 26,
              bold: true,
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.TOP,
      margins:
        i != 1
          ? normalMargin
          : {
              top: convertInchesToTwip(0.06),
              bottom: convertInchesToTwip(0.06),
              left: convertInchesToTwip(0.72),
              right: convertInchesToTwip(0.72),
            },
      shading: {
        fill: '#DCDADA',
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == 'object') {
        const docxObjs = await textRunsSplitGen(currentRow[j].bpu);
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j].title}`,
                  size: 22,
                  bold: true,
                }),
              ],
            }),
            ...docxObjs,
            new Paragraph({
              text: '',
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              alignment: AlignmentType.START,
              children: [
                new TextRun({
                  text: `${currentRow[j]}`,
                  bold:
                    currentRow[0].length === 1 || currentRow[0].length === 3 || (currentRow[0].length === 7 && j === 1)
                      ? true
                      : false,
                  italics: currentRow[0].length === 7 && j === 1 ? true : false,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.TOP,
          margins: normalMargin,
          shading: currentRow[0].length === 1 ? firstRowShade : null,
        });
        tableRowCells.push(tableCell);
      }
    }
    const tableRow = new TableRow({
      children: tableRowCells,
    });
    tableBodyRows.push(tableRow);
  }

  const tableBody = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, Spacer, ...tableBody];

  const sections = [
    {
      properties: {
        ...pageMargin,
      },
      children: children,
    },
  ];

  const doc = new Document({
    sections: sections,
  });

  const blob = await Packer.toBlob(doc);
  const filename = `${currentProject?.name ?? 'N/A'} - ${Date.now()} - DPGF`;
  return { blob, filename };
}

const pageMargin = {
  page: {
    margin: {
      top: convertInchesToTwip(0.1),
      bottom: convertInchesToTwip(0.1),
      left: convertInchesToTwip(0.3),
      right: convertInchesToTwip(0.3),
    },
  },
};

const normalMargin = {
  top: convertInchesToTwip(0.03),
  bottom: convertInchesToTwip(0.03),
  left: convertInchesToTwip(0.12),
  right: convertInchesToTwip(0.12),
};

const firstRowShade = {
  fill: '#DCDADA',
};

export {
  exportDOCXSimpleEstimation,
  exportDOCXTradesEstimation,
  exportDOCXTradesAndTranchesEstimation,
  exportDOCXSimpleBPU,
  exportDOCXTradesBPU,
  exportDOCXTradesAndTranchesBPU,
  exportDOCXSimpleCCTP,
  exportDOCXTradesCCTP,
  exportDOCXTradesAndTranchesCCTP,
  exportDOCXSimpleDPGF,
  exportDOCXTradesDPGF,
  exportDOCXTradesAndTranchesDPGF,
};
