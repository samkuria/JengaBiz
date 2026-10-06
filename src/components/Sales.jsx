import React, { useState } from 'react';

// Shared Mock Data
const initialInventory = [
  { id: 1, name: 'Bamburi Cement', desc: '50kg Bag', qty: 14, bp: 600, sp: 800 },
  { id: 2, name: 'Steel Roofing Nails', desc: '2-inch box', qty: 20, bp: 1500, sp: 2000 },
  { id: 3, name: 'Pine Timber', desc: '2x4 10ft', qty: 120, bp: 400, sp: 650 },
  { id: 4, name: 'Mabati Iron Sheets', desc: '3M gauge 30', qty: 5, bp: 2200, sp: 2800 },
];

const initialSales = [
  { id: 101, name: 'Pine Timber', qty: 15, sp: 650, total: 9750, date: new Date().toISOString().split('T')[0] },
  { id: 102, name: 'Bamburi Cement', qty: 5, sp: 800, total: 4000, date: new Date().toISOString().split('T')[0] },
];

export default function Sales() {
  // --- State Management ---
  const [inventory, setInventory] = useState(initialInventory);
  const [sales, setSales] = useState(initialSales);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'master', 'leaderboard', 'add-sale'
  
  // Date Filter State
  const [filterDate, setFilterDate] = useState('');
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  // Form & Search State
  const [productSearch, setProductSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [saleQty, setSaleQty] = useState('');
  
  // Feedback State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // --- Derived Calculations ---
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = sales.reduce((sum, sale) => sum + sale.qty, 0);
  
  // Calculate Leaderboard & Most Sold Item
  const itemTotals = sales.reduce((acc, sale) => {
    acc[sale.name] = (acc[sale.name] || 0) + sale.qty;
    return acc;
  }, {});
  
  const leaderboard = Object.entries(itemTotals)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);
    
  const mostSoldItem = leaderboard.length > 0 ? leaderboard[0] : { name: 'N/A', qty: 0 };

  // Filtered Sales for Popup
  const filteredSales = sales.filter(sale => sale.date === filterDate);

  // Form Calculations
  const inventorySearchResults = productSearch 
    ? inventory.filter(item => item.name.toLowerCase().includes(productSearch.toLowerCase()))
    : [];
  
  const calculatedTotal = selectedProduct && saleQty ? (selectedProduct.sp * Number(saleQty)) : 0;

  // --- Handlers ---
  const handleDateSelect = (e) => {
    const selected = e.target.value;
    setFilterDate(selected);
    if (selected) setShowFilterPopup(true);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setProductSearch(product.name);
  };

  const handleSaveSale = (e) => {
    e.preventDefault();
    if (!selectedProduct) return alert("Please select a valid product from the inventory.");
    if (Number(saleQty) > selectedProduct.qty) return alert(`Not enough inventory! Only ${selectedProduct.qty} left.`);

    // 1. Deduct from inventory
    setInventory(inventory.map(item => 
      item.id === selectedProduct.id 
        ? { ...item, qty: item.qty - Number(saleQty) }
        : item
    ));

    // 2. Add to sales record
    const newSale = {
      id: Date.now(),
      name: selectedProduct.name,
      qty: Number(saleQty),
      sp: selectedProduct.sp,
      total: calculatedTotal,
      date: new Date().toISOString().split('T')[0] // Auto-generates today's date
    };
    setSales([newSale, ...sales]);

    // 3. Show Success
    setSuccessMessage(`Successfully recorded sale of ${saleQty} x ${selectedProduct.name}. Inventory has been updated.`);
    setShowSuccess(true);
  };

  const handleSuccessAcknowledge = () => {
    setShowSuccess(false);
    setProductSearch('');
    setSelectedProduct(null);
    setSaleQty('');
    setCurrentView('overview');
  };

  // --- View Renders ---

  // 1. ADD SALE FORM VIEW
  if (currentView === 'add-sale') {
    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>Record New Sale</h2>
          <button onClick={() => setCurrentView('overview')} className="action-button" style={{ backgroundColor: '#64748B' }}>Cancel</button>
        </div>

        <form onSubmit={handleSaveSale} className="pro-card" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '400px' }}>
          
          {/* Smart Product Search */}
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Search Product in Inventory</label>
            <input 
              required 
              type="text" 
              placeholder="Start typing product name..."
              value={productSearch} 
              onChange={e => {
                setProductSearch(e.target.value);
                setSelectedProduct(null); // Reset selection if they type again
              }} 
              style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: '2px solid var(--brand-blue)' }} 
            />
            
            {/* Search Dropdown */}
            {productSearch && !selectedProduct && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--bg-white)', border: 'var(--border-crisp)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', zIndex: 10, maxHeight: '200px', overflowY: 'auto', marginTop: '4px' }}>
                {inventorySearchResults.length > 0 ? inventorySearchResults.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => handleSelectProduct(item)}
                    style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: item.qty > 0 ? 'var(--text-muted)' : '#DC2626' }}>Stock: {item.qty}</span>
                  </div>
                )) : (
                  <div style={{ padding: '12px', color: 'var(--text-muted)' }}>No items found.</div>
                )}
              </div>
            )}
          </div>

          {/* Auto-filled details & Quantity input */}
          {selectedProduct && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: 'var(--text-muted)' }}>Selling Price (Auto-filled)</label>
                <input type="text" readOnly value={`Ksh ${selectedProduct.sp}`} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', backgroundColor: 'var(--bg-dashboard)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px' }}>Quantity Sold</label>
                <input required type="number" min="1" max={selectedProduct.qty} value={saleQty} onChange={e => setSaleQty(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)' }} />
              </div>
            </div>
          )}

          {/* Totals & Save */}
          <div style={{ backgroundColor: 'var(--bg-dashboard)', padding: '20px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 5px 0', color: 'var(--text-muted)' }}>Date</p>
                <h4 style={{ margin: 0 }}>{new Date().toISOString().split('T')[0]}</h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 5px 0', color: 'var(--text-muted)' }}>Total Amount</p>
                <h2 style={{ margin: 0, color: 'var(--brand-blue)', fontSize: '2rem' }}>Ksh {calculatedTotal.toLocaleString()}</h2>
              </div>
            </div>
          </div>

          <button type="submit" className="action-button" style={{ padding: '14px', fontSize: '1.1rem', backgroundColor: 'var(--brand-yellow)', color: '#000', width: '100%' }}>Complete Sale</button>
        </form>

        {showSuccess && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
            <div className="pro-card" style={{ textAlign: 'center', padding: '40px', maxWidth: '450px' }}>
              <h2 style={{ color: '#16A34A', margin: '0 0 10px 0' }}>Sale Recorded!</h2>
              <p style={{ marginBottom: '24px', lineHeight: 1.5 }}>{successMessage}</p>
              <button onClick={handleSuccessAcknowledge} className="action-button" style={{ width: '100%' }}>Okay</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. DATA TABLES VIEW (Master Sales & Leaderboard)
  if (currentView === 'master' || currentView === 'leaderboard') {
    const isLeaderboard = currentView === 'leaderboard';
    
    return (
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
            {isLeaderboard ? 'Product Leaderboard' : 'Master Sales Record'}
          </h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>Export to PDF</button>
            <button onClick={() => setCurrentView('overview')} className="action-button" style={{ backgroundColor: '#64748B' }}>Back</button>
          </div>
        </div>

        <div className="pro-card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-crisp)' }}>
                {isLeaderboard ? (
                  <>
                    <th style={{ padding: '12px' }}>Rank</th>
                    <th style={{ padding: '12px' }}>Product Name</th>
                    <th style={{ padding: '12px' }}>Total Units Sold</th>
                  </>
                ) : (
                  <>
                    <th style={{ padding: '12px' }}>Date</th>
                    <th style={{ padding: '12px' }}>Product</th>
                    <th style={{ padding: '12px' }}>Qty</th>
                    <th style={{ padding: '12px' }}>Price</th>
                    <th style={{ padding: '12px' }}>Total</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {isLeaderboard 
                ? leaderboard.map((item, index) => (
                    <tr key={item.name} style={{ borderBottom: '1px solid var(--border-crisp)' }}>
                      <td style={{ padding: '12px', fontWeight: 800, color: index === 0 ? 'var(--brand-yellow)' : 'inherit' }}>#{index + 1}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{item.name}</td>
                      <td style={{ padding: '12px', color: 'var(--brand-blue)', fontWeight: 700 }}>{item.qty} units</td>
                    </tr>
                  ))
                : sales.map(sale => (
                    <tr key={sale.id} style={{ borderBottom: '1px solid var(--border-crisp)' }}>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{sale.date}</td>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{sale.name}</td>
                      <td style={{ padding: '12px' }}>{sale.qty}</td>
                      <td style={{ padding: '12px' }}>Ksh {sale.sp}</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--brand-blue)' }}>Ksh {sale.total.toLocaleString()}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 3. MAIN SALES OVERVIEW
  return (
    <section className="dashboard-content">
      
      {/* Top Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Sales Dashboard</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setCurrentView('leaderboard')} className="action-button" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--text-main)', border: 'var(--border-crisp)' }}>🏆 Item Leaderboard</button>
          <button onClick={() => setCurrentView('master')} className="action-button" style={{ backgroundColor: 'var(--bg-white)', color: 'var(--brand-blue)', border: 'var(--border-crisp)' }}>View Master List</button>
          <button onClick={() => setCurrentView('add-sale')} className="action-button" style={{ backgroundColor: 'var(--brand-yellow)', color: '#000' }}>+ Add Sales</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="pro-card status-card">
          <h4 className="card-title">Total Sales Revenue</h4>
          <h2 className="card-value">Ksh {totalRevenue.toLocaleString()}</h2>
        </div>
        <div className="pro-card">
          <h4 className="card-title">Total Items Sold</h4>
          <h2 className="card-value">{totalItemsSold}</h2>
        </div>
        <div className="pro-card">
          <h4 className="card-title">Most Popular Item</h4>
          <h2 className="card-value" style={{ fontSize: '1.8rem', paddingTop: '8px' }}>{mostSoldItem.name}</h2>
          <p style={{ margin: '5px 0 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{mostSoldItem.qty} units moved</p>
        </div>
      </div>

      {/* Date Filter Box */}
      <div className="pro-card" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h3 className="card-title" style={{ margin: 0 }}>Filter Sales by Date:</h3>
        <input 
          type="date" 
          value={filterDate}
          onChange={handleDateSelect}
          style={{ padding: '10px 16px', borderRadius: 'var(--radius-md)', border: 'var(--border-crisp)', fontSize: '1rem', cursor: 'pointer' }}
        />
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select a date to generate a printable report.</p>
      </div>

      {/* Floating Date Filter Modal */}
      {showFilterPopup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div className="pro-card" style={{ width: '100%', maxWidth: '700px', position: 'relative', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <button 
              onClick={() => { setShowFilterPopup(false); setFilterDate(''); }}
              style={{ position: 'absolute', top: '-15px', right: '-15px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EF4444', color: '#FFF', border: 'none', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
            >
              ✕
            </button>
            
            <h2 style={{ margin: '0 0 20px 0', color: 'var(--brand-blue)' }}>Sales Report: {filterDate}</h2>
            
            <div style={{ overflowY: 'auto', marginBottom: '20px', border: 'var(--border-crisp)', borderRadius: 'var(--radius-md)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: 'var(--bg-dashboard)', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ padding: '12px', borderBottom: '2px solid var(--border-crisp)' }}>Product</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid var(--border-crisp)' }}>Qty</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid var(--border-crisp)' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.length > 0 ? filteredSales.map(sale => (
                    <tr key={sale.id} style={{ borderBottom: '1px solid var(--border-crisp)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{sale.name}</td>
                      <td style={{ padding: '12px' }}>{sale.qty}</td>
                      <td style={{ padding: '12px', color: 'var(--brand-blue)', fontWeight: 700 }}>Ksh {sale.total.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>No sales recorded on this date.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <button onClick={() => window.print()} className="action-button" style={{ width: '100%', backgroundColor: 'var(--brand-yellow)', color: '#000', padding: '14px' }}>
              Export to PDF
            </button>
          </div>
        </div>
      )}
    </section>
  );
}