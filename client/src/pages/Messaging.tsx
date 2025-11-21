import React from 'react';

const Messaging: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Messaging</h1>
            <p>Chat with colleagues.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Inbox</h3>
                <p>No messages.</p>
            </div>
        </div>
    );
};

export default Messaging;
