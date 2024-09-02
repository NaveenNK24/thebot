import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../slices/upstoxChartSlice';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import React, { useEffect, useRef, useState } from 'react';

// import { useDispatch, useParams, useSelector, useRef, useState, useEffect } from 'react';

const UpstoxChart = () => {
  const dispatch = useDispatch();
//   const { symbol } = useParams();
  const { data = [], loading, error } = useSelector((state) => state.upstoxChartSlice);

  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  const [showSMA, setShowSMA] = useState(true);
//   const [smaPeriod, setSmaPeriod] = useState(10); // Default SMA period


  useEffect(() => {
    dispatch(fetchData()); 
    console.log("test");
    
  }, [dispatch]);

  useEffect(() => {
    console.log(data);
    if (!data.length) return;
 
    console.log("test nn");

    // Create chart if not already created
    if (!chartRef.current) {
      const domElement = document.getElementById('tvchart');
      chartRef.current = createChart(domElement, {
        timeScale: { 
          timeVisible: true, 
          secondsVisible: true,
          borderVisible: true,  
        },
        grid: {
          vertLines: {
            color: 'transparent',
          },
          horzLines: {
            color: '#f0f3fa',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal, 
          vertLine: {
            width: 1,
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
          horzLine: {
            color: "#9B7DFF",
            labelBackgroundColor: "#9B7DFF",
          },
        },
      });

      candleSeriesRef.current = chartRef.current.addCandlestickSeries();
    }

    candleSeriesRef.current.setData(data);

    // Function to create and plot a line series for any given data
    const plotLineSeries = (color, lineWidth, lineStyle, filterKey, priceLineVisible) => {
      const series = chartRef.current.addLineSeries({ color, lineWidth, lineStyle, priceLineVisible });
      const seriesData = data.filter(d => d[filterKey]).map(d => ({ time: d.time, value: d[filterKey] }));
      series.setData(seriesData);
    };

    // Plot all pivot points, support, and resistance levels
    plotLineSeries('blue', 2, LineStyle.Dotted, 'pivot', false); 
    plotLineSeries('blue', 2, LineStyle.Dotted, 'toppivot', false); 
    plotLineSeries('blue', 2, LineStyle.Dotted, 'bottompivot', false); 

    plotLineSeries('green', 2, LineStyle.Dotted, 'r1', false); 
    plotLineSeries('green', 2, LineStyle.Dotted, 'r2', false); 
    plotLineSeries('green', 2, LineStyle.Dotted, 'r3', false); 
    plotLineSeries('green', 2, LineStyle.Dotted, 'r4', false); 

    plotLineSeries('red', 2, LineStyle.Dotted, 's1', false); 
    plotLineSeries('red', 2, LineStyle.Dotted, 's2', false); 
    plotLineSeries('red', 2, LineStyle.Dotted, 's3', false); 
    plotLineSeries('red', 2, LineStyle.Dotted, 's4', false); 

    plotLineSeries('green', 1, LineStyle.Solid, 'ema1', false); 
    plotLineSeries('red', 1, LineStyle.Solid, 'ema2', false); 
    plotLineSeries('blue', 2, LineStyle.Solid, 'sma1', false); 

    // Combine markers into a single setMarkers call
    const markers = data
      .flatMap(d => [
        d.long ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'LONG',
        } : null,
        d.short ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'SHORT',
        } : null,
        d.WRSignal === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'WR L',
        } : d.WRSignal === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'WR S',
        } : null,
        d.ERSignal === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'ER L',
        } : d.ERSignal === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'ER S',
        } : null,
        d.doji === 'Long' ? {
          time: d.time,
          position: 'belowBar',
          color: 'green',
          shape: 'arrowUp',
          text: 'D L',
        } : d.doji === 'Short' ? {
          time: d.time,
          position: 'aboveBar',
          color: 'red',
          shape: 'arrowDown',
          text: 'D S',
        } : null
      ])
      .filter(Boolean);

    candleSeriesRef.current.setMarkers(markers);

    // Crosshair move handler
    const myCrosshairMoveHandler = (param) => {
      if (!param.point) return;

      console.log(`Crosshair moved to ${param.point.x}, ${param.point.y}. The time is ${param.time}.`);
    };

    // Subscribe to crosshair move
    chartRef.current.subscribeCrosshairMove(myCrosshairMoveHandler);

    // Unsubscribe from crosshair move on cleanup
    return () => {
      if (chartRef.current) {
        chartRef.current.unsubscribeCrosshairMove(myCrosshairMoveHandler);
      }
    };

  }, [data, showSMA]);

  const toggleSMA = () => setShowSMA(prev => !prev);

  const handlePeriodChange = (e) => {
    // setSmaPeriod(Number(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <button onClick={toggleSMA}>
        {showSMA ? 'Hide SMA' : 'Show SMA'}
      </button>
      <input
        type="number"
        value={smaPeriod}
        onChange={handlePeriodChange}
        min="1"
        style={{ marginLeft: '10px' }}
      /> */}
      <div id="tvchart" style={{ height: '700px' }}></div>
    </div>
  );
};

export default UpstoxChart;
