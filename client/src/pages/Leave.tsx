import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface LeaveRequest {
    id: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
}

const Leave: React.FC = () => {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [formData, setFormData] = useState({
        leave_type: 'CL',
        start_date: '',
        end_date: '',
        reason: ''
    });
    const [message, setMessage] = useState('');

    const fetchLeaves = async () => {
        try {
            const res = await api.get('/leaves/me');
            setLeaves(res.data);
        } catch (error) {
            console.error('Error fetching leaves', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/leaves', formData);
            setMessage('Leave requested successfully');
            setFormData({ leave_type: 'CL', start_date: '', end_date: '', reason: '' });
            fetchLeaves();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error requesting leave');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Leave Management</h1>

            <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Request Leave</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Type</label>
                        <select
                            value={formData.leave_type}
                            onChange={e => setFormData({ ...formData, leave_type: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem' }}
                        >
                            <option value="CL">Casual Leave</option>
                            <option value="SL">Sick Leave</option>
                            <option value="PL">Privilege Leave</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Start Date</label>
                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>End Date</label>
                        <input
                            type="date"
                            value={formData.end_date}
                            onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Reason</label>
                        <textarea
                            value={formData.reason}
                            onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            required
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Submit Request</button>
                </form>
                {message && <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
            </div>

            <h3>My Leaves</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: '0.5rem' }}>Type</th>
                        <th style={{ padding: '0.5rem' }}>Start Date</th>
                        <th style={{ padding: '0.5rem' }}>End Date</th>
                        <th style={{ padding: '0.5rem' }}>Reason</th>
                        <th style={{ padding: '0.5rem' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map(leave => (
                        <tr key={leave.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.5rem' }}>{leave.leave_type}</td>
                            <td style={{ padding: '0.5rem' }}>{new Date(leave.start_date).toLocaleDateString()}</td>
                            <td style={{ padding: '0.5rem' }}>{new Date(leave.end_date).toLocaleDateString()}</td>
                            <td style={{ padding: '0.5rem' }}>{leave.reason}</td>
                            <td style={{ padding: '0.5rem' }}>
                                <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    background: leave.status === 'APPROVED' ? '#d4edda' : leave.status === 'REJECTED' ? '#f8d7da' : '#fff3cd',
                                    color: leave.status === 'APPROVED' ? '#155724' : leave.status === 'REJECTED' ? '#721c24' : '#856404'
                                }}>
                                    {leave.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leave;
