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
const TranchesModal = ({ handleOpenUpdateTranchesModal, getTranches, updateTranch }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [name, setName] = useState();

  useEffect(() => {
    setName(updateTranch.name);
  }, [updateTranch]);

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await api(
      "put",
      `/Tranches/${updateTranch._id}`,
      {
        name,
      },
      t
    );
    toast.success(t(result.data.message));
    getTranches();
    handleOpenUpdateTranchesModal();
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
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            onClick={handleOpenUpdateTranchesModal}
          >
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

export default TranchesModal;
