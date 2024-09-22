import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuth } from '../slices/authSlice';
import { Alert, Spinner , ProgressBar, Button} from 'react-bootstrap';


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [redirectNow, setRedirectNow] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const authState = useSelector(state => state.authSlice);
  const { loading = false, isAuthenticated = false } = authState || {};

  useEffect(() => {
    if (!isChecked) {
      dispatch(checkAuth()).then(() => setIsChecked(true));
    }
  }, [dispatch, isChecked]);

  useEffect(() => {
    if (showAlert) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            setShowAlert(false);
            setRedirectNow(true);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showAlert]);

  if (!isChecked) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    if (!showAlert && !redirectNow) {
      setShowAlert(true);
    }

    if (redirectNow) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
      <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible className="mx-auto mt-4" style={{ maxWidth: '500px' }}>
        <Alert.Heading>Authentication Required</Alert.Heading>
        <p>You need to be logged in to access this page.</p>
        <div className="d-flex align-items-center mb-3">
          <Spinner animation="border" size="sm" className="me-2" />
          <span>Redirecting to login page in {countdown} seconds...</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <Button variant="primary">
            Login Now
          </Button>
          <Button variant="outline-secondary" onClick={() => setShowAlert(false)}>
            Dismiss
          </Button>
        </div>
      </Alert>
    );
  }

  return children;
};

export default ProtectedRoute;