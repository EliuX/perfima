'use client';

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Container } from '@mui/material';
import { router } from 'next/client';

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
      <Typography variant="h3" gutterBottom>
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
    </Container>
    // <Container maxWidth="lg">
    //   <Box
    //     sx={{
    //       my: 4,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
    //       Material UI - Next.js App Router example in TypeScript
    //     </Typography>
    //     <Link href="/about" color="secondary" component={NextLink}>
    //       Go to the about page
    //     </Link>
    //     <Copyright />
    //   </Box>
    // </Container>
  );
}
