import React from "react";
import Appbar from "./spc/components/Appbar";
import Typography from "@mui/material/Typography";
import Quadralogo from "./spc/assets/images/Quadralogo2.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Border from "./spc/assets/images/border.svg";
import Contactsvg from "./spc/assets/images/Contact.svg";
const Contact = () => {
  return (
    <>
      <div className="spc_supportheaderdiv">
        <Appbar logo={Quadralogo}></Appbar>
        <div className="spc_">
          <Typography
            className="spc_suppportHeroheading"
            style={{ paddingBottom: "14%" }}
          >
            Contact
          </Typography>
        </div>
      </div>
      <form>
        <Grid
          container
          spacing={1}
          sx={{
            paddingBottom: "10% !important",
            paddingTop: "5% !important",

            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Grid xs={12} sm={12} md={6}>
            <img src={Border} className="borderimg"></img>

            <div className="contactform">
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="inputfield"
              />
              <input
                type="text"
                name="number"
                placeholder="Contact No"
                className="inputfield"
              />
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                className="inputfield"
              />
              <textarea
                type="text"
                placeholder="You want to ask?"
                name="message"
                className="textarea"
              />
            </div>
            <div
              style={{ paddingLeft: "25%", paddingTop: "7%" }}
              className="contactbuttondiv"
            >
              <Button
                type="submit"
                variant="contained"
                className="Contactusbutton"
              >
                Contact us
              </Button>
            </div>
          </Grid>
          <Grid xs={12} sm={12} md={6} sx={{ paddingTop: "10% !important" }}>
            <img src={Contactsvg} className="contactsvg"></img>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Contact;
