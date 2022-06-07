// init
import React, { useState, useEffect } from "react";
import api from "../../../api";
import SubscriptionCard from "./SubscriptionCard";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// component
const BuySubscription = ({ mySubscription, handleBuyProjectsModals }) => {
  const { t } = useTranslation();
  // states
  const [subscriptions, setSubscriptions] = useState();
  const [selected, setSelected] = useState(""); ///state for selected subscription

  // useEffetct
  useEffect(() => {
    getAllSubscriptions();
  }, []);

  // function to get all subs
  const getAllSubscriptions = async () => {
    const result = await api("get", `/Subscriptions/getAll/architect`);
    setSubscriptions(result?.data?.subscription);
  };

  // on Buy Subscription click
  const handleClick = async () => {
    const data = {
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selected.name,
            },
            unit_amount: parseInt(selected?.projectsPack?.price) * 100,
          },
          quantity: 1,
        },
      ],
      metaData: {
        type: "buyProjects",
        subscription: selected._id,
        licenseId: mySubscription._id,
      },
    };
    const result = await api("post", `/licenses/checkout/`, data);
    window.location = result.data.url;
    handleBuyProjectsModals();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {subscriptions?.map((item) => (
          <SubscriptionCard subscription={item} selected={selected} setSelected={setSelected} component="buy Credits" />
        ))}
      </div>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 2,
            mr: 2,
            whiteSpace: "nowrap",
            ":hover": {
              backgroundColor: "#8C1244",
            },
          }}
          disabled={!selected}
          onClick={handleClick}
        >
          {t("Buy Projects")}
        </Button>
      </div>
    </>
  );
};

export default BuySubscription;
