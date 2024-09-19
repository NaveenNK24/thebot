import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { signup } from '../slices/authSlice';
import { FaGoogle } from 'react-icons/fa';
import './Signup.css';

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
    <div className="min-vh-100 bg-slate-50 d-flex flex-column">
      <Container className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="content-container">
          <h1 className="text-start mb-2">Create an account</h1>
          <p className="text-muted mb-4">Sign up to get personalized recommendations, save recipes and more.</p>
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
                className="custom-input"
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
                className="custom-input"
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
                className="custom-input"
              />
            </Form.Group>
            <div className="d-grid gap-2 mb-3">
              <Button variant="primary" type="submit" className="custom-button">
                Sign up
              </Button>
            </div>
          </Form>
          <p className="text-center text-muted my-3">or</p>
          <div className="d-grid gap-2 mb-3">
            <Button variant="light" className="custom-button google-button">
              <FaGoogle className="me-2" />
              Continue with Google
            </Button>
          </div>
          <p className="text-muted text-center small">
            By creating an account, you agree to our Terms of Service and acknowledge our Privacy Policy.
          </p>
        </div>
      </Container>
      <footer className="text-center pb-4">
        <p className="text-muted mb-1">Already have an account?</p>
        <Link to="/login" className="text-muted text-decoration-underline">Sign in</Link>
      </footer>
    </div>
  );
};

export default Signup;
