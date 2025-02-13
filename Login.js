// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to backend login endpoint
    window.location.href = 'http://localhost:8080/login';
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Device Management System
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please sign in to access your devices
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={handleLoginClick}
          sx={{ 
            width: 200,
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Sign In
        </Button>
        
        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          You will be redirected to our secure login page
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;