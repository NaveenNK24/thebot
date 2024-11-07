import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Badge, Alert } from 'react-bootstrap';
// import './ConnectBroker.css'; // Import custom CSS for additional styling

export default function ConnectBroker() {
  const [formData, setFormData] = useState({
    broker: '',
    exchange: 'NSE',
    segment: 'Options',
    symbol: ['NIFTY', 'BANKEX'],
    expiryDate: '07-Nov-2024',
    callStrike: '24450',
    putStrike: '24300',
    quantity: '50',
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
                    <option value="BANKEX">BANKEX</option>
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