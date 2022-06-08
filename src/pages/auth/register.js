// init
import React, { useState, useEffect } from "react";
import "../../css/register.css";
import logo from "../../assets/Quadralogo.png";
import Vector from "../../assets/Vector.png";
import TextInput from "../../components/TextInput";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import Stepper from "./Components/Stepper";
import validate from "validate.js";
import moment from "moment";
import api from "../../api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BasicDropdown from "../../components/Architect/BasicDropdown";
import Checkbox from "@mui/material/Checkbox";

// input styling
const InputStyle = {
  borderColor: "#8C1244",
  marginTop: 5,
  backgroundColor: "transparent",
  height: 40,
  borderRadius: 10,
};

const steps = ["Informations générales", "Informations de connexion"];

const schema1 = {
  establishment: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  service: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  address_1: {
    presence: { allowEmpty: false, message: "is required" },
  },
  po_box: {
    presence: { allowEmpty: false, message: "is required" },
  },
  postal_code: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 5,
      maximum: 5,
    },
  },
  city: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  phone: {
    length: {
      minimum: 10,
      maximum: 10,
    },
  },
};

const schema2 = {
  first_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  last_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  email: {
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    length: {
      maximum: 128,
      minimum: 6, //// minimum requirement 6 characters
    },
  },
  confirm_password: {
    length: {
      maximum: 128,
      minimum: 6, //// minimum requirement 6 characters
    },
  },
};

const options = [
  { _id: 1, title: 1 },
  { _id: 2, title: 2 },
  { _id: 3, title: 3 },
  { _id: 4, title: 4 },
  { _id: 5, title: 5 },
];

const typeOptions = [
  { _id: "Prescripteur", title: "Prescripteur" },
  { _id: "Fabricant", title: "Fabricant" },
];

const fabricantSubOptions = [
  { _id: "Référencement", title: "Référencement" },
  { _id: "Alertes", title: "Alertes" },
];

