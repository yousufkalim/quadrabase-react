import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { formatNumber } from '../../../utils/markThousand';
import BasicDropdown from '../../../components/Architect/BasicDropdown';
import Modal from '../../../components/Architect/Modal';
import CgvModal from '../../../components/CgvModal';
import Button from '@mui/material/Button';

const options = [
  { _id: 1, title: 1 },
  { _id: 2, title: 2 },
  { _id: 3, title: 3 },
  { _id: 4, title: 4 },
  { _id: 5, title: 5 },
];

const BuyProductModal = ({ handleBuySubModal, type, user, t }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCgvModal, setOpenCgvModal] = useState(false);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [subscriptionsData, setSubscriptionData] = useState([]);
  const [total, setTotal] = useState({
    subTotal: 0,
    tax: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedSubscriptions.length > 0) {
      let temp = [];
      selectedSubscriptions.map((item1) => {
        let existing = productList.find((item2) => item2._id === item1);
        existing.count = 0;
        temp.push(existing);
      });
      setSubscriptionData(temp);
      setLoading(false);
    }
  }, [selectedSubscriptions]);

  useEffect(() => {
    if (subscriptionsData.length > 0) {
      let tempSubTotal = 0;
      let tempTax = 0;
      let tempGrandTotal = 0;
      subscriptionsData.map((item) => {
        tempSubTotal += item.count * item.price;
      });
      tempTax = (tempSubTotal * 20) / 100;
      tempGrandTotal = tempSubTotal + tempTax;
      setTotal((prev) => {
        prev.subTotal = tempSubTotal;
        prev.tax = tempTax;
        prev.grandTotal = tempGrandTotal;
        return { ...prev };
      });
    }
  }, [subscriptionsData]);

  const getProducts = async () => {
    const response = await api('get', `/Subscriptions/`);
    let data = response.data.subscription;
    data = data
      .filter((item) => item.type === 'Prescribers')
      .sort((a, b) => a.reference - b.reference);

    setProductList(data);
    let ids = [];
    data.map((item) => ids.push(item._id));
    setSelectedSubscriptions(ids);
  };

  const generateQuote = async () => {
    let temp = [];
    subscriptionsData.map((item) => {
      let subTotal = formatNumber((item.count * item.price).toFixed(2));
      let price = formatNumber(item.price.toFixed(2));
      temp.push({ ...item, subTotal, price });
    });
    let invoiceData = {
      archId: user._id,
      subscriptionsData: temp,
      totalHT: formatNumber(total.subTotal.toFixed(2)),
      tvaPercentage: 20,
      tvaAmount: formatNumber(total.tax.toFixed(2)),
      TotalCost: formatNumber(total.grandTotal.toFixed(2)),
      paymentMode:
        paymentMethod === 'card'
          ? 'CB'
          : paymentMethod === 'mandat'
          ? 'Mandat administratif'
          : 'SEPA',
    };
    const result = await api('post', `/Architects/quote/download`, invoiceData);
    window.open(result.data.path, '_blank');
  };

  // handle change for subscription
  const handleSubscriptionChange = (event) => {
    const {
      target: { value },
    } = event;
    let temp = typeof value === 'string' ? value.split(',') : value;
    setSelectedSubscriptions(temp);
  };

  // handle Finish function
  const handleFinish = async () => {
    if (paymentMethod === 'mandat') {
      handleBuySubModal();
    } else {
      let temp = [];
      subscriptionsData.map((item) => {
        let subTotal = formatNumber((item.count * item.price).toFixed(2));
        let price = formatNumber(item.price.toFixed(2));
        temp.push({ ...item, subTotal, price });
      });
      let data = {};
      data = {
        paymentMethod,
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Subscription',
              },
              unit_amount: parseInt(total.grandTotal * 100),
            },
            quantity: 1,
          },
        ],
        metaData: {
          id: user._id,
          type: 'architectOrder',
        },
        invoiceData: {
          archId: user._id,
          subscriptionsData: temp,
          totalHT: formatNumber(total.subTotal.toFixed(2)),
          tvaPercentage: 20,
          tvaAmount: formatNumber(total.tax.toFixed(2)),
          TotalCost: formatNumber(total.grandTotal.toFixed(2)),
          paymentMode:
            paymentMethod === 'card'
              ? 'CB'
              : paymentMethod === 'mandat'
              ? 'Mandat administratif'
              : 'SEPA',
        },
      };

      const res = await api('post', `/licenses/checkout`, data);
      window.location = res.data.url;
    }
  };

  const handleOpenCgvModal = () => setOpenCgvModal(!openCgvModal);

  return (
    !loading && (
      <div style={{ width: '35vw', maxHeight: '85vh', overflow: 'auto' }}>
        <Modal
          title="Conditions Générales des Ventes (CGV)"
          open={openCgvModal}
          onClose={handleOpenCgvModal}
          component={<CgvModal handleOpenCgvModal={handleOpenCgvModal} />}
        />
        <div style={{ width: '90%' }}>
          <div className="purchase-header">Commande Prescripteur</div> {/* Subscription */}
          <div>
            <strong>Abonnement</strong>
            {subscriptionsData.map((item, index) => {
              return (
                <div className="subscription-box">
                  <div className="subscription-box-intial">
                    <div className="common-text">
                      <span>{item.name}</span>
                      <br />
                      <span style={{ fontSize: 12, fontWeight: 900 }}>
                        {' '}
                        ({item.price.toFixed('2')} € HT)
                      </span>
                      <br />
                    </div>
                    <BasicDropdown
                      options={options}
                      value={item.count}
                      onChange={(e) => {
                        setSubscriptionData((prev) => {
                          prev[index].count = e.target.value;
                          return [...prev];
                        });
                      }}
                      component="register"
                      first="notDisable"
                      style={{
                        backgroundColor: '#f5f5f5',
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
                      <div>{formatNumber((item.count * item.price).toFixed(2))} €</div>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })}
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
          <div style={{ padding: '20px 0' }}>
            <div className="payment-box">
              <div style={{ display: 'flex' }}>
                <div
                  className="common-text"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    color: 'black',
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                >
                  <div className="amount-container" style={{ border: 0 }}>
                    Montant à payer :{' '}
                  </div>
                </div>
                <div>
                  <div className="amount-container" style={{ marginBottom: 10 }}>
                    <div>Total HT</div>
                    <div> {formatNumber(total.subTotal.toFixed(2))} €</div>
                  </div>

                  <div className="amount-container" style={{ marginBottom: 10 }}>
                    <div>T.V.A 20%</div>
                    <div> {formatNumber(total.tax.toFixed(2))} €</div>
                  </div>
                  <div className="amount-container">
                    <div>Total T.T.C</div>
                    <div> {formatNumber(total.grandTotal.toFixed(2))} €</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '110%', height: 4, backgroundColor: '#8C1244' }} />
          <div style={{ marginTop: 20 }}>
            <strong>Mode de paiement</strong>
            <div className="subscription-box" style={{ display: 'flex', marginTop: 10 }}>
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
                  checked={paymentMethod === 'card'}
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
                  checked={paymentMethod === 'sepa_debit'}
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
                  checked={paymentMethod === 'mandat'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
            </div>
            {/* exports */}
            {paymentMethod === 'mandat' ? (
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <div style={{ fontSize: 15 }}>
                  Merci de bien vouloir nous retourner votre bon de commande
                  <br />
                  <strong> IMPORTANT:</strong> À réception de votre bon de commande, la facture
                  correspondant à votre bon d’achat vous sera transmise par e-mail. Vous disposerez
                  alors des droits d’accès et d’utilisation de l’application Quadrabase pendant 2
                  mois dans l’attente de votre règlement. Passé ce délai, et faute de règlement de
                  votre part, les droits accordéd seront suspendus automatiquement.
                </div>
                <div style={{ padding: '20px 0' }}>
                  <div>
                    <div style={{ display: 'flex' }}>
                      <div
                        className="common-text"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          color: 'black',
                          fontWeight: 600,
                          fontSize: 20,
                          width: 'auto',
                        }}
                      >
                        <div
                          style={{
                            border: 0,
                            padding: 0,
                            fontSize: 15,
                            marginRight: 20,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Coordonées :{' '}
                        </div>
                      </div>
                      <div style={{ fontSize: 15 }}>
                        <div style={{ marginBottom: 10 }}>
                          Titulaire : QBSoft 20 avenuw Félix Raybaud 06130 GRASSE
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          IBAN : FR76 1695 8000 0115 4724 0729 575
                        </div>
                        <div>BIC/SWIFT : QNTOFRP1XXX / BNPAFRPP</div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 30,
                          fontSize: 15,
                        }}
                      >
                        <div
                          style={{ cursor: 'pointer', color: '#FF8616', whiteSpace: 'nowrap' }}
                          onClick={generateQuote}
                        >
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
            ) : (
              <div
                style={{ cursor: 'pointer', color: '#FF8616', whiteSpace: 'nowrap' }}
                onClick={generateQuote}
              >
                Générer un devis
              </div>
            )}
            <div
              style={{
                cursor: 'pointer',
                color: '#FF8616',
                whiteSpace: 'nowrap',
              }}
              onClick={handleOpenCgvModal}
            >
              Conditions Générales des Ventes (CGV)
            </div>
          </div>
          {/* Buttons */}
          <div
            style={{
              width: '110%',
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            <Button
              variant="contained"
              style={{
                textTransform: 'none',
                backgroundColor: '#8C1244',
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
                textTransform: 'none',
                backgroundColor: total.grandTotal === 0 ? '#d9adad' : '#8C1244',
                borderRadius: 8,
              }}
              disabled={total.grandTotal === 0}
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
