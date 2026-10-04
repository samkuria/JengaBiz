import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">
        JENGA<br/><span className="logo-white">BIZ</span>
      </h1>
      
      <nav className="nav-menu">
        <NavLink to="/" className="nav-button" end>Dashboard</NavLink>
        <NavLink to="/inventory" className="nav-button">Inventory</NavLink>
        <NavLink to="/sales" className="nav-button">Sales</NavLink>
        <NavLink to="/orders" className="nav-button">Orders</NavLink>
        <NavLink to="/credits" className="nav-button">Credits</NavLink>
        
        {/* Analytics & System */}
        <div style={{ margin: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}></div>
        
        <NavLink to="/metrics" className="nav-button">Metrics</NavLink>
        <NavLink to="/alerts" className="nav-button">Alerts</NavLink>
        <NavLink to="/history" className="nav-button">History</NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
        <NavLink to="/settings" className="nav-button" style={{ display: 'block', textAlign: 'center' }}>
          Settings
        </NavLink>
      </div>
    </aside>
  );
}