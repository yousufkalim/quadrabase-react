import React from "react";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapsible from "../../components/Collapsible/documentation";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const primaryCol = "#F96B05";

const QNAListItem = Collapsible;

function FirstExpandComponent(){

  const a = [
    {
      text: "CCTG_F02_Terrassements Généraux",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2002-Terrassements%20G%C3%A9n%C3%A9raux.pdf?ver=8icmpKWzm_1PuyBCRPHnaQ%3d%3d&timestamp=1587397575375"
    },
    {
      text: "CCTG_F03_Liants Hydrauliques",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2003-Liants%20hydrauliques.pdf?ver=TB1MxXdhbkpG7ua2AhzROg%3d%3d&timestamp=1587397710772"
    },
    {
      text: "CCTG_F04.2_Aciers Armatures",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2004-II-Fournitures%20d'acier_Armatures.pdf?ver=BAK3UycIi331zTRw2zB3EQ%3d%3d&timestamp=1587397754363"
    },
    {
      text: "CCTG_F04.3_Aciers Laminés",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2004-III-Fourniture%20d'acier_Aciers%20lamin%C3%A9s.pdf?ver=qrDJHEQOAxUilUfpCV38fg%3d%3d&timestamp=1587397884632"
    },
    {
      text: "CCTG_F04.4_Aciers Rivets",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2004-IV-Fourniture%20d'acier-Rivets%20en%20acier.pdf?ver=2FuXuh3BbwhjNJwUOrCy4A%3d%3d&timestamp=1587397937767"
    },
    {
      text: "CCTG_F23_Granulats",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2023-Fournitures%20de%20granulats%20employ%C3%A9s%20%C3%A0%20la%20construction%20et%20%C3%A0%20l'entretien%20des%20chauss%C3%A9es.pdf?ver=1mHIgk_JsVU4NV3S8c0wuA%3d%3d&timestamp=1587397987842"
    },
    {
      text: "CCTG_F24_Liants",
      url: "https://www.quadrabase.fr/Portals/0/Medias/Documents/CCTG/Fasc%2024-Fourniture%20de%20liants%20bitumineux%20pour%20la%20construction%20et%20l'entretien%20des%20chauss%C3%A9es.pdf?ver=lIaPeA0_ut_EWMLUD42JdA%3d%3d&timestamp=1587398037281"
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
                    <ChevronRightIcon sx={{height: "15px", width: "15px"}} />
                  </ListItemIcon>
                  <Typography
                    align="left"
                    sx={{ fontWeight: 400, fontSize: "12px", color: primaryCol }}
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

function QNAList(){

  return (
    <>
    <div style={{ borderBottomWidth: "1px", borderBottomColor: "#000000" }}>
      <Typography
        align="left"
        sx={{ fontWeight: 500, fontSize: 16, paddingTop: "20px", color: primaryCol }}
      >
        Documentation
      </Typography>
    </div>
    <div style={{ marginTop: "10px" }}>
      <QNAListItem text="CCTG" expandComponent={<FirstExpandComponent />} />
      <QNAListItem text="Guides Techniques - Accessibilité" expandComponent={<FirstExpandComponent />} />
      <QNAListItem text="Guides Techniques - Aménagements Cyclables" expandComponent={<FirstExpandComponent />} />
      <QNAListItem text="Guides Techniques - Aménagements Urbains" expandComponent={<FirstExpandComponent />} />
      <QNAListItem text="Guides Techniques - Assainissements" expandComponent={<FirstExpandComponent />} />
      <QNAListItem text="Guides Techniques - Chaussées" expandComponent={<FirstExpandComponent />} />
    </div>
    </>
  );

}

function QNA(){

  return (
    <>
      <QNAList />
      <div style={{marginTop: "50px"}} />
    </>
  );

}

export default function Presentation(){

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFFFFF"
        }}
      >
        <QNA />
      </Container>
    </>
  );

}