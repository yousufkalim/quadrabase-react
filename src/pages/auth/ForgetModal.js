// init
import React, { useState } from "react";

// component
import TextInput from "../../components/TextInput";

// Forget Password Modal
const ForgetPasswordModal = ({
  handleOpenModal,
  translate,
  email,
  setEmail,
}) => {
  // jsx
  return (
    <form style={{ marginBottom: 10 }}>
      <br />
      <TextInput
        id="email"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder={translate("Email")}
        label="Email"
        translate={translate}
      />
    </form>
  );
};

export default ForgetPasswordModal;
