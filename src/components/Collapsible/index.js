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
      <div style={{ minHeight: "40px", borderWidth: "1px", borderRadius: "10px", borderColor: primaryCol, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px"}}>
        <Grid container flex="row" spacing={2}>
          <Grid item xs={11} md={11}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Typography
                align="left"
                sx={{ fontWeight: 500, fontSize: 16, color: primaryCol, paddingLeft: "20px" }}
              >
                {text}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={1} md={1}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginRight: "-20px"}}>
              <button
                onClick={() => setOpen(!open)}
                syle={{marginRight: 0, paddingRight: 0}}
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