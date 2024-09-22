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
        <Route path="/historicaldata" element={<ProtectedRoute><UpstoxChart /></ProtectedRoute>} />
        <Route path="/chart/:symbol" element={<ProtectedRoute><ChartComponent1 /></ProtectedRoute>} />
        <Route path="/optionchain" element={<ProtectedRoute><OptionChain /></ProtectedRoute>} />
        <Route path="/upstoxlogin" element={<ProtectedRoute><UpstoxLogin /></ProtectedRoute>} />
        <Route path="/indexdashboard" element={<ProtectedRoute><IndexDashboard /></ProtectedRoute>} />
        <Route path="/brokerage" element={<ProtectedRoute><BrokerageConnect /></ProtectedRoute>} />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
