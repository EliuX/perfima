'use client';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ApiServices, LocalStorageItem } from '../../config';
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(ApiServices.LOGIN, {
        email,
        password,
      });

      const token = response.data.access_token;

      setJwtToken(token);
      localStorage.setItem(LocalStorageItem.JWT_TOKEN, token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Login failed.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    if(!jwtToken) {
      const existingJwtToken = localStorage.getItem(LocalStorageItem.JWT_TOKEN);
      if (existingJwtToken) {
        setJwtToken(existingJwtToken);
      }
    }

    if (jwtToken) {
      router.push("/dashboard");
    }

    setLoading(false);
  }, [router, jwtToken, setLoading]);

  return (
    <Container maxWidth="lg">
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
          <Typography component="h1" variant="h3">
            Perfima - Sign in
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email" // Key for browser caching (username)
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password" // Key for browser caching (password)
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
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
            {loading && (
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
              )
            }
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
