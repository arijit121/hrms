import React from 'react';

const Notifications: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Notifications</h1>
            <p>View your alerts and messages.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Recent Alerts</h3>
                <p>No new notifications.</p>
            </div>
        </div>
    );
};

export default Notifications;
