import React from 'react';

const Announcements: React.FC = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Announcements</h1>
            <p>Company-wide news and updates.</p>
            <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginTop: '1rem' }}>
                <h3>Latest News</h3>
                <p>No announcements yet.</p>
            </div>
        </div>
    );
};

export default Announcements;
