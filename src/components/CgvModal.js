import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import api from '../api';

const CctpModal = ({ handleOpenCgvModal }) => {
  const { t } = useTranslation();
  const [data, setData] = useState('');

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () => {
    const result = await api('get', `/StaticPages/`);
    setData(result.data.data.cgv);
  };
  return (
    <div style={{ width: '45vw', height: '80vh', overflow: 'hidden' }}>
      <div
        id="Alltables"
        style={{
          fontSize: 18,
          border: '1px solid lightgray',
          padding: 15,
          height: '90%',
          overflowX: 'hidden',
          overflowY: 'scroll'
        }}
        dangerouslySetInnerHTML={{
          __html: data
        }}></div>
      <br />
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#8C1244',
            marginRight: '10px !important',
            height: '35px !important'
          }}
          onClick={handleOpenCgvModal}>
          {t('Close')}
        </Button>
      </div>
    </div>
  );
};

export default CctpModal;
