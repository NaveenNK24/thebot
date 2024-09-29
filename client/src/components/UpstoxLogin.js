import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Form, InputGroup, ListGroup, Alert, Spinner } from 'react-bootstrap';
import { Eye, EyeSlash, Clipboard } from 'react-bootstrap-icons';
import { checkConnectionStatus, connectUpstox, disconnectUpstox } from '../slices/upstoxConnection';
// import { reauthorizeUpstox:login } from '../slices/upstoxAuthSlice'; // Add this import
import { login,logout } from '../slices/upstoxAuthSlice';


export default function UpstoxLogin() {
  const dispatch = useDispatch();
  const upstoxState = useSelector(state => state.upstoxConnection);
  const upstoxAuthState = useSelector(state => state.upstoxAuthSlice);
  console.log('upstoxAuthState:', upstoxAuthState);
  
  // Add this console.log to debug the state
  console.log('Upstox state:', upstoxState);

  const { isConnected = false, error = null, loading = false, connectionName: savedConnectionName = '' } = upstoxState || {};

  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [connectionName, setConnectionName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [upstoxToken, setUpstoxToken] = useState('');

  useEffect(() => {
    dispatch(checkConnectionStatus());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(connectUpstox({ connectionName, apiKey, apiSecret }));
  };

  const handleDisconnect = () => {
    dispatch(disconnectUpstox());
    dispatch(logout());
  };

  const toggleVisibility = (setter) => () => setter((prev) => !prev);
  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  // Add this function to handle reauthorization
  const handleReauthorize = () => {
    dispatch(login());
  };

  if (loading) {
    return (
      <Card className="w-100 mx-auto" style={{ maxWidth: '48rem' }}>
        <Card.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Card.Body>
      </Card>
    );
  }

  if (isConnected) {
    if (upstoxAuthState.isAuthenticated) {
      return (
        <Card className="w-100 mx-auto" style={{ maxWidth: '48rem' }}>
          <Card.Body>
            <Alert variant="success">
              Your Upstox account is connected and authorized with the connection name: {savedConnectionName}.
            </Alert>
            <Button variant="danger" onClick={handleDisconnect} className="w-100 mt-3">
              Disconnect Upstox
            </Button>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className="w-100 mx-auto" style={{ maxWidth: '48rem' }}>
          <Card.Body>
            <Alert variant="warning">
              Your Upstox account is connected but not authorized. Please reauthorize to generate a new token.
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label>Upstox Token:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your Upstox token" 
                value={upstoxToken}
                onChange={(e) => setUpstoxToken(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handleReauthorize} className="w-100 mt-3">
              Reauthorize Upstox
            </Button>
            <Button variant="danger" onClick={handleDisconnect} className="w-100 mt-3">
              Disconnect Upstox
            </Button>
          </Card.Body>
        </Card>
      );
    }
  }

  // If not connected, show the form to connect Upstox
  return (
    <Card className="w-100 mx-auto" style={{ maxWidth: '48rem' }}>
      <Card.Header>
        <Card.Title as="h2">Setup Upstox</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Connection Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Name this API connection" 
              value={connectionName}
              onChange={(e) => setConnectionName(e.target.value)}
              required
            />
          </Form.Group>

          <ListGroup as="ol" numbered className="mb-3">
            <ListGroup.Item>
              Please to go to{" "}
              <a href="https://login.upstox.com" className="text-blue-600 hover:underline">
                login.upstox.com
              </a>{" "}
              and login to your account.
            </ListGroup.Item>
            <ListGroup.Item>
              Go to "My Account" section, choose the App tab, then click on New App
              <ListGroup.Item>
                <ListGroup.Item>Enter any App Name.</ListGroup.Item>
                <ListGroup.Item className="mt-2">
                  When creating the app, Copy and paste this url as your Redirect URL:
                  <InputGroup className="mt-2 bg-gray-100 p-2 rounded">
                    <InputGroup.Text className="flex-grow">http://localhost:5005/api/upstox/code</InputGroup.Text>
                    <Button variant="outline-secondary" size="icon" onClick={() => copyToClipboard("http://localhost:5005/api/upstox/code")}>
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </InputGroup>
                </ListGroup.Item>
              </ListGroup.Item>
            </ListGroup.Item>
            <ListGroup.Item>Click on App Details. Copy your API Key and Secret, and paste them below.</ListGroup.Item>
          </ListGroup>

          <Form.Group className="mb-3">
            <Form.Label>API key:</Form.Label>
            <InputGroup>
              <Form.Control 
                type={showApiKey ? "text" : "password"} 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
              />
              <Button variant="outline-secondary" onClick={toggleVisibility(setShowApiKey)}>
                {showApiKey ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>API Secret:</Form.Label>
            <InputGroup>
              <Form.Control 
                type={showApiSecret ? "text" : "password"} 
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                required
              />
              <Button variant="outline-secondary" onClick={toggleVisibility(setShowApiSecret)}>
                {showApiSecret ? <EyeSlash /> : <Eye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Add Upstox
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}