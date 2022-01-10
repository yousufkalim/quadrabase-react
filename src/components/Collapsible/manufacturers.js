import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

const primaryCol = "#F96B05";

export default function Collapsible(props){

  const { text, expandComponent } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div style={{ minHeight: "35px", borderBottomWidth: "1px", borderBottomColor: "#000000", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", marginLeft: "10px", marginRight: "10px"}}>
        <Grid container flex="row" spacing={2}>
          <Grid item xs={11} md={11}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Typography
                align="left"
                sx={{ fontWeight: 500, fontSize: 15, paddingLeft: "5px" }}
              >
                {text.toUpperCase()}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={1} md={1}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "40px"}}>
              <button
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
            </div>
          </Grid>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {expandComponent}
          </Collapse>
        </Grid>
      </div>
    </>
  );

}