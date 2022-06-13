// init
import React, { useState, useEffect } from "react";
import api from "../../../api";
import SubscriptionCard from "./SubscriptionCard";
import { Button } from "@mui/material";
import { Store } from "../../../StoreContext";
import { useTranslation } from "react-i18next";

// component
const BuySubscription = ({ handleBuySubModal }) => {
  const { t } = useTranslation();
  const store = Store();
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
            unit_amount: parseInt(selected?.duration?.price + selected?.projectsPack?.price) * 100,
          },
          quantity: 1,
        },
      ],
      metaData: {
        type: "buySubscription",
        subscription: selected._id,
        architectId: store.user._id,
      },
    };
    const result = await api("post", `/licenses/checkout/`, data);
    window.location = result.data.url;
    handleBuySubModal();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {subscriptions?.map((item) => (
          <SubscriptionCard subscription={item} selected={selected} setSelected={setSelected} />
        ))}
      </div>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            backgroundColor: "#8C1244",
            borderRadius: 2,
            whiteSpace: "nowrap",
            ":hover": {
              backgroundColor: "#8C1244",
            },
          }}
          disabled={!selected}
          onClick={handleClick}
        >
          {t("Buy Subscription")}
        </Button>
      </div>
    </>
  );
};

export default BuySubscription;
