import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface LeaveRequest {
    id: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
}

const Leave: React.FC = () => {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [formData, setFormData] = useState({
        leaveType: 'CL',
        startDate: '',
        endDate: '',
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

        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            setMessage('End date cannot be before start date');
            return;
        }

        try {
            await api.post('/leaves', formData);
            setMessage('Leave requested successfully');
            setFormData({ leaveType: 'CL', startDate: '', endDate: '', reason: '' });
            fetchLeaves();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error requesting leave');
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Leave Management</h1>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-100 max-w-md">
                <h3 className="text-lg font-semibold mb-4">Request Leave</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={formData.leaveType}
                            onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="CL">Casual Leave</option>
                            <option value="SL">Sick Leave</option>
                            <option value="PL">Privilege Leave</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <textarea
                            value={formData.reason}
                            onChange={e => setFormData({ ...formData, reason: e.target.value })}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                        Submit Request
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}
            </div>

            <h3 className="text-lg font-semibold mb-4">My Leaves</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {leaves.map(leave => (
                            <tr key={leave.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(leave.endDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{leave.reason}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${leave.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                            leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {leave.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leave;
