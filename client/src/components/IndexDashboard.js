import React from 'react';
import { Container, Row, Col, Card, Nav, Navbar, Form, InputGroup, Button } from 'react-bootstrap';
import { Bell, LayoutList, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';

const StockCard = ({ title, value, change, changePercent, chart, onClick }) => (
  <Card className="mb-3" onClick={onClick} style={{ cursor: 'pointer' }}>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="m-0">{title}</h6>
        <Button variant="link" className="p-0">
          <LayoutList size={16} />
        </Button>
      </div>
      {chart}
      <div className="mt-2">
        <h5 className="m-0">{value}</h5>
        <small className={`text-${change >= 0 ? 'success' : 'danger'}`}>
          {change} ({changePercent})
        </small>
      </div>
    </Card.Body>
  </Card>
);

const IndexDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNiftyClick = () => {
    navigate('/option-chain');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login page after logout
  };

  const dummyChart = (
    <svg viewBox="0 0 100 20" className="w-100">
      <path d="M0,10 L10,8 L20,12 L30,7 L40,14 L50,9 L60,15 L70,11 L80,16 L90,10 L100,13" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"/>
    </svg>
  );

  return (
    <Container fluid className="p-0">
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <div className="bg-primary rounded-circle me-2" style={{width: 30, height: 30}}></div>
            <span className="fw-bold">Groww</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#explore" className="text-success">Explore</Nav.Link>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          </Nav>
          <Form className="d-flex flex-grow-1 mx-4">
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="What are you looking for today?"
                aria-label="Search"
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
          <div className="d-flex align-items-center">
            <Button variant="link" className="me-2">
              <Bell size={20} />
            </Button>
            <Button variant="link" className="me-2">
              <LayoutList size={20} />
            </Button>
            <Button variant="link" className="me-2">
              <ShoppingCart size={20} />
            </Button>
            <div className="bg-secondary rounded-circle me-2" style={{width: 32, height: 32}}></div>
            <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
          </div>
        </Container>
      </Navbar>

      <Container>
        <Nav variant="underline" defaultActiveKey="/f&o" className="mb-3">
          <Nav.Item>
            <Nav.Link href="/stocks">Stocks</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/f&o">F&O</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/mutual-funds">Mutual Funds</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/gold">Gold</Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Indices</h5>
          {/* <a href="#" className="text-success text-decoration-none">All indices</a> */}
        </div>

        <Row>
          <Col md={4}>
            <StockCard 
              title="NIFTY" 
              value="25,412.75" 
              change="35.20" 
              changePercent="+0.14%" 
              chart={dummyChart}
              onClick={handleNiftyClick}
            />
          </Col>
          <Col md={4}>
            <StockCard 
              title="BANKNIFTY" 
              value="53,017.80" 
              change="267.40" 
              changePercent="+0.51%" 
              chart={dummyChart}
            />
          </Col>
          <Col md={4}>
            <StockCard 
              title="SENSEX" 
              value="83,171.59" 
              change="223.36" 
              changePercent="+0.27%" 
              chart={dummyChart}
            />
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <StockCard 
              title="FINNIFTY" 
              value="24,393.10" 
              change="66.20" 
              changePercent="+0.27%" 
              chart={dummyChart}
            />
          </Col>
          <Col md={4}>
            <StockCard 
              title="MIDCPNIFTY" 
              value="13,098.40" 
              change="-34.45" 
              changePercent="-0.26%" 
              chart={dummyChart}
            />
          </Col>
          <Col md={4}>
            <StockCard 
              title="BANKEX" 
              value="60,062.94" 
              change="247.58" 
              changePercent="+0.41%" 
              chart={dummyChart}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default IndexDashboard;