import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Role } from '../constants';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Create a new employee (and user account)
export const createEmployee = async (req: Request, res: Response) => {
    const {
        email,
        password,
        fullName,
        employeeCode,
        departmentId,
        designation,
        dateOfJoining,
        phone,
        address,
        role = Role.EMPLOYEE, // Default to EMPLOYEE role
    } = req.body;

    try {
        // Check if user or employee code already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const existingCode = await prisma.employeeProfile.findUnique({ where: { employeeCode } });
        if (existingCode) return res.status(400).json({ message: 'Employee code already exists' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Transaction to create User and EmployeeProfile
        const result = await prisma.$transaction(async (tx: any) => {
            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    role,
                    status: 'ACTIVE',
                },
            });

            const employee = await tx.employeeProfile.create({
                data: {
                    userId: user.id,
                    fullName,
                    employeeCode,
                    departmentId,
                    designation,
                    dateOfJoining: new Date(dateOfJoining),
                    phone,
                    address,
                },
            });

            return { user, employee };
        });

        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await prisma.employeeProfile.findMany({
            include: {
                user: {
                    select: { email: true, role: true, status: true },
                },
                department: true,
            },
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employeeProfile.findUnique({
            where: { id },
            include: {
                user: { select: { email: true, role: true, status: true } },
                department: true,
            },
        });

        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullName, departmentId, designation, phone, address } = req.body;

    try {
        const employee = await prisma.employeeProfile.update({
            where: { id },
            data: {
                fullName,
                departmentId,
                designation,
                phone,
                address,
            },
        });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
