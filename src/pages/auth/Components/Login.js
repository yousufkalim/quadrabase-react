//init
import React, { useState } from "react";
import InputWithLabel from "../../../components/Architect/InputWithLabel";
import { Typography } from "@mui/material";
import { UpdateStore } from "../../../StoreContext";
import { onSubmit } from "../../../utils/onLogin";
import { useStyles } from "../../../css/login";
import ForgetPasswordModal from "./ForgetPasswordModal";
import Modal from "../../../components/Architect/Modal";

// Login component
const Login = ({ history }) => {
  // intializing useStyle object
  const classes = useStyles();
  // getting update store function from update store context
  const updateStore = UpdateStore();

  // All the required states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(!openModal);

  // returning jsx
  return (
    // main conatiner
    <div className={classes.container}>
      <Modal
        title="Mot de passe oublié"
        open={openModal}
        onClose={handleOpenModal}
        component={<ForgetPasswordModal handleOpenModal={handleOpenModal} />}
      />
      {/* Login form */}
      <form
        onSubmit={(e) => onSubmit(e, email, password, updateStore, history)}
        className={classes.form}
      >
        {/* main Heading */}
        <Typography variant="h2" gutterBottom>
          Connexion
        </Typography>
        {/* All fields */}
        <InputWithLabel
          value={email}
          label="Email"
          required={true}
          name="email"
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <InputWithLabel
          value={password}
          label="Mot de passe"
          required={true}
          name="password"
          type="password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setOpenModal(true)}
          >
            Mot de passe oublié?
          </span>
        </div>
        {/* add new fields here */}
        {/* login button */}
        <button type="submit" className={classes.btn}>
          Connexion
        </button>
      </form>
    </div>
  );
};

// export
export default Login;
