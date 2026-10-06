import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Orders from './components/Orders';
import './App.css';

// A temporary placeholder for pages we haven't built yet
const PagePlaceholder = ({ title }) => (
  <div style={{ padding: '40px' }}>
    <div className="pro-card">
      <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 10px 0' }}>{title} Module</h2>
      <p style={{ color: 'var(--text-muted)', margin: 0 }}>This section is currently under development.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Header />
          
          {/* Router handles swapping out this section based on the URL */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/credits" element={<PagePlaceholder title="Credits" />} />
            <Route path="/metrics" element={<PagePlaceholder title="Metrics" />} />
            <Route path="/alerts" element={<PagePlaceholder title="Alerts" />} />
            <Route path="/history" element={<PagePlaceholder title="History" />} />
            <Route path="/settings" element={<PagePlaceholder title="Settings" />} />
          </Routes>
          
        </main>
      </div>
    </Router>
  );
}

export default App;