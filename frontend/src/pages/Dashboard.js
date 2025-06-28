import React, { useEffect, useState } from 'react';
import { getDashboard } from '../api';

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboard();
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h3>Loading Dashboard...</h3>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <h3>Error: {error}</h3>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

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
            onClick={() => window.location.href = '/purchases'}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Purchases
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

      <h2 style={{ color: '#333', marginBottom: '20px' }}>Dashboard Overview</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Opening Balances</h3>
          {data.openings && data.openings.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.openings.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.opening_balance}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No opening balances found</p>
          )}
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>Purchases</h3>
          {data.purchases && data.purchases.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.purchases.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.total}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No purchases found</p>
          )}
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>Transfers In</h3>
          {data.transfersIn && data.transfersIn.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.transfersIn.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.total}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No transfers in found</p>
          )}
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>Transfers Out</h3>
          {data.transfersOut && data.transfersOut.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.transfersOut.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.total}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No transfers out found</p>
          )}
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#17a2b8', marginBottom: '15px' }}>Assigned</h3>
          {data.assigned && data.assigned.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.assigned.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.total}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No assignments found</p>
          )}
        </div>

        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6f42c1', marginBottom: '15px' }}>Expended</h3>
          {data.expended && data.expended.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.expended.map((row, index) => (
                <li key={index} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <strong>{row.equipment_type}:</strong> {row.total}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No expenditures found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
