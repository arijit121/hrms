import React from 'react';

const Shifts: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Shift Management</h1>
            <p>Manage employee shifts and schedules.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Shift Schedule</h3>
                <p>No shifts defined.</p>
            </div>
        </div>
    );
};

export default Shifts;
