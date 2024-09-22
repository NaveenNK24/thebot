import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';



import ChartComponent1 from './components/chart';
import UpstoxChart from './components/Historicaldata';
import OptionChain from './components/OptionChain';
import UpstoxLogin from './components/UpstoxLogin';
import IndexDashboard from './components/IndexDashboard';
import BrokerageConnect from './components/Brokerage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/historicaldata" element={<UpstoxChart />} />
        <Route path="/chart/:symbol" element={<ChartComponent1 />} />
        <Route path="/optionchain" element={<OptionChain />} />
        <Route path="/upstoxlogin" element={<UpstoxLogin />} />
        <Route path="/indexdashboard" element={<ProtectedRoute><IndexDashboard /></ProtectedRoute>} />
        <Route path="/brokerage" element={<BrokerageConnect />} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
