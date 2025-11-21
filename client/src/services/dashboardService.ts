import api from './api';

export interface DashboardStats {
    totalEmployees: number;
    pendingLeaves: number;
    activeTasks: number;
    todayAttendance: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get('/dashboard');
    return response.data;
};
