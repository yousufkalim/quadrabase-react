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
const UpdateTradesModal = ({ handleTradesModal, updateTrade, getTrades }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [name, setName] = useState();

  useEffect(() => {
    setName(updateTrade.name);
  }, [updateTrade]);

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await api(
      "put",
      `/Trades/${updateTrade._id}`,
      {
        name,
      },
      t
    );
    toast.success(t(result.data.message));
    getTrades();
    handleTradesModal();
  };

  // jsx
  return (
    <>
      <form className={classes.smform} onSubmit={handleUpdate}>
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
            {t("Update")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateTradesModal;
