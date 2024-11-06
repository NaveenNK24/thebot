import React from 'react';
import { Container, Row, Col, Nav, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const brokers = [
  { name: 'Upstox', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'A.C. Agrawal Shares', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'Alice Blue', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0/1' },
  // { name: 'AngelOne', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'Bigul', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'Choice', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'Dhan', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0/1' },
  // { name: 'Firstock', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'FlatTrade', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'Fyers', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'IIFL', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
  // { name: 'JM Financial', logo: '/placeholder.svg?height=50&width=50', nse: true, bse: true, apiSetup: '0' },
];

function BrokerageConnect() {
  const navigate = useNavigate();

  const handleBrokerSetup = (brokerName) => {
    if (brokerName === 'Upstox') {
      navigate('/upstoxlogin');
    }
    // Add conditions for other brokers if needed
  };

  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <Nav variant="tabs" defaultActiveKey="all">
            <Nav.Item>
              <Nav.Link eventKey="all">All Brokers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="my">My Brokers (0)</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="text-end">
          <Badge bg="success" className="me-2">1 Login on each Broker is FREE</Badge>
          <Button variant="outline-primary">Get Multi-API Plan</Button>
        </Col>
      </Row>
      <Row>
        {brokers.map((broker, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img src={broker.logo} alt={broker.name} className="me-2" style={{width: '50px', height: '50px'}} />
                  <h5 className="mb-0">{broker.name}</h5>
                </div>
                <div className="mb-2">
                  {broker.nse && <Badge bg="primary" className="me-1">NSE</Badge>}
                  {broker.bse && <Badge bg="info">BSE</Badge>}
                </div>
                <p className="mb-2">APIs setup: {broker.apiSetup}</p>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => handleBrokerSetup(broker.name)}
                >
                  Setup
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BrokerageConnect;