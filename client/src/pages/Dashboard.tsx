import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../services/dashboardService';
import type { DashboardStats } from '../services/dashboardService';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getDashboardStats();
                setStats(data);
                setError(null);
            } catch (err) {
                setError('Failed to load dashboard statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = stats ? [
        { title: 'Total Employees', value: stats.totalEmployees, color: '#0061a4' },
        { title: 'Pending Leaves', value: stats.pendingLeaves, color: '#6b5778' },
        { title: 'Active Tasks', value: stats.activeTasks, color: '#535f70' },
        { title: "Today's Attendance", value: stats.todayAttendance, color: '#0061a4' },
    ] : [];

    return (
        <div style={{
            padding: '32px',
            backgroundColor: 'var(--md-sys-color-background)',
            minHeight: '100vh'
        }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                    margin: '0 0 8px 0',
                    font: 'var(--md-sys-typescale-headline-large)',
                    color: 'var(--md-sys-color-on-background)'
                }}>Dashboard</h1>
                <p style={{
                    margin: 0,
                    font: 'var(--md-sys-typescale-body-large)',
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}>
                    Welcome back, <strong>{user?.email}</strong>
                </p>
                <span style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    padding: '4px 12px',
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-on-primary-container)',
                    borderRadius: 'var(--md-sys-shape-corner-small)',
                    font: 'var(--md-sys-typescale-label-small)'
                }}>
                    {user?.role}
                </span>
            </div>

            {loading && (
                <div style={{
                    font: 'var(--md-sys-typescale-body-large)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    textAlign: 'center',
                    padding: '48px'
                }}>
                    Loading statistics...
                </div>
            )}

            {error && (
                <div style={{
                    padding: '16px',
                    backgroundColor: 'var(--md-sys-color-error-container)',
                    color: 'var(--md-sys-color-on-error-container)',
                    borderRadius: 'var(--md-sys-shape-corner-medium)',
                    font: 'var(--md-sys-typescale-body-medium)',
                    marginBottom: '24px'
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && stats && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '24px',
                        marginBottom: '32px'
                    }}>
                        {statCards.map((card, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    backgroundColor: 'var(--md-sys-color-surface)',
                                    padding: '24px',
                                    borderLeft: `4px solid ${card.color}`
                                }}
                            >
                                <p style={{
                                    margin: '0 0 8px 0',
                                    font: 'var(--md-sys-typescale-title-medium)',
                                    color: 'var(--md-sys-color-on-surface-variant)'
                                }}>
                                    {card.title}
                                </p>
                                <h2 style={{
                                    margin: 0,
                                    font: 'var(--md-sys-typescale-display-small)',
                                    color: card.color
                                }}>
                                    {card.value}
                                </h2>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ marginTop: '24px' }}>
                        <h3 style={{
                            margin: '0 0 16px 0',
                            font: 'var(--md-sys-typescale-title-large)',
                            color: 'var(--md-sys-color-on-surface)'
                        }}>
                            Quick Actions
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px'
                        }}>
                            <button className="btn-primary">Mark Attendance</button>
                            <button className="btn-primary">Request Leave</button>
                            <button className="btn-primary">View Tasks</button>
                            <button className="btn-primary">Check Messages</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
