import React from 'react';
import './App.css'; // Make sure this matches your CSS filename

function App() {
  return (
    <div className="app-container">
      
      {/* Sidebar Area */}
      <aside className="sidebar">
        <h1 style={{ fontWeight: 900, fontSize: '2.5rem', margin: '0 0 20px 0', letterSpacing: '-1px' }}>
          JENGA<br/>BIZ
        </h1>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button className="brutalist-button active">Dashboard</button>
          <button className="brutalist-button">Metrics</button>
          <button className="brutalist-button">Alerts</button>
          <button className="brutalist-button">History</button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Header Area */}
        <header className="header">
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.5rem' }}>Real-Time Overview</h2>
          <button className="brutalist-button" style={{ padding: '8px 16px' }}>Admin</button>
        </header>

        {/* Dashboard Canvas */}
        <section className="dashboard-content">
          <div className="brutalist-card" style={{ backgroundColor: 'var(--jenga-yellow)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 800 }}>System Status</h3>
            <p style={{ margin: 0, fontWeight: 600 }}>All key performance indicators are currently stable.</p>
          </div>
          
          {/* Placeholder for KPI Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
             <div className="brutalist-card">
                <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Live Traffic</h4>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 900 }}>842</h2>
             </div>
             <div className="brutalist-card">
                <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Active Alerts</h4>
                <h2 style={{ fontSize: '3rem', margin: 0, fontWeight: 900 }}>0</h2>
             </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;