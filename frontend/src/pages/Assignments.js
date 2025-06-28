import React, { useState } from 'react';
import { addAssignment } from '../api';

function Assignments() {
  const [form, setForm] = useState({ base_id: '', equipment_type: '', quantity: '', personnel: '', assign_date: '' });
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
      await addAssignment(form);
      setMessage('Assignment recorded successfully!');
      setForm({ base_id: '', equipment_type: '', quantity: '', personnel: '', assign_date: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error recording assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Military Asset Management</h1>
        <div>
          <button onClick={() => window.location.href = '/dashboard'} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => window.location.href = '/purchases'} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Purchases</button>
          <button onClick={() => window.location.href = '/transfers'} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Transfers</button>
          <button onClick={() => window.location.href = '/expenditures'} style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Expenditures</button>
          <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <h2 style={{ color: '#333', marginBottom: '20px' }}>Assignments Management</h2>

      <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#ffc107', marginBottom: '20px' }}>New Asset Assignment</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {/* Form fields */}
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Base ID:</label>
            <input name="base_id" type="number" placeholder="Enter Base ID" value={form.base_id} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}/>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment Type:</label>
            <input name="equipment_type" placeholder="e.g., Vehicles" value={form.equipment_type} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}/>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quantity:</label>
            <input name="quantity" type="number" placeholder="Enter quantity" value={form.quantity} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}/>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Personnel Name:</label>
            <input name="personnel" placeholder="e.g., Captain Smith" value={form.personnel} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}/>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Assignment Date:</label>
            <input name="assign_date" type="date" value={form.assign_date} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#ccc' : '#ffc107', color: 'black', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer' }}>
              {loading ? 'Assigning...' : 'Record Assignment'}
            </button>
          </div>
        </form>
        {message && (
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da', color: message.includes('successfully') ? '#155724' : '#721c24', borderRadius: '4px', textAlign: 'center' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
