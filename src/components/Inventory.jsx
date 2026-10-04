import React, { useState } from 'react';

// Initial Mock Database
const initialInventory = [
  { id: 1, name: 'Bamburi Cement', desc: '50kg Bag', qty: 14, bp: 600, sp: 800 },
  { id: 2, name: 'Steel Roofing Nails', desc: '2-inch box', qty: 0, bp: 1500, sp: 2000 },
  { id: 3, name: 'Pine Timber', desc: '2x4 10ft', qty: 120, bp: 400, sp: 650 },
  { id: 4, name: 'Mabati Iron Sheets', desc: '3M gauge 30', qty: 5, bp: 2200, sp: 2800 },
];

export default function Inventory() {
  // --- State Management ---
  const [inventory, setInventory] = useState(initialInventory);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'master', 'low-stock', 'add-item'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', desc: '', qty: '', bp: '', sp: '' });

  // --- Derived Calculations ---
  const totalItems = inventory.reduce((sum, item) => sum + Number(item.qty), 0);
  const totalValue = inventory.reduce((sum, item) => sum + (Number(item.qty) * Number(item.bp)), 0);
  const outOfStockItems = inventory.filter(item => item.qty === 0);
  const lowStockItems = inventory.filter(item => item.qty > 0 && item.qty <= 15);
  
  const searchResults = searchQuery 
    ? inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Form Auto-Calculations
  const calcTotalBp = Number(formData.qty) * Number(formData.bp) || 0;
  const calcTotalSp = Number(formData.qty) * Number(formData.sp) || 0;
  const calcProfit = calcTotalSp - calcTotalBp;

  // --- Handlers ---
  const handleSaveItem = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: formData.name,
      desc: formData.desc,
      qty: Number(formData.qty),
      bp: Number(formData.bp),
      sp: Number(formData.sp)
    };
    setInventory([...inventory, newItem]);
    setShowSuccess(true);
  };

  const handleSuccessAcknowledge = () => {
    setShowSuccess(false);
    setFormData({ name: '', desc: '', qty: '', bp: '', sp: '' });
    setCurrentView('overview');
  };

  // --- View Renders ---

  // 1. ADD ITEM FORM VIEW
  if (currentView === 'add-item') {
    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>Add New Item</h2>
          <button onClick={() => setCurrentView('overview')} className="action-button" style={{ backgroundColor: '#64748B' }}>Cancel</button>
        </div>

        <form onSubmit={handleSaveItem} className="pro-card" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Product Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Description</label>
              <input required type="text" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Quantity</label>
              <input required type="number" min="0" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Buying Price (per unit)</label>
              <input required type="number" min="0" value={formData.bp} onChange={e => setFormData({...formData, bp: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Selling Price (per unit)</label>
              <input required type="number" min="0" value={formData.sp} onChange={e => setFormData({...formData, sp: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
            </div>
          </div>

          {/* Auto-Calculated Fields */}
          <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '20px', borderRadius: 'var(--radius-md)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', border: 'var(--border-crisp)' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Buying Price</p>
              <h3 style={{ margin: 0 }}>Ksh {calcTotalBp.toLocaleString()}</h3>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Selling Price</p>
              <h3 style={{ margin: 0 }}>Ksh {calcTotalSp.toLocaleString()}</h3>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Projected Profit</p>
              <h3 style={{ margin: 0, color: '#16A34A' }}>Ksh {calcProfit.toLocaleString()}</h3>
            </div>
          </div>

          <button type="submit" className="action-button" style={{ padding: '14px', fontSize: '1.1rem', backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Save Item</button>
        </form>

        {/* Success Modal Pop-up */}
        {showSuccess && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
            <div className="pro-card" style={{ textAlign: 'center', padding: '40px', maxWidth: '400px' }}>
              <h2 style={{ color: '#16A34A', margin: '0 0 10px 0' }}>Success!</h2>
              <p style={{ marginBottom: '24px' }}>{formData.name} has been successfully added to the master inventory.</p>
              <button onClick={handleSuccessAcknowledge} className="action-button" style={{ width: '100%' }}>Okay</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. DATA TABLES VIEW (Master & Low Stock)
  if (currentView === 'master' || currentView === 'low-stock') {
    const tableData = currentView === 'master' ? inventory : [...lowStockItems, ...outOfStockItems];
    const tableTitle = currentView === 'master' ? 'Master Inventory Table' : 'Low & Out of Stock Items';

    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>{tableTitle}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Export to PDF</button>
            <button onClick={() => setCurrentView('overview')} className="action-button" style={{ backgroundColor: '#64748B' }}>Back</button>
          </div>
        </div>

        <div className="pro-card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-crisp)' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Qty</th>
                <th style={{ padding: '12px' }}>Buy Price</th>
                <th style={{ padding: '12px' }}>Sell Price</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-crisp)' }}>
                  <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{item.desc}</td>
                  <td style={{ padding: '12px', color: item.qty === 0 ? '#DC2626' : 'inherit', fontWeight: item.qty === 0 ? 800 : 400 }}>{item.qty}</td>
                  <td style={{ padding: '12px' }}>Ksh {item.bp}</td>
                  <td style={{ padding: '12px' }}>Ksh {item.sp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. MAIN INVENTORY OVERVIEW (Default)
  return (
    <section className="dashboard-content">
      
      {/* Top Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Inventory Management</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setCurrentView('master')} className="action-button" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--brand-blue)', border: 'var(--border-crisp)' }}>View Master List</button>
          <button onClick={() => setCurrentView('low-stock')} className="action-button" style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>View Low Stock</button>
          <button onClick={() => setCurrentView('add-item')} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>+ Add New Item</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="pro-card status-card">
          <h4 className="card-title">Total Items in Stock</h4>
          <h2 className="card-value">{totalItems}</h2>
        </div>
        <div className="pro-card">
          <h4 className="card-title">Total Inventory Value</h4>
          <h2 className="card-value">Ksh {totalValue.toLocaleString()}</h2>
        </div>
        <div className="pro-card" style={{ borderLeft: outOfStockItems.length > 0 ? '4px solid #DC2626' : 'var(--border-crisp)' }}>
          <h4 className="card-title" style={{ color: outOfStockItems.length > 0 ? '#DC2626' : 'inherit' }}>Out of Stock Items</h4>
          <h2 className="card-value">{outOfStockItems.length}</h2>
          {outOfStockItems.length > 0 && <p style={{ margin: '5px 0 0 0', color: '#DC2626', fontSize: '0.85rem' }}>Action required</p>}
        </div>
      </div>

      {/* Search Bar & Instant Results */}
      <div className="pro-card" style={{ marginTop: '10px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Quick Item Search</h3>
        <input 
          type="text" 
          placeholder="Search by product name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', fontSize: '1rem' }}
        />

        {searchQuery && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {searchResults.length > 0 ? searchResults.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                style={{ padding: '12px', border: 'var(--border-crisp)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-dashboard)' }}
              >
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>Qty: {item.qty}</span>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>No items found matching "{searchQuery}".</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Item Details Modal */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="pro-card" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
            {/* Bubble X Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              style={{ position: 'absolute', top: '-15px', right: '-15px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EF4444', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
            >
              ✕
            </button>
            
            <h2 style={{ margin: '0 0 5px 0', color: 'var(--brand-blue)' }}>{selectedItem.name}</h2>
            <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)' }}>{selectedItem.desc}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>In Stock</p>
                <h3 style={{ margin: 0, color: selectedItem.qty === 0 ? '#DC2626' : 'inherit' }}>{selectedItem.qty}</h3>
              </div>
              <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Buying Price</p>
                <h3 style={{ margin: 0 }}>Ksh {selectedItem.bp}</h3>
              </div>
              <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selling Price</p>
                <h3 style={{ margin: 0 }}>Ksh {selectedItem.sp}</h3>
              </div>
              <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Profit Margin</p>
                <h3 style={{ margin: 0, color: '#16A34A' }}>Ksh {selectedItem.sp - selectedItem.bp}</h3>
              </div>
            </div>
            
            <button className="action-button" style={{ width: '100%', backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Edit Item</button>
          </div>
        </div>
      )}
    </section>
  );
}