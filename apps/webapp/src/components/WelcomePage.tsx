import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Perfima
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Your Personal Finance Management App
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/signin')}
      >
        Sign In
      </Button>
    </Box>
  );
};
