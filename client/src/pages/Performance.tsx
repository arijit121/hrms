import React from 'react';

const Performance: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Performance Management</h1>
            <p>Track employee appraisals and goals.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>My Appraisals</h3>
                <p>No active appraisal cycles.</p>
            </div>
        </div>
    );
};

export default Performance;
