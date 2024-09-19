import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { login } from '../slices/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await dispatch(login({ email, password }));
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container fluid className="h-100 d-flex flex-column">
        <header className="d-flex align-items-center justify-content-between border-bottom py-3 px-4">
          <div className="d-flex align-items-center gap-2">
            <div className="logo-placeholder"></div>
            <h2 className="mb-0 fw-bold">SecureAuth</h2>
          </div>
        </header>
        <Row className="flex-grow-1 justify-content-center align-items-center">
          <Col xs={12} md={6} lg={4}>
            <h1 className="text-center mb-4">Welcome Back</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="custom-input"
                  autoComplete="username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="custom-input"
                  autoComplete="current-password"
                />
              </Form.Group>

              <div className="text-end mb-3">
                <Link to="/forgot-password" className="text-muted text-decoration-underline">Forgot password?</Link>
              </div>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isLoading} 
                  className="custom-button"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : 'Login'}
                </Button>
              </div>
            </Form>
            <p className="text-center text-muted mt-3">Don't have an account?</p>
            <div className="d-grid gap-2">
              <Link to="/signup" className="btn btn-outline-secondary custom-button">Sign up</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
