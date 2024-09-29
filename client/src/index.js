import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './stores/store'; // Ensure this path is correct
import App from './App';
import './index.css';

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
);
