import React, { useEffect, useState } from 'react';
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/departmentService';
import type { Department } from '../services/departmentService';

const Departments: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState<Partial<Department>>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error('Failed to fetch departments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (dept?: Department) => {
        if (dept) {
            setCurrentDepartment(dept);
            setIsEditing(true);
        } else {
            setCurrentDepartment({});
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentDepartment({});
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentDepartment.name) return;

        try {
            if (isEditing && currentDepartment.id) {
                await updateDepartment(currentDepartment.id, { name: currentDepartment.name, managerId: currentDepartment.managerId || undefined });
            } else {
                await createDepartment({ name: currentDepartment.name, managerId: currentDepartment.managerId || undefined });
            }
            fetchDepartments();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save department', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                await deleteDepartment(id);
                fetchDepartments();
            } catch (error) {
                console.error('Failed to delete department', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Departments</h1>
                <button
                    onClick={() => handleOpenModal()}
                    style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add Department
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {departments.map((dept) => (
                    <div key={dept.id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ marginTop: 0 }}>{dept.name}</h3>
                        <p><strong>Manager ID:</strong> {dept.managerId || 'N/A'}</p>
                        <p><strong>Employees:</strong> {dept.employees?.length || 0}</p>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleOpenModal(dept)}
                                style={{ padding: '0.25rem 0.5rem', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(dept.id)}
                                style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px' }}>
                        <h2>{isEditing ? 'Edit Department' : 'Add Department'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                                <input
                                    type="text"
                                    value={currentDepartment.name || ''}
                                    onChange={(e) => setCurrentDepartment({ ...currentDepartment, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Manager ID (Optional)</label>
                                <input
                                    type="text"
                                    value={currentDepartment.managerId || ''}
                                    onChange={(e) => setCurrentDepartment({ ...currentDepartment, managerId: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
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

export default Departments;
