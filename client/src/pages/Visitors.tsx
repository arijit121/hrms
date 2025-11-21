import React from 'react';

const Visitors: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Visitor Management</h1>
            <p>Log and track office visitors.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Visitor Log</h3>
                <button style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Log Visitor</button>
            </div>
        </div>
    );
};

export default Visitors;
