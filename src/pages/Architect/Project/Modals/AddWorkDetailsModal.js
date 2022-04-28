import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import api from "../../../../api";
import { toast } from "react-toastify";
import InputDropdown from "../../../../components/Architect/InputDropdown";
import { useTranslation } from "react-i18next";

const AddWorkDetailsModal = ({
  selectedWork,
  workDetails,
  selectedWorkDetail,
  setSelectedWorkDetail,
  setOpenWorkDetailModal,
  setSelectedWork,
  currentProject,
  getworks,
  projectWorkData,
}) => {
  const { t } = useTranslation();
  // states
  const [tranchOptions, setTranchOptions] = useState([]);
  const [tranchFilteredOptions, setTranchFilteredOptions] = useState([]);
  const [tradeOptions, setTradeOptions] = useState([]);
  const [tranch, setTranch] = useState("");
  const [trade, setTrade] = useState("");

  // useEffect to get all tranches
  useEffect(() => {
    currentProject.market_type === "TradesAndTranches" && getTranches();
    (currentProject.market_type === "TradesAndTranches" ||
      currentProject.market_type === "Trades") &&
      getTrades();
  }, []);

  const getTranches = async () => {
    const result = await api("get", `/Tranches/${currentProject._id}`);
    setTranchOptions(result.data.tranches);
    setTranchFilteredOptions(result.data.tranches);
  };

  const getTrades = async () => {
    const result = await api("get", `/Trades/${currentProject._id}`);
    setTradeOptions(result.data.trades);
  };

  const handleCheckbox = (e, item) => {
    if (e.target.checked) {
      let temp = selectedWorkDetail;
      temp.push(item._id);
      setSelectedWorkDetail(temp);
    } else if (!e.target.checked) {
      let temp = selectedWorkDetail;
      const index = temp.indexOf(item._id);
      if (index > -1) {
        temp.splice(index, 1);
      }
      setSelectedWorkDetail(temp);
    }
  };

  const handleValidate = async () => {
    let data = {
      name: selectedWork.name,
      cctp_text: selectedWork.cctp_text,
      bpu_text: selectedWork.bpu_text,
      providers: selectedWork.providers,
      work_details: [],
    };
    data.work_details = selectedWorkDetail;

    if (data.work_details.length === 0) {
      toast.error(t("Select at least 1 work detail"));
    } else {
      if (currentProject.market_type === "Trades") {
        if (trade) {
          let tempRankings = [];
          projectWorkData.map((item1) => {
            item1.data.map((item2) => {
              tempRankings.push(item2.work.ranking);
            });
          });
          if (tempRankings.length > 0) {
            let maxRanking = Math.max(...tempRankings);
            data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
          } else {
            data.ranking = 0;
          }
          data.trade = trade;
          const result = await api(
            "post",
            `/project/addWork/${currentProject._id}`,
            data,
            t
          );
          toast.success(t(result.data.message));
          setSelectedWorkDetail([]);
          setSelectedWork();
          setOpenWorkDetailModal(false);
          getworks();
        } else {
          toast.error(t("Trade is required"));
        }
      } else if (currentProject.market_type === "TradesAndTranches") {
        if (trade) {
          data.trade = trade;
          if (tranch) {
            let tempRankings = [];
            projectWorkData.map((item1) => {
              item1.data.map((item2) => {
                item2.tranchData.map((item3) => {
                  tempRankings.push(item3.work.ranking);
                });
              });
            });
            if (tempRankings.length > 0) {
              let maxRanking = Math.max(...tempRankings);
              data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
            } else {
              data.ranking = 0;
            }
            data.tranch = tranch;
            const result = await api(
              "post",
              `/project/addWork/${currentProject._id}`,
              data,
              t
            );
            toast.success(t(result.data.message));
            setSelectedWorkDetail([]);
            setSelectedWork();
            setOpenWorkDetailModal(false);
            getworks();
          } else {
            toast.error(t("Tranch is required"));
          }
        } else {
          toast.error(t("Trade is required"));
        }
      } else {
        let maxRanking = Math.max.apply(
          Math,
          projectWorkData.map((item) => {
            return item.work.ranking;
          })
        );
        data.ranking = maxRanking >= 0 ? maxRanking + 1 : 0;
        const result = await api(
          "post",
          `/project/addWork/${currentProject._id}`,
          data,
          t
        );
        toast.success(t(result.data.message));
        setSelectedWorkDetail([]);
        setSelectedWork();
        setOpenWorkDetailModal(false);
        getworks();
      }
    }
  };

  return (
    <div style={{ width: "50vw", maxHeight: "80vh", overflow: "auto" }}>
      <div style={{ fontSize: 18, marginTop: 10, marginBottom: 10 }}>
        {selectedWork?.name}
      </div>
      <FormGroup>
        {workDetails.map((item) => (
          <FormControlLabel
            control={<Checkbox onChange={(e) => handleCheckbox(e, item)} />}
            label={<div style={{ fontSize: 16 }}>{item.name}</div>}
          />
        ))}
      </FormGroup>
      {(currentProject.market_type === "TradesAndTranches" ||
        currentProject.market_type === "Trades") && (
        <>
          <br />
          <InputDropdown
            name="trade"
            label="Trade"
            value={trade}
            onChange={(e) => {
              setTrade(e.target.value);
              if (currentProject.market_type === "TradesAndTranches") {
                let temp = tranchOptions;
                temp = temp.filter((item) => item.trade === e.target.value);
                setTranchFilteredOptions(temp);
              }
            }}
            options={tradeOptions}
          />
          <br />
        </>
      )}
      {currentProject.market_type === "TradesAndTranches" && (
        <>
          <br />
          <h2>{t("Select Tranch")}</h2>
          <br />
          <InputDropdown
            name="tranch"
            label="Tranch"
            value={tranch}
            onChange={(e) => setTranch(e.target.value)}
            options={tranchFilteredOptions}
            disabled={!trade}
          />
          <br />
        </>
      )}
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3b373c",
            height: "35px",
          }}
          onClick={() => {
            setSelectedWorkDetail([]);
            setSelectedWork();
            setOpenWorkDetailModal(false);
          }}
        >
          {t("Close")}
        </Button>
        &nbsp;&nbsp;
        <Button
          variant="contained"
          style={{
            backgroundColor: "#3b373c",
            marginRight: "10px",
            height: "35px",
          }}
          onClick={handleValidate}
        >
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default AddWorkDetailsModal;
