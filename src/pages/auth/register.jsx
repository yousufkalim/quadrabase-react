// init
import React, { useState, useEffect } from 'react';
import '../../css/register.css';
import logo from '../../assets/Quadralogo.png';
import Vector from '../../assets/Vector.png';
import TextInput from '../../components/TextInput';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import Stepper from './Components/Stepper';
import validate from 'validate.js';
import moment from 'moment';
import api from '../../api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import BasicDropdown from '../../components/Architect/BasicDropdown';
import InputWithOptions from '../../components/Architect/InputWithOptions';
import { formatNumber } from '../../utils/markThousand';
import CloseIcon from '@mui/icons-material/Close';

// input styling
const InputStyle = {
  borderColor: '#8C1244',
  marginTop: 5,
  backgroundColor: 'transparent',
  height: 40,
  borderRadius: 10
};

const steps = ['Informations générales', 'Informations de connexion'];

const schema1 = {
  establishment: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  address_1: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  postal_code: {
    length: {
      minimum: 5,
      maximum: 5
    }
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  }
};

const schema2 = {
  first_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  last_name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    length: {
      maximum: 128,
      minimum: 6 //// minimum requirement 6 characters
    }
  },
  confirm_password: {
    length: {
      maximum: 128,
      minimum: 6 //// minimum requirement 6 characters
    }
  },
  phone: {
    length: {
      minimum: 10,
      maximum: 10
    }
  }
};

const options = [
  { _id: 1, title: 1 },
  { _id: 2, title: 2 },
  { _id: 3, title: 3 },
  { _id: 4, title: 4 },
  { _id: 5, title: 5 }
];

const typeOptions = [
  { _id: 'Prescripteur', title: 'Prescripteur' },
  { _id: 'Fabricant', title: 'Fabricant' }
];

