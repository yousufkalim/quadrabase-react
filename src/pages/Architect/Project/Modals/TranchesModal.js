// init
import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// component
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import { useStyles } from "../../../../css/projectLibraries";
import { Button, Grid } from "@mui/material";

// component
const TranchesModal = ({ handleTranchesModal, tranchesData, getTranches, tradeOption, currentProject, selectedTrade }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [name, setName] = useState();
  const [trade, setTrade] = useState("");
  useEffect(() => {
    setName(`Tranche n°${tranchesData.length + 1}`);
    setTrade(selectedTrade);
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let maxRanking = Math.max.apply(
      Math,
      tranchesData.map((item) => {
        return item.ranking;
      })
    );
    const result = await api(
      "post",
      `/Tranches/create`,
      {
        name,
        ranking: maxRanking > 0 ? maxRanking + 1 : 0,
        trade,
        project: currentProject,
      },
      t
    );
    toast.success(t(result.data.message));
    setName();
    getTranches();
    handleTranchesModal();
  };
  // jsx
  return (
    <>
      <form className={classes.smform} onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputDropdown
          options={tradeOption}
          label={t("Trade")}
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
          backgroundColor="white"
          required
        />
        <br />
        <InputWithLabel
          label={t("Name")}
          required={true}
          name="text"
          type="text"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />

        {/* create button */}
        <div style={{ width: "100%", textAlign: "right" }}>
          <Button variant="contained" className={classes.btn} onClick={handleTranchesModal}>
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" className={classes.btn} type="submit">
            {t("Add Tranch")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default TranchesModal;
