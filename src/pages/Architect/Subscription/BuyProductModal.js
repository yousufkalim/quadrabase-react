import React, { useEffect, useState } from "react";
import api from "../../../api";
import { formatNumber } from "../../../utils/markThousand";
import BasicDropdown from "../../../components/Architect/BasicDropdown";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const options = [
  { _id: 1, title: 1 },
  { _id: 2, title: 2 },
  { _id: 3, title: 3 },
  { _id: 4, title: 4 },
  { _id: 5, title: 5 },
];

const BuyProductModal = ({ handleBuySubModal, type, user, t }) => {
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await api("get", `/Subscriptions/`);
    let data = response.data.subscription;
    data.map((item) => {
      if (type === "subscription") {
        if (item.reference.title === "Quadrabase subscription") {
          setProduct(item);
        }
      } else if (type === "project") {
        if (item.reference.title === "Pack 5 Projects") {
          setProduct(item);
        }
      }
    });
    setLoading(false);
  };

  const generateQuote = async () => {
    let invoiceData = {
      address1: user.address_1,
      initialPrice: type === "subscription" ? product.price : 0,
      initialCount: type === "subscription" ? count : 0,
      extendedPrice: 0,
      extendedCount: 0,
      packPrice: type === "project" ? product.price : 0,
      packCount: type === "project" ? count : 0,
      totalHT: product.price * count,
      tvaPercentage: 20,
      tvaAmount: (product.price * count * 20) / 100,
      TotalCost: (product.price * count * 20) / 100 + product.price * count,
      paymentMode: "Card",
    };
    const result = await api("post", `/Architects/quote/download`, invoiceData);
    window.open(result.data.path, "_blank");
  };

  // handle Finish function
  const handleFinish = async () => {
    if (paymentMethod === "mandat") {
      handleBuySubModal();
    } else {
      // to creating account
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
          id: user._id,
          subscriptionDuration: type === "subscription" ? parseInt(count) * product.duration : 0,
          subscriptionProjects: type === "project" ? parseInt(count) * 5 : 0,
          type: "architectSignup",
        },
        invoiceData: {
          address1: user.address_1,
          initialPrice: type === "subscription" ? product.price : 0,
          initialCount: type === "subscription" ? count : 0,
          extendedPrice: 0,
          extendedCount: 0,
          packPrice: type === "project" ? product.price : 0,
          packCount: type === "project" ? count : 0,
          totalHT: product.price * count,
          tvaPercentage: 20,
          tvaAmount: (product.price * count * 20) / 100,
          TotalCost: (product.price * count * 20) / 100 + product.price * count,
          paymentMode: "Card",
        },
      };

      const res = await api("post", `/licenses/checkout`, data);
      window.location = res.data.url;
    }
  };

  return (
    !loading && (
      <div style={{ width: "35vw" }}>
        <div style={{ width: "90%" }}>
          <div className="purchase-header">Achat {t(type)}</div> {/* Subscription */}
          <div>
            <strong>Abonnement</strong>
            <div className="subscription-box">
              <div className="subscription-box-intial">
                <div className="common-text">
                  <span>{product.name}</span>
                  <br />
                  <small>({formatNumber(product.price?.toFixed(2))} € HT)</small>
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
                    <div>Total HT</div>
                    <div> {formatNumber((product.price * count)?.toFixed(2))} €</div>
                  </div>
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
              <div className="payment-flex-contaner">
                <div className="common-text-3">
                  <span>Mandat administratif</span>
                  <br />
                </div>
                <input
                  type="radio"
                  name="payment"
                  value="mandat"
                  className="radio-button"
                  checked={paymentMethod === "mandat"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
            {/* exports */}
            {paymentMethod === "mandat" && (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <div style={{ fontSize: 15 }}>
                  Merci de bien vouloir nous retourner votre bon de commande
                  <br />
                  <strong> IMPORTANT:</strong> À réception de votre bon de commande, la facture correspondant à votre bon d’achat
                  vous sera transmise par e-mail. Vous disposerez alors des droits d’accès et d’utilisation de l’application
                  Quadrabase pendant 2 mois dans l’attente de votre règlement. Passé ce délai, et faute de règlement de votre
                  part, les droits accordéd seront suspendus automatiquement.
                </div>
                <div style={{ padding: "20px 0" }}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <div
                        className="common-text"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          color: "black",
                          fontWeight: 600,
                          fontSize: 20,
                          width: "auto",
                        }}
                      >
                        <div style={{ border: 0, padding: 0, fontSize: 15, marginRight: 20, whiteSpace: "nowrap" }}>
                          Coordonées :{" "}
                        </div>
                      </div>
                      <div style={{ fontSize: 15 }}>
                        <div style={{ marginBottom: 10 }}>Titulaire : QBSoft 20 avenuw Félix Raybaud 06130 GRASSE</div>
                        <div style={{ marginBottom: 10 }}>IBAN : FR76 1695 8000 0115 4724 0729 575</div>
                        <div>BIC/SWIFT : QNTOFRP1XXX / BNPAFRPP</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: 30,
                          fontSize: 15,
                        }}
                      >
                        <div style={{ cursor: "pointer", color: "#FF8616", whiteSpace: "nowrap" }} onClick={generateQuote}>
                          Générer un devis
                        </div>
                        {/* <div
                      style={{ cursor: "pointer", color: "#FF8616", whiteSpace: "nowrap" }}
                      onClick={generateInvoice}
                    >
                      Voir la facture
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Buttons */}
          <div
            style={{
              width: "100%",
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
