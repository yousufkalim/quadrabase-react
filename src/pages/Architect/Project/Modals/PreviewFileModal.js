import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import FileViewer from "react-file-viewer";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

import { downloadBlob } from "../ReportsGen/data";

const PreviewFileModal = (props) => {
  const { t } = useTranslation();
  const blobURL = URL.createObjectURL(props.blob);

  // PDF
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // XLSX
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.filetype == "xlsx") {
      ExcelRenderer(props.blob, (err, res) => {
        console.log(err);
        console.log(res);
        if (err) {
          console.log(err);
        } else {
          setCols(res.cols);
          setRows(res.rows);
        }
      });
    }
    console.log(props.blob);
    console.log(props.filetype);
    console.log(blobURL);
  }, []);

  const _triggerDownload = () => {
    downloadBlob(props.blob, props.filename);
  };

  return (
    <div style={{ width: "70vw", maxHeight: "80vh", overflow: "auto" }}>
      <div
        style={{
          fontSize: 18,
          border: "1px solid lightgray",
          padding: 15,
          height: 500,
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        {props.filetype == "pdf" ? (
          <>
            <Document
              file={{ url: blobURL }}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(e) => console.log(e)}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </>
        ) : props.filetype == "docx" ? (
          <FileViewer fileType={props.filetype} filePath={blobURL} />
        ) : props.filetype == "xlsx" ? (
          <OutTable
            data={rows}
            columns={cols}
            tableClassName="ExcelTable2007"
            tableHeaderRowClass="heading"
          />
        ) : (
          <></>
        )}
      </div>
      <br />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976D2",
            marginRight: "10px !important",
            height: "35px !important",
          }}
          onClick={_triggerDownload}
        >
          {t("Download")}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3b373c",
            marginRight: "10px !important",
            height: "35px !important",
          }}
          onClick={props.handleOpen}
        >
          {t("Close")}
        </Button>
      </div>
    </div>
  );
};

export default PreviewFileModal;
