import React, { useState, useEffect } from "react";
import RowRadioButtonsGroup from "../component/RadioGroup";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../../api";

const SOP = [
  {
    value: "En cours",
    label: "En cours",
  },
  {
    value: "Complété",
    label: "Terminé",
  },
];

const StatusUpdate = ({ selectedProject, handleOpenStatusModal }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(selectedProject.status);
  }, []);

  const handleSubmit = async () => {
    const result = await api(
      "put",
      `/project/${selectedProject._id}`,
      {
        status,
      },
      t
    );
    toast.success(t(result.data.message));
    handleOpenStatusModal();
  };

  return (
    <div style={{ width: "20vw" }}>
      <RowRadioButtonsGroup
        row={true}
        data={SOP}
        value={status}
        name="structure"
        handleChange={(e) => setStatus(e.target.value)}
      />

      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 2,
            whiteSpace: "nowrap",
            ":hover": {
              backgroundColor: "#8C1244",
            },
          }}
          onClick={handleOpenStatusModal}
        >
          {t("Close")}
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 2,
            whiteSpace: "nowrap",
            ":hover": {
              backgroundColor: "#8C1244",
            },
          }}
          onClick={handleSubmit}
        >
          {t("Update")}
        </Button>
      </div>
    </div>
  );
};

export default StatusUpdate;
