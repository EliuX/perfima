import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4876EE',
    },
    secondary: {
      main: '#00D3AB',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});

const AppTheme: React.FC<{ disableCustomTheme?: boolean, children?: React.ReactNode }> = ({
                                                                                            children,
                                                                                            disableCustomTheme,
                                                                                          }) => {
  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply default Material UI styles */}
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
