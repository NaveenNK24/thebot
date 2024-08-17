import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Historicaldata from './components/Historicaldata';
import ChartComponent1 from './components/chart';

const App = () => (
  <div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/historicaldata" element={<Historicaldata />} />
      <Route path="/chart" element={<ChartComponent1 />} />
    </Routes>
  </div>
);

export default App;
