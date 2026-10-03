import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      
      {/* Sidebar Area */}
      <aside className="sidebar">
        <h1 className="logo">
          JENGA<br/>BIZ
        </h1>
        <nav className="nav-menu">
          <button className="nav-button active">Dashboard</button>
          <button className="nav-button">Metrics</button>
          <button className="nav-button">Alerts</button>
          <button className="nav-button">History</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Header Area */}
        <header className="header">
          <h2 className="header-title">Real-Time Overview</h2>
          <button className="action-button">Admin</button>
        </header>

        {/* Dashboard Canvas */}
        <section className="dashboard-content">
          
          <div className="pro-card status-card">
            <h3 className="card-title">System Status</h3>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
              All key performance indicators are currently stable.
            </p>
          </div>
          
          {/* KPI Widgets Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
             <div className="pro-card">
                <h4 className="card-title">Live Traffic</h4>
                <h2 className="card-value">842</h2>
             </div>
             
             <div className="pro-card">
                <h4 className="card-title">Active Alerts</h4>
                <h2 className="card-value">0</h2>
             </div>
             
             <div className="pro-card">
                <h4 className="card-title">Daily Revenue</h4>
                <h2 className="card-value">$1,240</h2>
             </div>
          </div>
          
        </section>
      </main>
    </div>
  );
}

export default App;