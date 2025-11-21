import React from 'react';

const Documents: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Document Vault</h1>
            <p>Securely store and access employee documents.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>My Documents</h3>
                <p>No documents uploaded.</p>
            </div>
        </div>
    );
};

export default Documents;
