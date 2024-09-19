import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, Card, InputGroup, Spinner } from 'react-bootstrap';
import { login } from '../slices/authSlice';
import { Envelope, Lock, BoxArrowInRight } from 'react-bootstrap-icons';

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
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Card className="shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <BoxArrowInRight size={30} color="white" />
            </div>
            <h2 className="mt-3 mb-0 fw-bold">Login</h2>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text><Envelope /></InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text><Lock /></InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </InputGroup>
            </Form.Group>

            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : 'Login'}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <p className="text-muted mb-0">Don't have an account?</p>
            <Link to="/signup" className="btn btn-link">Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
