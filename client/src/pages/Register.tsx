import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/auth/register', formData);
            setMessage('Registration successful! You can now log in.');
            // redirect to login after short delay
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Register</button>
            </form>
            {message && (
                <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>
            )}
        </div>
    );
};

export default Register;
