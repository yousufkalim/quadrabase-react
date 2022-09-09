import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

const Loader = ({ text }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <CircularProgress style={{ color: '#f2a17b' }} />
      <h4 style={{ marginTop: 10 }}>{text || t('Please Wait, Loading Project Data!')}</h4>
    </Box>
  );
};

export default Loader;
