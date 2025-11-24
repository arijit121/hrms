import React, { useEffect, useState } from 'react';
import { getEmployees, updateEmployee } from '../services/employeeService';
import type { Employee } from '../services/employeeService';
import { getDepartments } from '../services/departmentService';
import type { Department } from '../services/departmentService';
import api from '../services/api';

const Employees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState<Partial<Employee> & { password?: string; email?: string; role?: string }>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [empData, deptData] = await Promise.all([getEmployees(), getDepartments()]);
            setEmployees(empData);
            setDepartments(deptData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (emp?: Employee) => {
        if (emp) {
            setCurrentEmployee(emp);
            setIsEditing(true);
        } else {
            setCurrentEmployee({
                role: 'EMPLOYEE',
                status: 'ACTIVE'
            } as any);
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentEmployee({});
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentEmployee.id) {
                await updateEmployee(currentEmployee.id, {
                    fullName: currentEmployee.fullName,
                    departmentId: currentEmployee.departmentId,
                    designation: currentEmployee.designation,
                    phone: currentEmployee.phone,
                    address: currentEmployee.address
                });
            } else {
                // Create new employee
                await api.post('/employees', currentEmployee);
            }
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save employee', error);
            alert('Failed to save employee. Check console for details.');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Employees</h1>
                <button
                    onClick={() => handleOpenModal()}
                    style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add Employee
                </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Code</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Department</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Designation</th>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <td style={{ padding: '0.75rem' }}>{emp.fullName}</td>
                                <td style={{ padding: '0.75rem' }}>{emp.user?.email}</td>
                                <td style={{ padding: '0.75rem' }}>{emp.employeeCode}</td>
                                <td style={{ padding: '0.75rem' }}>{emp.department?.name || '-'}</td>
                                <td style={{ padding: '0.75rem' }}>{emp.designation}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    <button
                                        onClick={() => handleOpenModal(emp)}
                                        style={{ padding: '0.25rem 0.5rem', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            {!isEditing && (
                                <>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Role</label>
                                        <select
                                            value={currentEmployee.role || 'EMPLOYEE'}
                                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, role: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="EMPLOYEE">Employee</option>
                                            <option value="SUPER_ADMIN">Super Admin</option>
                                            <option value="HR_MANAGER">HR Manager</option>
                                            <option value="TEAM_LEAD">Team Lead</option>
                                            <option value="ACCOUNTANT">Accountant</option>
                                            <option value="SECURITY_STAFF">Security Staff</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Email</label>
                                        <input
                                            type="email"
                                            value={currentEmployee.email || ''}
                                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Password</label>
                                        <input
                                            type="password"
                                            value={currentEmployee.password || ''}
                                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, password: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Employee Code</label>
                                        <input
                                            type="text"
                                            value={currentEmployee.employeeCode || ''}
                                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, employeeCode: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Date of Joining</label>
                                        <input
                                            type="date"
                                            value={currentEmployee.dateOfJoining ? new Date(currentEmployee.dateOfJoining).toISOString().split('T')[0] : ''}
                                            onChange={(e) => setCurrentEmployee({ ...currentEmployee, dateOfJoining: e.target.value })}
                                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Full Name</label>
                                <input
                                    type="text"
                                    value={currentEmployee.fullName || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, fullName: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Department</label>
                                <select
                                    value={currentEmployee.departmentId || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, departmentId: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Designation</label>
                                <input
                                    type="text"
                                    value={currentEmployee.designation || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, designation: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Phone</label>
                                <input
                                    type="text"
                                    value={currentEmployee.phone || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.25rem' }}>Address</label>
                                <textarea
                                    value={currentEmployee.address || ''}
                                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, address: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                                <button type="button" onClick={handleCloseModal} style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
