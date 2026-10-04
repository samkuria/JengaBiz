import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line 
} from 'recharts';
import MetricCard from './MetricCard';

// Dummy Data for Charts
const revenueData = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

const volumeData = [
  { time: '8am', units: 12 },
  { time: '10am', units: 45 },
  { time: '12pm', units: 78 },
  { time: '2pm', units: 110 },
  { time: '4pm', units: 135 },
  { time: '6pm', units: 142 },
];

export default function Dashboard() {
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
          
          {/* Bar Chart: Revenue vs Expenses */}
          <div className="pro-card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Revenue vs Expenses</h3>
            <div style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                  <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Bar dataKey="revenue" fill="var(--brand-blue)" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                  <Bar dataKey="expenses" fill="var(--brand-yellow)" radius={[4, 4, 0, 0]} name="Expenses ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart: Volume Trends */}
          <div className="pro-card">
            <h3 className="card-title" style={{ marginBottom: '20px' }}>Volume Trends (Cement)</h3>
            <div style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="units" stroke="var(--brand-blue)" strokeWidth={3} dot={{ fill: 'var(--brand-yellow)', strokeWidth: 2, r: 4 }} name="Units Sold" />
                </LineChart>
              </ResponsiveContainer>
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
            
            <div style={{ padding: '16px', borderLeft: '4px solid #EF4444', backgroundColor: '#FEF2F2', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#991B1B', fontSize: '0.9rem' }}>Low Inventory</p>
              <p style={{ margin: '4px 0 0 0', color: '#B91C1C', fontSize: '0.85rem', lineHeight: 1.4 }}>Bamburi Cement drops below minimum threshold (Current: 14 bags).</p>
            </div>

            <div style={{ padding: '16px', borderLeft: '4px solid #F59E0B', backgroundColor: '#FFFBEB', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontWeight: 700, color: '#92400E', fontSize: '0.9rem' }}>Missed Deadline</p>
              <p style={{ margin: '4px 0 0 0', color: '#B45309', fontSize: '0.85rem', lineHeight: 1.4 }}>Wholesale Order #1042 for Site A is 2 hours past fulfillment window.</p>
            </div>
            
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