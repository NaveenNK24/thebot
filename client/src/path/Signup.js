import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { signup } from '../slices/authSlice';
import { FaGoogle, FaCheck } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address');
    } else if (name === 'password') {
      validatePassword(value);
      setShowPasswordValidation(true);
    }
  };

  const onPasswordBlur = () => {
    if (formData.password === '' || isPasswordValid) {
      setShowPasswordValidation(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (Object.values(passwordValidation).some(v => !v)) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(signup(formData)).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Signup failed:', error);
      setIsSubmitting(false);
    }
  };

  const isPasswordValid = Object.values(passwordValidation).every(v => v);

  return (
    <Container fluid className="d-flex flex-column min-vh-100 bg-light">
      {showSuccess && (
        <Alert variant="success" className="mt-3">
          User created successfully! Redirecting to login page...
        </Alert>
      )}
      <Row className="flex-grow-1 justify-content-center align-items-center py-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Create an account</h2>
              <p className="text-muted text-center mb-4">Sign up to get personalized recommendations, save recipes and more.</p>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={onChange}
                    required
                    disabled={isSubmitting}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="youremail@example.com"
                    value={formData.email}
                    onChange={onChange}
                    required
                    disabled={isSubmitting}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={onChange}
                    onBlur={onPasswordBlur}
                    required
                    disabled={isSubmitting}
                    isInvalid={formData.password.length > 0 && !isPasswordValid}
                  />
                  {showPasswordValidation && (
                    <div className="mt-2 small">
                      <div className={passwordValidation.minLength ? 'text-success' : 'text-muted'}>
                        {passwordValidation.minLength && <FaCheck className="me-1" />}
                        At least 8 characters
                      </div>
                      <div className={passwordValidation.hasUpperCase ? 'text-success' : 'text-muted'}>
                        {passwordValidation.hasUpperCase && <FaCheck className="me-1" />}
                        One uppercase letter
                      </div>
                      <div className={passwordValidation.hasLowerCase ? 'text-success' : 'text-muted'}>
                        {passwordValidation.hasLowerCase && <FaCheck className="me-1" />}
                        One lowercase letter
                      </div>
                      <div className={passwordValidation.hasNumber ? 'text-success' : 'text-muted'}>
                        {passwordValidation.hasNumber && <FaCheck className="me-1" />}
                        One number
                      </div>
                      <div className={passwordValidation.hasSpecialChar ? 'text-success' : 'text-muted'}>
                        {passwordValidation.hasSpecialChar && <FaCheck className="me-1" />}
                        One special character
                      </div>
                    </div>
                  )}
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
                    disabled={isSubmitting}
                  />
                </Form.Group>
                <div className="d-grid gap-2 mb-3">
                  <Button variant="primary" type="submit" disabled={isSubmitting || !!emailError || !isPasswordValid}>
                    {isSubmitting ? 'Signing up...' : 'Sign up'}
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
