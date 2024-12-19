'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import Link from 'next/link';
import Copyright from '@/components/Copyright';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
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
      <Typography variant="h1" gutterBottom sx={{ mb: 2 }}>
        Welcome to Perfima
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Your Personal Finance Management App
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/sign-in')}
      >
        Sign In
      </Button>
    </Box>
    <Copyright />
    </Container>
  );
}
