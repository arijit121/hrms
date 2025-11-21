import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDepartment = async (req: Request, res: Response) => {
    const { name, managerId } = req.body;

    try {
        const department = await prisma.department.create({
            data: {
                name,
                managerId,
            },
        });
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                employees: {
                    select: { id: true, fullName: true, designation: true },
                },
            },
        });
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateDepartment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, managerId } = req.body;

    try {
        const department = await prisma.department.update({
            where: { id },
            data: {
                name,
                managerId,
            },
        });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteDepartment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.department.delete({ where: { id } });
        res.json({ message: 'Department deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
