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
import InputDropdown from "../../components/Architect/InputDropdown";
import BasicDropdown from "../../components/Architect/BasicDropdown";

// input styling
const InputStyle = {
  borderColor: "#8C1244",
  marginTop: 5,
  backgroundColor: "transparent",
  height: 50,
  borderRadius: 10,
};

const steps = [
  "Informations générales",
  "Informations de connexion",
  "Formule d'abonnement",
  "Paiement",
];

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
      count: 1,
      price: 500,
    },
  });

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
  const handleFinish = async (e) => {
    e.preventDefault();
    // to creating account
    let data = {};
    if (type === "Prescripteur") {
      data = {
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
          subscriptionDuration:
            (parseInt(subAmounts.initial.count) +
              parseInt(subAmounts.extended.count)) *
            12,
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
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Subscription",
              },
              unit_amount:
                parseInt(
                  fabricantSub === "Alertes"
                    ? (5000 * 20) / 100 + 5000
                    : (2000 * 20) / 100 + 2000
                ) * 100,
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
          subscriptionEndDate: moment(new Date())
            .add(1, "years")
            .format("YYYY/MM/DD"),
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
          tvaAmount:
            fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100,
          TotalCost:
            fabricantSub === "Alertes"
              ? (5000 * 20) / 100 + 5000
              : (2000 * 20) / 100 + 2000,
          paymentMode: "Card",
        },
      };
    }

    const res = await api("post", `/licenses/checkout`, data);
    window.location = res.data.url;
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
      const result = await api(
        "post",
        `/Architects/quote/download`,
        invoiceData
      );
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
        tvaAmount:
          fabricantSub === "Alertes" ? (5000 * 20) / 100 : (2000 * 20) / 100,
        TotalCost:
          fabricantSub === "Alertes"
            ? (5000 * 20) / 100 + 5000
            : (2000 * 20) / 100 + 2000,
        paymentMode: "Card",
      };
      const result = await api(
        "post",
        `/Providers/quote/download`,
        invoiceData
      );
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

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
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
    <div className="register-conatainer">
      <div className="register-left-container">
        <img
          src={logo}
          alt="QBSoft"
          className="logo-qb"
          onClick={() => history.push("/auth/home")}
        />
        <img src={Vector} alt="QBSoft" className="vector" />
      </div>
      <div className="register-right-container">
        <div className="register-form-container">
          <Box sx={{ width: "80%" }}>
            <Stepper
              activeStep={activeStep}
              handleStep={handleStep}
              completed={completed}
            />
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Toutes les étapes terminées -{" "}
                  <a href={invoiceUrl} target="_blank">
                    Voir la facture
                  </a>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={() => history.push("/")}>
                    Procéder à la connexion
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {activeStep === 0 ? (
                    <form>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Name of Establishment *"
                            placeholder="xyz"
                            type="text"
                            name="establishment"
                            value={form1.values.establishment}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.establishment ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.establishment}
                              </div>
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
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.service ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.service}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Address 1 *"
                            placeholder="xyz, Paris"
                            type="text"
                            name="address_1"
                            value={form1.values.address_1}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.address_1 ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.address_1}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Address 2"
                            placeholder="xyz, Paris"
                            type="text"
                            name="address_2"
                            value={form1.values.address_2}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="PO Box *"
                            placeholder="xyz, Paris"
                            type="text"
                            name="po_box"
                            value={form1.values.po_box}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.po_box ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.po_box}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Postal Code *"
                            placeholder="54500"
                            type="text"
                            name="postal_code"
                            value={form1.values.postal_code}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.postal_code ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.postal_code}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="City *"
                            placeholder="xyz, Paris"
                            type="text"
                            name="city"
                            value={form1.values.city}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.city ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.city}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Phone Number *"
                            placeholder="0900929008"
                            type="number"
                            name="phone"
                            value={form1.values.phone}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form1.touched.phone ? (
                              <div style={{ fontSize: 12 }}>
                                {form1.errors.phone}
                              </div>
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
                          Next
                        </Button>
                      </div>
                    </form>
                  ) : activeStep === 1 ? (
                    <form>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="First Name *"
                            placeholder="Claude"
                            type="text"
                            name="first_name"
                            value={form2.values.first_name}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form2.touched.first_name ? (
                              <div style={{ fontSize: 12 }}>
                                {form2.errors.first_name}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Last Name *"
                            placeholder="Dubois"
                            type="text"
                            name="last_name"
                            value={form2.values.last_name}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form2.touched.last_name ? (
                              <div style={{ fontSize: 12 }}>
                                {form2.errors.last_name}
                              </div>
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
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
                            required={true}
                            labelColor="#8C1244"
                            labelFont={18}
                            style={InputStyle}
                          />
                          <div className="text-red-600 ">
                            {form2.touched.email ? (
                              <div style={{ fontSize: 12 }}>
                                {form2.errors.email}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form2.values.password}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
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
                          <div
                            className="text-red-600 "
                            style={{ marginTop: -22 }}
                          >
                            {form2.touched.password ? (
                              <div style={{ fontSize: 12 }}>
                                {form2.errors.password}
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item xs={6} sx={{ marginBottom: 2 }}>
                          <TextInput
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            value={form2.values.confirm_password}
                            onChange={(e) =>
                              handleChange(e.target.name, e.target.value)
                            }
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
                          <div
                            className="text-red-600 "
                            style={{ marginTop: -22 }}
                          >
                            {form2.touched.confirm_password ? (
                              <div style={{ fontSize: 12 }}>
                                {form2.errors.confirm_password}
                              </div>
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
                          Back
                        </Button>
                        &nbsp;
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
                          Next
                        </Button>
                      </div>
                    </form>
                  ) : activeStep === 2 ? (
                    <>
                      <div style={{ padding: "0 30px" }}>
                        <strong>Subscription</strong>
                        <div className="subscription-box">
                          <div className="subscription-box-intial">
                            <div className="common-text">
                              <span>Initial subscription for 1 year</span>
                              <br />
                              <small>(1 year, 5 Projects)</small>
                            </div>
                            <BasicDropdown
                              options={options}
                              // disabled={true}
                              value={subAmounts.initial.count}
                              component="register"
                              disabled={true}
                              style={{
                                backgroundColor: "lightgray",
                                borderRadius: 10,
                                height: 45,
                                width: 60,
                                fontSize: 20,
                                fontWeight: 700,
                                padding: 5,
                              }}
                            />
                            <div className="amount-container">
                              <div>Total HT</div>
                              <div>{subAmounts.initial.price.toFixed(2)} €</div>
                            </div>
                          </div>
                          <div className="subscription-box-extend">
                            <div className="common-text">
                              <span>One-year subscription extension</span>
                              <br />
                              <small>
                                (extend you subscription for one year)
                              </small>
                            </div>
                            <BasicDropdown
                              options={options}
                              // disabled={true}
                              value={subAmounts.initial.count}
                              component="register"
                              style={{
                                backgroundColor: "#F5F5F5",
                                borderRadius: 10,
                                height: 45,
                                width: 60,
                                fontSize: 20,
                                fontWeight: 700,
                                padding: 5,
                              }}
                            />
                            <div className="amount-container">
                              <div>Total HT</div>
                              <div>
                                {" "}
                                {(
                                  subAmounts.extended.count *
                                  subAmounts.extended.price
                                ).toFixed(2)}{" "}
                                € €
                              </div>
                            </div>
                          </div>
                        </div>
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
                            Back
                          </Button>
                          &nbsp;
                          <Button
                            variant="contained"
                            style={{
                              textTransform: "none",
                              backgroundColor: "#8C1244",
                              borderRadius: 8,
                            }}
                            onClick={() => handleComplete()}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>d</>
                  )}
                </Typography>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
