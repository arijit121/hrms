import React from 'react';

const Assets: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Asset Management</h1>
            <p>Manage company assets and assignments.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Asset Inventory</h3>
                <p>No assets found.</p>
            </div>
        </div>
    );
};

export default Assets;
