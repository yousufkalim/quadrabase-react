// init
import React, { useState } from 'react';
import api from '../../../api';
import { toast } from 'react-toastify';

// component
import TextInput from '../../../components/TextInput';
import { Button } from '@mui/material';

// input styling
const InputStyle = {
  borderColor: '#8C1244',
  marginTop: 5,
  marginBottom: 15,
  backgroundColor: 'transparent',
  height: 50,
  borderRadius: 10
};

// Forget Password Modal
const ForgetPasswordModal = ({ handleOpenModal }) => {
  // States
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // onSubmit
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        email: email
      };
      const result = await api('post', `/Architects/forgotPassword`, data);
      toast.success(result.data.message);
      handleOpenModal();
    } catch (err) {
      setLoading(false);
    }
  };

  // jsx
  return (
    <form onSubmit={onSubmit} style={{ width: 350, marginTop: -10 }}>
      <br />
      <TextInput
        name="email"
        label="Email"
        type="email"
        required={true}
        value={email}
        onChange={e => setEmail(e.target.value)}
        labelColor="#8C1244"
        placeholder="abc@xyz.com"
        labelFont={18}
        style={InputStyle}
      />
      <div style={{ width: '104.5%', textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight: 20,
            backgroundColor: !loading ? '#8C1244' : 'lightgray'
          }}
          type="submit"
          disabled={loading}>
          ENVOYER
        </Button>
      </div>
    </form>
  );
};

export default ForgetPasswordModal;
