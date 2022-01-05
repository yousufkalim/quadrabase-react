import React from "react";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Collapsible from "../../components/Collapsible/manufacturers";

const primaryCol = "#F96B05";

const ManufacturersListItem = Collapsible;

function FirstExpandComponent(){

  const a = [
    {
      text: "BATISEC SAS",
      url: "https://batisec.fr/"
    },
    {
      text: "CBS BTP",
      url: "https://www.cbs-btp.fr/produits/barriere-de-chantier/"
    },
    {
      text: "CISABAC",
      url: "http://www.cisabac.com/"
    },
    {
      text: "ECHAMAT KERNST",
      url: "https://www.echamat-kernst.com/"
    },
    {
      text: "FORNELLS",
      url: "https://fornells.fr/chantier/"
    },
    {
      text: "HERAS SARL",
      url: "https://www.cloture-mobile.fr/"
    },
    {
      text: "CHROME",
      url: "https://www.kromm.fr/"
    },
  ];

  return (
    <>
      <div>
        <List dense={true} sx={{marginLeft: "5px"}}>
          {
            a.map((e) => (
              <a href={e.url} target="_blank">
                <div style={{marginLeft: "18px", display: "flex", "flexDirection": "row", alignItems: "center"}}>
                  <ListItemIcon sx={{ minWidth: "16px" }}>
                    <FiberManualRecordIcon sx={{height: "7px", width: "7px"}} />
                  </ListItemIcon>
                  <Typography
                    align="left"
                    sx={{ fontWeight: 600, fontSize: "11px", color: primaryCol }}
                  >
                    {e.text}
                  </Typography>
                </div>
              </a>
            ))
          }
        </List>
      </div>
    </>
  );

}

function ManufacturersList(){

  return (
    <>
    <div style={{ borderBottomWidth: "1px", borderBottomColor: "#000000" }}>
      <Typography
        align="left"
        sx={{ fontWeight: 500, fontSize: 16, paddingTop: "20px", color: primaryCol }}
      >
        MANUFACTURERS ...
      </Typography>
    </div>
    <div style={{ marginTop: "10px" }}>
      <ManufacturersListItem text="TP01-PREPARATORY WORK" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP02-GENERAL EARTHWORKS" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP03-GEOSYNTHETIQUES-GEOMEMBRANES" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP04-CHAUSSEES" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP05-ROADS-PUBLIC SPACES" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP06-MASONRY WORKS - SUPPORTS" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP07-MISCELLANEOUS NETWORKS" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP08-EU-EP SANITATIONS" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP09-ELECTRICAL SUPPLY - LIGHTING" expandComponent={<FirstExpandComponent />} />
      <ManufacturersListItem text="TP10-TELECOM - VIDEO SURVEILLANCE" expandComponent={<FirstExpandComponent />} />
    </div>
    </>
  );

}

function Manufacturers(){

  return (
    <>
      <ManufacturersList />
      <div style={{marginTop: "50px"}} />
    </>
  );

}

export default function Manufacturer(){

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFFFFF"
        }}
      >
        <Manufacturers />
      </Container>
    </>
  );

}