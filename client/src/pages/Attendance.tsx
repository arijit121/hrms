import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface AttendanceRecord {
    id: string;
    date: string;
    check_in_time: string;
    check_out_time: string | null;
    status: string;
    total_hours: number | null;
}

const Attendance: React.FC = () => {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchAttendance = async () => {
        try {
            const res = await api.get('/attendance/me');
            setRecords(res.data);
        } catch (error) {
            console.error('Error fetching attendance', error);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleCheckIn = async () => {
        setLoading(true);
        setMessage('');
        try {
            await api.post('/attendance/check-in');
            setMessage('Checked in successfully');
            fetchAttendance();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error checking in');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckOut = async () => {
        setLoading(true);
        setMessage('');
        try {
            await api.post('/attendance/check-out');
            setMessage('Checked out successfully');
            fetchAttendance();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error checking out');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Attendance</h1>
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleCheckIn} disabled={loading} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
                    Check In
                </button>
                <button onClick={handleCheckOut} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
                    Check Out
                </button>
            </div>
            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
                        <th style={{ padding: '0.5rem' }}>Date</th>
                        <th style={{ padding: '0.5rem' }}>Check In</th>
                        <th style={{ padding: '0.5rem' }}>Check Out</th>
                        <th style={{ padding: '0.5rem' }}>Status</th>
                        <th style={{ padding: '0.5rem' }}>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(record => (
                        <tr key={record.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '0.5rem' }}>{new Date(record.date).toLocaleDateString()}</td>
                            <td style={{ padding: '0.5rem' }}>{record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString() : '-'}</td>
                            <td style={{ padding: '0.5rem' }}>{record.check_out_time ? new Date(record.check_out_time).toLocaleTimeString() : '-'}</td>
                            <td style={{ padding: '0.5rem' }}>{record.status}</td>
                            <td style={{ padding: '0.5rem' }}>{record.total_hours ? Number(record.total_hours).toFixed(2) : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Attendance;
