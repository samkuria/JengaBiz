import React, { useState } from 'react';

// Initial Mock Database
const initialOrders = [
  { id: 1, customer: 'Alice Kamau', product: 'Pine Timber', desc: '2x4 10ft', qty: 50, price: 650, total: 32500, status: 'pending', date: new Date().toISOString().split('T')[0] },
  { id: 2, customer: 'Construction Site B', product: 'Bamburi Cement', desc: '50kg Bag', qty: 100, price: 800, total: 80000, status: 'pending', date: new Date().toISOString().split('T')[0] },
  { id: 3, customer: 'John Doe', product: 'Steel Roofing Nails', desc: '2-inch box', qty: 5, price: 2000, total: 10000, status: 'delivered', date: '2026-10-04' },
];

export default function Orders() {
  // --- State Management ---
  const [orders, setOrders] = useState(initialOrders);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'master', 'add-order'
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({ customer: '', product: '', desc: '', qty: '', price: '', status: 'pending' });
  const [editingId, setEditingId] = useState(null);
  
  // Feedback State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // --- Derived Calculations ---
  const totalOrdersVolume = orders.length;
  const pendingOrdersList = orders.filter(order => order.status === 'pending');
  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);

  const searchResults = searchQuery 
    ? orders.filter(order => order.customer.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const calcTotal = (Number(formData.qty) || 0) * (Number(formData.price) || 0);
  const todayDate = new Date().toISOString().split('T')[0];

  // --- Handlers ---
  const handleEditClick = () => {
    setFormData({
      customer: selectedOrder.customer,
      product: selectedOrder.product,
      desc: selectedOrder.desc,
      qty: selectedOrder.qty,
      price: selectedOrder.price,
      status: selectedOrder.status
    });
    setEditingId(selectedOrder.id);
    setSelectedOrder(null);
    setCurrentView('add-order');
  };

  const handleCancelForm = () => {
    setFormData({ customer: '', product: '', desc: '', qty: '', price: '', status: 'pending' });
    setEditingId(null);
    setCurrentView('overview');
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    let message = '';

    if (editingId) {
      setOrders(orders.map(order => 
        order.id === editingId 
          ? { ...order, ...formData, qty: Number(formData.qty), price: Number(formData.price), total: calcTotal }
          : order
      ));
      message = `Order for ${formData.customer} has been successfully updated.`;
    } else {
      const newOrder = {
        id: Date.now(),
        ...formData,
        qty: Number(formData.qty),
        price: Number(formData.price),
        total: calcTotal,
        date: todayDate
      };
      setOrders([newOrder, ...orders]);
      message = `New order for ${formData.customer} has been recorded.`;
    }

    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const handleSuccessAcknowledge = () => {
    setShowSuccess(false);
    setFormData({ customer: '', product: '', desc: '', qty: '', price: '', status: 'pending' });
    setEditingId(null);
    setCurrentView('overview');
  };

  // --- View Renders ---

  // 1. ADD / EDIT ORDER FORM VIEW
  if (currentView === 'add-order') {
    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
            {editingId ? 'Edit Order Details' : 'Record New Order'}
          </h2>
          <button onClick={handleCancelForm} className="action-button" style={{ backgroundColor: '#64748B' }}>Cancel</button>
        </div>

        <form onSubmit={handleSaveOrder} className="pro-card" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Customer Name</label>
              <input required type="text" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Product Name</label>
              <input required type="text" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Description</label>
              <input required type="text" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Quantity</label>
              <input required type="number" min="1" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Price (per unit)</label>
              <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Order Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', backgroundColor: '#fff' }}>
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Auto-Calculated Fields */}
          <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '20px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'var(--border-crisp)' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Order Date</p>
              <h3 style={{ margin: 0 }}>{editingId ? orders.find(o => o.id === editingId)?.date : todayDate}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Order Price</p>
              <h2 style={{ margin: 0, color: 'var(--brand-blue)' }}>Ksh {calcTotal.toLocaleString()}</h2>
            </div>
          </div>

          <button type="submit" className="action-button" style={{ padding: '14px', fontSize: '1.1rem', backgroundColor: 'var(--brand-yellow)', color: '#000' }}>
            {editingId ? 'Update Order' : 'Save Order'}
          </button>
        </form>

        {showSuccess && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
            <div className="pro-card" style={{ textAlign: 'center', padding: '40px', maxWidth: '400px' }}>
              <h2 style={{ color: '#16A34A', margin: '0 0 10px 0' }}>Success!</h2>
              <p style={{ marginBottom: '24px' }}>{successMessage}</p>
              <button onClick={handleSuccessAcknowledge} className="action-button" style={{ width: '100%' }}>Okay</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. MASTER PENDING LIST VIEW
  if (currentView === 'master') {
    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>Master Pending Orders</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Export to PDF</button>
            <button onClick={() => setCurrentView('overview')} className="action-button" style={{ backgroundColor: '#64748B' }}>Back</button>
          </div>
        </div>

        <div className="pro-card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-crisp)' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>Qty</th>
                <th style={{ padding: '12px' }}>Total Price</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrdersList.length > 0 ? pendingOrdersList.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-crisp)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{order.date}</td>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{order.customer}</td>
                  <td style={{ padding: '12px' }}>{order.product}</td>
                  <td style={{ padding: '12px' }}>{order.qty}</td>
                  <td style={{ padding: '12px', fontWeight: 700 }}>Ksh {order.total.toLocaleString()}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: '#FEF08A', color: '#854D0E', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>Pending</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No pending orders at this time.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. MAIN ORDERS OVERVIEW (Default)
  return (
    <section className="dashboard-content">
      
      {/* Top Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Order Management</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setCurrentView('master')} className="action-button" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--brand-blue)', border: 'var(--border-crisp)' }}>View Pending List</button>
          <button onClick={() => setCurrentView('add-order')} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>+ Record Order</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="pro-card">
          <h4 className="card-title">Total Order Volume</h4>
          <h2 className="card-value">{totalOrdersVolume}</h2>
        </div>
        <div className="pro-card status-card">
          <h4 className="card-title">Pending Orders</h4>
          <h2 className="card-value" style={{ color: pendingOrdersList.length > 0 ? '#EAB308' : 'inherit' }}>{pendingOrdersList.length}</h2>
          {pendingOrdersList.length > 0 && <p style={{ margin: '5px 0 0 0', color: '#CA8A04', fontSize: '0.85rem' }}>Awaiting fulfillment</p>}
        </div>
        <div className="pro-card">
          <h4 className="card-title">Total Value of All Orders</h4>
          <h2 className="card-value">Ksh {totalOrderValue.toLocaleString()}</h2>
        </div>
      </div>

      {/* Customer Search Bar */}
      <div className="pro-card" style={{ marginTop: '10px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Search Orders by Customer</h3>
        <input 
          type="text" 
          placeholder="Start typing customer name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', fontSize: '1rem' }}
        />

        {searchQuery && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {searchResults.length > 0 ? searchResults.map(order => (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                style={{ padding: '12px', border: 'var(--border-crisp)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-dashboard)' }}
              >
                <div>
                  <span style={{ fontWeight: 600, display: 'block' }}>{order.customer}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.product} ({order.date})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ 
                    backgroundColor: order.status === 'pending' ? '#FEF08A' : '#DCFCE7', 
                    color: order.status === 'pending' ? '#854D0E' : '#166534', 
                    padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' 
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>No orders found for "{searchQuery}".</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Order Details Modal */}
      {selectedOrder && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="pro-card" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
            {/* Bubble X Close Button */}
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EF4444', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
            >
              ✕
            </button>
            
            <h2 style={{ margin: '0 0 5px 0', color: 'var(--brand-blue)' }}>{selectedOrder.customer}</h2>
            <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)' }}>Order Placed: {selectedOrder.date}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Product</p>
                <h3 style={{ margin: 0 }}>{selectedOrder.product}</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedOrder.desc}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quantity</p>
                  <h3 style={{ margin: 0 }}>{selectedOrder.qty}</h3>
                </div>
                <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price per Unit</p>
                  <h3 style={{ margin: 0 }}>Ksh {selectedOrder.price}</h3>
                </div>
              </div>
              <div style={{ backgroundColor: 'var(--brand-blue)', color: 'var(--text-inverse)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Total Value</p>
                <h3 style={{ margin: 0 }}>Ksh {selectedOrder.total.toLocaleString()}</h3>
              </div>
            </div>
            
            <button onClick={handleEditClick} className="action-button" style={{ width: '100%', backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Edit Order</button>
          </div>
        </div>
      )}
    </section>
  );
}