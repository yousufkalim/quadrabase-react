import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const primaryCol = "#7E7B75";

export default function Collapsible(props) {
  const { avatartitle, text, expandComponent ,data} = props;

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(270deg)" : "rotate(360deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
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
              <Avatar
                aria-label="recipe"
                className={` ${expanded ? "spc_active" : "spc_nonactive"}`}
              >
                {props.avatartitle}
              </Avatar>
            }
            action={
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            }
            title={<Typography className="spc_title">{props.text}</Typography>}
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{ background: "#F5F6F8", paddingLeft: "2%" }}>
              
<SingleData data={data}  />
              {/* {expandComponent} */}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
}


function SingleData({data}) {
  const a = [
    {
      text: "ARCADIAS GROUPE",
      url: "https://www.groupearcadias.com/",
    },
    {
      text: "BATISEC SAS",
      url: "https://batisec.fr/",
    },
    {
      text: "FORNELLS",
      url: "https://fornells.fr/chantier/",
    },
    {
      text: "HERAS Sarl",
      url: "https://www.cloture-mobile.fr/",
    },
    {
      text: "ISOSIGN",
      url: "https://isosign.fr/",
    },
    {
      text: "LACROIX CITY",
      url: "https://www.lacroix-city.fr/",
    },
    {
      text: "NADIA SIGNALISATION",
      url: "http://www.nadia-europ.com/",
    },
    {
      text: "SIGNATURE GROUPE",
      url: "https://www.groupe-signature.com/fr/",
    },
    {
      text: "SIGNAUX GIROD",
      url: "https://www.girod-signalisation.com/fr",
    },
  ];
  console.log("data SingleData",data)


  return (
    <>
      <div>
        <List dense={true} sx={{ marginLeft: "5px" }}>
          {data.subData.map((e) => (
            <a href={e.url} target="_blank">
              <div
                style={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "16px" }}>
                  <FiberManualRecordIcon sx={{ height: "7px", width: "7px" }} />
                </ListItemIcon>
                <Typography
                  align="left"
                  sx={{ fontWeight: 600, fontSize: "14px", color: primaryCol }}
                >
                  {e.text}
                </Typography>
              </div>
            </a>
          ))}
        </List>
      </div>
    </>
  );
}
