// import React from 'react';
// import { Container, Row, Col, Nav, Navbar, Form, Button, Table, Badge, InputGroup, Dropdown } from 'react-bootstrap';
// // import { Bell, ChevronLeft, ChevronRight, Copy, Heart, LayoutDashboard, Menu, Package, Settings, Star, X } from 'react-icons/fa';

// export default function ConnectBroker() {
//   return (
//     <div className="min-vh-100 bg-light">
//       {/* Sidebar */}
//       <Navbar bg="white" className="flex-column align-items-start p-4 border-end" style={{width: '250px', position: 'fixed', height: '100vh'}}>
//         <Navbar.Brand href="#home" className="mb-4">
//           <img src="/placeholder.svg?height=40&width=120" alt="1Cliq Logo" width={120} height={40} />
//         </Navbar.Brand>
//         <Nav className="flex-column w-100">
//           <Nav.Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 text-danger bg-danger bg-opacity-10 rounded">
//             {/* <Package size={20} /> */}
//             <span>Brokers</span>
//           </Nav.Link>
//           <Nav.Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 text-secondary">
//             {/* <LayoutDashboard size={20} /> */}
//             <span>1Cliq Plans</span>
//           </Nav.Link>
//           <Nav.Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 text-secondary">
//             {/* <Settings size={20} /> */}
//             <span>Ditto Setting</span>
//           </Nav.Link>
//           <Nav.Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 text-secondary">
//             {/* <Star size={20} /> */}
//             <span>Favourite setting</span>
//           </Nav.Link>
//         </Nav>
//       </Navbar>

//       {/* Main Content */}
//       <Container fluid className="ms-auto p-4" style={{marginLeft: '250px'}}>
//         {/* Header */}
//         <Row className="mb-4 align-items-center">
//           <Col>
//             <InputGroup>
//               <Button variant="outline-secondary">
//                 {/* <Menu size={16} /> */}
//               </Button>
//               <Form.Control type="search" placeholder="Search..." />
//             </InputGroup>
//           </Col>
//           <Col xs="auto">
//             <Button variant="outline-secondary" className="me-2">
//               {/* <Bell size={16} className="me-2" /> */}
//               DIWALI DHAMAKA OFFERS
//               <Badge bg="danger" className="ms-2">3</Badge>
//             </Button>
//             <Button variant="outline-secondary">
//               <img src="/placeholder.svg?height=32&width=32" alt="Profile" width={32} height={32} className="rounded-circle" />
//             </Button>
//           </Col>
//         </Row>

//         {/* Broker Management */}
//         <div className="bg-white rounded shadow p-4 mb-4">
//           <div className="d-flex justify-content-between mb-3">
//             <div>
//               <Button variant="danger" className="me-2">ADD BROKER</Button>
//               <Button variant="outline-secondary">REFRESH</Button>
//             </div>
//             <Button variant="danger">OPEN 1CLIQ WINDOW</Button>
//           </div>

//           <Table responsive>
//             <thead>
//               <tr>
//                 <th>Broker</th>
//                 <th>Broker ID</th>
//                 <th>Name Tag</th>
//                 <th>App ID</th>
//                 <th>App Secrect Key</th>
//                 <th>Status</th>
//                 <th>Last Token Generated At</th>
//                 <th>Generate Token</th>
//                 <th>Action</th>
//                 <th>Added At</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Upstox</td>
//                 <td>7M****79</td>
//                 <td>NK</td>
//                 <td>c00********a00</td>
//                 <td>********wqha</td>
//                 <td><Badge bg="success">ACTIVE</Badge></td>
//                 <td>30-10-24, 08:59</td>
//                 <td><Button variant="link" className="text-danger p-0">Click to Generate Token</Button></td>
//                 <td>
//                   {/* <Button variant="light" size="sm" className="me-1"><Copy size={16} /></Button> */}
//                   {/* <Button variant="light" size="sm"><X size={16} /></Button> */}
//                 </td>
//                 <td>24-10-24, 17:23</td>
//               </tr>
//             </tbody>
//           </Table>

//           <div className="d-flex justify-content-between align-items-center mt-3">
//             <div className="d-flex align-items-center">
//               <span className="me-2">Items per page:</span>
//               <Form.Select style={{width: '70px'}}>
//                 <option>10</option>
//                 <option>20</option>
//                 <option>50</option>
//               </Form.Select>
//             </div>
//             <div className="d-flex align-items-center">
//               <span className="me-2">1-1 of 1</span>
//               <Button variant="outline-secondary" size="sm" disabled className="me-1">
//                 {/* <ChevronLeft size={16} /> */}
//               </Button>
//               <Button variant="outline-secondary" size="sm" disabled>
//                 {/* <ChevronRight size={16} /> */}
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Ditto Section */}
//         <div className="bg-white rounded shadow p-4 mb-4">
//           <Row className="align-items-center">
//             <Col md={6}>
//               <h2 className="d-flex align-items-center">
//                 1Cliq Ditto
//                 <span role="img" aria-label="party" className="ms-2">🎉</span>
//               </h2>
//               <p className="text-muted">Trade. Replicate. Succeed.</p>
//               <p className="text-muted">Trading is never gonna be the same again.</p>
//               <Button variant="danger" className="mt-3">SHOW DITTO PLANS</Button>
//             </Col>
//             <Col md={6} className="text-end">
//               <img src="/placeholder.svg?height=200&width=300" alt="Ditto Illustration" style={{maxWidth: '100%', height: 'auto'}} />
//             </Col>
//           </Row>
//         </div>

