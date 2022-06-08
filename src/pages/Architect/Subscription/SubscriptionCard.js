import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const SubscriptionCard = ({ selected, setSelected, subscription, component }) => {
  return (
    <Card
      style={{
        border: selected?._id === subscription?._id && "1px solid #8C1244",
        width: 320,
        margin: 20,
        marginLeft: 0,
      }}
      onClick={() => setSelected(subscription)}
    >
      <CardContent>
        <Typography variant="h4">
          <i>{subscription?.name}</i>
        </Typography>
        {component !== "buy Credits" ? (
          <Typography variant="h6">Price: {subscription?.duration?.price + subscription?.projectsPack?.price}€</Typography>
        ) : (
          <Typography variant="h6">Price: {subscription?.projectsPack?.price}€</Typography>
        )}

        {component !== "buy Credits" && <Typography variant="h6">Number of Month: {subscription?.duration.months}</Typography>}
        {component !== "renew" && <Typography variant="h6">Projects: {subscription?.projectsPack.projects}</Typography>}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
