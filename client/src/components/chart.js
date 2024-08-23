import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../slices/chartSlice';
import { createChart } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ChartComponent1 = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const { data, loading, error } = useSelector((state) => state.chart);

  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const smaSeriesRef = useRef(null);

  const [showSMA, setShowSMA] = useState(true);
  const [smaPeriod, setSmaPeriod] = useState(10); // Default SMA period

  useEffect(() => {
    if (symbol && smaPeriod) dispatch(fetchData({ symbol, smaPeriod })); // Pass SMA period to fetchData
  }, [dispatch, symbol, smaPeriod]);

  useEffect(() => {
    if (!data.length) return;

    // Create chart if not already created
    if (!chartRef.current) {
      const domElement = document.getElementById('tvchart');
      chartRef.current = createChart(domElement, {
        timeScale: { timeVisible: true, secondsVisible: true },
      });

      candleSeriesRef.current = chartRef.current.addCandlestickSeries();
    }

    candleSeriesRef.current.setData(data);

    // Remove SMA series if it exists
    if (smaSeriesRef.current) {
      chartRef.current.removeSeries(smaSeriesRef.current);
      smaSeriesRef.current = null;
    }

    // Add SMA series if showSMA is true and data is valid
    if (showSMA && data.length) {
      smaSeriesRef.current = chartRef.current.addLineSeries({ color: 'red', lineWidth: 1 });
      const smaData = data.filter(d => d.sma).map(d => ({ time: d.time, value: d.sma }));
      smaSeriesRef.current.setData(smaData);
    }

  }, [data, showSMA]);

  const toggleSMA = () => setShowSMA(prev => !prev);

  const handlePeriodChange = (e) => {
    setSmaPeriod(Number(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={toggleSMA}>
        {showSMA ? 'Hide SMA' : 'Show SMA'}
      </button>
      <input
        type="number"
        value={smaPeriod}
        onChange={handlePeriodChange}
        min="1"
        style={{ marginLeft: '10px' }}
      />
      <div id="tvchart" style={{ height: '700px' }}></div>
    </div>
  );
};

export default ChartComponent1;
