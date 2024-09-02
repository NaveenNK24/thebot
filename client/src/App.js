import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

import ChartComponent1 from './components/chart';
import UpstoxChart from './components/Historicaldata';

const App = () => (
  <div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/historicaldata" element={<UpstoxChart />} />
      <Route path="/chart/:symbol" element={<ChartComponent1 />} />
      
    </Routes>
  </div>
);

export default App;
