import React from 'react';
import MetricCard from './MetricCard';

export default function Dashboard() {
  return (
    <section className="dashboard-content">
      <div className="pro-card status-card">
        <h3 className="card-title">System Status</h3>
        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
          All key performance indicators are currently stable.
        </p>
      </div>
      
      {/* KPI Widgets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <MetricCard title="Live Traffic" value="842" />
        <MetricCard title="Active Alerts" value="0" />
        <MetricCard title="Daily Revenue" value="$1,240" />
      </div>
    </section>
  );
}