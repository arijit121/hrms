import React from 'react';

const Payroll: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Payroll</h1>
            <p>View salary slips and tax information.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>My Payslips</h3>
                <p>No payslips generated.</p>
            </div>
        </div>
    );
};

export default Payroll;
