import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOptionChain } from '../slices/optionChainSlice';
import { Container, Row, Col, Card, Table, Spinner, Alert, Badge } from 'react-bootstrap';


const OptionChain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const optionChainState = useSelector((state) => state.optionChainSlice);

  useEffect(() => {
    console.log('Dispatching fetchOptionChain action');
    dispatch(fetchOptionChain());
  }, [dispatch]);

  useEffect(() => {
    console.log('Option chain state:', optionChainState);
  }, [optionChainState]);

  if (!optionChainState) {
    return <Alert variant="info">Loading...</Alert>;
  }

  const { data, loading, error } = optionChainState;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return <Alert variant="info">No data available</Alert>;
  }

  const optionChainData = data.data;
  const generalInfo = optionChainData[0] || {};

  const handleStrikePriceClick = (strikePrice) => {
    navigate(`/historical-data/${strikePrice}`);
  };

  const renderOptionRow = (option) => {
    const { strike_price, call_options, put_options } = option;

    return (
      <tr key={strike_price}>
        <td>{renderOptionData(call_options.market_data.oi)}</td>
        <td>{renderOptionData(call_options.market_data.volume)}</td>
        <td>{renderOptionData(call_options.market_data.ltp)}</td>
        <td className="greeks">
          <div>{renderOptionData(call_options.option_greeks.delta)}</div>
          <div>{renderOptionData(call_options.option_greeks.gamma)}</div>
          <div>{renderOptionData(call_options.option_greeks.theta)}</div>
          <div>{renderOptionData(call_options.option_greeks.vega)}</div>
        </td>
        <td 
          className="strike-price" 
          onClick={() => handleStrikePriceClick(strike_price)}
          style={{ cursor: 'pointer' }}
        >
          {strike_price}
        </td>
        <td className="greeks">
          <div>{renderOptionData(put_options.option_greeks.delta)}</div>
          <div>{renderOptionData(put_options.option_greeks.gamma)}</div>
          <div>{renderOptionData(put_options.option_greeks.theta)}</div>
          <div>{renderOptionData(put_options.option_greeks.vega)}</div>
        </td>
        <td>{renderOptionData(put_options.market_data.ltp)}</td>
        <td>{renderOptionData(put_options.market_data.volume)}</td>
        <td>{renderOptionData(put_options.market_data.oi)}</td>
      </tr>
    );
  };

  const renderOptionData = (value) => {
    return value !== undefined ? value.toFixed(2) : '-';
  };

  return (
    <Container fluid className="p-0">
      <Container>
        <Card className="mb-3">
          <Card.Body>
            <Row>
              <Col md={4}>
                <h5>{generalInfo.underlying_key || 'N/A'} Option Chain</h5>
                <p>Spot Price: <Badge bg="primary">{generalInfo.underlying_spot_price || 'N/A'}</Badge></p>
              </Col>
              <Col md={4}>
                <p>Expiry: <Badge bg="info">{generalInfo.expiry || 'N/A'}</Badge></p>
                <p>PCR: <Badge bg="secondary">{generalInfo.pcr || 'N/A'}</Badge></p>
              </Col>
              <Col md={4}>
                {/* Add any additional information or controls here */}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th colSpan="4">CALL</th>
                    <th rowSpan="2">Strike Price</th>
                    <th colSpan="4">PUT</th>
                  </tr>
                  <tr>
                    <th>OI</th>
                    <th>Volume</th>
                    <th>LTP</th>
                    <th>Greeks</th>
                    <th>Greeks</th>
                    <th>LTP</th>
                    <th>Volume</th>
                    <th>OI</th>
                  </tr>
                </thead>
                <tbody>
                  {optionChainData.map(renderOptionRow)}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default OptionChain;