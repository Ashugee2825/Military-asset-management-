import React, { useState, useEffect } from 'react';
import { addPurchase, getPurchases } from '../api';

function Purchases() {
  const [form, setForm] = useState({ base_id: '', equipment_type: '', quantity: '', purchase_date: '' });
  const [purchases, setPurchases] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await addPurchase(form);
      setMessage('Purchase recorded successfully!');
      setForm({ base_id: '', equipment_type: '', quantity: '', purchase_date: '' });
      fetchPurchases();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error recording purchase');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async () => {
    try {
      const res = await getPurchases();
      setPurchases(res.data);
    } catch (err) {
      console.error('Failed to fetch purchases:', err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Navigation Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Military Asset Management</h1>
        <div>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => window.location.href = '/transfers'}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Transfers
          </button>
          <button 
            onClick={() => window.location.href = '/assignments'}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Assignments
          </button>
          <button 
            onClick={() => window.location.href = '/expenditures'}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Expenditures
          </button>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>

      <h2 style={{ color: '#333', marginBottom: '20px' }}>Purchases Management</h2>

      {/* Add Purchase Form */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#007bff', marginBottom: '20px' }}>Add New Purchase</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Base ID:</label>
            <input 
              name="base_id" 
              type="number"
              placeholder="Enter Base ID" 
              value={form.base_id} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment Type:</label>
            <input 
              name="equipment_type" 
              placeholder="e.g., Weapons, Vehicles" 
              value={form.equipment_type} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity:</label>
            <input 
              name="quantity" 
              type="number" 
              placeholder="Enter quantity" 
              value={form.quantity} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purchase Date:</label>
            <input 
              name="purchase_date" 
              type="date" 
              value={form.purchase_date} 
              onChange={handleChange} 
              required 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Add Purchase'}
            </button>
          </div>
        </form>
        {message && (
          <div style={{ 
            marginTop: '15px',
            padding: '10px',
            backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}
      </div>

      {/* Purchases List */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#28a745', marginBottom: '20px' }}>All Purchases</h3>
        {purchases.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Base ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Equipment Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Quantity</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px' }}>{p.base_id}</td>
                    <td style={{ padding: '12px' }}>{p.equipment_type}</td>
                    <td style={{ padding: '12px' }}>{p.quantity}</td>
                    <td style={{ padding: '12px' }}>{new Date(p.purchase_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#666', textAlign: 'center' }}>No purchases found</p>
        )}
      </div>
    </div>
  );
}

export default Purchases;
