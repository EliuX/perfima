import * as React from 'react';
import { useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, CssBaseline, TextField, Typography } from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import axios from 'axios';
import { ApiServices } from '../config';

export function SignInPage(props: { disableCustomTheme?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post(ApiServices.LOGIN, {
        email,
        password,
      });

      const token = response.data.access_token;

      setJwtToken(token);
      localStorage.setItem('jwtToken', token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Login failed.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (jwtToken) {
    return (
      <div>
        <Typography variant="h6">Login Successful!</Typography>
        <Typography>JWT Token: {jwtToken}</Typography>
        <p>You are now logged in.</p>
      </div>
    );
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Perfima - Sign in
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading
              ? (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  disabled={loading}
                >
                  Sign In
                </Button>
              )
            }
          </Box>
        </Box>
      </Container>
    </AppTheme>
  );
}
