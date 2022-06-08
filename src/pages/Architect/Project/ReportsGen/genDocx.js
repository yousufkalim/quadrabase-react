import { Packer } from "docx";

import {
  convertInchesToTwip,
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
} from "docx";

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
  footerDataGenSimpleDPGF,
  textRunsSplitGen,
  dataColumnsEstimation,
  footerColumnsSimpleEstimation,
  dataColumnsBPU,
} from "./data.js";

const Spacer = new Paragraph({
  text: "",
});

async function exportDOCXSimpleEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);

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
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
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
            text: `${currentRow[j]}`,
            alignment: AlignmentType.START,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
        margins: normalMargin,
        shading: i == 0 ? firstRowShade : null,
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
          alignment: AlignmentType.END,
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
    });
    const tableCell2 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.END,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;
  return { blob, filename };
}

async function exportDOCXTradesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesEstimation(data, noPrice);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesEstimation(currentRow, i + 1);
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
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      const tableCell = new TableCell({
        children: [
          new Paragraph({
            text: `${currentRow[j]}`,
            alignment: AlignmentType.START,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesEstimation(data, currentProject, noPrice) {
  const headArr = headGen(`${noPrice ? "DQE" : "Estimation"}`, `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesAndTranchesEstimation(data, noPrice);

  let docxParsedData = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const currentRowDOCXParsedData = docxParsedDataGenTradesAndTranchesEstimation(currentRow, i + 1);
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
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      const tableCell = new TableCell({
        children: [
          new Paragraph({
            text: `${currentRow[j]}`,
            alignment: AlignmentType.START,
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${noPrice ? "DQE" : "Estimation"}`;
  return { blob, filename };
}

async function exportDOCXSimpleBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenSimpleBPU(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsBPU.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          text: dataColumnsEstimation[i],
          alignment: AlignmentType.START,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      let docxObjs = textRunsSplitGen(currentRow[j]);
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.CENTER,
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
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, ...tableBody];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;
  return { blob, filename };
}

async function exportDOCXTradesBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesBPU(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsBPU.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          text: dataColumnsEstimation[i],
          alignment: AlignmentType.START,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      let docxObjs = textRunsSplitGen(currentRow[j]);
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.CENTER,
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
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, ...tableBody];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesBPU(data, currentProject) {
  const headArr = headGen("BPU", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesAndTranchesBPU(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const tableBodyColumns = [];

  for (let i = 0; i < dataColumnsBPU.length; i++) {
    const tableCell = new TableCell({
      children: [
        new Paragraph({
          text: dataColumnsEstimation[i],
          alignment: AlignmentType.START,
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      let docxObjs = textRunsSplitGen(currentRow[j]);
      const tableCell = new TableCell({
        children: docxObjs,
        verticalAlign: VerticalAlign.CENTER,
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
      rows: [
        new TableRow({
          children: tableBodyColumns,
        }),
        ...tableBodyRows,
      ],
    }),
  ];

  const children = [...tableHeader, ...tableBody];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - BPU`;
  return { blob, filename };
}

async function exportDOCXSimpleCCTP(data, currentProject) {
  const headArr = headGen("CCTP", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenSimpleCCTP(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.72),
                right: convertInchesToTwip(0.72),
              },
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const bodyChild = [];

  for (let i = 0; i < rows.length; i++) {
    bodyChild.push(
      new Paragraph({
        spacing: {
          before: i == 0 ? 120 : 80,
          after: 60,
        },
        children: [
          new TextRun({
            text: rows[i].title,
            size: 42,
            bold: true,
          }),
        ],
      })
    );

    const CCTPArr = rows[i].cctp_arr;

    for (let j = 0; j < CCTPArr.length; j++) {
      let docxObjs = textRunsSplitGen(CCTPArr[j]);
      bodyChild.push(...docxObjs);
    }
  }

  const children = [...tableHeader, ...bodyChild];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

async function exportDOCXTradesCCTP(data, currentProject) {
  const headArr = headGen("CCTP", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesCCTP(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.72),
                right: convertInchesToTwip(0.72),
              },
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const bodyChild = [];

  for (let i = 0; i < rows.length; i++) {
    bodyChild.push(
      new Paragraph({
        spacing: {
          before: i == 0 ? 120 : 80,
          after: 60,
        },
        children: [
          new TextRun({
            text: rows[i].title,
            size: 42,
            bold: true,
          }),
        ],
      })
    );

    const CCTPArr = rows[i].cctp_arr;

    for (let j = 0; j < CCTPArr.length; j++) {
      let docxObjs = textRunsSplitGen(CCTPArr[j]);
      bodyChild.push(...docxObjs);
    }
  }

  const children = [...tableHeader, ...bodyChild];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesCCTP(data, currentProject) {
  const headArr = headGen("CCTP", `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenTradesAndTranchesCCTP(data);

  const tableHeader = [
    new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[0],
                  style: "bold",
                  alignment: AlignmentType.START,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[1],
                  style: "bold",
                  alignment: AlignmentType.CENTER,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                top: convertInchesToTwip(0.06),
                bottom: convertInchesToTwip(0.06),
                left: convertInchesToTwip(0.72),
                right: convertInchesToTwip(0.72),
              },
              shading: {
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: headArr[2],
                  style: "bold",
                  alignment: AlignmentType.END,
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
              },
            }),
          ],
        }),
      ],
    }),
  ];

  const bodyChild = [];

  for (let i = 0; i < rows.length; i++) {
    bodyChild.push(
      new Paragraph({
        spacing: {
          before: i == 0 ? 120 : 80,
          after: 60,
        },
        children: [
          new TextRun({
            text: rows[i].title,
            size: 42,
            bold: true,
          }),
        ],
      })
    );

    const CCTPArr = rows[i].cctp_arr;

    for (let j = 0; j < CCTPArr.length; j++) {
      let docxObjs = textRunsSplitGen(CCTPArr[j]);
      bodyChild.push(...docxObjs);
    }
  }

  const children = [...tableHeader, ...bodyChild];

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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - CCTP`;
  return { blob, filename };
}

async function exportDOCXSimpleDPGF(data, currentProject) {
  const headArr = headGen(`${"DPGF"}`, `${currentProject?.name ?? "N/A"}`);

  const rows = rowsGenSimpleDPGF(data);
  const footerData = footerDataGenSimpleDPGF(true);

  const tableHeader = [
    new Table({
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == "object") {
        const docxObjs = textRunsSplitGen(currentRow[j].bpu);
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
            new Paragraph({
              text: "",
            }),
            ...docxObjs,
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              text: `${currentRow[j]}`,
              alignment: AlignmentType.START,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
          shading: i == 0 ? firstRowShade : null,
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

  for (let i = 0; i < footerColumnsSimpleEstimation.length; i++) {
    const tableRowCells = [];
    const tableCell1 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.END,
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
    });
    const tableCell2 = new TableCell({
      children: [
        new Paragraph({
          alignment: AlignmentType.END,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${"DPGF"}`;
  return { blob, filename };
}

async function exportDOCXTradesDPGF(data, currentProject) {
  const headArr = headGen(`"DPGF"}`, `${currentProject?.name ?? "N/A"}`);

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
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == "object") {
        const docxObjs = textRunsSplitGen(currentRow[j].bpu);
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
            new Paragraph({
              text: "",
            }),
            ...docxObjs,
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              text: `${currentRow[j]}`,
              alignment: AlignmentType.START,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
          shading: i == 0 ? firstRowShade : null,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${"DPGF"}`;
  return { blob, filename };
}

async function exportDOCXTradesAndTranchesDPGF(data, currentProject) {
  const headArr = headGen(`${"DPGF"}`, `${currentProject?.name ?? "N/A"}`);

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
                  alignment: AlignmentType.START,
                  children: [
                    new TextRun({
                      text: headArr[0],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
                fill: "#C4C8CC",
              },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun({
                      text: headArr[2],
                      size: 22,
                    }),
                  ],
                }),
              ],
              verticalAlign: VerticalAlign.CENTER,
              margins: normalMargin,
              shading: {
                fill: "#C4C8CC",
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
            }),
          ],
        }),
      ],
      verticalAlign: VerticalAlign.CENTER,
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
        fill: "#DCDADA",
      },
    });

    tableBodyColumns.push(tableCell);
  }

  const tableBodyRows = [];

  for (let i = 0; i < docxParsedData.length; i++) {
    const currentRow = docxParsedData[i];
    const tableRowCells = [];
    for (let j = 0; j < currentRow.length; j++) {
      if (typeof currentRow[j] == "object") {
        const docxObjs = textRunsSplitGen(currentRow[j].bpu);
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
            new Paragraph({
              text: "",
            }),
            ...docxObjs,
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
        });
        tableRowCells.push(tableCell);
      } else {
        const tableCell = new TableCell({
          children: [
            new Paragraph({
              text: `${currentRow[j]}`,
              alignment: AlignmentType.START,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: normalMargin,
          shading: i == 0 ? firstRowShade : null,
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
  const filename = `${currentProject?.name ?? "N/A"} - ${Date.now()} - ${"DPGF"}`;
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
  fill: "#DCDADA",
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
