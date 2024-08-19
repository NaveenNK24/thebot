import React, { useEffect, useRef } from 'react';
import { fetchData } from '../actions/chartAction.js';
import { createChart } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ChartComponent1 = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams(); 
  const { data, loading, error } = useSelector((state) => state.data);

  // Create a ref to store the chart instance
  const chartRef = useRef(null);

  useEffect(() => {
    if (symbol) {
        dispatch(fetchData(symbol));
    }
  }, [dispatch, symbol]);

  useEffect(() => {
    if (data.length > 0) {
      // Only create the chart if it hasn't been created yet
      if (!chartRef.current) {
        const chartProperties = {
          timeScale: {
            timeVisible: true,
            secondsVisible: true,
          },
        };

        const domElement = document.getElementById('tvchart');
        const chart = createChart(domElement, chartProperties);
        chartRef.current = chart;

        const candleSeries = chart.addCandlestickSeries();
        candleSeries.setData(data);

        const sma_series = chart.addLineSeries({ color: 'red', lineWidth: 1 });
        const sma_data = data
          .filter((d) => d.sma)
          .map((d) => ({ time: d.time, value: d.sma }));
        sma_series.setData(sma_data);
      } else {
        // Update the chart data if the chart already exists
        const candleSeries = chartRef.current.addCandlestickSeries();
        candleSeries.setData(data);

        const sma_series = chartRef.current.addLineSeries({ color: 'red', lineWidth: 1 });
        const sma_data = data
          .filter((d) => d.sma)
          .map((d) => ({ time: d.time, value: d.sma }));
        sma_series.setData(sma_data);
      }
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div id="tvchart" style={{ height: '700px' }}></div>;
};

export default ChartComponent1;
