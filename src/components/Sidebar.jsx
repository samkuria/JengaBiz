import React from 'react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">
        JENGA<br/><span className="logo-white">BIZ</span>
      </h1>
      <nav className="nav-menu">
        <button className="nav-button active">Dashboard</button>
        <button className="nav-button">Inventory</button>
        <button className="nav-button">Sales</button>
        <button className="nav-button">Orders</button>
        <button className="nav-button">Credits</button>
        
        {/* Analytics & System */}
        <div style={{ margin: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></div>
        <button className="nav-button">Metrics</button>
        <button className="nav-button">Alerts</button>
        <button className="nav-button">History</button>
      </nav>
    </aside>
  );
}