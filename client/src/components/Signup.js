import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { signup } from '../slices/authSlice';
import { FaGoogle } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const dispatch = useDispatch();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    dispatch(signup(formData));
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100 bg-light">
      <Row className="flex-grow-1 justify-content-center align-items-center py-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Create an account</h2>
              <p className="text-muted text-center mb-4">Sign up to get personalized recommendations, save recipes and more.</p>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Minimum 8 characters"
                    value={formData.confirmPassword}
                    onChange={onChange}
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-2 mb-3">
                  <Button variant="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </Form>
              <div className="text-center my-3">
                <span className="text-muted">or</span>
              </div>
              <div className="d-grid gap-2 mb-3">
                <Button variant="outline-secondary">
                  <FaGoogle className="me-2" />
                  Continue with Google
                </Button>
              </div>
              <p className="text-muted text-center small">
                By creating an account, you agree to our Terms of Service and acknowledge our Privacy Policy.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <footer className="text-center pb-4">
        <p className="text-muted mb-1">Already have an account?</p>
        <Link to="/login" className="text-muted">Sign in</Link>
      </footer>
    </Container>
  );
};

export default Signup;
