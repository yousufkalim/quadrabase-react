// init
import React, { useState } from "react";
import "../../css/Login.css";
import logo from "../../assets/Quadralogo.png";
import Vector from "../../assets/Vector.png";
import TextInput from "../../components/TextInput";
import Button from "@mui/material/Button";
import { UpdateStore } from "../../StoreContext";
import { onSubmit } from "../../utils/onLogin";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Architect/Modal";
import ForgetPasswordModal from "./Components/ForgetPasswordModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

// input styling
const InputStyle = {
  borderColor: "#8C1244",
  marginTop: 5,
  marginBottom: 15,
  backgroundColor: "transparent",
  height: 50,
  borderRadius: 10,
};

// component
const Login = () => {
  // history object
  const history = useHistory();

  // getting update store function from update store context
  const updateStore = UpdateStore();

  // All the required states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

  // jsx
  return (
    <div className="login-conatainer">
      <Modal
        title="Mot de passe oublié"
        open={openModal}
        onClose={handleOpenModal}
        component={<ForgetPasswordModal handleOpenModal={handleOpenModal} />}
      />
      <div className="left-container">
        <img src={logo} alt="QBSoft" className="logo-qb" onClick={() => history.push("/auth/home")} />
        <img src={Vector} alt="QBSoft" className="vector" />
      </div>
      <div className="right-container">
        <div className="form-container">
          <form className="login-form" onSubmit={(e) => onSubmit(e, email, password, updateStore, history)}>
            <TextInput
              label="Email"
              name="email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              labelColor="#8C1244"
              placeholder="abc@xyz.com"
              labelFont={18}
              style={InputStyle}
            />
            <TextInput
              label="Mot de passe"
              name="password"
              type={showPassword ? "text" : "password"}
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelColor="#8C1244"
              placeholder="**********"
              labelFont={18}
              style={InputStyle}
            />
            <div className="forget-pass">
              {!showPassword ? (
                <VisibilityIcon className="eye-icon" onClick={() => setShowPassword(true)} />
              ) : (
                <VisibilityOffIcon className="eye-icon" onClick={() => setShowPassword(false)} />
              )}

              <label
                className={`block tracking-wide text-gray-700 text-xs font-bold mb-2`}
                style={{ cursor: "pointer", marginTop: -25 }}
                onClick={handleOpenModal}
              >
                Mot de passe oublié ?
              </label>
            </div>
            <Button
              variant="contained"
              type="submit"
              style={{
                textTransform: "none",
                backgroundColor: "#8C1244",
                borderRadius: 8,
              }}
            >
              Connexion
            </Button>
          </form>
          <span
            className={`block tracking-wide text-gray-700 text-xs font-bold mb-2`}
            style={{
              color: "#5E5C5F",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "lighter",
              fontSize: 14,
              marginBottom: "2rem",
            }}
          >
            En vous connectant, vous acceptez nos présentes{" "}
            <Link to="/auth/terms" style={{ color: "red" }}>
              <u>Conditions Générales d'Utilisation</u>
            </Link>
            (CGU), de recevoir des e-mails et des mises à jour de QBSoft et vous reconnaissez avoir lu notre{" "}
            <Link to="/auth/privacy" style={{ color: "red" }}>
              <u> Politique de confidentialité</u>
            </Link>
            .
            <br />
            Vous reconnaissez également que QBSoft utilise des cookies pour vous offrir une expérience utilisateur optimale.
          </span>
          <span
            className={`block tracking-wide text-gray-700 text-xs font-bold mb-2`}
            style={{
              color: "#5E5C5F",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "lighter",
              fontSize: 14,
            }}
          >
            Je n'ai pas de compte ?
          </span>
          <span
            className={`block tracking-wide text-gray-700 text-xs font-bold mb-2`}
            style={{
              color: "#8C1244",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
            onClick={() => history.push("/auth/register")}
          >
            S'inscrire maintenant
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
