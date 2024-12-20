'use client';

import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { LocalStorageItem } from '@/config';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageItem.JWT_TOKEN);
    if (!token) {
      router.push('/sign-in');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageItem.JWT_TOKEN);
    router.push('/sign-in');
  };

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
        Welcome to Your Dashboard
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Manage your finances with ease.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
