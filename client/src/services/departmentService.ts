import api from './api';

export interface Department {
    id: string;
    name: string;
    managerId?: string | null;
    employees?: { id: string; fullName: string; designation: string }[];
}

export const getDepartments = async () => {
    const response = await api.get<Department[]>('/departments');
    return response.data;
};

export const createDepartment = async (data: { name: string; managerId?: string }) => {
    const response = await api.post<Department>('/departments', data);
    return response.data;
};

export const updateDepartment = async (id: string, data: { name: string; managerId?: string }) => {
    const response = await api.put<Department>(`/departments/${id}`, data);
    return response.data;
};

export const deleteDepartment = async (id: string) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
};