// component
const Register = () => {
  // history object
  const history = useHistory();

  // states
  const [type, setType] = useState("Prescripteur");
  const [startStepper, setStartStepper] = useState(false);
  const [fabricantSub, setFabricantSub] = useState("Référencement");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [payment, setPayment] = useState(false);
  const [madatCheck, setMadatCheck] = useState(false);
  const [archId, setArchId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form1, setForm1] = useState({
    values: {
      establishment: "",
      service: "",
      address_1: "",
      address_2: "",
      po_box: "",
      postal_code: "",
      city: "",
      phone: "",
    },
    error: {},
    touched: {},
  });

  const [form2, setForm2] = useState({
    values: {
      last_name: "",
      first_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    error: {},
    touched: {},
  });

  const [subAmounts, setSubAmount] = useState({
    initial: {
      count: 1,
      price: 1190,
    },
    extended: {
      count: 0,
      price: 1190,
    },
    pack: {
      count: 0,
      price: 500,
    },
  });

  useEffect(() => {
    if (localStorage.getItem("step") == 2) {
      setArchId(localStorage.getItem("archId"));
      setPayment(true);
      setStartStepper(false);
      localStorage.removeItem("archId");
      localStorage.removeItem("step");
    }
  }, []);

  useEffect(() => {
    const errors = validate(form1.values, schema1);
    setForm1((formState) => ({
      ...formState,
      errors: errors || {},
    }));
  }, [form1.values]);

  useEffect(() => {
    const errors = validate(form2.values, schema2);
    setForm2((formState) => ({
      ...formState,
      errors: errors || {},
    }));
  }, [form2.values]);

  // handle change function
  const handleChange = (name, value) => {
    if (activeStep === 0) {
      setForm1((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value,
        },
        touched: {
          ...formState.touched,
          [name]: true,
        },
      }));
    } else if (activeStep === 1) {
      setForm2((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value,
        },
        touched: {
          ...formState.touched,
          [name]: true,
        },
      }));
    }
  };

  // handle Finish function
  const handleFinish = async () => {
    // to creating account
    let data = {};
    if (type === "Prescripteur") {
      data = {
        paymentMethod,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Subscription",
              },
              unit_amount:
                parseInt(
                  ((subAmounts.initial.price * subAmounts.initial.count +
                    subAmounts.extended.price * subAmounts.extended.count +
                    subAmounts.pack.price * subAmounts.pack.count) *
                    20) /
                    100 +
                    subAmounts.initial.price * subAmounts.initial.count +
                    subAmounts.extended.price * subAmounts.extended.count +
                    subAmounts.pack.price * subAmounts.pack.count
                ) * 100,
            },
            quantity: 1,
          },
        ],
        metaData: {
          id: archId,
          subscriptionDuration: (parseInt(subAmounts.initial.count) + parseInt(subAmounts.extended.count)) * 12,
          subscriptionProjects: parseInt(subAmounts.pack.count) * 5,
          type: "architectSignup",
        },
        invoiceData: {
          address1: form1.values.address_1,
          initialPrice: subAmounts.initial.price,
          initialCount: subAmounts.initial.count,
          extendedPrice: subAmounts.extended.price,
          extendedCount: subAmounts.extended.count,
          packPrice: subAmounts.pack.price,
          packCount: subAmounts.pack.count,
          totalHT:
            subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count,
          tvaPercentage: 20,
          tvaAmount:
            ((subAmounts.initial.price * subAmounts.initial.count +
              subAmounts.extended.price * subAmounts.extended.count +
              subAmounts.pack.price * subAmounts.pack.count) *
              20) /
            100,
          TotalCost:
            ((subAmounts.initial.price * subAmounts.initial.count +
              subAmounts.extended.price * subAmounts.extended.count +
              subAmounts.pack.price * subAmounts.pack.count) *
              20) /
              100 +
            subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count,
          paymentMode: "Card",
        },
      };
    } else {
      data = {
        paymentMethod,
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Subscription",
              },
              unit_amount: parseInt(fabricantSub === "Alertes" ? (5000 * 20) / 100 + 5000 : (2000 * 20) / 100 + 2000) * 100,
            },
            quantity: 1,
          },
        ],
        metaData: {
          name: form2.values.first_name,
          email: form2.values.email,
          contact_no: form1.values.phone,
          address1: form1.values.address_1,
          address2: form1.values.address_2,
          city: form1.values.city,
          zipcode: form1.values.postal_code,
          po_box: form1.values.po_box,
          establishment: form1.values.establishment,
          subscriptionName: fabricantSub,
          subscriptionStartDate: moment(new Date()).format("YYYY/MM/DD"),
          subscriptionEndDate: moment(new Date()).add(1, "years").format("YYYY/MM/DD"),
          type: "providerSignup",
        },
        invoiceData: {
          address1: form1.values.address_1,
          alertPrice: 5000,
          alertCount: fabricantSub === "Alertes" ? 1 : 0,
          alertTotal: fabricantSub === "Alertes" ? 5000 : 0,
          referenPrice: 2000,
          referenCount: fabricantSub === "Référencement" ? 1 : 0,
          referenTotal: fabricantSub === "Référencement" ? 2000 : 0,
          totalHT: fabricantSub === "Référencement" ? 2000 : 0,
          tvaPercentage: 20,
          tvaAmount: fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100,
          TotalCost: fabricantSub === "Alertes" ? (5000 * 20) / 100 + 5000 : (2000 * 20) / 100 + 2000,
          paymentMode: "Card",
        },
      };
    }

    const res = await api("post", `/licenses/checkout`, data);
    window.location = res.data.url;
  };

  const createUser = async () => {
    let data = {
      establishment: form1.values.establishment,
      service: form1.values.service,
      address_1: form1.values.address_1,
      address_2: form1.values.address_2,
      po_box: form1.values.po_box,
      postal_code: form1.values.postal_code,
      city: form1.values.city,
      phone: form1.values.phone,
      last_name: form2.values.last_name,
      first_name: form2.values.first_name,
      email: form2.values.email,
      password: form2.values.password,
      confirm_password: form2.values.confirm_password,
    };
    const res = await api("post", `/Architects/createOnSingup`, data);
    setArchId(res.data.architect._id);
    toast.success(res.data.message);
    return res.data.success;
  };

  const generateInvoice = async () => {
    if (type === "Prescripteur") {
      // to generate invoice
      let invoiceData = {
        address1: form1.values.address_1,
        initialPrice: subAmounts.initial.price,
        initialCount: subAmounts.initial.count,
        extendedPrice: subAmounts.extended.price,
        extendedCount: subAmounts.extended.count,
        packPrice: subAmounts.pack.price,
        packCount: subAmounts.pack.count,
        totalHT:
          subAmounts.initial.price * subAmounts.initial.count +
          subAmounts.extended.price * subAmounts.extended.count +
          subAmounts.pack.price * subAmounts.pack.count,
        tvaPercentage: 20,
        tvaAmount:
          ((subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count) *
            20) /
          100,
        TotalCost:
          ((subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count) *
            20) /
            100 +
          subAmounts.initial.price * subAmounts.initial.count +
          subAmounts.extended.price * subAmounts.extended.count +
          subAmounts.pack.price * subAmounts.pack.count,
        paymentMode: "Card",
      };
      const result = await api("post", `/Architects/download`, invoiceData);
      window.open(result.data.path, "_blank");
    } else {
      // to generate invoice
      let invoiceData = {
        address1: form1.values.address_1,
        alertPrice: 5000,
        alertCount: fabricantSub === "Alertes" ? 1 : 0,
        alertTotal: fabricantSub === "Alertes" ? 5000 : 0,
        referenPrice: 2000,
        referenCount: fabricantSub === "Référencement" ? 1 : 0,
        referenTotal: fabricantSub === "Référencement" ? 2000 : 0,
        totalHT: fabricantSub === "Référencement" ? 2000 : 0,
        tvaPercentage: 20,
        tvaAmount: fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100,
        TotalCost: fabricantSub === "Alertes" ? (5000 * 20) / 100 + 5000 : (2000 * 20) / 100 + 2000,
        paymentMode: "Card",
      };
      const result = await api("post", `/Providers/download`, invoiceData);
      window.open(result.data.path, "_blank");
    }
  };

  const generateQuote = async () => {
    if (type === "Prescripteur") {
      let invoiceData = {
        address1: form1.values.address_1,
        initialPrice: subAmounts.initial.price,
        initialCount: subAmounts.initial.count,
        extendedPrice: subAmounts.extended.price,
        extendedCount: subAmounts.extended.count,
        packPrice: subAmounts.pack.price,
        packCount: subAmounts.pack.count,
        totalHT:
          subAmounts.initial.price * subAmounts.initial.count +
          subAmounts.extended.price * subAmounts.extended.count +
          subAmounts.pack.price * subAmounts.pack.count,
        tvaPercentage: 20,
        tvaAmount:
          ((subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count) *
            20) /
          100,
        TotalCost:
          ((subAmounts.initial.price * subAmounts.initial.count +
            subAmounts.extended.price * subAmounts.extended.count +
            subAmounts.pack.price * subAmounts.pack.count) *
            20) /
            100 +
          subAmounts.initial.price * subAmounts.initial.count +
          subAmounts.extended.price * subAmounts.extended.count +
          subAmounts.pack.price * subAmounts.pack.count,
        paymentMode: "Card",
      };
      const result = await api("post", `/Architects/quote/download`, invoiceData);
      window.open(result.data.path, "_blank");
    } else {
      // to generate invoice
      let invoiceData = {
        address1: form1.values.address_1,
        alertPrice: 5000,
        alertCount: fabricantSub === "Alertes" ? 1 : 0,
        alertTotal: fabricantSub === "Alertes" ? 5000 : 0,
        referenPrice: 2000,
        referenCount: fabricantSub === "Référencement" ? 1 : 0,
        referenTotal: fabricantSub === "Référencement" ? 2000 : 0,
        totalHT: fabricantSub === "Référencement" ? 2000 : 0,
        tvaPercentage: 20,
        tvaAmount: fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100,
        TotalCost: fabricantSub === "Alertes" ? (5000 * 20) / 100 + 5000 : (2000 * 20) / 100 + 2000,
        paymentMode: "Card",
      };
      const result = await api("post", `/Providers/quote/download`, invoiceData);
      window.open(result.data.path, "_blank");
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
    if (activeStep === 1 && type === "Prescripteur") {
      let success = await createUser();
      if (success) {
        history.push("/auth/login");
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

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = (e) => {
    e?.preventDefault();
    if (activeStep === 1) {
      if (form2.values.password !== form2.values.confirm_password) {
        toast.error("Password and confirm password does not match!");
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

  // jsx
  return (
    <div className="register-main">
      <div className="register-conatainer">
        <div className="register-left-container">
          <img src={logo} alt="QBSoft" className="logo-qb" onClick={() => history.push("/auth/home")} />
          <img src={Vector} alt="QBSoft" className="vector" />
        </div>
        <div className="register-right-container">
          <div className="register-form-container">
            {!startStepper && !payment ? (
              <Box sx={{ width: "70%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                  }}
                >
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
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #8C1244",
                    borderRadius: 10,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{
                      textTransform: "none",
                      backgroundColor: "#8C1244",
                      borderRadius: 8,
                    }}
                    onClick={() => setStartStepper(true)}
                  >
                    Continuez
                  </Button>
                </Box>
              </Box>
            ) : (
              startStepper && (
                <Box sx={{ width: "80%" }}>
                  <Stepper activeStep={activeStep} handleStep={handleStep} completed={completed} />
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {activeStep === 0 ? (
                        <form>
                          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {type === "Prescripteur" ? (
                              <>
                                <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                  <TextInput
                                    label="Nom Etablissement *"
                                    placeholder="xyz"
                                    type="text"
                                    name="establishment"
                                    value={form1.values.establishment}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    required={true}
                                    labelColor="#8C1244"
                                    labelFont={18}
                                    style={InputStyle}
                                  />
                                  <div className="text-red-600 ">
                                    {form1.touched.establishment ? (
                                      <div style={{ fontSize: 12 }}>{form1.errors.establishment}</div>
                                    ) : null}
                                  </div>
                                </Grid>
                                <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                  <TextInput
                                    label="Service *"
                                    placeholder="xyz"
                                    type="text"
                                    name="service"
                                    value={form1.values.service}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    required={true}
                                    labelColor="#8C1244"
                                    labelFont={18}
                                    style={InputStyle}
                                  />
                                  <div className="text-red-600 ">
                                    {form1.touched.service ? <div style={{ fontSize: 12 }}>{form1.errors.service}</div> : null}
                                  </div>
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
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                  required={true}
                                  labelColor="#8C1244"
                                  labelFont={18}
                                  style={InputStyle}
                                />
                                <div className="text-red-600 ">
                                  {form1.touched.establishment ? (
                                    <div style={{ fontSize: 12 }}>{form1.errors.establishment}</div>
                                  ) : null}
                                </div>
                              </Grid>
                            )}

                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Address 1 *"
                                placeholder="xyz, Paris"
                                type="text"
                                name="address_1"
                                value={form1.values.address_1}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.address_1 ? <div style={{ fontSize: 12 }}>{form1.errors.address_1}</div> : null}
                              </div>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Address 2"
                                placeholder="xyz, Paris"
                                type="text"
                                name="address_2"
                                value={form1.values.address_2}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Boite Postale *"
                                placeholder="xyz, Paris"
                                type="text"
                                name="po_box"
                                value={form1.values.po_box}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.po_box ? <div style={{ fontSize: 12 }}>{form1.errors.po_box}</div> : null}
                              </div>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Code Postal *"
                                placeholder="54500"
                                type="text"
                                name="postal_code"
                                value={form1.values.postal_code}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.postal_code ? (
                                  <div style={{ fontSize: 12 }}>{form1.errors.postal_code}</div>
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
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.city ? <div style={{ fontSize: 12 }}>{form1.errors.city}</div> : null}
                              </div>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: 2 }}>
                              <TextInput
                                label="Téléphone *"
                                placeholder="0900929008"
                                type="number"
                                name="phone"
                                value={form1.values.phone}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                required={true}
                                labelColor="#8C1244"
                                labelFont={18}
                                style={InputStyle}
                              />
                              <div className="text-red-600 ">
                                {form1.touched.phone ? <div style={{ fontSize: 12 }}>{form1.errors.phone}</div> : null}
                              </div>
                            </Grid>
                          </Grid>
                          <div
                            style={{
                              width: "100%",
                              textAlign: "center",
                              marginTop: 20,
                            }}
                          >
                            <Button
                              variant="contained"
                              style={{
                                textTransform: "none",
                                backgroundColor: "#8C1244",
                                borderRadius: 8,
                              }}
                              onClick={() => setStartStepper()}
                            >
                              Arrière
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button
                              variant="contained"
                              style={{
                                textTransform: "none",
                                backgroundColor:
                                  form1?.errors?.establishment ||
                                  form1?.errors?.address_1 ||
                                  form1?.errors?.postal_code ||
                                  form1?.errors?.phone
                                    ? "#d9adad"
                                    : "#8C1244",
                                borderRadius: 8,
                              }}
                              onClick={() => handleComplete()}
                              disabled={
                                form1?.errors?.establishment ||
                                form1?.errors?.address_1 ||
                                form1?.errors?.postal_code ||
                                form1?.errors?.phone
                              }
                            >
                              Suivant
                            </Button>
                          </div>
                        </form>
                      ) : (
                        activeStep === 1 && (
                          <form>
                            {type === "Prescripteur" ? (
                              <>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Prénom *"
                                      placeholder="Claude"
                                      type="text"
                                      name="first_name"
                                      value={form2.values.first_name}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.first_name ? (
                                        <div style={{ fontSize: 12 }}>{form2.errors.first_name}</div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Nom *"
                                      placeholder="Dubois"
                                      type="text"
                                      name="last_name"
                                      value={form2.values.last_name}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.last_name ? (
                                        <div style={{ fontSize: 12 }}>{form2.errors.last_name}</div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={12} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Email *"
                                      placeholder="abc@xyz.com"
                                      type="email"
                                      name="email"
                                      value={form2.values.email}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.email ? <div style={{ fontSize: 12 }}>{form2.errors.email}</div> : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Mot de passe"
                                      type={showPassword ? "text" : "password"}
                                      name="password"
                                      value={form2.values.password}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      placeholder="**********"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="forget-pass">
                                      {!showPassword ? (
                                        <VisibilityIcon className="register-eye-icon" onClick={() => setShowPassword(true)} />
                                      ) : (
                                        <VisibilityOffIcon className="register-eye-icon" onClick={() => setShowPassword(false)} />
                                      )}
                                    </div>
                                    <div className="text-red-600 " style={{ marginTop: -22 }}>
                                      {form2.touched.password ? (
                                        <div style={{ fontSize: 12 }}>{form2.errors.password}</div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Confirmer le mot de passe"
                                      type={showConfirmPassword ? "text" : "password"}
                                      name="confirm_password"
                                      value={form2.values.confirm_password}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                                        <div style={{ fontSize: 12 }}>{form2.errors.confirm_password}</div>
                                      ) : null}
                                    </div>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: 20,
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: "none",
                                      backgroundColor: "#8C1244",
                                      borderRadius: 8,
                                    }}
                                    onClick={() => handleBack()}
                                  >
                                    Arrière
                                  </Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: "none",
                                      backgroundColor:
                                        form2?.errors?.first_name ||
                                        form2?.errors?.last_name ||
                                        form2?.errors?.email ||
                                        form2?.errors?.password ||
                                        form2?.errors?.confirm_password
                                          ? "#d9adad"
                                          : "#8C1244",
                                      borderRadius: 8,
                                    }}
                                    onClick={() => handleComplete()}
                                    disabled={
                                      form2?.errors?.first_name ||
                                      form2?.errors?.last_name ||
                                      form2?.errors?.email ||
                                      form2?.errors?.password ||
                                      form2?.errors?.confirm_password
                                    }
                                  >
                                    Valider
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                  <Grid item xs={6} sx={{ marginBottom: 2 }}>
                                    <TextInput
                                      label="Nom *"
                                      placeholder="Claude"
                                      type="text"
                                      name="first_name"
                                      value={form2.values.first_name}
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.first_name ? (
                                        <div style={{ fontSize: 12 }}>{form2.errors.first_name}</div>
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
                                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                                      required={true}
                                      labelColor="#8C1244"
                                      labelFont={18}
                                      style={InputStyle}
                                    />
                                    <div className="text-red-600 ">
                                      {form2.touched.email ? <div style={{ fontSize: 12 }}>{form2.errors.email}</div> : null}
                                    </div>
                                  </Grid>
                                </Grid>
                                <div
                                  style={{
                                    width: "100%",
                                    textAlign: "center",
                                    marginTop: 20,
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: "none",
                                      backgroundColor: "#8C1244",
                                      borderRadius: 8,
                                    }}
                                    onClick={() => handleBack()}
                                  >
                                    Arrière
                                  </Button>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <Button
                                    variant="contained"
                                    style={{
                                      textTransform: "none",
                                      backgroundColor: form2?.errors?.first_name || form2?.errors?.email ? "#d9adad" : "#8C1244",
                                      borderRadius: 8,
                                    }}
                                    onClick={() => handleComplete()}
                                    disabled={form2?.errors?.first_name || form2?.errors?.email}
                                  >
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
              <div style={{ width: "80%" }}>
                <div className="purchase-header">Purchase {type}</div>
                {type === "Prescripteur" ? (
                  <>
                    {" "}
                    {/* Subscription */}
                    <div>
                      <strong>Abonnement</strong>
                      <div className="subscription-box">
                        <div className="subscription-box-intial">
                          <div className="common-text">
                            <span>Abonnement Initial 1 an</span>
                            <br />
                            <small>(avec 1 pack 5 Projets) </small>
                          </div>
                          <BasicDropdown
                            options={options}
                            value={subAmounts.initial.count}
                            onChange={(e) => {
                              setSubAmount((prev) => {
                                prev.initial.count = e.target.value;
                                return { ...prev };
                              });
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
                            <div>{subAmounts.initial.price.toFixed(2) * subAmounts.initial.count} €</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Projects */}
                    <div style={{ padding: "20px 0" }}>
                      <strong>Pack Projets</strong>
                      <div className="subscription-box">
                        <div className="subscription-box-intial">
                          <div className="common-text">
                            <span>Pack de 5 Projets</span>
                            <br />
                            <small>(500.00 € HT)</small>
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
                            <div> {(subAmounts.pack.count * subAmounts.pack.price).toFixed(2)} €</div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                              <div>
                                {" "}
                                {(
                                  subAmounts.initial.price * subAmounts.initial.count +
                                  subAmounts.extended.price * subAmounts.extended.count +
                                  subAmounts.pack.price * subAmounts.pack.count
                                ).toFixed(2)}{" "}
                                €
                              </div>
                            </div>
                            <div className="amount-container" style={{ marginBottom: 10 }}>
                              <div>T.V.A 20%</div>
                              <div>
                                {" "}
                                {(
                                  ((subAmounts.initial.price * subAmounts.initial.count +
                                    subAmounts.extended.price * subAmounts.extended.count +
                                    subAmounts.pack.price * subAmounts.pack.count) *
                                    20) /
                                  100
                                ).toFixed(2)}{" "}
                                €
                              </div>
                            </div>
                            <div className="amount-container">
                              <div>Total T.T.C</div>
                              <div>
                                {" "}
                                {(
                                  ((subAmounts.initial.price * subAmounts.initial.count +
                                    subAmounts.extended.price * subAmounts.extended.count +
                                    subAmounts.pack.price * subAmounts.pack.count) *
                                    20) /
                                    100 +
                                  subAmounts.initial.price * subAmounts.initial.count +
                                  subAmounts.extended.price * subAmounts.extended.count +
                                  subAmounts.pack.price * subAmounts.pack.count
                                ).toFixed(2)}{" "}
                                €
                              </div>
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
                            <span>Card</span>
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
                          <Checkbox
                            style={{
                              height: "16px",
                              width: "16px",
                              color: "#8C1244",
                            }}
                            checked={madatCheck}
                            onChange={(e) => {
                              setMadatCheck(e.target.checked);
                            }}
                          />
                        </div>
                      </div>
                      {/* exports */}
                      {madatCheck && (
                        <div
                          style={{
                            color: "#FF8616",
                            fontSize: 13,
                            marginTop: 20,
                          }}
                        >
                          <span style={{ cursor: "pointer" }} onClick={generateQuote}>
                            Générer un devis
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span style={{ cursor: "pointer" }} onClick={generateInvoice}>
                            Voir la facture
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Subscription */}
                    <div>
                      <strong>Abonnement</strong>
                      <div className="subscription-box">
                        <div className="subscription-box-intial">
                          <div className="common-text">
                            <span>Référencement: 2,000.00 €</span>
                            <br />
                            <br />
                            <span>Alertes: 5,000.00 €</span>
                            <br />
                            <small>(comprenant le référencement)</small>
                          </div>
                          <BasicDropdown
                            options={fabricantSubOptions}
                            value={fabricantSub}
                            onChange={(e) => {
                              setFabricantSub(e.target.value);
                            }}
                            first="notDisable"
                            style={{
                              backgroundColor: "#f5f5f5",
                              borderRadius: 10,
                              height: 40,
                              fontSize: 16,
                              fontWeight: 700,
                              padding: 5,
                              marginRight: 5,
                            }}
                          />
                          <div className="amount-container">
                            <div>Total HT</div>
                            <div>{fabricantSub === "Alertes" ? <>5000.00</> : <>2000.00</>} €</div>
                          </div>
                        </div>
                      </div>
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
                                <div>{fabricantSub === "Alertes" ? <>5000.00</> : <>2000.00</>} €</div>
                              </div>
                              <div className="amount-container" style={{ marginBottom: 10 }}>
                                <div>T.V.A 20%</div>
                                <div>{(fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100).toFixed(2)} €</div>
                              </div>
                              <div className="amount-container">
                                <div>Total T.T.C</div>{" "}
                                <div>
                                  {(fabricantSub === "Alertes" ? (5000 * 20) / 100 + 5000 : (2000 * 20) / 100 + 2000).toFixed(2)}{" "}
                                  €
                                </div>
                              </div>
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
                            <span>Card</span>
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
                          <Checkbox
                            style={{
                              height: "16px",
                              width: "16px",
                              color: "#8C1244",
                            }}
                            checked={madatCheck}
                            onChange={(e) => {
                              setMadatCheck(e.target.checked);
                            }}
                          />
                        </div>
                      </div>
                      {/* exports */}
                      {madatCheck && (
                        <div
                          style={{
                            color: "#FF8616",
                            fontSize: 13,
                            marginTop: 20,
                          }}
                        >
                          <span style={{ cursor: "pointer" }} onClick={generateQuote}>
                            Générer un devis
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span style={{ cursor: "pointer" }} onClick={generateInvoice}>
                            Voir la facture
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
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
                      history.push("/auth/login");
                    }}
                  >
                    proche
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
                    Suivant
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
