import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FileViewer from "react-file-viewer";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

import { downloadBlob } from "../ReportsGen/data";
import DocViewer from "../../ProjectLibraries/component/DocViewer";
import api from "../../../../api";

const PreviewFileModal = (props) => {
  const { t } = useTranslation();
  const blobURL = URL.createObjectURL(props.blob);

  // pdf
  const [pdf, setPdf] = useState([]);
  useEffect(() => {
    uploadFile();
  }, []);

  const uploadFile = async () => {
    if (props.filetype === "pdf") {
      let form_data = new FormData();
      var file = new File([props.blob], props.filename + ".pdf");
      form_data.append(`file`, file);
      const response = await api("post", `/fileUploader`, form_data);
      setPdf(response.data.files);
    }
  };

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
          pdf.length > 0 && (
            <>
              <DocViewer documents={pdf} style={{ maxHeight: "200px" }} />
            </>
          )
        ) : props.filetype == "docx" ? (
          <FileViewer fileType={props.filetype} filePath={blobURL} />
        ) : props.filetype == "xlsx" ? (
          <OutTable data={rows} columns={cols} />
        ) : (
          <></>
        )}
      </div>
      <br />
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F1966C",
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