// component
const Register = () => {
  // history object
  const history = useHistory();

  // states
  const [type, setType] = useState('Prescripteur');
  const [startStepper, setStartStepper] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [payment, setPayment] = useState(false);
  const [archId, setArchId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState('');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [form1, setForm1] = useState({
    values: {
      establishment: '',
      service: '',
      address_1: '',
      address_2: '',
      po_box: '',
      postal_code: '',
      city: ''
    },
    error: {},
    touched: {}
  });

  const [form2, setForm2] = useState({
    values: {
      last_name: '',
      first_name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: ''
    },
    error: {},
    touched: {}
  });

  const [totalDuration, setTotalDuration] = useState(0);
  const [duration, setDuration] = useState(0);

  const [subscriptionsData, setSubscriptionData] = useState([]);
  const [total, setTotal] = useState({
    subTotal: 0,
    tax: 0,
    grandTotal: 0
  });

  const [fabricantSubAmounts, setFabricantSubAmount] = useState({
    alert: 0,
    refer: 0,
    alertDuration: 0,
    referDuration: 0,
    alertName: '',
    referName: '',
    count: 1
  });

  useEffect(() => {
    if (localStorage.getItem('step') == 2) {
      let tempArch = localStorage.getItem('archId');
      if (tempArch) {
        setArchId(tempArch);
        setPayment(true);
        setStartStepper(false);
        setType('Prescripteur');
        localStorage.removeItem('archId');
        localStorage.removeItem('step');
      } else {
        setArchId(localStorage.getItem('provId'));
        setPayment(true);
        setStartStepper(false);
        setType('Fabricant');
        localStorage.removeItem('provId');
        localStorage.removeItem('step');
      }
    } else if (window.location.pathname === '/architect/subscribe') {
      history.push('/architect/index');
    }
  }, []);

  useEffect(() => {
    const errors = validate(form1.values, schema1);
    setForm1(formState => ({
      ...formState,
      errors: errors || {}
    }));
  }, [form1.values]);

  useEffect(() => {
    const errors = validate(form2.values, schema2);
    setForm2(formState => ({
      ...formState,
      errors: errors || {}
    }));
  }, [form2.values]);

  useEffect(() => {
    getProducts();
  }, [type]);

  useEffect(() => {
    if (selectedSubscription) {
      let temp = {
        alert: 0,
        refer: 0,
        alertDuration: 0,
        referDuration: 0,
        alertName: '',
        referName: '',
        count: 1
      };
      let temp2 = subscriptionOptions.find(item => item._id === selectedSubscription);
      temp = {
        ...temp,
        refer: temp2.price,
        referDuration: temp2.duration,
        referName: temp2.name
      };
      setDuration(temp2.duration);
      setFabricantSubAmount(temp);
    }
  }, [selectedSubscription]);

  useEffect(() => {
    if (selectedSubscriptions.length > 0) {
      let temp = [];
      selectedSubscriptions.map(item1 => {
        let existing = subscriptionOptions.find(item2 => item2._id === item1);
        existing.count = 0;
        temp.push(existing);
      });
      setSubscriptionData(temp);
    }
  }, [selectedSubscriptions]);

  useEffect(() => {
    if (subscriptionsData.length > 0) {
      let tempSubTotal = 0;
      let tempTax = 0;
      let tempGrandTotal = 0;
      let tempDuration = 0;
      subscriptionsData.map(item => {
        tempSubTotal += item.count * item.price;
        tempDuration += item.count * item.duration;
      });
      setTotalDuration(tempDuration);
      tempTax = (tempSubTotal * 20) / 100;
      tempGrandTotal = tempSubTotal + tempTax;
      setTotal(prev => {
        prev.subTotal = tempSubTotal;
        prev.tax = tempTax;
        prev.grandTotal = tempGrandTotal;
        return { ...prev };
      });
    }
  }, [subscriptionsData]);

  useEffect(() => {
    if (totalDuration === 0) {
      setSubscriptionData(prev => {
        prev.map(item => {
          if (item.duration === 0) {
            item.count = 0;
          }
          return item;
        });
        return [...prev];
      });
    }
  }, [totalDuration]);

  const getProducts = async () => {
    const response = await api('get', `/Subscriptions/`);
    let data = response.data.subscription.sort((a, b) => a.reference - b.reference);

    if (type === 'Prescripteur') {
      let filteredData = data.filter(item => item.type === 'Prescribers');
      setSubscriptionOptions(filteredData);
      let ids = [];
      filteredData.map(item => ids.push(item._id));
      setSelectedSubscriptions(ids);
    } else {
      let filteredData = data.filter(item => item.type === 'Manufacturers');
      setSubscriptionOptions(filteredData);
      setSelectedSubscription(filteredData[0]._id);
    }
  };

  // handle change function
  const handleChange = (name, value) => {
    if (activeStep === 0) {
      setForm1(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value
        },
        touched: {
          ...formState.touched,
          [name]: true
        }
      }));
    } else if (activeStep === 1) {
      setForm2(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value
        },
        touched: {
          ...formState.touched,
          [name]: true
        }
      }));
    }
  };

  // handle Finish function
  const handleFinish = async () => {
    if (paymentMethod === 'mandat') {
      history.push('/auth/login');
    } else {
      // to creating account
      let data = {};
      if (type === 'Prescripteur') {
        let temp = [];
        subscriptionsData.map(item => {
          let subTotal = formatNumber((item.count * item.price).toFixed(2));
          let price = formatNumber(item.price.toFixed(2));
          temp.push({ ...item, subTotal, price });
        });
        data = {
          paymentMethod,
          line_items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: 'Subscription'
                },
                unit_amount: parseInt(total.grandTotal * 100)
              },
              quantity: 1
            }
          ],
          metaData: {
            id: archId,
            type: 'architectSignup'
          },
          invoiceData: {
            archId,
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
                : 'SEPA'
          }
        };
      } else {
        let temp2 = subscriptionOptions.find(item => item._id === selectedSubscription);
        data = {
          paymentMethod,
          line_items: [
            {
              price_data: {
                currency: 'eur',
                product_data: {
                  name: 'Subscription'
                },
                unit_amount:
                  parseInt(
                    (fabricantSubAmounts.count * fabricantSubAmounts.refer * 20) / 100 +
                      fabricantSubAmounts.count * fabricantSubAmounts.refer
                  ) * 100
              },
              quantity: 1
            }
          ],
          metaData: {
            id: archId,
            subscriptionid: selectedSubscription,
            subscriptionName: fabricantSubAmounts.referName,
            subscriptionStartDate: moment(new Date()).format('YYYY/MM/DD'),
            subscriptionEndDate: moment(
              moment(new Date()).add(fabricantSubAmounts.referDuration, 'months')
            ).format('YYYY/MM/DD'),
            type: 'providerSignup'
          },
          invoiceData: {
            archId,
            subscriptionCode: temp2.reference,
            subscriptionName: temp2.name,
            alertPrice: 0,
            alertCount: 0,
            alertTotal: 0,
            referenPrice: formatNumber(fabricantSubAmounts.refer.toFixed(2)),
            referenCount: fabricantSubAmounts.count,
            referenTotal: formatNumber(
              (fabricantSubAmounts.refer * fabricantSubAmounts.count).toFixed(2)
            ),
            totalHT: formatNumber(
              (fabricantSubAmounts.refer * fabricantSubAmounts.count).toFixed(2)
            ),
            tvaPercentage: 20,
            tvaAmount: formatNumber(
              ((fabricantSubAmounts.refer * fabricantSubAmounts.count * 20) / 100).toFixed(2)
            ),
            TotalCost: formatNumber(
              (
                (fabricantSubAmounts.refer * fabricantSubAmounts.count * 20) / 100 +
                fabricantSubAmounts.refer * fabricantSubAmounts.count
              ).toFixed(2)
            ),
            paymentMode:
              paymentMethod === 'card'
                ? 'CB'
                : paymentMethod === 'mandat'
                ? 'Mandat administratif'
                : 'SEPA'
          }
        };
      }

      const res = await api('post', `/licenses/checkout`, data);
      window.location = res.data.url;
    }
  };

  const createUser = async () => {
    if (type === 'Prescripteur') {
      let data = {
        establishment: form1.values.establishment,
        service: form1.values.service,
        address_1: form1.values.address_1,
        address_2: form1.values.address_2,
        po_box: form1.values.po_box,
        postal_code: form1.values.postal_code,
        city: form1.values.city,
        phone: form2.values.phone,
        last_name: form2.values.last_name,
        first_name: form2.values.first_name,
        email: form2.values.email,
        password: form2.values.password,
        confirm_password: form2.values.confirm_password
      };
      const res = await api('post', `/Architects/createOnSingup`, data);
      setArchId(res.data.architect._id);
      toast.success(res.data.message);
      return res.data.success;
    } else {
      let data = {
        name: form2.values.last_name,
        firstname: form2.values.first_name,
        email: form2.values.email,
        telephone_no: form2.values.phone,
        address1: form1.values.address_1,
        address2: form1.values.address_2,
        city: form1.values.city,
        zipcode: form1.values.postal_code,
        po_box: form1.values.po_box,
        establishment: form1.values.establishment,
        password: form2.values.password
      };
      const res = await api('post', `/Providers/createOnSingup`, data);
      setArchId(res.data.provider._id);
      toast.success(res.data.message);
      return res.data.success;
    }
  };

  const generateQuote = async () => {
    console.log('type', type);
    if (type === 'Prescripteur') {
      let temp = [];
      subscriptionsData.map(item => {
        let subTotal = formatNumber((item.count * item.price).toFixed(2));
        let price = formatNumber(item.price.toFixed(2));
        temp.push({ ...item, subTotal, price });
      });
      let invoiceData = {
        archId,
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
            : 'SEPA'
      };
      const result = await api('post', `/Architects/quote/download`, invoiceData);
      window.open(result.data.path, '_blank');
    } else {
      let temp2 = subscriptionOptions.find(item => item._id === selectedSubscription);
      // to generate invoice
      let invoiceData = {
        archId,
        subscriptionCode: temp2.reference,
        subscriptionName: temp2.name,
        alertPrice: 0,
        alertCount: 0,
        alertTotal: 0,
        referenPrice: formatNumber(fabricantSubAmounts.refer.toFixed(2)),
        referenCount: fabricantSubAmounts.count,
        referenTotal: formatNumber(
          (fabricantSubAmounts.refer * fabricantSubAmounts.count).toFixed(2)
        ),
        totalHT: formatNumber((fabricantSubAmounts.refer * fabricantSubAmounts.count).toFixed(2)),
        tvaPercentage: 20,
        tvaAmount: formatNumber(
          ((fabricantSubAmounts.refer * fabricantSubAmounts.count * 20) / 100).toFixed(2)
        ),
        TotalCost: formatNumber(
          (
            (fabricantSubAmounts.refer * fabricantSubAmounts.count * 20) / 100 +
            fabricantSubAmounts.refer * fabricantSubAmounts.count
          ).toFixed(2)
        ),
        paymentMode:
          paymentMethod === 'card'
            ? 'CB'
            : paymentMethod === 'mandat'
            ? 'Mandat administratif'
            : 'SEPA'
      };
      console.log('invoiceData', invoiceData);
      const result = await api('post', `/Providers/quote/download`, invoiceData);
      console.log('result.data', result.data);
      window.open(result.data.path, '_blank');
    }
  };

  // for stepper
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      let success = await createUser();
      if (success) {
        history.push('/auth/login');
      }
    } else {
      if (activeStep === 1) {
        setPayment(true);
        setStartStepper(false);
      } else {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleComplete = e => {
    e?.preventDefault();
    if (activeStep === 1) {
      if (form2.values.password !== form2.values.confirm_password) {
        toast.error('Le mot de passe et le mot de passe de confirmation ne correspondent pas!');
      } else {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    } else {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    }
  };

  // handle change for subscription
  const handleSubscriptionChange = event => {
    const {
      target: { value }
    } = event;
    let temp = typeof value === 'string' ? value.split(',') : value;
    setSelectedSubscriptions(temp);
  };

  // jsx
  return (
    <div className="register-main">
      <div className="register-conatainer">
        <div className="register-left-container">
          <img
            src={logo}
            alt="QBSoft"
            className="logo-qb"
            onClick={() => history.push('/auth/home')}
          />
          <img src={Vector} alt="QBSoft" className="vector" />
        </div>
        <CloseIcon
          fontSize="large"
          style={{ position: 'absolute', top: '2%', right: '2%', cursor: 'pointer' }}
          onClick={() => history.push('/auth/home')}
        />
        <div className="register-right-container">
          <div className="register-form-container">
            {!startStepper && !payment ? (
              <Box sx={{ width: '70%' }}>
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 40,
                    color: '#8c1244'
                  }}>
                  <Typography variant="h4" gutterBottom>
                    S’INSCRIRE
                  </Typography>
                </div>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'center'
                  }}>
                  <Typography variant="h4" gutterBottom>
                    Choix du Statut
                  </Typography>
                </Box>

                <BasicDropdown
                  required={true}
                  name="type"
                  value={type}
                  options={typeOptions}
                  type="text"
                  onChange={e => setType(e.target.value)}
                  style={{
                    width: '100%',
                    height: 40,
                    border: '1px solid #8C1244',
                    borderRadius: 10
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    justifyContent: 'center'
                  }}>
                  <Button
                    variant="contained"
                    style={{
                      textTransform: 'none',
                      backgroundColor: '#8C1244',
                      borderRadius: 8
                    }}
                    onClick={() => setStartStepper(true)}>
                    Continuez
                  </Button>
                </Box>
              </Box>
            ) : (
              startStepper && (
                <Box sx={{ width: '80%' }}>
                  <Stepper activeStep={activeStep} handleStep={handleStep} completed={completed} />
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {activeStep === 0 ? (
                        <form>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {type === 'Prescripteur' ? (
                              <>
                                <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                  <TextInput
                                    label="Nom Etablissement *"
                                    placeholder="xyz"
                                    type="text"
                                    name="establishment"
                                    value={form1.values.establishment}
                                    onChange={e => handleChange(e.target.name, e.target.value)}
                                    required={true}
                                    labelColor="#8C1244"
                                    labelFont={18}
                                    style={InputStyle}
                                  />
                                  <div className="text-red-600 ">
                                    {form1.touched.establishment ? (
                                      <div style={{ fontSize: 12 }}>
                                        {form1.errors.establishment && (
                                          <>L'établissement est requis</>
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                  <TextInput
                                    label="Service"
                                    placeholder="xyz"
                                    type="text"
                                    name="service"
                                    value={form1.values.service}
                                    onChange={e => handleChange(e.target.name, e.target.value)}
                                    required={true}
                                    labelColor="#8C1244"
                                    labelFont={18}
                                    style={InputStyle}
                                  />
                                </Grid>
                              </>
                            ) : (
                              <Grid item xs={12} sx={{ marginBottom: 2 }}>
                                <TextInput
                                  label="Nom Etablissement *"
                                  placeholder="xyz"
                                  type="text"
                                  name="establishment"
                                  value={form1.values.establishment}
                                  onChange={e => handleChange(e.target.name, e.target.value)}
                                  required={true}
                                  labelColor="#8C1244"
                                  labelFont={18}
                                  style={InputStyle}
                                />
                                <div className="text-red-600 ">
                                  {form1.touched.establishment ? (
                                    <div style={{ fontSize: 12 }}>
                                      {form1.errors.establishment && (
                                        <>L'établissement est requis</>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </Grid>
                            )}

                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Adresse 1 *"
                                placeholder="xyz, Paris"
                                type="text"
                                name="address_1"
                                value={form1.values.address_1}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.address_1 ? (
                                  <div style={{ fontSize: 12 }}>
                                    {form1.errors.address_1 && <>L'adresse 1 est obligatoire</>}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Adresse 2"
                                placeholder="xyz, Paris"
                                type="text"
                                name="address_2"
                                value={form1.values.address_2}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Boite Postale"
                                placeholder="xyz, Paris"
                                type="text"
                                name="po_box"
                                value={form1.values.po_box}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Code Postal *"
                                placeholder="54500"
                                type="text"
                                name="postal_code"
                                value={form1.values.postal_code}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />

                              <div className="text-red-600 ">
                                {form1.touched.postal_code ? (
                                  <div style={{ fontSize: 12 }}>
                                    {form1.errors.postal_code && (
                                      <>Le code postal doit comporter exactement 5 caractères</>
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Ville *"
                                placeholder="xyz, Paris"
                                type="text"
                                name="city"
                                value={form1.values.city}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.city ? (
                                  <div style={{ fontSize: 12 }}>
                                    {form1.errors.city && <>La ville est obligatoire</>}
                                  </div>
                                ) : null}
                              </div>
                            </Grid>
                          </Grid>
                          <div
                            style={{
                              width: '100%',
                              textAlign: 'center',
                              marginTop: 20
                            }}>
                            <Button
                              variant="contained"
                              style={{
                                textTransform: 'none',
                                backgroundColor: '#8C1244',
                                borderRadius: 8
                              }}
                              onClick={() => setStartStepper()}>
                              Retour
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              variant="contained"
                              style={{
                                textTransform: 'none',
                                backgroundColor:
                                  form1?.errors?.establishment ||
                                  form1?.errors?.address_1 ||
                                  form1?.errors?.postal_code
                                    ? '#d9adad'
                                    : '#8C1244',
                                borderRadius: 8
                              }}
                              onClick={() => handleComplete()}
                              disabled={
                                form1?.errors?.establishment ||
                                form1?.errors?.address_1 ||
                                form1?.errors?.postal_code
                              }>
                              Suivant
                            </Button>
                          </div>
                        </form>
                      ) : (
                        activeStep === 1 && (
                          <form>
                            {type === 'Prescripteur' ? (
                              <>
                                <Grid
                                  container
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Nom *"
                                      placeholder="Dubois"
                                      type="text"
                                      name="last_name"
                                      value={form2.values.last_name}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.last_name ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.last_name && (
                                            <>Le nom de famille est requis</>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Prénom *"
                                      placeholder="Claude"
                                      type="text"
                                      name="first_name"
                                      value={form2.values.first_name}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.first_name ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.first_name && <>Le prénom est requis</>}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Email *"
                                      placeholder="abc@xyz.com"
                                      type="email"
                                      name="email"
                                      value={form2.values.email}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.email ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.email && <>L'e-mail n'est pas valide</>}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Téléphone *"
                                      placeholder="0900929008"
                                      type="number"
                                      name="phone"
                                      value={form2.values.phone}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.phone ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.phone && (
                                            <>
                                              Le numéro de téléphone doit comporter exactement
                                              10 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Mot de passe"
                                      type={showPassword ? 'text' : 'password'}
                                      name="password"
                                      value={form2.values.password}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      placeholder="**********"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="forget-pass">
                                      {!showPassword ? (
                                        <VisibilityIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowPassword(true)}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowPassword(false)}
                                        />
                                      )}
                                    </div>
                                    <div className="text-red-600 " style={{ marginTop: -22 }}>
                                      {form2.touched.password ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.password && (
                                            <>
                                              Le mot de passe doit comporter au moins 6 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Confirmer le mot de passe"
                                      type={showConfirmPassword ? 'text' : 'password'}
                                      name="confirm_password"
                                      value={form2.values.confirm_password}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      placeholder="**********"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="forget-pass">
                                      {!showConfirmPassword ? (
                                        <VisibilityIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowConfirmPassword(true)}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowConfirmPassword(false)}
                                        />
                                      )}
                                    </div>
                                    <div className="text-red-600 " style={{ marginTop: -22 }}>
                                      {form2.touched.confirm_password ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.confirm_password && (
                                            <>
                                              Le mot de passe de confirmation doit contenir au moins
                                              6 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: 20
                                  }}>
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: 'none',
                                      backgroundColor: '#8C1244',
                                      borderRadius: 8
                                    }}
                                    onClick={() => handleBack()}>
                                    Retour
                                  </Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: 'none',
                                      backgroundColor:
                                        form2?.errors?.first_name ||
                                        form2?.errors?.last_name ||
                                        form2?.errors?.email ||
                                        form2?.errors?.password ||
                                        form2?.errors?.confirm_password ||
                                        form2?.errors?.phone
                                          ? '#d9adad'
                                          : '#8C1244',
                                      borderRadius: 8
                                    }}
                                    onClick={() => handleComplete()}
                                    disabled={
                                      form2?.errors?.first_name ||
                                      form2?.errors?.last_name ||
                                      form2?.errors?.email ||
                                      form2?.errors?.password ||
                                      form2?.errors?.confirm_password ||
                                      form2?.errors?.phone
                                    }>
                                    Valider
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <Grid
                                  container
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Nom *"
                                      placeholder="Dubois"
                                      type="text"
                                      name="last_name"
                                      value={form2.values.last_name}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.last_name ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.last_name && (
                                            <>Le nom de famille est requis</>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Prénom *"
                                      placeholder="Claude"
                                      type="text"
                                      name="first_name"
                                      value={form2.values.first_name}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.first_name ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.first_name && <>Le prénom est requis</>}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Email *"
                                      placeholder="abc@xyz.com"
                                      type="email"
                                      name="email"
                                      value={form2.values.email}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.email ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.email && <>L'e-mail n'est pas valide</>}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Téléphone *"
                                      placeholder="0900929008"
                                      type="number"
                                      name="phone"
                                      value={form2.values.phone}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.phone ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.phone && (
                                            <>
                                              Le numéro de téléphone doit comporter exactement
                                              10 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Mot de passe"
                                      type={showPassword ? 'text' : 'password'}
                                      name="password"
                                      value={form2.values.password}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      placeholder="**********"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="forget-pass">
                                      {!showPassword ? (
                                        <VisibilityIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowPassword(true)}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowPassword(false)}
                                        />
                                      )}
                                    </div>
                                    <div className="text-red-600 " style={{ marginTop: -22 }}>
                                      {form2.touched.password ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.password && (
                                            <>
                                              Le mot de passe doit comporter au moins 6 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Confirmer le mot de passe"
                                      type={showConfirmPassword ? 'text' : 'password'}
                                      name="confirm_password"
                                      value={form2.values.confirm_password}
                                      onChange={e => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      placeholder="**********"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="forget-pass">
                                      {!showConfirmPassword ? (
                                        <VisibilityIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowConfirmPassword(true)}
                                        />
                                      ) : (
                                        <VisibilityOffIcon
                                          className="register-eye-icon"
                                          onClick={() => setShowConfirmPassword(false)}
                                        />
                                      )}
                                    </div>
                                    <div className="text-red-600 " style={{ marginTop: -22 }}>
                                      {form2.touched.confirm_password ? (
                                        <div style={{ fontSize: 12 }}>
                                          {form2.errors.confirm_password && (
                                            <>
                                              Le mot de passe de confirmation doit contenir au moins
                                              6 caractères
                                            </>
                                          )}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: 20
                                  }}>
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: 'none',
                                      backgroundColor: '#8C1244',
                                      borderRadius: 8
                                    }}
                                    onClick={() => handleBack()}>
                                    Retour
                                  </Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: 'none',
                                      backgroundColor:
                                        form2?.errors?.first_name || form2?.errors?.email
                                          ? '#d9adad'
                                          : '#8C1244',
                                      borderRadius: 8
                                    }}
                                    onClick={() => handleComplete()}
                                    disabled={form2?.errors?.first_name || form2?.errors?.email}>
                                    Valider
                                  </Button>
                                </div>
                              </>
                            )}
                          </form>
                        )
                      )}
                    </Typography>
                  </React.Fragment>
                </Box>
              )
            )}

            {!startStepper && payment && (
              <div style={{ width: '80%' }}>
                <div className="purchase-header">Commande {type}</div>
                {type === 'Prescripteur' ? (
                  <>
                    {/* Subscription */}
                    <div>
                      <strong>Abonnement</strong>
                      {subscriptionsData.map((item, index) => {
                        return (
                          <div className="subscription-box">
                            <div className="subscription-box-intial">
                              <div className="common-text">
                                <span>{item.name}</span>
                                <br />
                                <span
                                  style={{ fontSize: 9, fontWeight: 900, whiteSpace: 'nowrap' }}>
                                  {' '}
                                  {item.name.toUpperCase().includes('ABONNEMENT 1') && (
                                    <>
                                      (1 Pack de 5 projets est offert lors de l’abonnement initial)
                                      <br />
                                    </>
                                  )}
                                </span>

                                <span style={{ fontSize: 12, fontWeight: 900 }}>
                                  {' '}
                                  ({item.price.toFixed('2')} € HT)
                                </span>
                                <br />
                              </div>
                              <BasicDropdown
                                options={options}
                                value={item.count}
                                disabled={totalDuration === 0 && item.duration === 0}
                                onChange={e => {
                                  setSubscriptionData(prev => {
                                    prev[index].count = e.target.value;
                                    return [...prev];
                                  });
                                }}
                                first="notDisable"
                                component="register"
                                style={{
                                  backgroundColor: '#f5f5f5',
                                  borderRadius: 10,
                                  height: 40,
                                  width: 60,
                                  fontSize: 20,
                                  fontWeight: 700,
                                  padding: 5
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
                              fontSize: 20
                            }}>
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
                            onChange={e => setPaymentMethod(e.target.value)}
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
                            onChange={e => setPaymentMethod(e.target.value)}
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
                            onChange={e => setPaymentMethod(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* exports */}
                      {paymentMethod === 'mandat' ? (
                        <div
                          style={{
                            marginTop: 20
                          }}>
                          <div style={{ fontSize: 15 }}>
                            Merci de bien vouloir nous retourner votre bon de commande
                            <br />
                            <strong> IMPORTANT:</strong> À réception de votre bon de commande, la
                            facture correspondant à votre bon d’achat vous sera transmise par
                            e-mail. Vous disposerez alors des droits d’accès et d’utilisation de
                            l’application Quadrabase pendant 2 mois dans l’attente de votre
                            règlement. Passé ce délai, et faute de règlement de votre part, les
                            droits accordéd seront suspendus automatiquement.
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
                                    width: 'auto'
                                  }}>
                                  {/* <div
                                    style={{
                                      border: 0,
                                      padding: 0,
                                      fontSize: 15,
                                      marginRight: 20,
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    Coordonées :{' '}
                                  </div> */}
                                </div>
                                {/* <div style={{ fontSize: 15 }}>
                                  <div style={{ marginBottom: 10 }}>
                                    Titulaire : QBSoft 20 avenuw Félix Raybaud 06130 GRASSE
                                  </div>
                                  <div style={{ marginBottom: 10 }}>
                                    IBAN : FR76 1695 8000 0115 4724 0729 575
                                  </div>
                                  <div>BIC/SWIFT : QNTOFRP1XXX / BNPAFRPP</div>
                                </div> */}
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    marginLeft: 30,
                                    fontSize: 15
                                  }}>
                                  <div
                                    style={{
                                      cursor: 'pointer',
                                      color: '#FF8616',
                                      whiteSpace: 'nowrap'
                                    }}
                                    onClick={generateQuote}>
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
                          style={{
                            cursor: 'pointer',
                            color: '#FF8616',
                            whiteSpace: 'nowrap',
                            marginTop: 10
                          }}
                          onClick={generateQuote}>
                          Générer un devis
                        </div>
                      )}
                    </div>
                    <a
                      style={{
                        cursor: 'pointer',
                        color: '#FF8616',
                        whiteSpace: 'nowrap'
                      }}
                      href="/auth/cgv"
                      // onClick={() => history.push('/auth/cgv')}
                      target="_blank">
                      Conditions Générales des Ventes (CGV)
                    </a>
                  </>
                ) : (
                  <>
                    {/* Subscription */}
                    <div>
                      <BasicDropdown
                        options={subscriptionOptions}
                        value={selectedSubscription}
                        onChange={e => {
                          setSelectedSubscription(e.target.value);
                        }}
                        style={{
                          backgroundColor: '#f5f5f5',
                          borderRadius: 10,
                          height: 40,
                          width: '110%',
                          fontSize: 20,
                          fontWeight: 700,
                          padding: 5
                        }}
                      />
                      <br />
                      <strong>Abonnement</strong>
                      <div className="subscription-box">
                        <div className="subscription-box-intial">
                          <div className="common-text">
                            <span>
                              <span>{duration} mois</span>
                            </span>
                            <br />
                          </div>

                          <BasicDropdown
                            options={options}
                            value={fabricantSubAmounts.count}
                            onChange={e => {
                              setFabricantSubAmount(prev => {
                                prev.count = e.target.value;
                                return { ...prev };
                              });
                            }}
                            component="register"
                            style={{
                              backgroundColor: '#f5f5f5',
                              borderRadius: 10,
                              height: 40,
                              width: 60,
                              fontSize: 20,
                              fontWeight: 700,
                              padding: 5
                            }}
                          />

                          <div className="amount-container">
                            <div>Total HT</div>
                            <div>
                              {formatNumber(
                                (fabricantSubAmounts.count * fabricantSubAmounts.refer).toFixed(2)
                              )}
                              €
                            </div>
                          </div>
                        </div>
                      </div>
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
                                fontSize: 20
                              }}>
                              <div className="amount-container" style={{ border: 0 }}>
                                Montant à payer :{' '}
                              </div>
                            </div>
                            <div>
                              <div className="amount-container" style={{ marginBottom: 10 }}>
                                <div>T.V.A 20%</div>
                                <div>
                                  {formatNumber(
                                    (
                                      (fabricantSubAmounts.count * fabricantSubAmounts.refer * 20) /
                                      100
                                    ).toFixed(2)
                                  )}{' '}
                                  €
                                </div>
                              </div>
                              <div className="amount-container">
                                <div>Total T.T.C</div>{' '}
                                <div>
                                  {formatNumber(
                                    (
                                      (fabricantSubAmounts.count * fabricantSubAmounts.refer * 20) /
                                        100 +
                                      fabricantSubAmounts.count * fabricantSubAmounts.refer
                                    ).toFixed(2)
                                  )}{' '}
                                  €
                                </div>
                              </div>
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
                            onChange={e => setPaymentMethod(e.target.value)}
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
                            onChange={e => setPaymentMethod(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          cursor: 'pointer',
                          color: '#FF8616',
                          whiteSpace: 'nowrap',
                          marginTop: 10
                        }}
                        onClick={generateQuote}>
                        Générer un devis
                      </div>
                    </div>
                    <div
                      style={{
                        cursor: 'pointer',
                        color: '#FF8616',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => history.push('/auth/cgv')}>
                      Conditions Générales des Ventes (CGV)
                    </div>
                  </>
                )}
                {/* Buttons */}
                <div
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: 40
                  }}>
                  <Button
                    variant="contained"
                    style={{
                      textTransform: 'none',
                      backgroundColor: '#8C1244',
                      borderRadius: 8
                    }}
                    onClick={() => {
                      history.push('/auth/login');
                    }}>
                    Retour
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    style={{
                      textTransform: 'none',
                      backgroundColor: '#8C1244',
                      backgroundColor:
                        type === 'Prescripteur' && total.grandTotal === 0 ? '#d9adad' : '#8C1244',
                      borderRadius: 8
                    }}
                    disabled={type === 'Prescripteur' && total.grandTotal === 0}
                    onClick={() => handleFinish()}>
                    Valider
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
