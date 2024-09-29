import React, { useState, useEffect } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InvalidPathAlert() {
  const [countdown, setCountdown] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/indexdashboard');
    }
  }, [countdown, navigate]);

  return (
    <Alert variant="warning" className="mx-auto mt-4" style={{ maxWidth: '500px' }}>
      <Alert.Heading>Page Not found</Alert.Heading>
      <p>The page you're trying to access doesn't exist.</p>
      <div className="d-flex align-items-center mb-3">
        <Spinner animation="border" size="sm" className="me-2" />
        <span>Redirecting to Dashboard in {countdown} seconds...</span>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </Alert>
  );
}

export default InvalidPathAlert;