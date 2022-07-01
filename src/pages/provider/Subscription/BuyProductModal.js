import React, { useEffect, useState } from "react";
import api from "../../../api";
import { formatNumber } from "../../../utils/markThousand";
import BasicDropdown from "../../../components/Architect/BasicDropdown";
import Button from "@mui/material/Button";

const options = [
  { _id: 1, title: 1 },
  { _id: 2, title: 2 },
  { _id: 3, title: 3 },
  { _id: 4, title: 4 },
  { _id: 5, title: 5 },
];

const BuyProductModal = ({ handleBuySubModal, user }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      let temp = productList.find((item) => item._id === selectedProduct);
      setProduct(temp);
      setLoading(false);
    }
  }, [selectedProduct]);

  const getProducts = async () => {
    const response = await api("get", `/Subscriptions/`);
    let data = response.data.subscription;
    data = data.filter((item) => item.type === "Manufacturers");
    let current = data.find((item) => item._id === user.subscription.id)?._id;

    setProductList(data);
    setSelectedProduct(current);
  };

  const generateQuote = async () => {
    let temp2 = productList.find((item) => item._id === selectedProduct);
    let invoiceData = {
      archId: user._id,
      subscriptionCode: temp2.reference,
      subscriptionName: temp2.name,
      initialPrice: product.price,
      initialCount: count,
      extendedPrice: 0,
      extendedCount: 0,
      packPrice: 0,
      packCount: 0,
      totalHT: product.price * count,
      tvaPercentage: 20,
      tvaAmount: (product.price * count * 20) / 100,
      TotalCost: (product.price * count * 20) / 100 + product.price * count,
      paymentMode: paymentMethod === "card" ? "CB" : "SEPA",
    };
    const result = await api("post", `/Providers/quote/download`, invoiceData);
    window.open(result.data.path, "_blank");
  };

  // handle Finish function
  const handleFinish = async () => {
    if (paymentMethod === "mandat") {
      handleBuySubModal();
    } else {
      let temp2 = productList.find((item) => item._id === selectedProduct);
      let data = {};
      data = {
        paymentMethod,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Subscription",
              },
              unit_amount: parseInt((product.price * count * 20) / 100 + product.price * count) * 100,
            },
            quantity: 1,
          },
        ],
        metaData: {
          type: "ProviderOrder",
          providerId: user._id,
          duration: product.duration * count,
        },
        invoiceData: {
          archId: user._id,
          subscriptionCode: temp2.reference,
          subscriptionName: temp2.name,
          initialPrice: product.price,
          initialCount: count,
          extendedPrice: 0,
          extendedCount: 0,
          packPrice: 0,
          packCount: 0,
          totalHT: product.price * count,
          tvaPercentage: 20,
          tvaAmount: (product.price * count * 20) / 100,
          TotalCost: (product.price * count * 20) / 100 + product.price * count,
          paymentMode: paymentMethod === "card" ? "CB" : "SEPA",
        },
      };

      const res = await api("post", `/licenses/checkout`, data);
      window.location = res.data.url;
    }
  };

  return (
    !loading && (
      <div style={{ width: "35vw", maxHeight: "85vh", overflow: "auto" }}>
        <div style={{ width: "90%" }}>
          <div className="purchase-header">Commande Prescripteur</div> {/* Subscription */}
          <div>
            <BasicDropdown
              options={productList}
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
              }}
              disabled
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 10,
                height: 40,
                width: "110%",
                fontSize: 20,
                fontWeight: 700,
                padding: 5,
              }}
            />
            <br />
            <strong>Abonnement</strong>
            <div className="subscription-box">
              <div className="subscription-box-intial">
                <div className="common-text">
                  <span>{product.duration} mois</span>
                </div>
                <BasicDropdown
                  options={options}
                  value={count}
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                  component="register"
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 10,
                    height: 40,
                    width: 60,
                    fontSize: 20,
                    fontWeight: 700,
                    padding: 5,
                  }}
                />
                <div className="amount-container">
                  <div>Total HT</div>
                  <div>{formatNumber((product.price * count)?.toFixed(2))} €</div>
                </div>
              </div>
            </div>
          </div>
          {/* Projects */}
          {/* <div style={{ padding: "20px 0" }}>
        <strong>Pack Projets</strong>
        <div className="subscription-box">
          <div className="subscription-box-intial">
            <div className="common-text">
              <span>Pack de 5 Projets</span>
              <br />
              <small>({formatNumber(subAmounts.pack.price.toFixed(2))} € HT)</small>
            </div>
            <BasicDropdown
              options={options}
              component="register"
              first="notDisable"
              value={subAmounts.pack.count}
              onChange={(e) => {
                setSubAmount((prev) => {
                  prev.pack.count = e.target.value;
                  return { ...prev };
                });
              }}
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 10,
                height: 40,
                width: 60,
                fontSize: 20,
                fontWeight: 700,
                padding: 5,
              }}
            />
            <div className="amount-container">
              <div>Total HT</div>
              <div> {formatNumber((subAmounts.pack.count * subAmounts.pack.price).toFixed(2))} €</div>
            </div>
          </div>
        </div>
      </div> */}
          {/* Total */}
          <div style={{ padding: "20px 0" }}>
            <div className="payment-box">
              <div style={{ display: "flex" }}>
                <div
                  className="common-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    color: "black",
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                >
                  <div className="amount-container" style={{ border: 0 }}>
                    Montant à payer :{" "}
                  </div>
                </div>
                <div>
                  <div className="amount-container" style={{ marginBottom: 10 }}>
                    <div>T.V.A 20%</div>
                    <div> {formatNumber(((product.price * count * 20) / 100)?.toFixed(2))} €</div>
                  </div>
                  <div className="amount-container">
                    <div>Total T.T.C</div>
                    <div> {formatNumber(((product.price * count * 20) / 100 + product.price * count)?.toFixed(2))} €</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "110%", height: 4, backgroundColor: "#8C1244" }} />
          <div style={{ marginTop: 20 }}>
            <strong>Mode de paiement</strong>
            <div className="subscription-box" style={{ display: "flex", marginTop: 10 }}>
              <div className="payment-flex-contaner">
                <div className="common-text-3">
                  <span>CB</span>
                  <br />
                </div>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  className="radio-button"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div className="payment-flex-contaner">
                <div className="common-text-3">
                  <span>SEPA</span>
                  <br />
                </div>
                <input
                  type="radio"
                  name="payment"
                  value="sepa_debit"
                  className="radio-button"
                  checked={paymentMethod === "sepa_debit"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
            {/* exports */}
            <div style={{ cursor: "pointer", color: "#FF8616", whiteSpace: "nowrap" }} onClick={generateQuote}>
              Générer un devis
            </div>
          </div>
          {/* Buttons */}
          <div
            style={{
              width: "110%",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 8,
              }}
              onClick={() => {
                handleBuySubModal();
              }}
            >
              Retour
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="contained"
              style={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 8,
              }}
              onClick={() => handleFinish()}
              disabled={count < 1}
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default BuyProductModal;
