import * as React from 'react';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Link from '@mui/material/Link';
import { DashboardPage, SignInPage, WelcomePage } from './components';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://perfima.com/">
        Perfima (c) 2024
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}
