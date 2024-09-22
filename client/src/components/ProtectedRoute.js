import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuth } from '../slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Add debugging logs
  const authState = useSelector(state => {
    console.log('Redux State in ProtectedRoute:', state);
    return state.authSlice;
  });
  console.log('Auth State in ProtectedRoute:', authState);

  // Provide default values if auth state is undefined
  const { loading = true, isAuthenticated = false } = authState || {};

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;