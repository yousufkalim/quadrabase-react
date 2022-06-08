// init
import React, { useState, useEffect } from "react";
import { Store } from "../../../../StoreContext";
import api from "../../../../api";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../../../utils/markThousand";

// component
import { Button } from "@mui/material";
import InputWithLabel from "../../../../components/Architect/InputWithLabel";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import { toast } from "react-toastify";

const EditWorkDetailModal = ({ selectedWorkDetail, currentProject, handleOpenEditWorkDetailModal, getworks }) => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    name: "",
    unit: "",
    unit_price: "",
    quantity: "",
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    selectedWorkDetail &&
      setValues((prev) => {
        prev.name = selectedWorkDetail.name;
        prev.unit = selectedWorkDetail.unit._id;
        prev.unit_price = formatNumber(parseFloat(selectedWorkDetail.unit_price).toFixed(2).toString());
        prev.quantity = formatNumber(parseFloat(selectedWorkDetail.quantity).toFixed(2).toString(), ".");
        return { ...prev };
      });
  }, [selectedWorkDetail]);
  // useEffect to get all units
  useEffect(() => {
    getUnits();
  }, []);

  // func to getAll Units
  const getUnits = async () => {
    const result = await api("get", `/Units/get`);
    setOptions(result.data.units.sort((a, b) => a.ranking - b.ranking));
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let unit_price = values.unit_price.replace(/\s/g, "").split(",").join(".");
    let quantity = values.quantity.replace(/\s/g, "").split(",").join(".");
    let data = {
      workDetailId: selectedWorkDetail._id,
      name: values.name,
      unit: values.unit,
      unit_price: unit_price,
      quantity: quantity,
    };
    const result = await api("put", `/project/updateWorkDetail/${currentProject._id}`, data, t);
    toast.success(t(result.data.message));
    handleOpenEditWorkDetailModal();
    getworks();
  };

  return (
    <div style={{ width: "45vw", maxHeight: "80vh", overflow: "auto" }}>
      <form style={{ marginTop: "auto", marginBottom: "auto" }} onSubmit={handleSubmit}>
        {/* All fields */}
        <br />
        <InputWithLabel
          label={t("Name")}
          required={true}
          name="name"
          type="text"
          value={values.name}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <br />
        <br />
        <InputDropdown
          name="unit"
          label={t("Unit")}
          value={values.unit}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          options={options}
        />
        <br />
        <InputWithLabel
          label={t("Qty")}
          required={true}
          name="quantity"
          type="text"
          value={values.quantity}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
          onBlur={() => {
            let temp = values.quantity.replace(/\s/g, "").split(",").join(".");
            setValues((prev) => {
              prev["quantity"] = formatNumber(parseFloat(temp).toFixed(2).toString(), ".");
              return { ...prev };
            });
          }}
          onFocus={() => {
            let temp = values.quantity.replace(/\s/g, "").split(",").join(".");
            setValues((prev) => {
              prev["quantity"] = formatNumber(parseFloat(temp).toFixed(2).toString(), ".");
              return { ...prev };
            });
          }}
        />
        <br />
        <br />
        <InputWithLabel
          label="PU HT"
          required={true}
          name="unit_price"
          type="text"
          value={values.unit_price}
          handleChange={(e) => handleChange(e.target.name, e.target.value)}
          onBlur={() => {
            let temp = values.unit_price.replace(/\s/g, "").split(",").join(".");
            setValues((prev) => {
              prev["unit_price"] = formatNumber(parseFloat(temp).toFixed(2).toString());
              return { ...prev };
            });
          }}
          onFocus={() => {
            let temp = values.unit_price.replace(/\s/g, "").split(",").join(".");
            setValues((prev) => {
              prev["unit_price"] = formatNumber(parseFloat(temp).toFixed(2).toString());
              return { ...prev };
            });
          }}
        />
        <br />
        {/* register button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            onClick={handleOpenEditWorkDetailModal}
          >
            {t("Close")}
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            style={{
              backgroundColor: "#3b373c",
              height: "35px",
            }}
            type="submit"
          >
            {t("Update")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkDetailModal;
