import React, { useState } from 'react';
import MetricCard from './MetricCard';

export default function Dashboard() {
  // State to manage the date picker filter
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <section className="dashboard-content">
      
      {/* Top Bar: Title & Date Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 800 }}>Business Performance</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track your daily metrics and resolve active alerts.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'var(--bg-white)', padding: '8px 16px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', boxShadow: 'var(--shadow-subtle)' }}>
          <label htmlFor="dashboardDate" style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>Filter by Date:</label>
          <input 
            type="date" 
            id="dashboardDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #CBD5E1', fontFamily: 'inherit', color: 'var(--text-main)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* KPI Widgets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <MetricCard title="Daily Sales (Gross)" value="$4,240" />
        <MetricCard title="Most Sold Item" value="Cement (142 Units)" />
        <MetricCard title="Fulfillment Rate" value="98.5%" />
      </div>

      {/* Main Layout: Charts (Left) & Alerts (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Charts Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: '2 1 600px' }}>
          
          <div className="pro-card">
            <h3 className="card-title">Revenue vs Expenses</h3>
            <div style={{ height: '280px', backgroundColor: 'var(--bg-dashboard)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', border: '1px dashed #CBD5E1', marginTop: '16px' }}>
              [ Placeholder for Bar Chart ]
            </div>
          </div>

          <div className="pro-card">
            <h3 className="card-title">Volume Trends (Top Item)</h3>
            <div style={{ height: '280px', backgroundColor: 'var(--bg-dashboard)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', border: '1px dashed #CBD5E1', marginTop: '16px' }}>
              [ Placeholder for Line Chart ]
            </div>
          </div>
          
        </div>

        {/* Alerts Column */}
        <div className="pro-card" style={{ flex: '1 1 350px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 className="card-title" style={{ margin: 0 }}>Action Required</h3>
            <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>3 Alerts</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Low Stock Alert */}
            <div style={{ padding: '16px', borderLeft: '4px solid #EF4444', backgroundColor: '#FEF2F2', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#991B1B', fontSize: '0.9rem' }}>Low Inventory</p>
              <p style={{ margin: '4px 0 0 0', color: '#B91C1C', fontSize: '0.85rem', lineHeight: 1.4 }}>Bamburi Cement drops below minimum threshold (Current: 14 bags).</p>
            </div>

            {/* Missed Deadline Alert */}
            <div style={{ padding: '16px', borderLeft: '4px solid #F59E0B', backgroundColor: '#FFFBEB', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#92400E', fontSize: '0.9rem' }}>Missed Deadline</p>
              <p style={{ margin: '4px 0 0 0', color: '#B45309', fontSize: '0.85rem', lineHeight: 1.4 }}>Wholesale Order #1042 for Site A is 2 hours past fulfillment window.</p>
            </div>
            
            {/* Low Stock Alert */}
            <div style={{ padding: '16px', borderLeft: '4px solid #EF4444', backgroundColor: '#FEF2F2', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#991B1B', fontSize: '0.9rem' }}>Low Inventory</p>
              <p style={{ margin: '4px 0 0 0', color: '#B91C1C', fontSize: '0.85rem', lineHeight: 1.4 }}>Steel Roofing Nails (2-inch) drops below minimum threshold (Current: 2 boxes).</p>
            </div>
            
          </div>
          
          <button style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: 'transparent', border: '1px solid var(--border-crisp)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--text-main)', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = 'var(--bg-dashboard)'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
            Acknowledge All
          </button>
        </div>
        
      </div>
    </section>
  );
}