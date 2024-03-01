import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
   function IsAllowed() {
    const token = localStorage.getItem('token');
    return !!token; //return the bool for token presence
}
  return (
    <div>
      {
        IsAllowed() ? <Component {...rest} /> : <Navigate to="/404" />
      }
    </div>
  );
};
 
export default ProtectedRoute;
