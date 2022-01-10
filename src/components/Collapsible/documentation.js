import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Collapse from '@mui/material/Collapse';

const primaryCol = "#F96B05";

export default function Collapsible(props){

  const { text, expandComponent } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div style={{ minHeight: "35px", borderBottomWidth: "1px", borderBottomColor: primaryCol, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "5px", marginLeft: "10px", marginRight: "10px"}}>
        <Grid container flex="row" spacing={2}>
          <Grid item xs={1} md={1} sx={{marginLeft: "-20px", marginRight: "-30px"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <button
                onClick={() => setOpen(!open)}
              >
                {open ? <Remove sx={{color: primaryCol}} /> : <AddIcon sx={{color: primaryCol}} />}
              </button>
            </div>
          </Grid>
          <Grid item xs={11} md={11}>
            <div style={{display: "flex", alignItems: "center"}}>
              <Typography
                align="left"
                sx={{ fontWeight: 500, fontSize: 14, color: primaryCol }}
              >
                {text.toUpperCase()}
              </Typography>
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