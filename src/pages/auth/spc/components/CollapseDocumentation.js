import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import DocumentationFolderIcon from "../assets/images/DocumentationFolder.svg";
import DocumentationPDFIcon from "../assets/images/DocumentationPDF.svg";
import DocumentationPDFDownloadIcon from "../assets/images/DocumentationPDFDownload.svg";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Axios from "axios";
import { baseUrl } from "../../../../utils/BaseUrl";

const CollapseDocumentation = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [downloadables, setDownloadables] = useState([]);

  useEffect(() => {
    getAllDownloadables();
  }, []);

  const getAllDownloadables = async () => {
    try {
      let response = await Axios({
        method: "get",
        url: `${baseUrl}/StudyMaterials`,
      });
      setDownloadables(response.data.filesArr);
    } catch (error) {
      console.log(error?.response?.data?.message, "error ");
    }
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading ?
        <></> :
        <Grid container spacing={1}>
          {downloadables.map((v) => (
            <Single {...v} />
          ))}
        </Grid>
      }
    </>
  );
};

function Single(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      xs={12}
      sm={12}
      md={12}
      sx={{ marginTop: "2%", display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: "80%",
          background: " #FFFFFF",
          boxShadow: " 0px 5px 19px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={
            <img
              src={DocumentationFolderIcon}
              className="spc_nonactive"
              style={{
                width: "80%",
              }}
            />
          }
          action={
            <IconButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {expanded ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          }
          title={<Typography className="spc_title">{props.name}</Typography>}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {props.files.map((v) => (
            <SingleDownloadable {...v} />
          ))}
        </Collapse>
      </Card>
    </Grid>
  );
}

function SingleDownloadable(props) {

  const triggerDownload = (path) => {
    window.open(`${process.env.REACT_APP_URI}/${path}`, "_blank")
  }

  return (
    <CardContent sx={{ background: "#F5F6F8", padding: "" }}>
      <Card
        sx={{
          width: "100%",
          background: " #FFFFFF",
          boxShadow: " 0px 5px 19px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        }}
      >
        <CardHeader
          avatar={
            <img
              src={DocumentationPDFIcon}
              className="spc_nonactive"
              style={{
                width: "80%",
              }}
            />
          }
          action={
            <img
              src={DocumentationPDFDownloadIcon}
              style={{
                marginTop: "50%",
                width: "80%",
                cursor: "pointer"
              }}
              onClick={() => triggerDownload(props.path)}
            />
          }
          title={
            <Typography
              style={{ fontSize: "14px", fontWeight: "600" }}
              className="spc_doctitle"
            >
              {props.name}
            </Typography>
          }
          subheader={
            <Typography
              style={{ fontSize: "12px", fontWeight: "300" }}
            >{`${props.size}`}</Typography>
          }
        />
      </Card>
    </CardContent>
  );
}

export default CollapseDocumentation;
