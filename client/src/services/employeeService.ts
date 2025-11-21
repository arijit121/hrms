import api from './api';

export interface Employee {
    id: string;
    userId: string;
    fullName: string;
    employeeCode: string;
    departmentId?: string | null;
    department?: { id: string; name: string };
    designation: string;
    dateOfJoining: string;
    phone?: string | null;
    address?: string | null;
    user?: { email: string; role: string; status: string };
}

export const getEmployees = async () => {
    const response = await api.get<Employee[]>('/employees');
    return response.data;
};

export const getEmployeeById = async (id: string) => {
    const response = await api.get<Employee>(`/employees/${id}`);
    return response.data;
};

export const updateEmployee = async (id: string, data: Partial<Employee>) => {
    const response = await api.put<Employee>(`/employees/${id}`, data);
    return response.data;
};

// Note: Creation is handled via Auth Register or a specific Admin Create Employee endpoint if separate.
// Assuming we use the existing register flow or a specific create employee endpoint.
// For now, we'll stick to reading and updating. Creation might need to be clarified if it's different from Auth Register.
