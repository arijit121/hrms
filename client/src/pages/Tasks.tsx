import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    due_date: string;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        setLoading(true);
        try {
            await api.put(`/tasks/${id}/status`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>My Tasks</h1>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                {tasks.map(task => (
                    <div key={task.id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{task.title}</h3>
                                <p style={{ margin: 0, color: '#666' }}>{task.description}</p>
                                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                    <span style={{ marginRight: '1rem' }}>Priority: <strong>{task.priority}</strong></span>
                                    <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    marginBottom: '0.5rem',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    background: '#eee',
                                    display: 'inline-block'
                                }}>
                                    {task.status}
                                </div>
                                <div>
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateStatus(task.id, e.target.value)}
                                        disabled={loading}
                                        style={{ padding: '0.25rem' }}
                                    >
                                        <option value="TODO">To Do</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="BLOCKED">Blocked</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && <p>No tasks assigned to you.</p>}
            </div>
        </div>
    );
};

export default Tasks;
