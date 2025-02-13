import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = ({ setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      setToken(token);
      navigate('/devices');
    } else {
      navigate('/login');
    }
  }, [location, navigate, setToken]);

  return <div>Processing login...</div>;
};

export default Callback;