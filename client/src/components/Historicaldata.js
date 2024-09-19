

import React, { useEffect, useRef, useState } from 'react';
import { fetchData } from '../slices/upstoxChartSlice';
import { createChart, CrosshairMode, LineStyle, LineType } from 'lightweight-charts';
// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpstoxChart = () => {
  const dispatch = useDispatch();
//   const { symbol } = useParams();
  const { data = [], loading, error } = useSelector((state) => state.upstoxChartSlice);

  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const histogramSeriesRef = useRef(null);

  // const [chartData, setChartData] = useState(null);

  const [showSMA, setShowSMA] = useState(true);
//   const [smaPeriod, setSmaPeriod] = useState(10); // Default SMA period

useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await dispatch(fetchData()); // Call the Redux action here
        if (response && response.payload) {  // Assuming response contains a payload
        //   setChartData(response.payload);
        } else {
          throw new Error("Data not received properly");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchChartData(); // Now calling fetchChartData, not fetchData
}, [dispatch]);

  


  useEffect(() => {
    if (!data.length) return;

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

      candleSeriesRef.current.applyOptions({
        wickUpColor: "#089981",
        upColor: "#089981",
        wickDownColor: "#000000",
        downColor: "#000000",
        borderVisible: false,
      });
      // histogramSeriesRef.current = chartRef.current.addHistogramSeries({ color: 'red' });
    }

    candleSeriesRef.current.setData(data);


    histogramSeriesRef.current = chartRef.current.addHistogramSeries({
      // color: '#26a69a',
      priceFormat: {
          type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
      // set the positioning of the volume series
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
      },
  });
  histogramSeriesRef.current.priceScale().applyOptions({
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0,
      },
  });
    const histogramData = data.map(d => ({ time: d.time, value: d.volume, color: d.open>d.close?"#fd4040":"#089981" }));
     histogramSeriesRef.current.setData(histogramData);

    // Function to create and plot a line series for any given data
    const plotLineSeries = (color, lineWidth, lineStyle, filterKey, priceLineVisible,lineType) => {
      const series = chartRef.current.addLineSeries({ color, lineWidth, lineStyle, priceLineVisible ,lineType});
      const seriesData = data.filter(d => d[filterKey]).map(d => ({ time: d.time, value: d[filterKey] }));
      series.setData(seriesData);
    };

   
    

    // Plot all pivot points, support, and resistance levels
    plotLineSeries('blue', 1.5, LineStyle.Solid, 'pivot', false); 
    plotLineSeries('blue', 1.5, LineStyle.Solid, 'toppivot', false); 
    plotLineSeries('blue', 1.5, LineStyle.Solid, 'bottompivot', false); 

    plotLineSeries('green', 0.5, LineStyle.Solid, 'r1', false); 
    plotLineSeries('green', 0.5, LineStyle.Solid, 'r2', false); 
    plotLineSeries('green', 0.5, LineStyle.Solid, 'r3', false); 
    plotLineSeries('green', 0.5, LineStyle.Solid, 'r4', false); 

    plotLineSeries('red', 0.5, LineStyle.Solid, 's1', false); 
    plotLineSeries('red', 0.5, LineStyle.Solid, 's2', false); 
    plotLineSeries('red', 0.5, LineStyle.Solid, 's3', false); 
    plotLineSeries('red', 0.5, LineStyle.Solid, 's4', false); 

    plotLineSeries('green', 1, LineStyle.Solid, 'ema1', false); 
    plotLineSeries('red', 1, LineStyle.Solid, 'ema2', false); 
    plotLineSeries('violet', 2, LineStyle.Solid, 'sma1', false); 

    plotLineSeries('red', 1.5, LineStyle.LargeDashed, 'vah', false, LineType.Simple); 
    plotLineSeries('red', 1.5, LineStyle.LargeDashed, 'val', false,LineType.WithSteps); 
    plotLineSeries('black', 1.5, LineStyle.LargeDashed, 'poc', false,LineType.WithSteps); 

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

      // console.log(`Crosshair moved to ${param.point.x}, ${param.point.y}. The time is ${param.time}.`);
       const firstEntry = param.seriesData.entries().next().value

       if(firstEntry) {
            // Access open, high, close from the value object
            const [key, value] = firstEntry;
            const Vopen = value.open;
            const Vhigh = value.high;
            const Vclose = value.close;
            const Vlow = value.low
              console.log(Vopen,Vhigh,Vlow,Vclose,key);
       }


  
      
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

  // const toggleSMA = () => setShowSMA(prev => !prev);

  // const handlePeriodChange = (e) => {
  //   // setSmaPeriod(Number(e.target.value));
  // };

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

