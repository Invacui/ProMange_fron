import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token) {
    // Check if the token is expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    isAuthenticated = decodedToken.exp >= currentTime;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/404" />;
};

export default ProtectedRoute;
