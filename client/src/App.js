import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './path/Login';
import Signup from './path/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

import ChartComponent1 from './components/chart';
import UpstoxChart from './components/Historicaldata';
import OptionChain from './path/OptionChain';
import UpstoxLogin from './path/UpstoxLogin';
import IndexDashboard from './components/IndexDashboard';
import BrokerageConnect from './path/Brokerage';
import ProtectedRoute from './components/ProtectedRoute';
import InvalidPathAlert from './path/InvalidPathAlert';
import UpstoxCallback from './components/UpstoxCallback';
import ConnectBroker from './path/ConnectBroker';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upstox/callback" element={<UpstoxCallback />} />
        <Route path="/chart/upstox/:instrument_key" element={<ProtectedRoute><UpstoxChart /></ProtectedRoute>} />
        <Route path="/chart/:symbol" element={<ProtectedRoute><ChartComponent1 /></ProtectedRoute>} />
        <Route path="/optionchain" element={<ProtectedRoute><OptionChain /></ProtectedRoute>} />
        <Route path="/upstoxlogin" element={<ProtectedRoute><UpstoxLogin /></ProtectedRoute>} />
        <Route path="/indexdashboard" element={<ProtectedRoute><IndexDashboard /></ProtectedRoute>} />
        <Route path="/brokerage" element={<ProtectedRoute><BrokerageConnect /></ProtectedRoute>} />
        <Route path="/connectbrokerage" element={<ProtectedRoute> <ConnectBroker/> </ProtectedRoute>} />
        {/* Catch-all route */}
        <Route path="*" element={<InvalidPathAlert />} />
        <Route path="/upstox/callback" component={UpstoxCallback} />
        
        
      </Routes>
    </div>
  );
}

export default App;
