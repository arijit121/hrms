import React from 'react';

const Expenses: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Expense Claims</h1>
            <p>Submit and track expense claims.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>My Claims</h3>
                <button style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>New Claim</button>
            </div>
        </div>
    );
};

export default Expenses;
