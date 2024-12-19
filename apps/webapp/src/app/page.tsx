'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import NextLink from 'next/link';
import Link from 'next/link';
import Copyright from '@/components/Copyright';

export default function Home() {
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
      <Link href="/sign-in" color="primary" component={NextLink}>
        Sign In
      </Link>
    </Box>
    <Copyright />
    </Container>
  );
}
