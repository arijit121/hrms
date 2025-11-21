import React from 'react';

const Training: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Training & Development</h1>
            <p>View assigned courses and track progress.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>My Courses</h3>
                <p>No courses assigned.</p>
            </div>
        </div>
    );
};

export default Training;
