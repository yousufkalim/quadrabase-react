import React from "react";
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
import DownloadIcon from "@mui/icons-material/Download";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const dataMain = [
  {
    title: "Guides Techniques - Accessibilité",
  },
  {
    title: "Guides Techniques - Aménagements Cyclables",
  },
  {
    title: "Guides Techniques - Aménagements Urbains",
  },
  {
    title: "Guides Techniques - Assainissements",
  },
  {
    title: "Guides Techniques - Chaussées",
  },
  {
    title: "Guides Techniques - Déchets de Chantiers",
  },
  {
    title: "CCTG",
  },
];

const dataDownloadables = [
  {
    title: "CCTG_F02_Terrassements Généraux",
    size: "10",
  },
  {
    title: "CCTG_F02_Terrassements Généraux",
    size: "10",
  },
  {
    title: "CCTG_F02_Terrassements Généraux",
    size: "10",
  },
  {
    title: "CCTG_F02_Terrassements Généraux",
    size: "10",
  },
];

const CollapseDocumentation = () => {
  return (
    <>
      <Grid container spacing={1}>
        {dataMain.map((v) => (
          <Single {...v} />
        ))}
      </Grid>
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
      sx={12}
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
          title={<Typography className="spc_title">{props.title}</Typography>}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {dataDownloadables.map((v) => (
            <SingleDownloadable {...v} />
          ))}
        </Collapse>
      </Card>
    </Grid>
  );
}

function SingleDownloadable(props) {
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
              }}
            />
          }
          title={
            <Typography
              style={{ fontSize: "17px", fontWeight: "600" }}
              className="spc_doctitle"
            >
              {props.title}
            </Typography>
          }
          subheader={
            <Typography
              style={{ fontSize: "12px", fontWeight: "300" }}
            >{`${props.size} MB`}</Typography>
          }
        />
      </Card>
    </CardContent>
  );
}

export default CollapseDocumentation;
