import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './Login';
import DeviceDashboard from './DeviceDashboard';

const theme = createTheme();

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/devices" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/devices"
            element={token ? <DeviceDashboard token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/devices" : "/login"} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;