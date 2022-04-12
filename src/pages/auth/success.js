import React, { useState, useEffect } from "react";
import { useStyles } from "../../css/register";
import Logo from "../../assets/Quadralogo.png";
import { useHistory, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import api from "../../api";

const Success = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { id } = params;
  const [invoiceUrl, setInvoiceUrl] = useState("");

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    console.log(id);
    const res = await api("get", `/licenses/invoice/${id}`);
    setInvoiceUrl(res.data.url);
  };

  return (
    <div className={classes.mainContainer}>
      {/* left container */}
      <div className={classes.left}>
        {/* Welcome text and login button */}
        <div className={classes.leftContent}>
          <img src={Logo} alt="" />
          <button
            type="submit"
            className={classes.btnLogin}
            onClick={() => {
              history.push("/");
            }}
          >
            Connexion
          </button>
        </div>
      </div>
      <div style={{ width: "50%", display: "grid", placeItems: "center" }}>
        <div style={{ width: "60%" }}>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Paiement effectué avec succès -{" "}
            <a href={invoiceUrl} target="_blank">
              Voir la facture
            </a>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => history.push("/")}>
              Procéder à la connexion
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Success;
