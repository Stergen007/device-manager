import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import DeviceDashboard from './DeviceDashboard';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Device() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DeviceDashboard />
    </ThemeProvider>
  );
}

export default Device;
