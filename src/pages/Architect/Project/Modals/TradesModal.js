// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import { useStyles } from "../../../../css/projectLibraries";
import { Button } from "@mui/material";

// component
const TradesModal = ({ handleTradesModal, currentProject, tradesData, getTrades }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [name, setName] = useState();

  useEffect(() => {
    setName(`Lot n°${tradesData.length + 1}`);
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let maxRanking = Math.max.apply(
      Math,
      tradesData.map((item) => {
        return item.ranking;
      })
    );
    const result = await api(
      "post",
      `/Trades/create`,
      {
        name,
        ranking: maxRanking > 0 ? maxRanking + 1 : 0,
        project: currentProject,
      },
      t
    );
    toast.success(t(result.data.message));
    setName();
    getTrades();
    handleTradesModal();
  };
  // jsx
  return (
    <>
      <form className={classes.smform} onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputWithLabel
          label={t("Name")}
          required={true}
          name="text"
          type="text"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        {/* create button */}
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button variant="contained" className={classes.btn} onClick={handleTradesModal}>
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" className={classes.btn} type="submit">
            {t("Add Trade")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TradesModal;
