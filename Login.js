import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = ({ setToken }) => {
  const [authToken, setAuthToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', authToken);
    setToken(authToken);
    navigate('/devices');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Device Dashboard
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Authorization Token"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;