//         {/* Footer */}
//         <footer className="text-center py-3 text-muted">
//           {/* © 2024 Made With <Heart className="text-danger" size={16} /> */}
//         </footer>
//       </Container>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Badge, Alert } from 'react-bootstrap';

export default function ConnectBroker() {
  const [formData, setFormData] = useState({
    broker: '',
    exchange: 'NSE',
    segment: 'Options',
    symbol: 'NIFTY',
    expiryDate: '31-Oct-2024',
    callStrike: '24300',
    putStrike: '24300',
    quantity: '25',
    productType: 'Margin',
    orderType: 'Market',
    marketProtection: '10',
    positionType: 'F&O positions only'
  });

  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState('');
  const [netQty, setNetQty] = useState(0);
  const [mtm, setMtm] = useState(0.00);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBuyCall = () => {
    if (!formData.broker) {
      setMessage('Please select broker to trade');
      return;
    }
    // Implement buy call logic
    const newPosition = {
      symbolName: `${formData.symbol} ${formData.callStrike} CE`,
      netQty: formData.quantity,
      avgPrice: '24340.85',
      ltp: '24340.85',
      pnl: '0.00'
    };
    setPositions([...positions, newPosition]);
    setMessage('Buy Call order placed successfully');
  };

  const handleSellCall = () => {
    if (!formData.broker) {
      setMessage('Please select broker to trade');
      return;
    }
    // Implement sell call logic
    setMessage('Sell Call order placed successfully');
  };

  const handleClosePositions = () => {
    setPositions([]);
    setMessage('All positions closed');
  };

  const handleCancelOrders = () => {
    setMessage('All orders cancelled');
  };

  return (
    <Container fluid className="p-3">
      {/* Trading Form */}
      <Row className="mb-4">
        <Col>
          <Form>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="text-danger">Broker</Form.Label>
                  <Form.Select 
                    name="broker"
                    value={formData.broker}
                    onChange={handleInputChange}
                  >
                    <option value="">Please select broker to trade</option>
                    <option value="broker1">Broker 1</option>
                    <option value="broker2">Broker 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Exchange</Form.Label>
                  <Form.Select 
                    name="exchange"
                    value={formData.exchange}
                    onChange={handleInputChange}
                  >
                    <option value="NSE">NSE</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Symbol</Form.Label>
                  <Form.Select
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                  >
                    <option value="NIFTY">NIFTY</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Call Strike</Form.Label>
                  <Form.Control
                    type="text"
                    name="callStrike"
                    value={formData.callStrike}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Put Strike</Form.Label>
                  <Form.Control
                    type="text"
                    name="putStrike"
                    value={formData.putStrike}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-2">
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>Market Protection %</Form.Label>
                  <Form.Select
                    name="marketProtection"
                    value={formData.marketProtection}
                    onChange={handleInputChange}
                  >
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Position Type</Form.Label>
                  <Form.Select
                    name="positionType"
                    value={formData.positionType}
                    onChange={handleInputChange}
                  >
                    <option value="F&O positions only">F&O positions only</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Trading Actions */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={handleSellCall}>
              Sell Call
            </Button>
            <Button variant="success" onClick={handleBuyCall}>
              Buy Call
            </Button>
            <Button variant="outline-primary" onClick={handleClosePositions}>
              Close All Positions
            </Button>
            <Button variant="outline-secondary" onClick={handleCancelOrders}>
              Cancel All Orders
            </Button>
          </div>
        </Col>
      </Row>

      {message && (
        <Alert variant={message.includes('Please select') ? 'danger' : 'success'} className="mb-4">
          {message}
        </Alert>
      )}

      {/* Positions Table */}
      <Row>
        <Col>
          <div className="d-flex justify-content-between mb-2">
            <div>Net Qty: {netQty}</div>
            <div>MTM: {mtm.toFixed(2)}</div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Symbol Name</th>
                <th>Net Qty</th>
                <th>Avg Price</th>
                <th>LTP</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {positions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No Rows To Show</td>
                </tr>
              ) : (
                positions.map((position, index) => (
                  <tr key={index}>
                    <td>{position.symbolName}</td>
                    <td>{position.netQty}</td>
                    <td>{position.avgPrice}</td>
                    <td>{position.ltp}</td>
                    <td>{position.pnl}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}