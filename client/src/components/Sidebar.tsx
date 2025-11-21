import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface MenuItem {
    path: string;
    label: string;
    allowedRoles: string[];
}

const menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE', 'ACCOUNTANT', 'SECURITY_STAFF'] },
    { path: '/departments', label: 'Departments', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER'] },
    { path: '/employees', label: 'Employees', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD'] },
    { path: '/register', label: 'Register User', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER'] },
    { path: '/attendance', label: 'Attendance', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/leave', label: 'Leave', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/tasks', label: 'Tasks', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/recruitment', label: 'Recruitment', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER'] },
    { path: '/performance', label: 'Performance', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD'] },
    { path: '/training', label: 'Training', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD'] },
    { path: '/assets', label: 'Assets', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER'] },
    { path: '/expenses', label: 'Expenses', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'ACCOUNTANT', 'EMPLOYEE'] },
    { path: '/shifts', label: 'Shifts', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD'] },
    { path: '/documents', label: 'Documents', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'EMPLOYEE'] },
    { path: '/announcements', label: 'Announcements', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/visitors', label: 'Visitors', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'SECURITY_STAFF'] },
    { path: '/notifications', label: 'Notifications', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/payroll', label: 'Payroll', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'ACCOUNTANT'] },
    { path: '/messaging', label: 'Messaging', allowedRoles: ['SUPER_ADMIN', 'HR_MANAGER', 'TEAM_LEAD', 'EMPLOYEE'] },
    { path: '/admin', label: 'Admin Settings', allowedRoles: ['SUPER_ADMIN'] },
];

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredItems = menuItems.filter(item =>
        user && item.allowedRoles.includes(user.role)
    );

    return (
        <nav style={{
            width: '260px',
            backgroundColor: 'var(--md-sys-color-surface)',
            borderRight: '1px solid var(--md-sys-color-outline-variant)',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0
        }}>
            <div style={{
                padding: '24px 16px',
                borderBottom: '1px solid var(--md-sys-color-outline-variant)'
            }}>
                <h2 style={{
                    margin: 0,
                    font: 'var(--md-sys-typescale-title-large)',
                    color: 'var(--md-sys-color-primary)'
                }}>HRMS</h2>
                <p style={{
                    margin: '4px 0 0 0',
                    font: 'var(--md-sys-typescale-body-small)',
                    color: 'var(--md-sys-color-on-surface-variant)'
                }}>{user?.email}</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {filteredItems.map(item => (
                        <li key={item.path} style={{ margin: '4px 12px' }}>
                            <Link
                                to={item.path}
                                style={{
                                    display: 'block',
                                    padding: '12px 16px',
                                    textDecoration: 'none',
                                    color: 'var(--md-sys-color-on-surface)',
                                    borderRadius: 'var(--md-sys-shape-corner-full)',
                                    font: 'var(--md-sys-typescale-label-large)',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--md-sys-color-secondary-container)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{
                padding: '16px',
                borderTop: '1px solid var(--md-sys-color-outline-variant)'
            }}>
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        padding: '10px 24px',
                        backgroundColor: 'var(--md-sys-color-error-container)',
                        color: 'var(--md-sys-color-on-error-container)',
                        border: 'none',
                        borderRadius: 'var(--md-sys-shape-corner-full)',
                        font: 'var(--md-sys-typescale-label-large)',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffb4ab';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--md-sys-color-error-container)';
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
